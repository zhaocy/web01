Ext.define('app.view.Game',{
    extend:'Ext.List',
    xtype:'game',
    alternateClassName:'game',

    config:{
        title:'活动列表',
        emptyText:'暂时没有数据',
        itemTpl:[
            '<div style="font-size: 13px;">',
            '[{tag}]&nbsp;&nbsp;{name}',
            '<div style="background-image: url(resources/images/list-arrow.png);float:right;width: 15px;height: 13px;background-size: 15px 13px;"></div>',
            '</div>'
        ],
        data:[
            {id:'01',name:'闪付给力，刷卡有礼',tag:'上海'},
            {id:'02',name:'手机支付赢好礼~',tag:'苏州'},
            {id:'03',name:'手机支付赢好礼！~',tag:'重庆'},
            {id:'03',name:'闪付给力，刷卡有礼',tag:'台州'},
            {id:'03',name:'手机支付赢好礼',tag:'武汉'}
        ]
    }
})