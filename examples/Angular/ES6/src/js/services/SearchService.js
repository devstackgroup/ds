import SearchItem from '../model/SearchItem';

export default class SearchService {
    /*@ngInject*/
    constructor($q) {
        this.$q = $q;
    }

    getItems(searchItem) {
        return this.$q.when(new SearchItem(searchItem));
    }
}
