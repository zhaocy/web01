/**
* 基于Ext.navigation.Bar
* 去除动画切换等功能
* 可以灵活的在NavigationView子项中配置属性
* 小写开头表示这是私有控件，不能直接使用
*/
Ext.define('ux.navigationBar', {
    extend: 'Ext.TitleBar',
    requires: [
        'Ext.Button',
        'Ext.Spacer'
    ],
    config: {
        /*导航栏标题*/
        title: null,
        /*item默认类型*/
        defaultType: 'button',
        layout: {
            type: 'hbox'
        },
        /*返回按钮*/
        backButton: {
            align: 'left',
            ui: 'back',
            hidden: true
        },
        /*导航栏临时控件组，在子项中配置*/
        tmpItems: null,
        /*导航栏临时cls，在子项中配置*/
        tmpCls: null,
        /*是否隐藏返回按钮，在子项中配置*/
        backHide: true
    },
    /*初始化配置*/
    constructor: function (config) {
        config = config || {};
        if (!config.items) {
            config.items = [];
        }
        this.callParent([config]);
    },
    //更新视图
    updateView: function (config, viewStack) {
        //console.log('setBackHide', viewStack);
        //设置标题
        this.setTitle(config.title || '');
        //设置返回按钮显示状态
        this.setBackHide(config.backHide || viewStack.length == 1);
        config.navigationBar = config.navigationBar || {};
        //设置导航栏临时控件组
        this.setTmpItems(config.navigationBar.tmpItems);
        //设置导航栏临时cls
        this.setTmpCls(config.navigationBar.tmpCls);
    },
    /*创建返回按钮*/
    applyBackButton: function (config) {
        return Ext.factory(config, Ext.Button, this.getBackButton());
    },
    /*更新返回按钮*/
    updateBackButton: function (newBackButton, oldBackButton) {
        if (oldBackButton) {
            this.remove(oldBackButton);
        }
        if (newBackButton) {
            this.add(newBackButton);

            newBackButton.on({
                scope: this,
                tap: this.onBackButtonTap
            });
        }
    },
    /*更新返回按钮显示状态*/
    updateBackHide: function (newItem, oldItem) {
        var backBtn = this.getBackButton();
        if (newItem) {
            backBtn.hide();
        } else {
            backBtn.show();
        }
    },
    /*创建导航栏临时控件组*/
    applyTmpItems: function (newItems) {
        if (!newItems) return false;
        var me = this,
        navItems = [],
        i,
        ln;
        newItems = Ext.Array.from(newItems);
        for (i = 0, ln = newItems.length; i < ln; i++) {
            navItems.push(me.factoryItem(newItems[i]));
        }
        return navItems;
    },
    /*更新导航栏临时控件组*/
    updateTmpItems: function (newItem, oldItem) {
        if (oldItem) {
            var i, ln;
            for (i = 0, ln = oldItem.length; i < ln; i++) {
                this.remove(oldItem[i]);
            }
        }
        if (newItem) {
            this.add(newItem);
        }
    },
    /*更新导航栏临时cls*/
    updateTmpCls: function (newItem, oldItem) {
        if (oldItem) {
            this.removeCls(oldItem);
        }
        if (newItem) {
            this.addCls(newItem);
        }
    },
    /*点击返回按钮时触发*/
    onBackButtonTap: function () {
        this.fireEvent('back', this);
    }
});