(() => {
    'use strict';

    angular
        .module('app')
        .controller('singup-home', singup);

    singup.$inject = ['$scope', '$accountService'];

    function singup($scope, $accountService) {

        var vm = $scope;
        vm.modelRegistry = {}

        vm.registry = () => {
            console.log("vm.modelRegistry", vm.modelRegistry);
            $accountService.registry(vm.modelRegistry)
                .then((data) => {
                    console.log(data.data);
                    if (data.data.Success) {
                        vm.$confirm({
                            title: "Registro OneCore",
                            type: 'blue',
                            confirm: true,
                            content: data.data.Message,
                            ok: () => {
                                window.location.href = "/Account/Login";
                            }
                        });
                    }
                    else {
                        vm.$confirm({
                            title: "Registro CAP",
                            type: 'blue',
                            confirm: true,
                            content: data.data.Message,
                            ok: () => {


                                $scope.$apply(() => {
                                    vm.modelRegistry = {};
                                    vm.formRegistre.$setPristine();
                                });


                            }
                        });
                    }
                });
        };

        
    };

})();