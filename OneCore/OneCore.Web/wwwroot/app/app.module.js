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

        }])
        .factory("$serviceFactory",
        [
            "http", "$q", "$rootScope", function (http, $q, $rootScope) {

                var $http = http;

                function ServiceSettings(serviceName) {

                    var serv = this;

                    var ajaxPromise = {};

                    var cache = {};

                    this.serviceName = serviceName;

                    this.emitEvent = function (eventName, obj) {
                        return $rootScope.emitEvent(serv.serviceName, eventName, obj);
                    };

                    this.emitEventError = function (eventName, obj) {
                        return $rootScope.emitEventError(serv.serviceName, eventName, obj);
                    };

                    this.subscribeEvent = function (eventName, scope, callback, fail, always) {

                        return $rootScope.subscribeEvent(serv.serviceName, eventName, scope, callback, fail, always);
                    };

                    this.updateObjectFromInit = function (targetObj, sourceObj, initObj) {
                        for (var i in initObj) {
                            if (sourceObj.hasOwnProperty(i)) {
                                targetObj[i] = sourceObj[i];
                            }
                        }

                        return targetObj;
                    };


                    this.http = function (option) {

                        //se crea una variable local de cache
                        var localCache = option.cache || false;

                        //se remueve el cache para las llamadas
                        //ajax con $http
                        //ya que se está implementando
                        //un caché personalizado
                        option.cache = null;

                        //crea un hash
                        function createHash(s) {
                            var hash = 0,
                                i,
                                char;
                            if (s.length === 0) return hash;
                            var l;
                            for (i = 0, l = s.length; i < l; i++) {
                                char = s.charCodeAt(i);
                                hash = ((hash << 5) - hash) + char;
                                hash |= 0; // Convert to 32bit integer
                            }
                            return hash;
                        }

                        //obtiene el identificador del request
                        var guid = createHash(option.url +
                            JSON.stringify(option.data) +
                            JSON.stringify(option.params));

                        //si ya existe la promesa
                        //entonces todavía no se ha resuelto
                        //y se retorna la promesa
                        if (ajaxPromise[guid])
                            return ajaxPromise[guid].promise;

                        //crea la promesa
                        ajaxPromise[guid] = $q.defer();

                        //si se activó la opción de caché
                        //y el caché existe
                        //entonces se resuelve la promesa
                        //usando el caché
                        if (localCache === true && cache[guid]) {

                            //se resuelve la promesa con caché
                            ajaxPromise[guid].resolve(cache[guid]);

                            console.log("AJAX FROM CACHÉ", option.url);

                            //se retorna la promesa
                            return ajaxPromise[guid].promise;
                        }

                        //set the account Id in all request
                        //if (hierarchyModel && hierarchyModel.Account) {
                        //    option.headers = option.headers || {};
                        //    option.headers.AccountId = hierarchyModel.Account.Id;
                        //}

                        //realiza la llamada ajax
                        $http(option).then(function (data) {

                            //resuelve la promesa
                            //cuando la llamada ajax termina
                            ajaxPromise[guid].resolve(data);

                            //si hay caché activado se almacenan
                            //los datos en caché
                            if (localCache) {
                                //se almacena en caché
                                //si la respuesta es success
                                if (data.Success) {
                                    cache[guid] = data;
                                }
                            }

                            //emite el evento si es string
                            if (typeof option.emitEvent === "string") {
                                serv.emitEvent(option.emitEvent, data);

                                //ejecuta la función si el evento lo es
                            } else if (typeof option.emitEvent === "function") {
                                option.emitEvent(data);
                            }

                            //elimina la promesa
                            //para que se vuelva a crear otra
                            //en la próxima llamada
                            ajaxPromise[guid] = null;

                        }).catch(function (data) {

                            //rechaza la promesa
                            ajaxPromise[guid].reject(data);

                            //emite el evento si es string
                            if (typeof option.emitEvent === "string") {
                                serv.emitEventError(option.emitEvent, data);

                                //ejecuta el evento si es una función
                            } else if (typeof option.emitEventError === "function") {
                                option.emitEventError(data);
                            }

                            //elimina la promesa
                            //para que se vuelva a crear otra
                            //en la próxima llamada
                            ajaxPromise[guid] = null;

                            //se borra cualquier caché
                            cache[guid] = null;
                        });

                        //retorna la promesa
                        return ajaxPromise[guid].promise;
                    };
                }

                return {
                    create: function (serviceName) {
                        return new ServiceSettings(serviceName);
                    },

                    generateId: function () {

                        var id;

                        if (typeof window.guid === "function")
                            id = window.guid();
                        else
                            id = null;

                        return id;
                    }
                };

            }
        ])
        .run([
            'defaultErrorMessageResolver', '$ngConfirm', '$rootScope',
            function (defaultErrorMessageResolver, $ngConfirm, $rootScope) {
                // To change the root resource file path
                //defaultErrorMessageResolver.setI18nFileRootPath('some/path);
               // defaultErrorMessageResolver.setCulture('es-CO');


                $rootScope.$confirm = function (option) {
                    if (option.confirm === true) {
                        window.modal = $ngConfirm({
                            icon: option.icon,
                            title: option.title,
                            content: option.content,
                            contentUrl: option.contentUrl,
                            escapeKey: true,
                            type: option.type,
                            typeAnimated: true,
                            scope: option.scope || this,
                            backgroundDismiss: false,
                            buttons: {
                                ok: {
                                    text: option.okText || "Aceptar",
                                    btnClass: "btn btn-primary",
                                    action: option.ok,
                                    disabled: option.disabled
                                }
                            }
                        });
                    } else {
                        window.modal = $ngConfirm({
                            title: option.title,
                            icon: option.icon,
                            content: option.content,
                            contentUrl: option.contentUrl,
                            escapeKey: true,
                            type: option.type,
                            typeAnimated: true,
                            backgroundDismiss: false,
                            scope: option.scope || this,
                            buttons: {
                                ok: {
                                    text: option.okText || "Aceptar",
                                    btnClass: "btn btn-danger",
                                    action: option.ok,
                                    disabled: option.disabled
                                },
                                cancel: {
                                    text: option.cancelText || "Cancelar",
                                    btnClass: "btn btn-simple color-blue",
                                    action: option.cancel
                                }
                            }
                        });
                    }
                };

                $rootScope.pathBase = window.pathBase;
            }
        ]);

})();