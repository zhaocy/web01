Ext.define('app.view.Urls',{
    extend:'Ext.Container',
    xtype:'urls',
    alternateClassName:'urls',

    config:{
        scrollable:{
            direction:'both',
            directionLock: true
        },
        animation:{
          duration:5500
        },
        url:'http://www.mi.com/?mobile'
//        url:'page/test.html'
    },
    initialize: function () {
         Ext.Ajax.request({
            url: this.config.url,
            success: function (rs) {
                 this.setHtml(rs.responseText);
            },
            scope: this
         });
     }

})