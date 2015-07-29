'use strict';

describe('ImslpCtrl', function() {

	beforeEach(module('imslpApp'));

	it('should create allpages model', inject(function($controller) {
		var scope = {};
		var ctrl = $controller('ImslpCtrl', {$scope:scope});

		expect(scope.allpages.length).toBeGreaterThan(0);
	}));

});
