'use strict';

/**
 * Services Module
 */
angular.module('imslpServices', ['ngResource'])

.factory('ArrayStorage', function() {
	return {
		getAll: function(key) {
			return angular.fromJson(localStorage.getItem(key)) || [];
		},

		getIndex: function(key, item) {
			var items = this.getAll(key);
			for (var i = 0; i < items.length; i++) {
				if (angular.equals(item, items[i])) {
					return i;
				}
			}
			return -1;
		},

		add: function(key, item) {
			if (this.getIndex(key, item) === -1) {
				var items = this.getAll(key);
				items.push(item);
				localStorage.setItem(key, angular.toJson(items));
			}
		},
		remove: function(key, item) {
			var items = this.getAll(key);
			var index = this.getIndex(key, item);
			items.splice(index, 1);
			localStorage.setItem(key, angular.toJson(items));
		}
	};
})


.factory('Imslp', ['$resource', function($resource) {
	return $resource('http://imslp.org/api.php', {
		callback:'JSON_CALLBACK',
		format: 'json',
		}, {
		// http://imslp.org/api.php?format=json&action=query&list=allpages&apnamespace=14&apprefix=
		allpages: {
			method: 'JSONP',
			cache: true,
			params: {
				action: 'query',
				list: 'allpages',
				apnamespace: 14,
				aplimit: 50
			},
			isArray: true,
			transformResponse: function(data) {
				return data.query.allpages || [];
			}
		},
		// http://imslp.org/api.php?format=json&action=query&list=random&rnnamespace=0&rnlimit=1
		random: {
			method: 'JSONP',
			cache: false,
			params: {
				action: 'query',
				list: 'random'
			}
		},
		// http://imslp.org/api.php?format=json&action=query&list=categorymembers&cmpageid=4560
		// http://imslp.org/api.php?format=json&action=query&list=recentchanges&rcnamespace=0
		// http://imslp.org/api.php?format=json&action=query&prop=imageinfo&iiprop=url&iiurlwidth=300&indexpageids=&titles=
		query: {
			method: 'JSONP',
			cache: true,
			params: {
				action: 'query'
			}
		},
		// http://imslp.org/api.php?format=json&action=parse&pageid=
		parse: {
			method: 'JSONP',
			cache: false,
			params: {
				action: 'parse',
			}
		}
	});

}]);
