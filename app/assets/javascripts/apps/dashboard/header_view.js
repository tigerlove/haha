define(["app",
    "apps/directory/list/directory_controller",
    "apps/directory/themes/themes_controller",
    "hbs!apps/dashboard/tpl/header"
],
    function (App,
     directoryCtrl, 
     ThemeCtrl, 
     headerTpl) {

        var Header = Backbone.View.extend({
            template: headerTpl,
            tagName: "div",
            className: 'header',
            initialize: function (options) {
                this.options = options || {};
            },
            render: function () {
                console.log('header render');
                var self = this;
                this.$el.html(this.template());
                this.$el.find("#login-name").text($("#json-data > span[data-collection=User]").text());
                
                this.$el.find("select.js-current-board").empty();
                _.each(self.collection.models, function (boards) {
                    self.$el.find("select.js-current-board").append('<option value="' + boards.get('id') + '">' + boards.get('name') + '</option>');
                })
                self.$el.find("select.js-current-board option[value='" + self.collection.selected.id + "']").attr("selected", true);

                return this;
            },
            events: {
                "click li.dropdown": "toggleDropdown",
                'change select.js-current-board': 'boardSwitch',             
                'click li.js-theme': 'themes'
            },

            toggleDropdown: function (e) {
                //e.preventDefault();
                this.$("li.dropdown").toggleClass("open");
            },
            boardSwitch: function (e) {
                //e.preventDefault();
                console.log('switch to:' + $(e.target).val());
                App.api.board($(e.target).val());
            },
            themes: function (e) {
                //e.preventDefault();
                console.log('themes');
                ThemeCtrl.show();
            },
            
       
        });
        return Header;
    });