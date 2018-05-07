(() => {
    'use strict';

    angular
        .module('app')
        .service('$userService', user);

    user.$inject = ['$location', '$serviceFactory', '$http'];

    function user($location, $serviceFactory, $http) {
        var factory = $serviceFactory.create("$userService");
        var baseUrl = "/User/";

        this.getAll = () => {
            return $http({
                method: "get",
                url: baseUrl + "GetAll",
            });
        };

        this.update = (model) => {
            console.log(model);
            return $http({
                method: "post",
                params: model,
                url: baseUrl + "Update",
            });
        };

        this.get = (id) => {
            return $http({
                method: "post",
                params: { id: id },
                url: baseUrl + "GetUser",
            });
        };

        this.delete = (id) => {
            console.log(id);
            return $http({
                method: "post",
                params: { id: id },
                url: baseUrl + "Delete",
            });
        };
    };

})();