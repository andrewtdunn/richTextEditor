define(['config'], function(config) {

/*jshint smarttabs:true */

	var app;
	var newLine = false;
	var storedHTML;
	var prevRangyCSSApplier;
	var cleanedPaste;
	var storedAlign;


	function TextProcessor(_app){
		app = _app;
	}

	_.extend(TextProcessor.prototype, Backbone.Events);

	TextProcessor.prototype.doCommand = function(commandName, value)
	{
		console.log("executing command " + commandName);
		console.log("executing command " + value);
		document.execCommand(commandName, false, value);
		
		// only in Safari remove "Apple-style-span"
		$(".Apple-style-span").removeClass("Apple-style-span");
	};

	TextProcessor.prototype.setBgColor = function(value)
	{
		/*
		var cssApplier = rangy.createCssClassApplier("lineHeight-" + value, {normalize: true});
		cssApplier.toggleSelection();
		*/
		console.log("setting BG color: " + value);
		document.getElementById("outerDiv").style.backgroundColor = value;
		document.getElementById("textBox").style.backgroundColor = value;
	};

	/**
	 *
	 */
	TextProcessor.prototype.adjustVertAlign = function(value)
	{
	//	console.log("TextProcessor::adjustVertAlign value=" + value);
		$('#textBoxInner').css('vertical-align',value);
	};


	/*
	* wrap selected text in a span
	* add fontsize style
	*/

	// this is not correct ... should use rangd.....

	TextProcessor.prototype.setFontSize = function(value)
	{
		document.execCommand("fontsize", false, 2);
		var fontElements = document.getElementsByTagName("font");
    	for (var i = 0, len = fontElements.length; i < len; ++i) {
        	if (fontElements[i].size == "2") {
            	fontElements[i].removeAttribute("size");
            	fontElements[i].style.fontSize = value+"px";
        	}
    	}

		// only in Safari remove "Apple-style-span"
		$(".Apple-style-span").removeClass("Apple-style-span");
	};

	TextProcessor.prototype.getSelectedText = function(){
		console.log("getSelectedText");
		var colour = document.queryCommandValue("ForeColor");
		var fontSize = document.queryCommandValue("FontSize");
		console.log("color: " + colour);
		console.log("fontSize: " + fontSize);
	};

	/*
	* wrap selected text in a span
	* add fontsize style
	*/

	TextProcessor.prototype.setLetterSpacing = function(value)
	{
		applyClass("letterSpacing", value);
	};


	TextProcessor.prototype.setLineHeight = function(value)
	{
		applyClass("lineHeight", value * 100);
	};

	function applyClass(name, value)
	{
		if(prevRangyCSSApplier) prevRangyCSSApplier.undoToSelection();
		var cssApplier = rangy.createCssClassApplier(name + "-" + value, {normalize: true});
		prevRangyCSSApplier = cssApplier;
		cssApplier.toggleSelection();
	}

	TextProcessor.prototype.setDocMode = function(bToSource){
		//console.log("rte.setDocMode: " + bToSource);
		var oDoc = document.getElementById("textBox");
		console.log("textBox ref = " + oDoc);
		var oContent;
		if (bToSource){
			oContent = document.createTextNode(oDoc.innerHTML);
			oDoc.innerHTML = "";
			var oPre = document.createElement("pre");
			//oPre.style.backgroundColor = "#FFFF00";
			oDoc.contentEditable = false;
			oPre.id = "sourceText";
			oPre.contentEditable = true;
			oPre.appendChild(oContent);
			oDoc.appendChild(oPre);
		}
		else
		{
			if (document.all){
				oDoc.innerHTML = oDoc.innerText;
			}
			else{
				oContent = document.createRange();
				oContent.selectNodeContents(oDoc.firstChild);
				oDoc.innerHTML = oContent.toString();
			}
			oDoc.contentEditable = true;
		}
		oDoc.focus();
	};


    TextProcessor.prototype.hideGUI = function() {
	//	document.getElementById("textBox").style.cursor="pointer";

		$("#textBox").css('visibility','hidden');
		$("#mySVG").css('display','inline');

		$("#toolBar1,#toolBar2,#renderBtns").each(function(){
			$(this).animate({opacity:0}, 150, function() {
				// Animation complete.
				$(this).css('visibility','hidden');
				$('#outerDiv').css('cursor','pointer');
			}); 
		});
        
        $("#outerDiv").click(function(){
			// hide svg and background black
			_showGUI();
		});

    };

    function _showGUI() {

		$("#mySVG").empty();
		$("#mySVG").css('background-color', '');
		$("#mySVG").css('display','none');
		$("#textBox").css('visibility','visible');
		$("#textNode").focus();
		$('#textBox').css('cursor','auto');
		$("#toolBar1,#toolBar2,#renderBtns").each(function(){
			$(this).animate({opacity:1}, 150, function() {
				// Animation complete.
				$(this).css('visibility','visible');
			});
		});
    }


	return TextProcessor;
});