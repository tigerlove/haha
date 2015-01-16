define(['app',
    "apps/dashboard/board_admin_view",
    'apps/common/dialog',
    'entities/board'],
    function (App, AdminView, Dialog, Board) {
        var Controller = {
            admin: function () {
                console.log('show board admin');
                var view = new  AdminView.Table();
                var dialog = new Dialog({subview:view,el:$("#dialog-region")});
                dialog.render();

            }
        }

        return Controller;
    })
;