'use strict';

/**
 * Controller Module
 */
angular.module('imslpControllers', [
	'ngSanitize',
	'ngAnimate',
	'ngMaterial',
	'infinite-scroll',
	'angular-loading-bar'
])

/**
 * Nav Controller
 */
.controller('NavCtrl', function($scope, $location, $mdSidenav, $cacheFactory){
	$scope.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};
	$scope.nav = function(index) {
		$location.path($scope.menuItems[index].path);
		$mdSidenav('left').close();
	};
	$scope.menuItems = [
		{title: 'Main Page', path: '/'},
		{title: 'Browse Composers', path: 'wiki/Category:Composers'},
		{title: 'Browse Genres', path: 'wiki/Category:Instrument_Composition_Lists'},
		{title: 'New Additions', path: 'new-additions'},
		{title: 'Random Page', path: 'random'},
		{title: 'Favorites', path: 'favorites'}
	];

	$scope.search = {};
})

/**
 * Search Controller
 */
.controller('SearchCtrl', function($scope, $location, $timeout, Imslp, ArrayStorage) {

	$scope.searchFocus = function() {
		if (!$scope.search.active) {
			$scope.search.active = true;
			$scope.search.previous = $location.path();
			$location.path('search');
		}
	};
	$scope.searchClose = function() {
		$scope.search.text = '';
		$scope.search.items = [];
		$scope.search.active = false;
		$location.path($scope.search.previous);
	};
	$scope.searchTextChange = function(text) {
		if (text.length < 1) return;
		$scope.search.items = Imslp.allpages({apprefix: text});
	};
	$scope.search.itemSelected = function(index) {
		var item = $scope.search.items[index];
		if (!item) return;
		$scope.search.text = '';
		$scope.search.active = false;
		ArrayStorage.add('recent', item);
		$location.path('category/' + item.pageid);
	};
})

/**
 * Category Controller
 */
.controller('CategoryCtrl', function($scope, $location, $routeParams, Imslp) {

	$scope.items = [];
	$scope.disabled = false;
	$scope.params = {
		list: 'categorymembers',
		cmlimit: 20
	};

	if ($routeParams.pageId) {
		$scope.params.cmpageid = $routeParams.pageId;
	}

	$scope.next = function() {
		if ($scope.disabled) return;
		$scope.disabled = true;

		Imslp.query($scope.params, function(data) {
			$scope.params.cmcontinue = data['query-continue'] ? data['query-continue'].categorymembers.cmcontinue : '';
			if (data.query) {
				angular.forEach(data.query.categorymembers, function(item) {
					$scope.items.push(item);
				});
			}
			$scope.disabled = $scope.params.cmcontinue.length === 0;
		});
	};
	$scope.next();

	$scope.page = function(index) {
		$location.path('page/' + $scope.items[index].pageid);
	};
	$scope.category = function(index) {
		$location.path('category/' + $scope.items[index].pageid);
	};
})

/**
 * List Controller
 */
.controller('ListCtrl', function($scope, $location, $routeParams, Imslp) {

	if (!$routeParams.categoryTitle) return;

	$scope.tabs = [0];
	for (var i = 65; i < 91; i++) {
		$scope.tabs.push(String.fromCharCode(i));
	}

	$scope.title = $routeParams.categoryTitle.replace(/[:_]/g, ' ').trim();
	$scope.items = [];
	$scope.params = {};
	$scope.disabled = false;

	$scope.selected = function(index) {
		$scope.params = {
			list: 'categorymembers',
			cmlimit: 20,
			cmprop: 'title|ids|sortkey',
			cmstartsortkey: $scope.tabs[index],
			cmtitle: 'Category' + $routeParams.categoryTitle
		};
		$scope.items = [];
		$scope.next();
	};

	$scope.next = function() {
		if ($scope.disabled) return;
		$scope.disabled = true;

		Imslp.query($scope.params, function(data) {
			$scope.params.cmcontinue = data['query-continue'] ? data['query-continue'].categorymembers.cmcontinue : '';
			if (data.query) {
				angular.forEach(data.query.categorymembers, function(item) {
					$scope.items.push(item);
				});
			}
			$scope.disabled = $scope.params.cmcontinue.length === 0;
		});
	};

	$scope.category = function(index) {
		$location.path('category/' + $scope.items[index].pageid);
	};
})

/**
 * NewAdditions Controller
 */
