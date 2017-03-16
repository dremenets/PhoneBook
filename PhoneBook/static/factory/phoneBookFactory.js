(function () {
    'use strict';
    var serviceId = 'phoneBookFactory';

    angular.module("PhoneBookApp").factory(serviceId, ['$http', phoneBookFactory]);

    function phoneBookFactory($http) {

        function getContacts() {
            return $http.get('/api/contacts');
        }

        function downloadFile() {
            window.open('/api/contacts/download', '_blank', '');
        }

        function deleteContact(id) {
            return $http.delete('/api/contacts/delete/' + id);
        }

        function uploadFile(file) {
            return $http.post('/api/contacts/upload', file, {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            });
        }

        var service = {
            getContacts: getContacts,
            upload: uploadFile,
            download: downloadFile,
            deleteContact: deleteContact
        };

        return service;
    }
})();