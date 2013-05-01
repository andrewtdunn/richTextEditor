define(['text!templates/editBtn.html'], function(template) {
  var UnderlineView = Backbone.View.extend({
    el: '#editBtn',
    template: _.template(template),

    events: {
      'change': 'onAction'
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
      this.app.textProcessor.setDocMode(e.target.checked);
      return false;
    }
  });

  return UnderlineView;
});