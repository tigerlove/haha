define(["app",
    'apps/common/dialog',
    'apps/directory/list/directory_view'
], function (App, Dialog, WidgetListView) {

    var Controller = {
        widgets: function () {
            var widgetListView =new WidgetListView();
            var dialog = new Dialog({subview:widgetListView,el:$("#dialog-region")});
            dialog.render();
            widgetListView.slick.slickPrev();

        }
    };


    return Controller;
});
