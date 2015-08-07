'use strict';

describe('imslpControllers', function() {

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

		afterEach(function() {
			httpBackend.verifyNoOutstandingExpectation();
			httpBackend.verifyNoOutstandingRequest();
		});

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

			httpBackend.when('JSONP', TestData.CategoryCtrl.url).respond(TestData.CategoryCtrl.data);

			scope = $rootScope.$new();
			ctrl = $controller('CategoryCtrl', {$scope: scope});
		}));

		afterEach(function() {
			httpBackend.verifyNoOutstandingExpectation();
			httpBackend.verifyNoOutstandingRequest();
		});

		it('should return search results', inject(function($controller) {
			httpBackend.expect('JSONP', TestData.CategoryCtrl.url);
			httpBackend.flush();
			expect(scope.items.length).toBeGreaterThan(0);
			expect(scope.params.cmcontinue).toBe('987');
			expect(scope.disabled).toBe(false);
		}));

		it('should return more results with query-continue', inject(function($controller) {
			httpBackend.expect('JSONP', TestData.CategoryCtrl.url);
			httpBackend.flush();
			expect(scope.items.length).toBeGreaterThan(0);
			expect(scope.params.cmcontinue).toBe('987');
			expect(scope.disabled).toBe(false);

			httpBackend.expect('JSONP', TestData.CategoryCtrl.urlcontinue).respond(TestData.CategoryCtrl.data);
			scope.next();
			httpBackend.flush();
			expect(scope.items.length).toBeGreaterThan(0);
		}));

		it('should not return more results without query-continue', inject(function($controller) {
			var continueData = TestData.CategoryCtrl.data;
			delete continueData['query-continue'];

			httpBackend.expect('JSONP', TestData.CategoryCtrl.url).respond(continueData);
			httpBackend.flush();
			expect(scope.items.length).toBeGreaterThan(0);
			expect(scope.params.cmcontinue).toBe('');
			expect(scope.disabled).toBe(true);

			scope.next();
			expect(scope.disabled).toBe(true);
		}));

	});


});
