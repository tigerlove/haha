define(["backbone",
    'backbone.picky'
], function(Backbone) {
    var Board = {};
    Board.BoardItem = Backbone.Model.extend({
        urlRoot: "board",
        initialize: function() {
            var selectable = new Backbone.Picky.Selectable(this);
            _.extend(this, selectable);
        }
    });

    Board.BoardCollection = Backbone.Collection.extend({
        url: "board",
        model: Board.BoardItem,
        initialize: function() {
            var singleSelect = new Backbone.Picky.SingleSelect(this);
            _.extend(this, singleSelect);
        }
    });

    Board.API = {
        getBoards: function() {
            var boards = new Board.BoardCollection();
            var defer = $.Deferred();
            boards.fetch({
                success: function(data) {
                    defer.resolve(data);
                }
            });
            var promise = defer.promise();

            return promise;
        },
        getBoard: function(boardId) {
            var dash = new Board.BoardItem({
                id: boardId
            });
            var defer = $.Deferred();
            dash.fetch({
                success: function(data) {
                    defer.resolve(data);
                }
            });
            return defer.promise();
        },
        deleteBoard: function(boardId) {
            var board = new Board.BoardItem({
                id: boardId
            });
            board.destroy();
        }

    }; //API

    return Board;
});
