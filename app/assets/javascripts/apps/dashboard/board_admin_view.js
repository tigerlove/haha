define(["app",
    "hbs!apps/dashboard/tpl/board_admin",
    "hbs!apps/dashboard/tpl/board_admin_item",
    'entities/board',
],
    function (App, adminTpl, adminItemTpl, Board) {
        var AdminView = {};
        AdminView.Item = Backbone.View.extend({
            tagName: "tr",
            template: adminItemTpl,
            events: {
                'click button.js-delete': 'delBoard',
                'click button.js-edit': 'editBoard'
            },
            editBoard: function (e) {
                console.log('edit');

                var name = prompt("请输入Boardboard的名字", this.model.get('name'));
                if (name != null && name !== "") {
                    this.model.save({
                        'name':name                                        
                    });
                }
            },
            delBoard: function () {
                console.log('del');
                if (confirm("确定要删除吗!")) {
                    this.model.destroy();
                }
            },
            initialize: function () {

                this.listenTo(this.model, 'change', this.render);
                this.listenTo(this.model, 'destroy', this.remove);
            },
            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            }
        })
        AdminView.Table = Backbone.View.extend({
            template: adminTpl,
            tagName: "div",
            className: "m-directory",
            title: 'board管理',
            events: {
                'click button.js-create': 'createBoard'
            },
            createBoard: function () {
                var name = prompt("请输入Boardboard的名字", '');
                if (name != null && name !== "") {
                    this.boards.create({name: name, data:'{}', style: 'black'});
                }
            },
            initialize: function () {
                this.boards = new Board.BoardCollection();
                //$("body").attr('class', "");
                this.$el.append(adminTpl());
                this.listenTo(this.boards, 'add', this.addOne);
                this.listenTo(this.boards, 'reset', this.addAll);
                this.listenTo(this.boards, 'all', this.render);
                this.boards.fetch();
            },
            addAll: function () {
                this.boards.each(this.addOne, this);
            },
            addOne: function (board) {

                var view = new AdminView.Item({model: board});

                this.$el.find("tbody").append(view.render().el);
            },
            render: function () {

                var self = this;
                //this.$el.show();
                return this;
            }
        });
        return AdminView;
    });


