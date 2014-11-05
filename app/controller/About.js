/**
 *
 */
Ext.define('app.controller.About',{
    extend:'Ext.app.Controller',
    requires:['Ext.Toast'],
    config:{
        views:['about.Main','about.List','about.OtherList','about.Intro',
            'about.Msg','about.Service'
        ],
        refs:{
            "aboutlist":"aboutlist"
        },
        control:{
            aboutlist:{
                itemtap:function(c,index,target,record,e,opts){
//                    console.log(record.data.redirect)
                    if(record.data.redirect=='update'){
//                        new Ext.toast({message:'已经是最新版本'})
                        util.showMessage('已经是最新版本',true)
                    }else {
                        this.redirectTo('redirect/' + record.data.redirect)
                    }
                }
            }
        }
    },
    launch:function(){
    }

})