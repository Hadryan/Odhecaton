'use strict';

/**
 * Services Module
 */
angular.module('imslpServices', ['ngResource'])

.factory('Imslp', ['$resource', function($resource) {

	const LIMIT = 50;
	const CATEGORY = 14;
	const IMSLP = 4;

	return $resource('http://imslp.org/api.php', {
		callback:'JSON_CALLBACK',
		format: 'json',
		action: 'query'
		}, {
		// http://imslp.org/api.php?format=json&action=query&list=allpages&apnamespace=14&apprefix=
		allpages: {
			method: 'JSONP',
			cache: true,
			params: {
				list: 'allpages',
				apnamespace: CATEGORY,
				aplimit: LIMIT,
				// apprefix: ''
			},
			isArray: true,
			transformResponse: function(data) {
				return data.query.allpages || [];
			}
		},
		// http://imslp.org/api.php?format=json&action=query&list=categorymembers&cmpageid=4560
		categorymembers: {
			method: 'JSONP',
			cache: true,
			params: {
				list: 'categorymembers',
				cmlimit: LIMIT,
				// cmpageid: ''
				// cmtitle: ''
			},
			// isArray: true,
			// transformResponse: function(data) {
			// 	return data.query.categorymembers || [];
			// }
		},
		// http://imslp.org/api.php?format=json&action=parse&pageid=
		parse: {
			method: 'JSONP',
			cache: false,
			params: {
				action: 'parse',
				// pageid: ''
			},
			transformResponse: function(data) {
				return data.parse || [];
			}
		},

	});

}]);
