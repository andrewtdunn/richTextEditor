  define(['text!templates/textBox.html'], function(template) {
  var TextBoxView = Backbone.View.extend({
    el: '#textBoxHolder',
    template: _.template(template),

    events: {
      "click" : "onClick"
    },

    initialize: function(app) {
      //console.log("text created");
      this.app = app;
      var that = this;
      
      var isEditable = $('#textBox').css('contenteditable');
      //console.log("textBox contenteditable is " + isEditable);

      var myColor = $('#textBox').css('color');
      //hconsole.log("textBox color is " + myColor);
     
          //Add listener for paster to force paste-as-plain-text
      window.addEventListener("paste", function(e){

        //Get the plain text from the clipboard
        var plain = (!!e.clipboardData)? e.clipboardData.getData("text/plain") : window.clipboardData.getData("Text");
        //Stop default paste action
        e.preventDefault();
        //Paste plain text

        //document.execCommand("insertHTML", false, plain.replace(/<\S[^><]*>/g,""));
        // use Rangy to insert text and preserve style

        that.deleteRange();
        plain = plain.replace(/<\S[^><]*>/g,"");
        plain = plain.replace(/\s{2,}/g,' ');
        plain = plain.replace(/(\r\n|\n|\r)/gm," ");
        that.insertNodeAtRange(plain);


      }, false); 

      
    },

    deleteRange: function() {
        var range = this.getFirstRange();
        if (range) {  
          range.deleteContents();
        }
    },

    getFirstRange: function() {
    var sel = rangy.getSelection();
        return sel.rangeCount ? sel.getRangeAt(0) : null;
    },

    insertNodeAtRange: function(text) {
        console.log("inserting range");
        var range = this.getFirstRange();
        if (range) {
            var el = document.createElement("span");
            el.appendChild(document.createTextNode(text));
            range.insertNode(el);
            rangy.getSelection().setSingleRange(range);
        }
    },

    render: function() {
      this.$el.html(this.template());
      // read in fontnames here....

      return this;
    },

    getText: function(){
      return this.$el.html();
    },


    onClick: function(e) {
    //  console.log("onClick");
      e.preventDefault();
    }
  });

  return TextBoxView;
});