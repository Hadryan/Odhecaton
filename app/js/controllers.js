'use strict';

/**
 * Controller Module
 */
angular.module('imslpControllers', ['ngSanitize'])

/**
 * Nav Controller
 */
.controller('NavCtrl', ['$scope', '$location', '$mdSidenav', function($scope, $location, $mdSidenav){
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
		{title: 'Browse People', path: 'wiki/Category:People'},
		{title: 'Browse Genres', path: 'wiki/Category:Instrument_Composition_Lists'},
		{title: 'New Additions', path: 'page/137667'},
		{title: 'Random Page', path: ''}
	];

}])

/**
 * Search Controller
 */
.controller('SearchCtrl', ['$scope', '$location', 'Imslp', function($scope, $location, Imslp) {

	$scope.items = null;

	$scope.searchTextChange = function(text) {
		$scope.items = Imslp.allpages({apprefix: text});
	};
	$scope.selectedItemChange = function(item) {
		// localStorage.setItem('imslp', JSON.stringify(item));
		$location.path('category/' + item.pageid);
	};

}])

/**
 * List Controller
 */
.controller('ListCtrl', function($scope, $location, $routeParams, Imslp) {

	$scope.title = '';
	$scope.items = [];
	$scope.params = {};

	if ($routeParams.pageId) {
		$scope.params.cmpageid = $routeParams.pageId;
	}
	if ($routeParams.categoryTitle) {
		$scope.params.cmtitle = 'Category' + $routeParams.categoryTitle;
		$scope.title = $routeParams.categoryTitle.substr(1).replace(/_/g, ' ');
	}

	$scope.next = function() {
		Imslp.categorymembers($scope.params, function(data) {
			$scope.params.cmcontinue = data['query-continue'] ? data['query-continue'].categorymembers.cmcontinue : '';
			if (data.query) {
				angular.forEach(data.query.categorymembers, function(item) {
					$scope.items.push(item);
				});
			}
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
 * HTML Controller
 */
.controller('HtmlCtrl', ['$scope', '$routeParams', '$sce', '$location', 'Imslp', function($scope, $routeParams, $sce, $location, Imslp) {

	$scope.page = Imslp.parse({pageid: $routeParams.pageId}, function(data) {
		$scope.html = $sce.trustAsHtml(data.text['*'].replace(/src="\//g, 'src="http://imslp.org/'));
	});

	$scope.$on('$locationChangeStart', function(event) {
		var path = $location.path();
		if (path.indexOf('/wiki') === 0 &&
			path.indexOf('/wiki/Category:') === -1) {
			window.open('http://imslp.org' + path);
			event.preventDefault();
		}
	});

}])
;
