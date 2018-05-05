(() => {
    'use strict';

    angular
        .module('app')
        .service('$accountService', account);

    account.$inject = ['$location', '$serviceFactory', '$http'];

    function account($location, $serviceFactory, $http) {

    };

})();