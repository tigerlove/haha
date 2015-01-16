define(["backbone"],
    function (Backbone) {
        var Router = Backbone.Router.extend({});
        var router = new Router();
        var API = {
            admin: function () {
                   require(["apps/dashboard/board_admin_controller"], function (boardCtrl) {
                     boardCtrl.admin();
                });
            },
            board: function (id) {
                require(["apps/dashboard/board_manager_controller"], function (boardManagerCtrl) {
                    boardManagerCtrl.board(id);
                });
            },
            widgets: function () {
                 require(["apps/directory/list/directory_controller"], function (directoryCtrl) {
                     directoryCtrl.widgets();
                });
            },
            pie: function () {
                require(["apps/directory/directory_controller"], function (Controller) {
                    Controller.create('pie');
                });
            },
            bar: function () {
                require(["apps/directory/directory_controller"], function (Controller) {
                    Controller.create('bar');
                });
            },
            line: function () {
                require(["apps/directory/directory_controller"], function (Controller) {
                    Controller.create('line');
                });
            },
            column: function () {
                require(["apps/directory/directory_controller"], function (Controller) {
                    Controller.create('column');
                });
            },
            area: function () {
                require(["apps/directory/directory_controller"], function (Controller) {
                    Controller.create('area');
                });
            },
            num: function () {
                require(["apps/directory/directory_controller"], function (Controller) {
                    Controller.create('num');
                });
            }
        }

        router.route('admin', 'admin', API.admin);
        router.route('board(/:id)', 'board', API.board);
        router.route('directory', 'widgets', API.widgets);
        router.route('directory/pie', 'pie', API.pie);
        router.route('directory/bar', 'bar', API.bar);
        router.route('directory/column', 'column', API.column);
        router.route('directory/area', 'area', API.area);
        router.route('directory/line', 'line', API.line);
        router.route('directory/num', 'num', API.num);
        return {
            views:{},
            api:API,
            router: router
        };
    });


