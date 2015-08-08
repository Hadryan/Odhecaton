'use strict';

describe('imslpDirectives', function() {

	describe('favorite', function() {
		var scope, element, template;
		var arrayStorage;

		beforeEach(module('imslpDirectives'));
		beforeEach(module('templates/favorite-directive.html'));
		beforeEach(module('ngMaterial'));
		beforeEach(module('MockStorage'));

		beforeEach(inject(function($rootScope, $compile, ArrayStorage) {
			scope = $rootScope.$new();
			scope.item = {title:'test-item'};
			element = angular.element('<favorite favitem="item"></favorite>');
			$compile(element)(scope);
			scope.$digest();
			arrayStorage = ArrayStorage;
		}));

		it('should add on click', function() {
			expect(arrayStorage.getAll().length).toBe(0);
			element[0].click();
			scope.$digest();
			expect(element.find('div').hasClass('selected')).toBe(true);
			expect(element.isolateScope().favitem.title).toBe('test-item');
			expect(arrayStorage.getAll().length).toBe(1);
		});

		it('should remove on second click', function() {
			// add item
			element[0].click();
			scope.$digest();
			expect(element.find('div').hasClass('selected')).toBe(true);
			expect(element.isolateScope().favitem.title).toBe('test-item');
			expect(arrayStorage.getAll().length).toBe(1);
			// remove item
			element[0].click();
			scope.$digest();
			expect(element.find('div').hasClass('selected')).not.toBe(true);
			expect(arrayStorage.getAll().length).toBe(0);
		});

		it('should not show star on non-favorite page', function() {
			expect(element.find('div').hasClass('selected')).toBe(false);
		});

		it('should show star on favorite page', function() {
			arrayStorage.add('favorites', {title:'test-item-2'});
			element.isolateScope().favitem = {title:'test-item-2'};
			scope.$digest();
			expect(element.find('div').hasClass('selected')).toBe(true);
		});

	});

});