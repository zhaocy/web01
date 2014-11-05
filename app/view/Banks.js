Ext.define('app.view.Banks',{
    extend:'Ext.List',
    xtype:'banks',
    alternateClassName:'banks',

    config:{

        title:'支持闪付',
        emptyText:'暂时没有数据',
        itemTpl:[
            '<div class="legislator-list-item">',
            '<span class="legislator-pic" style="background-image: url(resources/images/{id}.png);"></span>',
            '<h3>{name}</h3>',
            '<p>{desc}</p>',
            '</div>'
        ],
        data:[
            {id:'08',name:'招商银行',desc:'有关本行的描述'},
            {id:'07',name:'建设银行',desc:'有关本行的描述'},
            {id:'06',name:'交通银行',desc:'有关本行的描述'},
            {id:'05',name:'广发银行',desc:'有关本行的描述,广发银行广发银行广发银行广发银行广发银行广发银行广发银行广发银行'}
        ]
    }
})