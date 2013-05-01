define(['config'], function(config) {

	var app;
	var newLine = true;
	var storedHTML;
	var idPrefix = "nodeName"
	var currID = 1;
	
	// 7 is a magic number .. found by experimenting.
	var newLineBuffer = 15;
	var showTrace = true;
	var LOG_EACH_NODE = false;

	function Parser(_app){
		app = _app;
	}

	_.extend(Parser.prototype, Backbone.Events);

	

	function _walk_the_DOM(node, func){
		func(node);
		node = node.firstChild;
		while(node) {
			_walk_the_DOM(node, func);
			node = node.nextSibling;
		}
	}
	

	function _getSelectionHtml() {
		var html = "";
		if (typeof window.getSelection != "undefined") {
			var sel = window.getSelection();
			if(showTrace) console.info(sel);
			if (sel.rangeCount) {
				var container = document.createElement("div");
				for (var i = 0, len = sel.rangeCount; i < len; ++i) {
					container.appendChild(sel.getRangeAt(i).cloneContents());
				}
				//console.log("container found");
				//return container;
				html = container.innerHTML;
			}
		} else if (typeof document.selection != "undefined") {
			if (document.selection.type == "Text") {
				html = document.selection.createRange().htmlText;
			}	
		}
		return html; 
	}



	Parser.prototype.flattenDom = function(){




		var self = this; 
		self.trigger('open');
		// store original html before adding any elements 
		// for printing to SVG

		_storeHTML();

		// wrap each word in a span
		// iterate through spans 
		// detect newline, add newline

		//wrap all text nodes in gs class span
		$('#textBox *').contents().filter(function() { 
    		return (this.nodeType == 3) && this.nodeValue.match(/\S/); 
		}).wrap("<span class=\"gs\" />");

		// get all gs span nodes 
		$('.gs').each(function() {		
			// break word at dash
			

			// wrap all words and spaces in a span width class word.
	//		console.log( "1: " + $(this).html() );
			$(this).html("<span class=\"word\">" + $(this).text().replace(/ /g," </span><span class=\"word\">").replace(/\-/g,"</span><span class=\"word\">-</span><span class=\"word\">")  + "</span>");
	//		console.log( "2: " + $(this).html() );
		});

		var entered = $('#textBoxInner').html();
		//console.log(entered);

		//console.log("storedHTML = " + storedHTML);
		

		// clear previous contents
		$("#mySVG").empty();

		_addBkgd();

		if (showTrace){
			// add starting text node
			console.info("");
			console.info("");
			console.info("");
			console.info("- - - - - - - - - - - - - - - - - - - - - - - - ");
			console.info("FLATTENED DOM");
			console.info("- - - - - - - - - - - - - - - - - - - - - - - - ");
		}
		// wrap text nodes (nodeType == 3) with spans
		
		
		//if (!document.compForm.switchMode.checked) {
			var propertiesObject = {};
			_walk_the_DOM(document.getElementById("textBox"), function(item){
				var propArray = ['color','line-height','font-family','font-size','text-decoration','letter-spacing'];
				var msg="";
				msg += item + "\n";
				// if in the final text node....
				if (!item.tagName) { 

					// recurse back to see if any parent nodes are underlined.
					// if so, then the text should be underlined.

					var $parents = $(item).parents().filter(function() {
			            return $(this).css('text-decoration') == 'underline';
			        });

			        if(showTrace)console.log("UNDERLINED PARENTS: " + $parents.length );

			        if ($parents.length > 0)
			        {
			         propertiesObject['text-decoration'] = "underline";
			         if (showTrace)console.log("underlining object");
			        }

				//	console.info("");
					msg += "\tparent nodeName: " + item.parentNode.nodeName;
					
					msg +=  "\n\ttext: ";
					msg += "\"";
					var nodeText = item.textContent ? item.textContent : item.innerText;
					msg += nodeText;
					msg += "\"";
					if(LOG_EACH_NODE && showTrace)console.info(msg);
				//	console.info("- - - - - - - - - - - - - - - - - - - - - - - - ");
					
					propertiesObject.text = nodeText;
					
					if (nodeText) _logProperties(propertiesObject);
				}
				else {
					inLeaf = false;
					msg += "\tnodeName: " + item.tagName;
					msg += "\n\tparent nodeName: " + item.parentNode.nodeName;
					msg += "\n\tnodeType: " + item.nodeType;
					if (item.id) msg += "\t\t id: " + item.id;
					msg += "\n\toffsetLeft: " + item.offsetLeft;
					msg += "\n\toffsetTop: " + item.offsetTop;
					msg += "\n\tchildren: " + item.childNodes.length;
					msg += "\n\tposition left: " + item.getBoundingClientRect().left;
					msg += "\n\tposition top: " + item.getBoundingClientRect().top;

					var borderWidth = parseInt(Number($('#textBox').css("border-left-width").replace("px","")), 10);
					var boxPadding = $('#textBox').innerHeight() - $('#textBox').height();


					propertiesObject.left = 

								$(item).offset().left
								- $('#textBox').offset().left
								
								//- parseInt(Number($('#textBox').css("border-width").replace("px","")), 10);
								//- borderWidth
								
								//- parseInt(Number($('#textBox').css("padding-left").replace("px","")),10);
								-11;
							//	console.log("border width is: " + borderWidth);
							//	console.log("boxPadding is " + boxPadding);
								/*
								item.getBoundingClientRect().left 
								- document.getElementById('textBox').getBoundingClientRect().left 
								- parseInt($('#textBox').css("border-width"), 10) 
								- parseInt($('#textBox').css("padding-left"), 10);
								*/


					propertiesObject.offsetLeft = $(item).offset().left;
					propertiesObject.TBtop = document.getElementById('textBox').getBoundingClientRect().top ;
					propertiesObject.TBoffsetTop = $('#textBox').offset().top ;
					propertiesObject.TBoffsetLeft = $('#textBox').offset().left ;
					propertiesObject.topBorder =  borderWidth;
					propertiesObject.compHeight = $('#textBox').innerHeight();
					propertiesObject.outerHeight = $('#textBox').outerHeight();
					propertiesObject.padding = boxPadding;
					propertiesObject.offsetTop = $(item).offset().top;
					//var lineHeightDigits = (propertiesObject['line-height'])? propertiesObject['line-height'].replace(/px/gi, '') : 0;
					// instead of item height.. adjust with baseline
					//console.log(parseInt($(item).css("font-size"), 10)	)
					var paddingAmt = parseInt($('#textBox').css("padding-top"), 10)
					if ($.browser.mozilla) paddingAmt = 10 * 2 + 3;
					if ($.browser.msie) paddingAmt = 10 ;
					propertiesObject.paddingAmt = paddingAmt;
					var computedTop = 
						// position of element relative to browser
						$(item).offset().top 
						// subtract the height of the textbox
						- $('#textBox').offset().top 
						// subtract border width 
						- borderWidth
						- paddingAmt
						+ parseInt($(item).css("font-size"), 10) * .97; // this ratio
						// varies from font to font so its an approximation of 
						// x-height to font-size
						;

					

					if (computedTop > propertiesObject.top + newLineBuffer) newLine = true;

					propertiesObject.top = computedTop;

					for ( var i=0; i < propArray.length; i ++){
						msg += "\n\t" + propArray[i] + ": " + window.getComputedStyle(item).getPropertyValue(propArray[i]);
						propertiesObject[propArray[i]] = window.getComputedStyle(item).getPropertyValue(propArray[i]);
					//	console.log(propArray[i] + " : " + window.getComputedStyle(item).getPropertyValue(propArray[i]));
					}


					// make an exception for underline. if an item's parent has text decoration underline then
					// the item should be underlined also. 
					if (window.getComputedStyle(item.parentNode).getPropertyValue('text-decoration') == 'underline')
					{
						propertiesObject['text-decoration'] = 'underline'
					}



					if (item.tagName == "BR" && showTrace){
						console.log("**************");
						console.log("**************");
						console.log("** new line **");
						console.log("**************");
						console.log("**************");
						newLine = true;
					}
					if(LOG_EACH_NODE && showTrace)console.info(msg);
				}
				
				
			});
			
		_restoreHTML();
		newLine = true;

		function _addTspanNode(properties){
	        

	    	

			// get absolute left and top position of textbox 
			// to remove buffer
			//var textBoxPos = $('#textBox').offset()

	    	//console.log("PROPERTIES ARE: " + properties['text']);

	    
	   
			newtxt = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
			newtxt.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space","preserve");
        	$newtxt = $(newtxt);
        	$newtxt.attr('x',properties['left']);
       	//	$newtxt.attr('y',properties['top']);
        	$newtxt.attr('font-size',properties['font-size']);
        	$newtxt.attr('font-family', properties['font-family']);
        	$newtxt.attr('text-decoration', properties['text-decoration']);
        	$newtxt.attr('letter-spacing', properties['letter-spacing']);
        	$newtxt.attr('line-height', properties['line-height']);
        	$newtxt.attr('alignment-baseline', 'auto');

        	if (properties['text-decoration'] == 'underline'){
       			$newtxt.attr('text-decoration-color', '10px');

       		}

        	// convert rgb to hex
        	var hex = _colorToHex(properties.color);
        //	console.log("hex: " + hex);
        	$newtxt.attr('fill', hex);

        	//var textNodeStub = document.getElementById('mySVG').childNodes.item(0);
        	var textNode = document.createTextNode(properties.text);
        	newtxt.appendChild(textNode);
        	var nodeName = idPrefix + currID; 
        	if(showTrace) console.log("node name = " + nodeName);
     	   	document.getElementById("mySVG").lastChild.appendChild(newtxt);

    	}

    	function _logProperties(properties){
			//if (properties.text !== ""){
				if(showTrace)
				{
					console.info("* * * * * * * * * * * * * *");
					console.info("Node Properties :"+ properties);
					for (var key in properties) {
						if (properties.hasOwnProperty(key)) {
							if (key == "text"){
								console.info(key + " -> \"" + properties[key] + "\"");
							}
							else {
								console.info(key + " -> " + properties[key]);
							}
						}
					}
				}
				
				//var tempNodeX = 10;
				if(newLine)
				{
					_addTextNode(properties);
					newLine = false;
				}
				_addTspanNode(properties);


				if(showTrace)
				{
					console.info("* * * * * * * * * * * * * *");
					console.info("---------------------------");
				}
			//}
		}
	};




    function _storeHTML(){
		storedHTML = $('#textNode').html();
    }

    function _restoreHTML(){
		$('#textNode').html(storedHTML);
    }

    function _colorToHex(color) {
		if (color.substr(0, 1) === '#') {
			return color;
		}
		var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

		var red = parseInt(digits[2],10);
		var green = parseInt(digits[3],10);
		var blue = parseInt(digits[4],10);

		var rgb = blue | (green << 8) | (red << 16);

		switch (rgb.toString(16).length) {
			case 2:
				rgb = "0000" + rgb.toString(16);
			break;
			case 4:
	            rgb = "00" + rgb.toString(16);
	            break;
	        default:
	            rgb = rgb.toString(16);
	    }
	    return digits[1] + '#' + rgb
	};

	function _getCurrentTextNode(){
		var idString = "textNode" + String(currID);
		return document.getElementById(idString);

	}

	function _addTextNode(properties){

		newtxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
		newtxt.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space","preserve");
        $newtxt = $(newtxt);
        $newtxt.attr('id', idPrefix + String(currID));
        $newtxt.attr('x',properties['left']);
       	$newtxt.attr('y',properties['top']);
       	$newtxt.attr('dominant-baseline','hanging');
       	$newtxt.attr('width', '560px');



        //var textNodeStub = document.getElementById('mySVG').childNodes.item(0);
        var textNode = document.createTextNode('');
        newtxt.appendChild(textNode);
        //console.log("* adding new text node  *");
     	document.getElementById("mySVG").appendChild(newtxt);

	}

	function _addBkgd(){
		var bkgdColor = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		//bkgdColor.setAttributeNS(null, "http://www.w3.org/XML/1998/namespace");
		$bkgdColor = $(bkgdColor);
		$bkgdColor.attr('width', '100%');
        $bkgdColor.attr('height', '100%');
        var bg = $("#textBox").css('backgroundColor');
       	if (bg) $bkgdColor.attr('fill',bg);
       	$("#mySVG").append(bkgdColor);
	}

    return Parser;

});