'use strict';

angular.module('MockStorage', [])
.provider('ArrayStorage', function() {
	// this.storage = [];
	this.$get = function() {
		return {
			storage: [],
			getAll: function(key) {
				return this.storage;
			},
			getIndex: function(key, item) {
				var items = this.getAll(key);
				for (var i = 0; i < items.length; i++) {
					if (item == items[i]) {
						return i;
					}
				}
				return -1;
			},
			add: function(key, item) {
				if (this.getIndex(key, item) == -1) {
					var items = this.getAll(key);
					items.push(item);
					this.storage = items;
				}
			},
			remove: function(key, item) {
				var items = this.getAll(key);
				var index = this.getIndex(key, item);
				items.splice(index, 1);
				this.storage = items;
			}
		}
	}
});
