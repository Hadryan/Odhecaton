'use strict';

describe('imslpFilters', function() {

	beforeEach(module('imslpApp'));

	describe('replace', function() {
		it('should replace text first instance', inject(function(replaceFilter) {
			expect(replaceFilter('text (replace this) (not this)', '\\([^)]+\\)', 'new')).toBe('text new (not this)');
		}));
		it('should replace text globally', inject(function(replaceFilter) {
			expect(replaceFilter('text (replace this) (not this)', '\\([^)]+\\)', 'new', 'g')).toBe('text new new');
		}));

	});

});