'use strict';

/**
 * App Module
 */
angular.module('imslpApp', [
	'ngMaterial',
	'ngRoute',
	'imslpControllers',
	'imslpServices',
	'imslpDirectives'
])

.config(function($mdThemingProvider, $routeProvider, $sceDelegateProvider, $locationProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('blue-grey')
		.accentPalette('amber');

	$locationProvider.html5Mode(true);

	$routeProvider
		.when('/category/:pageId', {
			templateUrl: 'partials/category-view.html'
		})
		.when('/page/:pageId', {
			templateUrl: 'partials/page-view.html'
		})
		.when('/wiki/Category:categoryTitle', {
			templateUrl: 'partials/wiki-view.html'
		})
		.otherwise({ redirectTo: '/' });

	$sceDelegateProvider.resourceUrlWhitelist([
		'self',
		'http://imslp.org'
	]);

});

