export default class SearchItem {

		constructor(searchItem) {
				this.searchItem = searchItem;
		}

		get items() {
				var items = ['Angular', 'ES6', 'ECMAScript 6'];
				for (var i = 0; i < items.length; i++) {
						if (items[i].toLowerCase().search(this.searchItem) === 0) {
								if (items[(i+1)%items.length].toLowerCase().search(this.searchItem) === 0) {
										return `${items[i]}, ${items[i+1]}`;
								} else {
										return items[i];
								}
						} else {
								continue;
						}
				}
			 	return 'Podana fraza nie została odnaleziona';
		}
}
