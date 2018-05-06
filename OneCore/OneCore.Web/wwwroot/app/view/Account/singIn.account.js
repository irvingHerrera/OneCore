(() => {
    'use strict';

    angular
        .module('app')
        .controller('singin-home', singin);

    singin.$inject = ['$scope', '$accountService'];

    function singin($scope, $accountService) {

        var vm = $scope;
        vm.formLogin = {};
        vm.modelLogin = {};
        vm.modelLogin.Email = '-';
        vm.modelLogin.Status = 1;
        vm.modelLogin.Gender = 1;


        vm.login = () => {
            $accountService.login(vm.modelLogin)
                .then((data) => {
                    if (data.data.Success) {
                        window.location.href = "/User/Index";
                    }
                    else {
                        vm.modelLogin.invalid = true;
                        vm.modelRegistry = {};
                        vm.formLogin.$setPristine();
                    }
                });
        };

    };

})();