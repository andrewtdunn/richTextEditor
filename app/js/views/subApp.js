define(['text!templates/subApp.html'], function(template) {
  var SubAppView = Backbone.View.extend({
    el: '#subContainer',
    template: _.template(template),

    events: {
      'click': 'onAction'
    },

    initialize: function(app) {
      this.app = app;
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    onAction: function() {

      console.log("action called here");
      // call main action

      this.app.textProcessor.doCommand("ok");
      return false;
    }
  });

  return SubAppView;
});