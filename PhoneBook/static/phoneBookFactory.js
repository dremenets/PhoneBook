(function () {
    'use strict';
    var serviceId = 'phoneBookFactory';

    angular.module("PhoneBookApp").factory(serviceId, ['$http', phoneBookFactory]);

    function phoneBookFactory($http) {

        function getContacts() {
            return $http.get('/api/contacts');
        }

        var service = {
            getContacts: getContacts
        };

        return service;
    }
})();