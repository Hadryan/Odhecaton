var TestData = {
	SearchCtrl: {
		url: 'http://imslp.org/api.php?action=query&aplimit=50&apnamespace=14&apprefix=Bach&callback=JSON_CALLBACK&format=json&list=allpages',
		data: {
			query: {
				allpages: [
					{
						pageid: 1452,
						ns: 14,
						title: 'Category:Bach, Johann Sebastian'
					},
					{
						pageid: 4560,
						ns: 14,
						title: 'Category:Bach, Carl Philipp Emanuel'
					}
				]
			}
		}
	},
	CategoryCtrl: {
		url: 'http://imslp.org/api.php?action=query&callback=JSON_CALLBACK&cmlimit=20&format=json&list=categorymembers',
		data: {
			query: {
				categorymembers: [
					{
						pageid: 331070,
						ns: 0,
						title: 'Adagio in D minor, H.352 (Bach, Carl Philipp Emanuel)'
					},
					{
						pageid: 334433,
						ns: 0,
						title: 'Arietta con variazioni (Bach, Carl Philipp Emanuel)'
					}
				]
			}
		}
	}
};
