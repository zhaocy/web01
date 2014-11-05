Ext.define('app.view.user.Info',{
    extend:'Ext.Container',
    xtype:'userguide',
    alternateClassName:'userguide',
    requires:['ux.plugin.ConHref'],
    config:{
        title:'新手指导',
        plugins:['conHref'],
        html:'<p>新手指导</p>'+
            '<a href="http://www.snowballtech.com">雪球科技</a>'
    }
})