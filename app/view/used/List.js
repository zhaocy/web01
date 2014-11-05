Ext.define('app.view.used.List',{
    extend:'Ext.List',
    xtype:'usedList',
    alternateClassName:'usedList',
    config:{
        title:'二手物品',
        itemTpl: '{name}',
        navigationBar:{
            tmpItems:[{
                xtype:'button',
                text:'添加',
                align:'right',
                ui: 'decline',
                action:'redirect',
                redirect:'usedEdit'
            }]
        },
        data:[{name:'wallet'},{name:'phone'}]
    }
})