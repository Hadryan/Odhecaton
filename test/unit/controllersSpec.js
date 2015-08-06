'use strict';

describe('ImslpCtrl', function() {

	beforeEach(module('imslpApp'));

	describe('NavCtrl', function() {
		var scope, ctrl;

		beforeEach(inject(function($controller) {
			scope = {};
			ctrl = $controller('NavCtrl', {$scope:scope});
		}));


		it('should create menu', inject(function($controller) {
			expect(scope.menuItems.length).toBeGreaterThan(0);
		}));

	});

	describe('SearchCtrl', function() {
		var scope, ctrl, httpBackend;

		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
			httpBackend = _$httpBackend_;

			httpBackend.expect('JSONP', TestData.SearchCtrl.url).respond(TestData.SearchCtrl.data);

			scope = $rootScope.$new();
			scope.search = {};
			ctrl = $controller('SearchCtrl', {$scope: scope});
		}));

		it('SearchCtrl should return search results', inject(function($controller) {
			scope.searchTextChange('Bach');
			httpBackend.flush();
			expect(scope.search.items.length).toBeGreaterThan(0);
		}));
	});

	describe('CategoryCtrl', function() {
		var scope, ctrl, httpBackend;

		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
			httpBackend = _$httpBackend_;

			httpBackend.expect('JSONP', TestData.CategoryCtrl.url).respond(TestData.CategoryCtrl.data);

			scope = $rootScope.$new();
			ctrl = $controller('CategoryCtrl', {$scope: scope});
		}));

		it('CategoryCtrl should return search results', inject(function($controller) {
			httpBackend.flush();
			expect(scope.items.length).toBeGreaterThan(0);
		}));
	});



});
