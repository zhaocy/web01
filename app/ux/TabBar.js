/*
*模仿tabpanel导航栏
*/
Ext.define('ux.TabBar', {
    extend: 'Ext.Toolbar',
    xtype: 'tabBar',
    config: {
        docked: 'bottom',
        cls: 'navToolbar',
        layout: {
            align: 'stretch'
        },
        defaults: {
            flex: 1,
            pressedCls:''
        },
        //被选中的按钮
        selectButton: null
    },
    initialize: function () {
        var me = this;
        me.callParent();
        //监听按钮点击事件
        me.on({
            delegate: '> button',
            scope: me,
            tap: 'onButtonTap'
        });
    },
    //更新被选中按钮
    updateSelectButton: function (newItem, oldItem) {
        if (oldItem) {
            oldItem.removeCls('x-tabBar-pressing');
        }
        if (newItem) {
            newItem.addCls('x-tabBar-pressing');
        }
    },
    //当按钮被点击时
    onButtonTap: function (button) {
        if (!button.getInitialConfig('noSelect')) {
            this.setSelectButton(button);
        }
    },
    /**
    * @private 
    *执行添加项，调用add方法后自动执行
    */
    onItemAdd: function (item, index) {
        if (!this.getSelectButton() && item.getInitialConfig('selected')) {
            this.setSelectButton(item);
        }
        this.callParent(arguments);
    }
});