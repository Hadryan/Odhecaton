'use strict';

/**
 * App Module
 */
angular.module('imslpApp', [
	'ngMaterial',
	'ngRoute',
	'imslpControllers',
	'imslpServices',
	'imslpFilters',
	'imslpDirectives'
])

.config(['$mdThemingProvider', '$routeProvider', '$locationProvider', '$compileProvider', function($mdThemingProvider, $routeProvider, $locationProvider, $compileProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('blue-grey')
		.accentPalette('orange');

	$locationProvider.html5Mode(true);

	$compileProvider.debugInfoEnabled(true);

	$routeProvider
		.when('/', {
			templateUrl: 'templates/main-view.html'
		})
		.when('/category/:pageId', {
			templateUrl: 'templates/category-view.html'
		})
		.when('/page/:pageId', {
			templateUrl: 'templates/page-view.html'
		})
		.when('/wiki/Category:categoryTitle', {
			templateUrl: 'templates/list-view.html'
		})
		.when('/wiki/File:pageTitle', {
			templateUrl: 'templates/file-view.html',
		})
		.when('/wiki/:pageTitle', {
			templateUrl: 'templates/page-view.html'
		})
		.when('/new-additions', {
			templateUrl: 'templates/new-additions-view.html'
		})
		.when('/favorites', {
			templateUrl: 'templates/favorites-view.html'
		})
		.when('/search', {
			templateUrl: 'templates/search-view.html'
		})
		.when('/random', {
			template: '',
			controller: 'RandomCtrl'
		})
		.otherwise({ redirectTo: '/' });

}]);

