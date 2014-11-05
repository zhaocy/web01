Ext.define('app.view.about.OtherList',{
    extend:'Ext.List',
    alternateClassName:'otherlist',
    xtype:'otherlist',

    config:{
        scrollable:{
            direction: 'vertical',
            indicators: false,
            disabled:true
        },
        itemTpl:'{title}',
        defaults:{
            action: 'redirect'
        },
        data:[
            {title:'客服QQ 88855522',redirect:'gotoQQ'},
            {title:'论坛'},
            {title:'客服热线'}
        ]
    }
})