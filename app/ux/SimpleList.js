/*
*list多选扩展
*/
Ext.define('ux.SimpleList', {
    alternateClassName: 'simpleList',
    extend: 'Ext.List',
    xtype: 'simpleList',
    requires: ['ux.simpleBar'],
    config: {
        //多选状态下css
        editCls: 'simpleList',
        //不加在长按时可能没反应
        onItemDisclosure: false,
        //设置数据主键(可配置)
        ckId: 'id',
        //默认选择类型，用以应对多种选择情况
        //多选时弹出菜单栏(可配置)
        simpleBar: {
            docked: 'top',
            hidden: true
        },
        listeners: {
            //监控是否在多选状态
            itemtap: function (list, index, target, record, e) {
                //如果在多选状态停止后续事件的执行
                if (this.isSimple) {
                    e.stopEvent();
                }
            },
            //只要按键长按住就会触发，和按键是否离开没有关系
            itemtaphold: function () {
                //开始多选
                this.beginSimple();
            }
        }
    },
    /*初始化*/
    initialize: function () {
        var me = this,
        simpleBar = me.getSimpleBar();
        //监听按钮点击事件
        simpleBar.on({
            onRecallAllButtonTap: me.onRecallAllButtonTap,
            onDefineButtonTap: me.onDefineButtonTap,
            onChangeButtonTap: me.onChangeButtonTap,
            onAllButtonTap: me.onAllButtonTap,
            scope: me
        });
        this.callParent(arguments);
    },
    /*点击确定按钮*/
    onDefineButtonTap: function () {
        var me = this,
        items = me.getSelection(),
        ids = [],
        ckID = me.config.ckId;

        //获取选中项
        for (var i = 0,
        item; item = items[i]; i++) {
            ids.push(item.data[ckID]);
        }
        if (ids.length > 0) {
            //触发选择成功事件list:list本身,items:被选中的行,ids:被选中key集合
            me.fireEvent('simpleSuccess', me, items, ids);
        }
        //结束多选
        me.endSimple();
    },
    /*点击取消按钮*/
    onChangeButtonTap: function () {
        this.endSimple();
    },
    /*点击取消全选按钮*/
    onRecallAllButtonTap: function () {
        this.deselectAll();
        this.getSimpleBar().changeHide(true);
    },
    /*点击全选按钮*/
    onAllButtonTap: function () {
        this.selectAll();
        this.getSimpleBar().changeHide(false);
    },
    /*创建菜单栏*/
    applySimpleBar: function (config) {
        return Ext.factory(config, 'ux.simpleBar', this.getSimpleBar()); ;
    },
    /*更新菜单栏*/
    updateSimpleBar: function (newItem, oldItem) {
        if (oldItem) {
            this.remove(oldItem, true);
        }
        if (newItem) {
            this.add(newItem);
        }
    },
    //进入多选状态
    beginSimple: function (simpleType, title) {
        var me = this;
        if (!me.isSimple) {
            //进入多选模式
            me.setMode('SIMPLE');
            //添加css
            me.addCls(me.config.editCls);
            //显示OnItemDisclosure
            me.setOnItemDisclosure(true);
            //加入标记，以便在itemtap事件中进行判定
            me.isSimple = true;
            //添加多选边栏
            me.getSimpleBar().show();
            //取消全选
            me.deselectAll();
        }
    },
    //结束多选模式
    endSimple: function () {
        var me = this;
        me.getSimpleBar().hide();
        //取消全选
        me.deselectAll();
        //进入单选模式
        me.setMode('SINGLE');
        //移除css
        me.removeCls(me.config.editCls);
        //隐藏OnItemDisclosure
        me.setOnItemDisclosure(false);
        //加入标记，以便在itemtap事件中进行判定
        me.isSimple = false;
    },
    //更新OnItemDisclosure
    updateOnItemDisclosure: function (newConfig, oldConfig) {
        if (oldConfig == null) {
            return;
        }
        var items = this.listItems;
        for (var i = 0,
        ln = items.length; i < ln; i++) {
            var dItem = items[i].getDisclosure();
            newConfig === false ? dItem.hide() : dItem.show();
        }
    }
});