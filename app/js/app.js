define([
	
	'views/app',
	'views/vertalign',
	'views/letterspacing',
	'views/fontname',
	'views/fontsize',
	'views/lineheight',
	'views/fontcolor',
	'views/colorpicker',
	'views/bgcolor',
	'views/underline',
	'views/align',
	'views/editmode',
	'views/flattendom',
	'views/textbox',
	'textprocessor',
	'parser'

], function(AppView, VertAlign, LetterSpacingView, FontNameView, FontSizeView, 
			LineHeightView, FontColorView, ColorPickerView, BgColorView, UnderlineView, AlignView, 
			EditModeView, FlattenView, TextBoxView, TextProcessor, Parser) {
	var App = function() {
		
		console.log("constructing");
		var debug = true || (document.location.hostname == "localhost");
		if (!debug)
		{
			// override console.log for ie. 
			console.log = function () {
				// do nothing.
			};
		}
		
		var that = this;
		function loadCSS(){

		// load all css files
		cssList = [
					'css/spectrum.css',
					'css/editorStyles.css',
					'css/richEditor.css',
					'css/bootstrap.min.css', 
					'http://fonts.mypublisher.com/apollo-webclient/fonts.css'
					];

        _.each(cssList, function(cssFile) {
			var link = document.createElement("link");
			link.type = "text/css";
			link.rel = "stylesheet";
			link.href = cssFile;
			var head = document.getElementsByTagName("head")[0];
			head.insertBefore(link,head.childNodes[0]);
		});
		}

		//$.when(loadCSS)

		this.views.app = new AppView();
		this.views.app.render();

		this.views.letterSpacingView = new LetterSpacingView(this);
		this.views.letterSpacingView.render();

		this.views.fontNameView = new FontNameView(this);
		this.views.fontNameView.render();

		this.views.fontSizeView = new FontSizeView(this);
		this.views.fontSizeView.render();

		this.views.lineHeightView = new LineHeightView(this);
		this.views.lineHeightView.render();

		this.views.fontColorView = new FontColorView(this);
		this.views.fontColorView.render();

		this.views.bgColorView = new BgColorView(this);
		this.views.bgColorView.render();

		this.views.underlineView = new UnderlineView(this);
		this.views.underlineView.render();

		this.views.alignView = new AlignView(this);
		this.views.alignView.render();

		this.views.vertAlign = new VertAlign(this);
		this.views.vertAlign.render();

		this.views.editModeView = new EditModeView(this);
		this.views.editModeView.render();

		this.views.flattenView = new FlattenView(this);
		this.views.flattenView.render();

		this.views.colorPickerView = new ColorPickerView(this);
		this.views.colorPickerView.render();

		this.views.textBoxView = new TextBoxView(this);
		this.views.textBoxView.render(); 

		this.views.textBoxView.on("paste", function() {
			console.log("paste detected in main app");
			that.textProcessor.onTextPaste();
			return false;
		});

		this.init();
		rangy.init();
		$('#toolBar1').equalHeights();
		//$('#renderBtns').equalHeights();

		
	};

	App.prototype = {
		views:{},
		init: function(){
			var that = this;
			console.log("init app");
			this.textProcessor = new TextProcessor(this);
			this.parser = new Parser(this);
			this.parser.on('open', function(){ 

			//	console.log("open"); 
				that.textProcessor.hideGUI();
			});

			// set timeout ?
			$('#textNode').focus();
		}, 
		
		
		updateStatus: function() 
		{
			
		}
	};

	return App;
});