Ext.define('app.view.Youhui',{
    extend:'Ext.TabPanel',
    alternateClassName:'youhui',
    xtype:'youhui',
    config:{
        title:'优惠券',
        defaults:{
            styleHtmlContent:true
        },
        tabBar:{
          defaults:{flex:1},
          layout:{
              type:'hbox',
              align:'middle'
          }
        },
        items:[{
            title:'可用',
            xtype:'game'
        },{
            title:'已使用',
            xtype:'shops'
        },{
            title:'已过期',
            xtype:'banks'
        }]
    }
})