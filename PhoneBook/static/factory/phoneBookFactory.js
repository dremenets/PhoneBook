(function() {
    'use strict';
    var serviceId = 'phoneBookFactory';

    angular.module("PhoneBookApp").factory(serviceId, [
        '$http', function($http) {
            function get(id) {
                return $http.get('/api/contacts/' + id);
            }

            function getContacts() {
                return $http.get('/api/contacts');
            }

            function put(contact) {
                return $http.put('/api/contacts/edit', contact);
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
                get: get,
                put: put,
                getContacts: getContacts,
                upload: uploadFile,
                download: downloadFile,
                deleteContact: deleteContact
            };

            return service;
        }
    ]);
})();