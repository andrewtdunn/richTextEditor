define(['text!templates/vertAlignBtns.html'], function(template) {
  var VertAlignView = Backbone.View.extend({
    el: '#vertAlignBtns',
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
    //  console.log("adjusting vert align to " + e.target.id );
      this.app.textProcessor.adjustVertAlign(e.target.id);
      return false;
    }
  });

  return VertAlignView;
});