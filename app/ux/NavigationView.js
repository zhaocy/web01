/*
*模仿且改进NavigationView
*返回时自动销毁视图，节约内存
*/
Ext.define('ux.NavigationView', {
    extend: 'Ext.Container',
    xtype: 'uNavigationView',
    requires: ['ux.navigationBar'],
    config: {
        //布局，type不可更改
        layout: {
            type: 'card',
            animation: {
                duration: 300,
                easing: 'ease-out',
                type: 'slide',
                direction: 'left'
            }
        },
        //默认导航条
        navigationBar: {
            docked: 'top',
            cls: 'navigationBar'
        },
        //其他导航栏、可选格式otherMenu:'xtype'，在子项中配置
        otherMenu: null,
        //移除项，在子项中配置clear
        //0:只保留当前项
        //1:保留当前项和第一项
        clear: null
    },
    /*初始化配置*/
    initConfig: function () {
        //console.log('初始化配置');
        //历史记录
        this.viewStack = [];
        //视图加载状态
        this.viewStatus = {};
        this.callParent(arguments);
    },
    /*初始化*/
    initialize: function () {
        var me = this,
            navBar = me.getNavigationBar();
        //监听返回按钮点击事件
        navBar.on({
            back: me.onBackButtonTap,
            scope: me
        });
        me.relayEvents(navBar, 'rightbuttontap');
        //监听添加和移除视图事件
        me.relayEvents(me, {
            add: 'push',
            remove: 'pop'
        });
        var layout = me.getLayout();
        //错误警告
        if (layout && !layout.isCard) {
            Ext.Logger.error('CardPanel中layout的布局只能是card布局');
        }
    },
    /*调试*/
    //        applyActiveItem: function (newCard, oldCard) {
    //            console.log(this.getItems().keys);
    //            return this.callParent(arguments);
    //        },
    /*创建其他导航栏*/
    applyOtherMenu: function (newItem) {
        var item = this.otherMenu;
        if (item) {
            if (!newItem) {
                item.hide();
                return item;
            }
            if (item.getItemId() == newItem) {
                item.show();
                return item;
            }
        }
        if (!newItem) {
            return false;
        }
        this.otherMenu = Ext.create(newItem, { itemId: newItem });
        return this.otherMenu;
    },
    /*更新其他导航栏*/
    updateOtherMenu: function (newItem, oldItem) {
        if (oldItem) {
            //            console.log('oldItem:', oldItem.getItemId());
            this.remove(oldItem);
        }
        if (newItem) {
            //            console.log('newItem:', newItem.getItemId());
            this.add(newItem);
        }
    },
    /*创建导航栏*/
    applyNavigationBar: function (config) {
        return Ext.factory(config, 'ux.navigationBar', this.getNavigationBar());
    },
    /*更新导航栏*/
    updateNavigationBar: function (newItem, oldItem) {
        if (oldItem) {
            this.remove(oldItem, true);
        }
        if (newItem) {
            this.add(newItem);
        }
    },
    /*更新clear*/
    updateClear: function (newItem, oldItem) {
        var animation = this.getLayout().getAnimation();
        //添加监听
        if (oldItem) {
            //移除动画结束监听
            animation.un({
                scope: this,
                animationend: 'clearItem'
            });
        }
        if (newItem) {
            //添加动画结束监听
            animation.on({
                scope: this,
                animationend: 'clearItem'
            });
        }
    },
    /**
    * 添加视图
    * 注意xtype是指alternateClassName
    */
    push: function (xtype, params) {
        var me = this,
        view = me.getActiveItem(),
        oldXtype = view && (view.config.xtype || view.getItemId());
        me.tempConfig = params;
        /*过滤已经添加的视图*/
        if (!me.viewStatus[xtype]) {
            params = params || {};
            params.itemId = xtype;
            view = Ext.create(xtype, params);
            me.add(view);
        } else if (oldXtype != xtype) {
            me.setActiveItem(xtype);
        } else if (params) {
            me.onActivate(view);
        }
    },
    /**
    * 不填写参数时，移除当前项，返回到上一项
    * 如果参数是数字，则从最后一项开始移除指定数目的项
    * 如果参数是string,则移除指定类型的项
    * 如果参数是项，则移除传入的项
    * 不论参数如何，都会保留一个活动项
    * @return {Ext.Component} 当前活动项
    */
    pop: function (count) {
        if (this.beforePop(count)) {
            return this.doPop();
        }
    },
    /*移除当前激活项然后添加新的项xtype为null则只移除*/
    popAndPush: function (xtype, params) {
        //不是通过pop方法调用，需手动移除历史记录
        this.viewStack.pop();
        this.doPop(xtype);
        if (xtype) {
            this.push(xtype, params);
        }
    },
    /*删除指定项*/
    beforePop: function (count) {
        var me = this,
        innerItems = me.getInnerItems();
        if (Ext.isString(count) || Ext.isObject(count)) {
            var last = innerItems.length - 1,
            i;
            for (i = last; i >= 0; i--) {
                if ((Ext.isString(count) && Ext.ComponentQuery.is(innerItems[i], count)) || (Ext.isObject(count) && count == innerItems[i])) {
                    //获得移除项序号
                    count = last - i;
                    break;
                }
            }
            if (!Ext.isNumber(count)) {
                return false;
            }
        }
        var ln = innerItems.length,
        toRemove;
        //默认移除一项
        if (!Ext.isNumber(count) || count < 1) {
            count = 1;
        }
        //当我们试图移除更多视图时
        count = Math.min(count, ln - 1);
        if (count) {
            me.viewStackPop(count);
            //开始移除视图
            toRemove = innerItems.splice(-count, count - 1);
            for (i = 0; i < toRemove.length; i++) {
                me.remove(toRemove[i]);
            }
            return true;
        }
        return false;
    },
    /*移除最后一项，根据情况决定是否直接隐藏删除项*/
    doPop: function (hide) {
        var me = this,
        innerItems = me.getInnerItems(),
        ord = innerItems[innerItems.length - 1];
        if (hide) {
            //加入标记，防止重复执行onActivate
            me.isPopAndPush = true;
            //后续操作为push，隐藏项防止出错.
            ord.hide();
        }
        me.remove(ord);
        //触发被移除项的事件
        return me.getActiveItem();
    },
    /**
    * 移除第一项和最后项之间的所有项（包括最后项）
    * @return {Ext.Component} 当前活动视图
    */
    reset: function () {
        return this.pop(this.getInnerItems().length);
    },
    /**
    * 移除项，在子项中配置clear
    * 0:只保留当前项
    * 1:保留当前项和第一项
    **/
    clearItem: function () {
        var index = this.getClear() - 1,
        innerItems = this.getInnerItems(),
        length = innerItems.length - 1,
        ordItem,
        i;
        for (i = length; i > index; i--) {
            ordItem = innerItems[i];
            if (ordItem.isHidden()) {
                this.remove(ordItem, true);
            }
        }
    },
    /*移除历史记录*/
    viewStackPop: function (count) {
        for (var i = 0; i < count; i++) {
            this.viewStack.pop();
        }
    },
    /*项被激活*/
    onActivate: function (view) {
        var me = this;
        if (me.isPopAndPush) {
            me.isPopAndPush = false;
            return;
        }
        //        console.log('activate', config.xtype || view.getItemId());
        //设置子视图配置
        if (me.tempConfig) {
            view.setConfig(me.tempConfig);
            delete me.tempConfig;
        }
        var config = view.config;
        //设置需要移除的项
        var clear = config.clear > -1;
        //        console.log(clear);
        if (clear) {
            me.viewStack.splice(config.clear, me.viewStack.length);
            xtype = view.config.xtype || view.getItemId();
            if (xtype != me.viewStack[0]) {
                me.viewStack.push(xtype);
            }
        }
        //                console.log(this.viewStack);
        me.setClear(clear);
        //设置导航栏
        me.getNavigationBar().updateView(config, me.viewStack);
        //设置其他导航栏
        me.setOtherMenu(config.otherMenu);
    },
    /*项被销毁*/
    onDestroy: function (view) {
        //console.log('onDestroy', view.config.xtype || view.getItemId());
        this.viewStatus[view.config.xtype || view.getItemId()] = false;
    },
    /*pop时反转切换动画*/
    doResetActiveItem: function (innerIndex) {
        var me = this,
        innerItems = me.getInnerItems(),
        animation = me.getLayout().getAnimation();
        if (innerIndex > 0) {
            if (animation && animation.isAnimation) {
                animation.setReverse(true);
            }
            me.setActiveItem(innerIndex - 1);
        }
    },
    /*执行移除项，调用remove方法后自动执行*/
    doRemove: function () {
        var animation = this.getLayout().getAnimation();
        if (animation && animation.isAnimation) {
            animation.setReverse(false);
        }
        this.callParent(arguments);
    },
    /*执行添加项，调用add方法后自动执行*/
    onItemAdd: function (item, index) {
        var me = this;
        if (item.isInnerItem()) {
            var xtype = item.config.xtype || item.getItemId();
            //添加历史记录
            me.viewStatus[xtype] = true;
            me.viewStack.push(xtype);
            //添加监听
            item.on({
                scope: me,
                activate: 'onActivate',
                destroy: 'onDestroy'
            });
        }
        me.doItemLayoutAdd(item, index);
        if (!me.isItemsInitializing && item.isInnerItem()) {
            me.setActiveItem(item);
        }
        if (me.initialized) {
            me.fireEvent('add', me, item, index);
        }
    },
    /*返回上一个历史记录*/
    onBackButtonTap: function () {
        this.pop();
        this.fireEvent('back', this);
    }
});