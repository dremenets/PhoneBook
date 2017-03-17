(function() {
    'use strict';

    var controllerId = 'phoneBookController';

    angular.module("PhoneBookApp").controller(controllerId, ['$scope', 'phoneBookFactory', '$location', phoneBookController]);

    function phoneBookController($scope, factory) {
        $scope.contacts = [];

        var loadContacts = function() {
            factory.getContacts().then(function success(data) {
                $scope.contacts = data.data;
            }, function error(e) {
                console.log(e);
            });
        }

        loadContacts();

        $scope.importFile = function importFile(files) {
            var fd = new FormData();
            fd.append("file", files[0]);
            factory.upload(fd).then(function success() {
                loadContacts();
            }, function error(e) {
                console.log(e);
            });
        };

        $scope.exportFile = function exportFile() {
            factory.download();
        };

        $scope.editContact = function editContact(row) {
            factory.get(row.Id).then(function success(data) {
                $scope.currentContact = data.data;
                $('#contactForm').slideToggle();
            }, function error(e) {
                console.log(e);
            });
        };

        $scope.disable = function disable() {
            $('#contactForm').slideUp();
        };

        $scope.save = function save(item) {
            factory.put(item).then(function success(data) {
                $('#contactForm').slideUp();
                loadContacts();
            }, function error(e) {
                console.log(e);
            });
        };

        $scope.deleteContact = function deleteContact(item) {
            factory.deleteContact(item.Id).then(function success(data) {
                loadContacts();
            }, function error(e) {
                console.log(e);
            });
            loadContacts();
        };
    }
})();