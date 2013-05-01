define(['text!templates/lineHeightBtn.html'], function(template) {
  var FontSizeView = Backbone.View.extend({
    el: '#lineHeight',
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
      var max = 6; // maximum line height (in em)
      for (var x = 1; x <= max; x = x + 0.25){
        var num = parseFloat(Math.round(x * 100) / 100).toFixed(2);
        $("#lineHeightSelect").append("<option value=\"" + num + "\" >"+num+" em</option>");
      }
      return this;
    },

    onAction: function(e) {

      this.app.textProcessor.setLineHeight(e.target.value);
      return false;
    }
  });

  return FontSizeView;
});