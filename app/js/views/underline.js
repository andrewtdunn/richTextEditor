define(['text!templates/underlineBtn.html'], function(template) {
  var UnderlineView = Backbone.View.extend({
    el: '#underline',
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
      this.app.textProcessor.doCommand('underline');
      return false;
    }
  });

  return UnderlineView;
});