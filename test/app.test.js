
var tester = {
	getText: function() {
		return rte.textProcessor.getText();
	},

	parse: function() {
		return rte.parser.flattenDom();
	}
};


suite('Rich Text Editor', function() {

	var assert = chai.assert,
	expect = chai.expect,
	should = chai.should(); // Note that should has to be execute

	var correctString = 'Lorem Ipsum'; 

 	test('Compiles', function() {
   		assert.ok(window.rte);
 	});

 	test('Fonts loaded', function() {
   		assert.ok(window.FONT_LISTING);
 	});


 	test('entered text', function() {
			
		assert.equal(tester.getText(), correctString);
	});

	test('parsed', function() {
		assert.ok(tester.parse());
	})
});







