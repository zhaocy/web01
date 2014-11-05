Ext.define('app.view.Shops',{
    extend:'Ext.List',
    xtype:'shops',
    alternateClassName:'shops',

    config:{
        title:'商户列表',
        emptyText:'暂时没有数据',
        itemTpl:[
            '<div class="legislator-list-item">',
            '<span class="legislator-pic" style="background-image: url(resources/images/{id}.png);"></span>',
            '{name}',
            '</div>'
        ],
        data:[
            {id:'01',name:'星巴克'},
            {id:'02',name:'F QQ'},
            {id:'03',name:'苹果'}
        ]
    }
})