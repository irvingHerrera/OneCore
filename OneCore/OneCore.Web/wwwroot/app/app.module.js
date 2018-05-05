(() => {

    'use strict';

    angular.module('app', [
        'jcs-autoValidate',
        'cp.ngConfirm',
    ]);

    var app = angular.module("app")
        .config([
            "$httpProvider", function ($httpProvider) {
                var xsrfToken = angular.element("#XsrfRequestToken");

                //se agrega la cabecera a todas las llamadas ajax con el servicio $http
                $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

                if (xsrfToken.length) {
                    $httpProvider.defaults.headers.common["RequestVerificationToken"] = xsrfToken.val();
                    angular.XsrfRequestToken = xsrfToken.val();
                }
            }
        ])
        .factory("http", ["$http", "$q", "$rootScope", function ($http, $q, $rootScope) {

            return function (option) {

                var promise = $q.defer();
                option.showErrorMsg = option.showErrorMsg || true;
                option.showSuccessMsg = option.showSuccessMsg || false;

                option.url = option.url;

                var httPromise = $http(option);

                httPromise.then(function (r, status, headers, config) {

                    //ejecuta la función callback done
                    if (typeof option.done === "function") {
                        option.done(r.data);
                    }

                    promise.resolve(r.data);
                })
                    .catch(function () {
                        console.log("Error catch");

                        //$rootScope.$confirm({
                        //    title: "Credicap",
                        //    type: 'blue',
                        //    confirm: true,
                        //    content: "Algo salió mal, por favor inténtelo mal tarde.",
                        //    ok: () => {

                        //    }
                        //});

                        promise.reject({ Error: true });
                    })
                    .finally(function () {

                    });
                return promise.promise;
            };

        }]);

})();