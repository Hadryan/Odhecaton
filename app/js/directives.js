'use strict';

/**
 * Directive Module
 */
angular.module('imslpDirectives', [])

/**
 * favorite
 */
.directive('favorite', function($mdToast, ArrayStorage) {
	return {
		restrict: 'E',
		templateUrl: 'partials/favorite-directive.html',
		scope: {
			favitem: '='
		},
		link: function($scope, element, attrs) {
			$scope.items = ArrayStorage.getAll('favorites');

			$scope.$watch('favitem', function(page) {
				if (page && ArrayStorage.getIndex('favorites', page) != -1) {
					$scope.starSelect = 'selected';
				}
			});

			element.on('click', function(event){
				$scope.starSelect ? $scope.removeFavorite() : $scope.addFavorite();
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
			}

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
			}

		},
	};
})

/**
 * focus
 */
.directive('focus', function() {
	return {
		link: function(scope, element) {
			element[0].focus();
		}
	};
})

;