define(['text!templates/letterSpacingBtn.html'], function(template) {
  var LetterSpacingView = Backbone.View.extend({
    el: '#letterSpacing',
    template: _.template(template),

    events: {
      'change': 'onAction'
    },

    initialize: function(app) {
      this.app = app;
    },

    render: function() {
      this.$el.html(this.template());

      var max = 60;
      for (var x = 0; x <= max; x = x + 1){
        $("#letterSpacingSelect").append("<option value=\"" + x + "\" >"+x+"</option>");
      }
      return this;
    },

    onAction: function(e) {

      this.app.textProcessor.setLetterSpacing(e.target.value);
    //  $('#letterSpacingSelect').prop('selectedIndex',0);
      return false;
    }
  });

  return LetterSpacingView;
});