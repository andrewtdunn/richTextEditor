define(['text!templates/fontSizeBtn.html'], function(template) {
  var FontSizeView = Backbone.View.extend({
    el: '#fontSize',
    template: _.template(template),

    events: {
      'change': 'onAction'
    },

    initialize: function(app) {
      this.app = app;
    },

    render: function() {

      var min = 8;
      var max = 100;

      var fontsizes = [7,8,9,10,11,12,13,14,15,16,17,18,
                        19,20,21,22,23,24,25,26,28,30,
                        32,34,36,38,40,42,44,46,70,90];
      this.$el.html(this.template());
      //console.log(this.$el);
      // read in fontnames here....
      for (var x = 0; x < fontsizes.length; x = x + 1){
       // if (x===min) console.log(this.$el);
        $("#sizeList").append("<option value=\"" + fontsizes[x] + "\" >"+fontsizes[x]+"</option>");
      }

      return this;
    },

    onAction: function(e) {
      
      this.app.textProcessor.setFontSize( e.target.value.replace("px",""));
      console.log("font size: " + e.target.value.replace("px",""));
      
    //  $('#sizeList').prop('selectedIndex', 0);
      return false;
    }
  });

  return FontSizeView;
});