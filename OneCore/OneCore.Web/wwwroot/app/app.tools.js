(() => {
    'use strict';

    var app = angular.module("app");

    app.directive("email", ["defaultErrorMessageResolver", function (defaultErrorMessageResolver) {
        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
            errorMessages['email'] = 'El correo no tiene el formato correcto';
        });

        return {
            restrict: 'A',
            require: 'ngModel',
            scope: false,
            link: function (scope, element, attributes, ngModel) {
                ngModel.$validators.email = function (modelValue) {
                    if (!modelValue)
                        return true;

                    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,7}))$/;

                    return regex.test(modelValue);
                };

                function parseEmail(text) {

                    if (text) {

                        var transformedInput = text.toLowerCase();

                        //normalize el texto quitando los acentos
                        transformedInput = normalize(transformedInput);

                        //remueve cualquier caracter especial
                        transformedInput = transformedInput.replace(/[^a-z0-9\s\.\-\_\@]+/g, '');

                        if (transformedInput !== text) {
                            ngModel.$setViewValue(transformedInput);
                            ngModel.$render();
                        }
                        return transformedInput;
                    }
                    return text;
                }

                ngModel.$parsers.push(parseEmail);

                element.bind("blur", function () {
                    var ele = angular.element(this);
                    var currentValue = ele.val();
                    if (currentValue) {
                        ele.val(currentValue.trim());
                    }
                });
            }
        };

    }]);

})();