/**
 * Created by 长远 on 2014/11/1.
 */
Ext.define('app.view.Home',{
    extend:'Ext.Container',
    xtype:'home',
    alternateClassName: 'home',
    config:{
        title:'手机钱包',
        cls:'home',
        layout: {
            type:'vbox'
        },
        defaults: {
            flex:1,
            layout: {
                type:'hbox',
                align:'stretch'
            },
            defaults: {
//                iconAlign:'top',
//                iconCls:'home',
                xtype:'button',
                flex:1,
                action: 'redirect',
                cls:'border-btn'
            }
        },
        items: [{
            items: [{
                text: '银行',
                redirect: 'usedList'
            },
            {
                text: '公交',
                redirect:'game'
            },{
                text:'闪付',
                redirect:'banks'
            }]
        },{
            items:[{
                text:'商户',
                redirect:'shops'
            },{
                text:'外部URL',
                redirect:'urls'
            },{

                text:'活动',
                redirect:'active'
            }]
        },{
            items:[{
                text:'客服',
                redirect:'messageInfo'
            },{
                text:'优惠券',
                redirect:'youhui'
            },{}]
        },{
            xtype: 'toolbar',
            docked: 'bottom',
            cls:'navToolbar',
            layout:{
              type:'hbox',
              align:'stretch'
            },
            defaults: {
                xtype: 'button',
                iconAlign: 'top',
                action: 'redirect'
            },
            items: [{
                flex:1,
                iconCls: 'user',
                text: '新手指导',
                redirect: 'userguide'
            },
            {
                flex:1,
                iconCls: 'compose',
                text: '用户指南',
                redirect:'guide'
            },
            {
                flex:1,
                iconCls: 'settings',
                text: '关于我们',
                redirect:'aboutmain'
            }]
        }]
    }
})