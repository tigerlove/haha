define(['app',
    "apps/dashboard/header_view",
    "apps/dashboard/board_view",
    'entities/board',
    'apps/common/theme_switcher'
    ],
    function (App, 
        Header,
        BoardView, 
        Board,
        theme) {
        var Controller = {
            board: function (boardid) {
                console.log('show board');
                $.when(Board.API.getBoards()).done(function(boardsData){
                    if(boardsData != null){
                        App.boards = boardsData;
                        if(boardid){
                            boardsData.select(boardsData.get(boardid));
                        }else{
                            boardsData.select(boardsData.at(0));
                        }

                        
                        if (App.views.header) {
                            App.views.header.remove();
                        }
                        if (App.views.board) {
                            App.views.board.remove();
                        }

                        //theme
                        theme(boardsData.selected.get('style'));
                        $("#header-holder").append('<div id="header-region"></div>');
                        var header = new Header({el: $("#header-region"), collection: boardsData});
                        App.views.header = header;
                        header.render();

                        $("#board-holder").append('<div id="grid-region" class="container"></div>');
                        var board = new BoardView({model: boardsData.selected, el: $("#grid-region")});
                        board.render();
                        App.views.board = board;
                    }
                });
            }
        }

        return Controller;
    })
;