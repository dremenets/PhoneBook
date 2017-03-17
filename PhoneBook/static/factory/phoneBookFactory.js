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
                return $http.put('/api/contacts', contact);
            }

            function post(contact) {
                return $http.post('/api/contacts', contact);
            }

            function downloadFile() {
                window.open('/api/contacts/download', '_blank', '');
            }

            function deleteContact(id) {
                return $http.delete('/api/contacts/' + id);
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
                post: post,
                getContacts: getContacts,
                upload: uploadFile,
                download: downloadFile,
                deleteContact: deleteContact
            };

            return service;
        }
    ]);
})();