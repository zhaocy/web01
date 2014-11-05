Ext.define('app.view.Main', {
    extend: 'ux.NavigationView',
    xtype: 'main',
    config: {
        defaultBackButtonText:'返回',
        navigationBar:{
            backButton:{
                iconCls:'arrow_left',
                cls:'back'
            }
        }
    }
});
