/**
* 
* 小写开头表示这是私有控件，不能直接使用
*/
Ext.define('ux.simpleBar', {
    extend: 'Ext.TitleBar',
    requires: [
        'Ext.Button'
    ],
    config: {
        title: '删除',
        /*全选按钮*/
        allButton: {
            text: '全选',
            align: 'left'
        },
        /*取消全选按钮*/
        recallButton: {
            text: '取消全选',
            align: 'left',
            hidden :true
        },
        /*取消按钮*/
        changeButton: {
            text: '取消',
            align: 'right'
        },
        /*确定按钮*/
        defineButton: {
            text: '确定',
            align: 'right'
        }
    },
    /*初始化配置*/
    constructor: function (config) {
        config = config || {};
        if (!config.items) {
            config.items = [];
        }
        this.callParent([config]);
    },
    /*初始化*/
    initialize: function () {
        this.on({
            hide: this.onHide,
            scope: this
        });
    },
    /*边栏隐藏时*/
    onHide: function () {
        this.changeHide(true);
    },
    changeHide: function (isHide) {
        this.getRecallButton().setHidden(isHide);
        this.getAllButton().setHidden(!isHide);
    },
    /*创建取消全选按钮*/
    applyRecallButton: function (config) {
        return Ext.factory(config, Ext.Button, this.getRecallButton());
    },
    /*更新取消全选按钮*/
    updateRecallButton: function (newItem, oldItem) {
        this.updataButton(newItem, oldItem, 'onRecallAllButtonTap');
    },
    /*创建全选按钮*/
    applyAllButton: function (config) {
        return Ext.factory(config, Ext.Button, this.getAllButton());
    },
    /*更新全选按钮*/
    updateAllButton: function (newItem, oldItem) {
        this.updataButton(newItem, oldItem, 'onAllButtonTap');
    },
    /*创建取消按钮*/
    applyChangeButton: function (config) {
        return Ext.factory(config, Ext.Button, this.getChangeButton());
    },
    /*更新取消按钮*/
    updateChangeButton: function (newItem, oldItem) {
        this.updataButton(newItem, oldItem, 'onChangeButtonTap');
    },
    /*创建取消按钮*/
    applyDefineButton: function (config) {
        return Ext.factory(config, Ext.Button, this.getDefineButton());
    },
    /*更新取消按钮*/
    updateDefineButton: function (newItem, oldItem) {
        this.updataButton(newItem, oldItem, 'onDefineButtonTap');
    },
    /*更新按钮*/
    updataButton: function (newItem, oldItem, buttonTap) {
        if (oldItem) {
            this.remove(oldItem);
        }
        if (newItem) {
            this.add(newItem);
            newItem.on({
                scope: this,
                tap: function () {
                    this.fireEvent(buttonTap);
                }
            });
        }
    }
});