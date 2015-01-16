define(["backbone", "jquery-ui"], function(Backbone){
  var Dialog = Backbone.View.extend({
     subview:null,
     initialize:function(options){
        var options = options || {};
        this.subview = options.subview
     },
     render: function(){
        console.log('dialog render');
        this.listenTo(this.subview, "dialog:close", this.closeDialog);
        this.$el.html('<div class="js-dialog-holder"></div>');
        this.$el.find('div.js-dialog-holder').html(this.subview.render().el);
        var self = this;
        this.$el.dialog({
            modal: true,
            resizable: false,
            title: this.subview.title|| {},
            width: "940",
            dialogClass: "topbox",
            close: function (e, ui) {
                self.closeDialog();

            }
        });

        return this;
    },

    closeDialog: function(){
      require(['app'],function(App){
        App.router.navigate('');
      })
      this.stopListening();      
      this.$el.dialog("destroy");
      this.$el.empty();
    }
  });

  return Dialog;
});
