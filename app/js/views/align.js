define(['text!templates/alignBtns.html'], function(template) {
  var AlignView = Backbone.View.extend({
    el: '#alignBtns',
    template: _.template(template),

    events: {
      'click': 'onAction'
    },

    initialize: function(app) {
      this.app = app;
    },

    render: function() {
      this.$el.html(this.template());
      // read in fontnames here....

      return this;
    },

    onAction: function(e) {
      this.app.textProcessor.doCommand(e.target.title);
      return false;
    }
  });

  return AlignView;
});