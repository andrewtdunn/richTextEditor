requirejs.config({

	baseUrl: 'js',

	paths: {
		text: 'lib/text',
		jquery: 'lib/jquery.min',
		spectrum : 'lib/spectrum',
		equalHeights: 'lib/jquery.equalHeights',
		rangy: 'lib/rangy-core',
		cssclassapplier: 'lib/rangy-cssclassapplier',
		cssselectionsaverestore: 'lib/rangy-selectionsaverestore',
		fonts: 'http://fonts.mypublisher.com/apollo-webclient/fonts'
	},

	shim: {

		fonts: {
			exports: 'fonts'
		},

		equalHeights: {
            exports: "$",
            deps: ['jquery']
        },
		
		cssselectionsaverestore: {
			deps: ['cssclassapplier','rangy'],
			exports: 'rangy'
		},


		'lib/backbone-min': {
			deps: ['lib/underscore-min','jquery'],
			exports: 'Backbone'
		},


		spectrum: {
			deps: ['jquery'],
			exports: 'spectrum'
		},

		'app': {
			deps: ['lib/underscore-min', 'lib/backbone-min','spectrum','equalHeights','rangy', 'fonts']
		}
	}

});

require(['app'],

function(App) {
	window.rte = new App();
});