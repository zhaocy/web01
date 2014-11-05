Ext.define('app.view.Guide',{
    extend:'Ext.Container',
    xtype:'guide',
    alternateClassName:'guide',
    requires:['ux.plugin.ConHref'],
    config:{
        title:'用户指南',
        plugins:['conHref'],
        cls:'guide',
        html:'<p>1.中银V钱包是什么</p>'+
            '<a href="http://www.snowballtech.com">雪球科技</a>'
    }
})