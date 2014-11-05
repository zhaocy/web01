Ext.define('app.view.about.Intro',{
    extend:'Ext.Container',
    xtype:'intro',
    alternateClassName:'intro',
    requires:['ux.plugin.ConHref'],
    config:{
        title:'功能介绍',
        plugins:['conHref'],
        html:'<p>手机钱包  功能介绍</p>'+
            '<a href="http://www.snowballtech.com">雪球科技</a>'
    }
})