define(['text!templates/flattenBtn.html'], function(template) {
  var FontColorView = Backbone.View.extend({
    el: '#flattenDom',
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
      this.app.parser.flattenDom();
      return false;
    }
  });

  return FontColorView;
});