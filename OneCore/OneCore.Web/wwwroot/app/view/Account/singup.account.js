(() => {
    'use strict';

    angular
        .module('app')
        .controller('singup-home', singup);

    singup.$inject = ['$scope', '$accountService'];

    function singup($scope, $accountService) {

        var vm = $scope;
        vm.formRegistre = {};
        vm.modelRegistry = {};

        //validar que las contraseñas sean iguales
        vm.$watchGroup(['modelRegistry.Password',
            'modelRegistry.ConfirmPassword'], (array) => {

                if (array[0] || array[1])
                    vm.modelRegistry.isPasswordValid = true;
                else
                    vm.formRegistre.$valid = false;

                if (array[0] && array[1]) {
                    if (array[0] === array[1])
                        vm.modelRegistry.isPasswordValid = false;
                    else
                        vm.formRegistre.$valid = false;
                }

            });


        vm.validarGender = (valueCheck) => {
            vm.modelRegistry.Gender = valueCheck;
            vm.modelRegistry.CheckGender = true;
        };

        vm.registry = () => {
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
                            title: "Registro OneCore",
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