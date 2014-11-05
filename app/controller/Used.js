Ext.define('app.controller.Used',{
    extend:'Ext.app.Controller',
    config:{
        views:['used.List','used.Info','used.Edit'],

        refs:{
            usedList:'usedList'
        },
        control:{
            usedList:{
                itemtap:function(){
                    this.redirectTo('redirect/usedInfo')
                }
            }
        }
    }
})