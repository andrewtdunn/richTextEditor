define(['text!templates/fontNameBtn.html'], function(template) {
  var FontNameView = Backbone.View.extend({
    el: '#fontName',
    template: _.template(template),

    events: {
      'change': 'onAction'
    },

    initialize: function(app) {
      this.app = app;
    },

    render: function() {
      this.$el.html(this.template());
      // attach select node for each font 
      for (font in FONT_LISTING){
        $("#fontButton").append("<option>"+ FONT_LISTING[font] +"</option>");
      }
      
      return this;
    },

    onAction: function(e) {

      this.app.textProcessor.doCommand('fontname', e.target.value);
    //  $('#fontButton').prop('selectedIndex',0);
      return false;
    }
  });

  return FontNameView;
});