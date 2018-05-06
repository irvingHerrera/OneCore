(() => {
    'use strict';

    angular
        .module('app')
        .service('$accountService', account);

    account.$inject = ['$location', '$serviceFactory', '$http'];

    function account($location, $serviceFactory, $http) {
        var factory = $serviceFactory.create("$accountService");
        var baseUrl = "/Account/";

        this.login = (model) => {
            return $http({
                method: "get",
                params: model,
                url: baseUrl + "LoginUser",
            });
        };

        this.registry = (model) => {
            return $http({
                method: "get",
                params: model,
                url: baseUrl + "Registry",
            });
        };

    };

})();