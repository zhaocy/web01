Ext.define('app.view.recharge.Active',{
    extend:'Ext.Container',

    alternateClassName:'active',
    xtpye:'active',
    requires:['ux.label.Countdown'],
    config:{
        title:'活动',
        layout:{
            type:'vbox',
            align:'stretch'
        },
        items:[{
            height:50,
            style:'color:red;text-align:center;',
            xtype:'labelCountdown',
            format:'Y-m-d H:i:s',
            value:'2014-11-10 23:59:59'
        },{
            height:400,
            layout:'fit',
            xtype:'game'
        }]
    }
})