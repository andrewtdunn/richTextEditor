define(['text!templates/bgColorBtn.html'], function(template) {
  var FontColorView = Backbone.View.extend({
    el: '#bgColor',
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
      
      this.app.textProcessor.setBgColor(e.target.value);
    //  $('#colorSelect').prop('selectedIndex', 0);
      return false;
    }
  });

  return FontColorView;
});