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

		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
			var scope, ctrl, $httpBackend, url;
			$httpBackend = _$httpBackend_;
			url = 'http://imslp.org/api.php?format=json&action=query&list=allpages&apnamespace=14&aplimit=10&apprefix=Bach';

			$httpBackend.expectGET(url).respond([
				{name: 'Bach, Carl Philipp Emanuel', pageid: 123},
				{name: 'Bach, Johann Sebastian', pageid: 456}
			]);

			scope = $rootScope.$new();
			ctrl = $controller('SearchCtrl', {$scope: scope});
		}));

		it('SearchCtrl should return search results', inject(function($controller) {
			// scope.searchTextChange('Bach');
			$httpBackend.flush();
			expect(scope.items.length).toBeGreaterThan(0);
		}));
	});

});
