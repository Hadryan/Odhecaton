'use strict';

describe('imslpDirectives', function() {

	describe('favorite', function() {
		var store = {};
		var page = {title:'testItem'};
		var scope, element, template;

		beforeEach(module('imslpDirectives'));
		beforeEach(module('templates/favorite-directive.html'));
		beforeEach(module('ngMaterial'));
		beforeEach(module('MockStorage'));

		beforeEach(inject(function($rootScope, $compile) {
			scope = $rootScope.$new();
			scope.page = {title:'test'};
			element = angular.element('<favorite favitem="page"></favorite>');
			$compile(element)(scope);
			scope.$digest();
		}));

		it('should add on click', function() {
			element[0].click();
			scope.$digest();
			expect(element.find('div').hasClass('selected')).toBe(true);
		});

		it('should remove on second click', function() {
			element[0].click();
			scope.$digest();
			expect(element.find('div').hasClass('selected')).toBe(true);
			element[0].click();
			scope.$digest();
			expect(element.find('div').hasClass('selected')).not.toBe(true);
		});

	});

});