/**
 * Created by 长远 on 2014/11/1.
 */
Ext.define('app.controller.Main',{
    extend:'Ext.app.Controller',
    config:{
        views:['Main','Home','Guide',
            'Shops','Banks','Game',
            'recharge.Order','Urls',
            'Youhui','recharge.Active'
        ],
        refs:{
            main:'main',
            redirectBtn:'button[action=redirect]'
        },
        routes:{
            'redirect/:view':'showView'
        },
        control:{
            redirectBtn:{
                tap:function(t,value){
//                    console.log(t.config)
                    this.redirectTo('redirect/'+ t.config.redirect)
                }
            }
        }
    },

    launch:function(){
        this.redirectTo('redirect/home');
    },

    showView:function(view,isPop){
        //console.log(view, '是否销毁',isPop);
        var main = this.getMain();
        if(main){
            if(isPop){
                main.popAndPush(view);
            }else{
                main.push(view);
            }
        }
    }
})
