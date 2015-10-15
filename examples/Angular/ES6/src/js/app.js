import MainController from './controllers/MainController';
import SearchService from './services/SearchService';

angular
    .module('ES6app', [])
    .controller('MainController', MainController)
    .service('SearchService', SearchService);
