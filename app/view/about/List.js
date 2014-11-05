Ext.define('app.view.about.List',{
    extend:'Ext.List',
    xtype:'aboutlist',
    alternateClassName:'aboutlist',
    config:{
        scrollable:{
            direction: 'vertical',
            indicators: false,
            disabled:true
        },
        cls:'innerlist',
        itemTpl:'{title}',
        defaults:{
            action: 'redirect'
        },
        data:[
            {title:'功能介绍',redirect:'intro'},
            {title:'用户反馈',redirect:'msg'},
            {title:'软件服务协议',redirect:'service'},
            {title:'版本更新',redirect:'update'}
        ]
    }
})