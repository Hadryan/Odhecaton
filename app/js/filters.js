'use strict';

/**
 * Directive Module
 */
angular.module('imslpFilters', [])

/**
 * Filter: replace
 */
.filter('replace', function() {
	return function(input, find, replacement, flag) {
		if (!input) {return;}
		replacement = replacement || '';
		return input.replace(new RegExp(find, flag), replacement);
	};
});