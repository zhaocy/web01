/**
 * Created by 长远 on 2014/11/1.
 */
Ext.define('app.controller.Main',{
    extend:'Ext.app.Controller',
    config:{
        views:['Main','Home','Guide',
            'Shops','Banks','Game',
            'recharge.Info','Urls',
            'Youhui','recharge.Active'
        ],
        refs:{
            main:'main',
            redirectBtn:'button[action=redirect]',
            alterBtn:'button[text=添加]'
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
            },
            alterBtn:{
                tap:function(e){
                    var me = this;
                    var overlay = Ext.Viewport.add({
                        xtype:'panel',
                        left:0,
                        top:0,
                        modal:true,
                        centered:true,
                        hideOnMaskTap:true,
                        hidden:true,
                        width:260,
                        height:'70%',
                        html:'ALTER',
                        styleHtmlContent:true,
                        scrollable:true,
                        items:[{
                            docked:'top',
                            xtype:'toolbar',
                            title:'弹出层'
                        }]
                    });
//                    overlay.showBy(Ext.getBody());
                    overlay.showBy(me.getAlterBtn());
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
