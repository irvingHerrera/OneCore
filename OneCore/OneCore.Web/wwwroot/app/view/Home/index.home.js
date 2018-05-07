(() => {
    'use strict';

    angular
        .module('app')
        .controller('index-home', index);

    index.$inject = ['$scope', '$userService', '$accountService'];

    function index($scope, $userService, $accountService) {

        var vm = $scope;
        vm.modelAddUser = {};
        vm.formAddUser = {};

        //validar que las contraseñas sean iguales
        vm.$watchGroup(['modelAddUser.Password',
            'modelAddUser.ConfirmPassword'], (array) => {

                if (array[0] || array[1])
                    vm.modelAddUser.isPasswordValid = true;
                else
                    vm.formAddUser.$valid = false;

                if (array[0] && array[1]) {
                    if (array[0] === array[1])
                        vm.modelAddUser.isPasswordValid = false;
                    else
                        vm.formAddUser.$valid = false;
                }

            });


        vm.validarGender = (valueCheck) => {
            vm.modelAddUser.Gender = valueCheck;
            vm.modelAddUser.CheckGender = true;
        };

        vm.validarStatus = (valueCheck) => {
            vm.modelAddUser.Status = valueCheck;
            vm.modelAddUser.CheckStatus = true;
        };

        vm.getAll = () => {

            $userService.getAll().then((data) => {
                vm.modelUser = data.data.Objeto;


                $(document).ready(function () {
                    $('#tableUser').DataTable({

                        "language": {
                            "sProcessing": "Procesando...",
                            "sLengthMenu": "Mostrar _MENU_ registros",
                            "sZeroRecords": "No se encontraron resultados",
                            "sEmptyTable": "Ningún dato disponible en esta tabla",
                            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                            "sInfoPostFix": "",
                            "sSearch": "Buscar:",
                            "sUrl": "",
                            "sInfoThousands": ",",
                            "sLoadingRecords": "Cargando...",
                            "oPaginate": {
                                "sFirst": "Primero",
                                "sLast": "Último",
                                "sNext": "Siguiente",
                                "sPrevious": "Anterior"
                            },
                            "oAria": {
                                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                            }
                        }

                    });
                });

            });
        };

        vm.addUser = () => {
            vm.modelUser.showForm = true;
            vm.modelUser.edit = false;
        };

        function confirmAlert(success, message) {
            if (success) {
                vm.$confirm({
                    title: "Registro OneCore",
                    type: 'blue',
                    confirm: true,
                    content: message,
                    ok: () => {
                        console.log("ddd");
                        $scope.$apply(() => {
                            vm.modelAddUser = {};
                            vm.formAddUser.$setPristine();
                            checkFalse();
                            vm.modelUser.showForm = false;
                            vm.getAll();
                        });
                    }
                });
            }
            else {
                vm.$confirm({
                    title: "Registro OneCore",
                    type: 'blue',
                    confirm: true,
                    content: message,
                    ok: () => {
                        //$scope.$apply(() => {
                        //    vm.modelAddUser = {};
                        //    vm.formAddUser.$setPristine();
                        //    checkFalse();
                        //});
                    }
                });
            }

        };

        vm.newUser = () => {
            if (!vm.modelUser.edit) {
                $accountService.registry(vm.modelAddUser)
                    .then((data) => {
                        confirmAlert(data.data.Success, data.data.Message);
                    });
            }
            else {

                $userService.update(vm.modelAddUser)
                    .then((data) => {
                        confirmAlert(data.data.Success, data.data.Message);
                    });
            }

            

        };

        vm.editUser = (id) => {
            vm.modelUser.edit = true;

            $userService.get(id)
                .then((data) => {
                    console.log(data.data);
                    if (data.data.Success) {
                        vm.modelUser.showForm = true;
                        vm.modelAddUser = data.data.Objeto;
                        vm.modelAddUser.ConfirmPassword = vm.modelAddUser.Password;

                        if (vm.modelAddUser.Gender === 0) {
                            $('#checkMan').prop('checked', true);
                        } else {
                            $('#checkWoman').prop('checked', true);
                        }

                        if (vm.modelAddUser.Status === 0) {
                            $('#checkActive').prop('checked', true);
                        } else {
                            $('#checkInactive').prop('checked', true);
                        }

                        vm.modelAddUser.isPasswordValid = true;
                        vm.modelAddUser.CheckGender = true;
                        vm.modelAddUser.CheckStatus = true;
                    }
                    else {
                        vm.$confirm({
                            title: "Registro OneCore",
                            type: 'blue',
                            confirm: true,
                            content: data.data.Message,
                            ok: () => {

                            }
                        });
                    }
                });
        };

        vm.deleteUser = (id) => {

            vm.$confirm({
                title: "Registro OneCore",
                type: 'blue',
                confirm: false,
                content: '¿Está seguro de eliminar el usuario?',
                ok: () => {
                    $userService.delete(id)
                        .then((data) => {
                            console.log(data.data);
                            if (data.data.Success) {
                                vm.$confirm({
                                    title: "Registro OneCore",
                                    type: 'blue',
                                    confirm: true,
                                    content: data.data.Message,
                                    ok: () => {
                                        vm.getAll();
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

                                    }
                                });
                            }
                        });
                }
            });

            
        };

        vm.cancel = () => {
            vm.modelUser.showForm = false;
            vm.modelAddUser = {};
            vm.formAddUser.$setPristine();
            checkFalse();
        };

        function checkFalse() {

            $('#checkMan').prop('checked', false);
            $('#checkWoman').prop('checked', false);

            $('#checkActive').prop('checked', false);
            $('#checkInactive').prop('checked', false);
        }

    };

})();