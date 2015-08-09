'use strict';

/**
 * Directive Module
 */
angular.module('imslpDirectives', [])

/**
 * favorite
 */
.directive('favorite', ['$mdToast', 'ArrayStorage', function($mdToast, ArrayStorage) {
	return {
		restrict: 'E',
		templateUrl: 'templates/favorite-directive.html',
		scope: {
			favitem: '='
		},
		link: function($scope, element, attrs) {
			$scope.items = ArrayStorage.getAll('favorites');

			$scope.$watch('favitem', function(page) {
				if (page && ArrayStorage.getIndex('favorites', page) !== -1) {
					$scope.starSelect = 'selected';
				}
			});

			element.on('click', function(event){
				if ($scope.starSelect) {
					$scope.removeFavorite();
				} else {
					$scope.addFavorite();
				}
				event.stopPropagation();
			});

			$scope.addFavorite = function() {
				var page = $scope.favitem;
				$scope.starSelect = 'selected';
				ArrayStorage.add('favorites', page);
				$mdToast.show(
					$mdToast.simple()
					.content(page.title + ' added to favorites.')
					.position('top right')
					.hideDelay(2000)
				);
			};

			$scope.removeFavorite = function() {
				var page = $scope.favitem;
				$scope.starSelect = '';
				ArrayStorage.remove('favorites', page);
				$mdToast.show(
					$mdToast.simple()
					.content(page.title + ' removed from favorites.')
					.position('top right')
					.hideDelay(2000)
				);
			};

		},
	};
}]);