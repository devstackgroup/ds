export default class MainController {
    /*@ngInject*/
    constructor(SearchService) {
        this.searchService = SearchService;
    }

    search () {
        this.searchService
            .getItems(this.searchItem)
            .then(response => {
                this.items = response.items;
            });
    }
}
