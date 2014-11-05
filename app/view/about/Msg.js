Ext.define('app.view.about.Msg',{
    extend:'Ext.form.Panel',
    xtype:'msg',
    alternateClassName:'msg',
    requires:['Ext.form.FieldSet','Ext.field.TextArea'],
    config:{
        scrollable:null,
        margin:10,
        title:'用户反馈',
        items:[{
            xtype:'fieldset',
            defaults:{
                labelWidth:'20%'
            },
            items:[{
                xtype:'textareafield',
                maxRow:5
            }]
        },{
            xtype:'button',
            text:'提交',
            ui:'action'
        }]
    }
})