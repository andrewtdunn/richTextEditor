define(['text!templates/fontColorBtn.html'], function(template) {
  var FontColorView = Backbone.View.extend({
    el: '#fontColor',
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

      var foreColors = [
                        'red',
                        'blue',
                        'green',
                        'black',
                        'yellow',
                        'pink',
                        'aquamarine',
                        'white',
                        'gray'
                        ];

      for (var color in foreColors){
        $("#colorSelect").append("<option value=\"" + foreColors[color] + "\">"+foreColors[color]+"</option>");
      }                    
       

      return this;
    },

    onAction: function(e) {
      
      this.app.textProcessor.doCommand('foreColor', e.target.value);
     // $('#colorSelect').prop('selectedIndex', 0);
      return false;
    }
  });

  return FontColorView;
});