.controller('NewAdditionsCtrl', function($scope, $location, $routeParams, Imslp) {

	$scope.title = 'New Additions';
	$scope.disabled = false;
	$scope.items = [];
	$scope.params = {
		list: 'recentchanges',
		rcnamespace: 0,
		rclimit: 20
	};

	$scope.next = function() {
		if ($scope.disabled) return;
		$scope.disabled = true;

		Imslp.query($scope.params, function(data) {
			$scope.params.rcstart = data['query-continue'] ? data['query-continue'].recentchanges.rcstart : '';
			if (data.query) {
				angular.forEach(data.query.recentchanges, function(item) {
					var dup = false;
					for (var i = 0; i < $scope.items.length; i++) {
						if (item.pageid == $scope.items[i].pageid) {
							dup = true;
							break;
						}
					}
					if (!dup) {
						$scope.items.push(item);
					}
				});
			}
			$scope.disabled = $scope.params.rcstart.length === 0;
		});
	};
	$scope.next();

	$scope.page = function(index) {
		$location.path('page/' + $scope.items[index].pageid);
	};
})

/**
 * Random Controller
 */
.controller('RandomCtrl', function($scope, $routeParams, $location, Imslp) {

	Imslp.random({rnnamespace:0, rnlimit:1}, function(data) {
		if (data.query) {
			$location.path('page/' + data.query.random[0].id);
		}
	});
})

/**
 * File Controller
 */
.controller('FileCtrl', function($scope, $routeParams, $location, Imslp) {

	$scope.params = {
		prop: 'imageinfo',
		iiprop: 'url',
		iiurlwidth: 600,
		indexpageids: true
	};
	if ($routeParams.pageTitle) {
		$scope.params.titles = 'File' + $routeParams.pageTitle;
	}

	Imslp.query($scope.params, function(data) {
		if (data.query) {
			$scope.pageid = data.query.pageids[0];
			$scope.thumburl = data.query.pages[$scope.pageid].imageinfo[0].thumburl;
			$scope.url = data.query.pages[$scope.pageid].imageinfo[0].url;
		}
	});
})

/**
 * Favorites Controller
 */
.controller('FavoritesCtrl', function($scope, $routeParams, $location, $mdToast, ArrayStorage) {

	$scope.items = ArrayStorage.getAll('favorites');

	$scope.page = function(index) {
		$location.path('page/' + $scope.items[index].pageid);
	};

})

/**
 * Recent Searches Controller
 */
.controller('RecentCtrl', function($scope, $routeParams, $location, ArrayStorage) {
	$scope.items = ArrayStorage.getAll('recent');
})

/**
 * Featured Controller
 */
.controller('FeaturedCtrl', function($scope, $routeParams, $location, Imslp) {

	$scope.featured = angular.fromJson(sessionStorage.getItem('featured'));
	if ($scope.featured) {
		return;
	}

	$scope.params = {};
	$scope.random = [];

	Imslp.random({rnnamespace:14, rnlimit:10}, function(data) {
		if (data.query) {
			$scope.random = data.query.random;
			$scope.getPage(0);
		}
	});

	$scope.getPage = function(retry) {
		$scope.params = {pageid: $scope.random[retry].id, prop: 'images|text'};
		Imslp.parse($scope.params, function(data) {
			if (data.parse.images.length) {
				if (data.parse.images[0].indexOf('Nocomposerphotoavailable') === -1) {
					var html = angular.element(data.parse.text['*']);
					$scope.featured = {
						pageid: $scope.params.pageid,
						title: html.find('.cp_firsth').html(),
						image: html.find('.cp_img').html().replace(/src="\//g, 'src="http://imslp.org/')
					};
					sessionStorage.setItem('featured', angular.toJson($scope.featured));
					return;
				}
			}
			retry++;
			if (retry < $scope.random.length) {
				$scope.getPage(retry);
			}
		});
	};
})

/**
 * HTML Controller
 */
.controller('HtmlCtrl', function($scope, $routeParams, $sce, $location, Imslp) {

	$scope.params = {};
	$scope.html = '';
	$scope.title = '';

	if ($routeParams.pageId) {
		$scope.params.pageid = $routeParams.pageId;
	}
	if ($routeParams.pageTitle) {
		$scope.params.page = $routeParams.pageTitle;
	}

	Imslp.parse($scope.params, function(data) {
		if (data.parse) {
			$scope.title = data.parse.title,
			$scope.html = $sce.trustAsHtml(data.parse.text['*'].replace(/src="\//g, 'src="http://imslp.org/'));
		}
	});

	$scope.$on('$locationChangeStart', function(event) {
		var path = $location.path();
		if (path.indexOf('/wiki/Special:ImagefromIndex') === 0) {
			window.open('http://imslp.org' + path);
			event.preventDefault();
		}
	});

});
