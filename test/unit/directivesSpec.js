'use strict';

describe('imslpDirectives', function() {

	describe('favorite', function() {
		var scope, element, template;

		beforeEach(module('imslpDirectives'));
		beforeEach(module('templates/favorite-directive.html'));
		beforeEach(module('ngMaterial'));
		beforeEach(module('MockStorage'));

		beforeEach(inject(function($rootScope, $compile) {
			scope = $rootScope.$new();
			scope.item = {title:'test-item'};
			element = angular.element('<favorite favitem="item"></favorite>');
			$compile(element)(scope);
			scope.$digest();
		}));

		it('should add on click', function() {
			element[0].click();
			scope.$digest();
			expect(element.find('div').hasClass('selected')).toBe(true);
			expect(element.isolateScope().favitem.title).toBe('test-item');
			expect(element.isolateScope().items.length).toBe(1);
		});

		it('should remove on second click', function() {
			// add item
			element[0].click();
			scope.$digest();
			expect(element.find('div').hasClass('selected')).toBe(true);
			expect(element.isolateScope().favitem.title).toBe('test-item');
			expect(element.isolateScope().items.length).toBe(1);
			// remove item
			element[0].click();
			scope.$digest();
			expect(element.find('div').hasClass('selected')).not.toBe(true);
			expect(element.isolateScope().items.length).toBe(0);
		});

	});

});