'use strict';

/**
 * Directive Module
 */
angular.module('imslpDirectives', [])

/**
 * scroll-more
 */
.directive('scrollMore', function($window) {
	return function(scope, elm, attr) {
		angular.element($window).bind('scroll', function(event) {
			console.log("event fired: " + event.type);
			if (elm[0].getBoundingClientRect().bottom === window.innerHeight) {
				// scope.$apply(attr.scrollMore);
			}
		});
	};
})

/**
 * Filter: replace
 */
.filter('replace', function() {
	return function(input, find, replacement, flag) {
		if (!input) return '';
		replacement = replacement || '';
		flag = flag || 'g';
		return input.replace(new RegExp(find, flag), replacement);
	};
})

;