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
		if (!input) return '';
		replacement = replacement || '';
		flag = flag || 'g';
		return input.replace(new RegExp(find, flag), replacement);
	};
})

/**
 * Filter: unique
 */
.filter('unique', function () {
	// https://github.com/angular-ui/angular-ui-OLDREPO/blob/master/modules/filters/unique/unique.js
	return function (items, filterOn, one) {

		if (filterOn === false) {
			return items;
		}

		if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
			var hashCheck = {}, newItems = [];

			var extractValueToCompare = function (item) {
				if (angular.isObject(item) && angular.isString(filterOn)) {
					return item[filterOn];
				} else {
					return item;
				}
			};

			angular.forEach(items, function (item) {
				var valueToCheck, isDuplicate = false;

				for (var i = 0; i < newItems.length; i++) {
					if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					newItems.push(item);
				}

			});
			items = newItems;
		}
		return items;
	};
})

;