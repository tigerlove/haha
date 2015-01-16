define(["app",
    'apps/common/dialog'  
], function (App, Dialog) {

        var Controller = {
            create: function (type) {
                require(['apps/directory/'+type+'/'+type+'_view'],function(View){
                    var view = new View();
                    var dialog = new Dialog({subview:view,el:$("#dialog-region")});
                    dialog.render();
                })              
            }
        }

    return Controller;
})