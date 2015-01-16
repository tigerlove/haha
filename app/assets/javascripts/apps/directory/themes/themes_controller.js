define(["app",
    'apps/common/dialog',
    'apps/directory/themes/themes_view'
], function (App, Dialog, ThemesView) {

    var Controller = {
        show: function () {
            var themesView =new ThemesView();
            var dialog = new Dialog({subview:themesView,el:$("#dialog-region")});
            dialog.render();
        }
    };
    return Controller;
});
