Ext.define('app.view.about.Service',{
    extend:'Ext.Container',
    xtype:'service',
    alternateClassName:'service',
    requires:['ux.plugin.ConHref'],
    config:{
        title:'软件服务协议',
        plugins:['conHref'],
        html:'<p>手机钱包软件服务协议</p>'+
            '<a href="http://www.snowballtech.com">雪球科技</a>'
    }
})