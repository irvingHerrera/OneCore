(() => {
    'use strict';

    angular
        .module('app')
        .service('$userService', user);

    user.$inject = ['$location', '$serviceFactory', '$http'];

    function user($location, $serviceFactory, $http) {

    };

})();