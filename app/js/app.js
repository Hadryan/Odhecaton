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

.config(function($mdThemingProvider, $routeProvider, $sceDelegateProvider, $locationProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('blue-grey')
		.accentPalette('orange');

	$locationProvider.html5Mode(true);

	$routeProvider
		.when('/', {
			templateUrl: 'partials/main-view.html'
		})
		.when('/category/:pageId', {
			templateUrl: 'partials/category-view.html'
		})
		.when('/page/:pageId', {
			templateUrl: 'partials/page-view.html'
		})
		.when('/wiki/Category:categoryTitle', {
			templateUrl: 'partials/list-view.html'
		})
		.when('/wiki/File:pageTitle', {
			templateUrl: 'partials/file-view.html',
		})
		.when('/wiki/:pageTitle', {
			templateUrl: 'partials/page-view.html'
		})
		.when('/new-additions', {
			templateUrl: 'partials/new-additions-view.html'
		})
		.when('/favorites', {
			templateUrl: 'partials/favorites-view.html'
		})
		.when('/search', {
			templateUrl: 'partials/search-view.html'
		})
		.when('/random', {
			template: '',
			controller: 'RandomCtrl'
		})
		.otherwise({ redirectTo: '/' });
		//TODO: make 404 page



});

