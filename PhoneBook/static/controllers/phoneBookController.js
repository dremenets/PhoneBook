(function() {
    'use strict';

    var controllerId = 'phoneBookController';

    angular.module("PhoneBookApp").controller(controllerId, [
        '$scope', 'phoneBookFactory',
        function ($scope, factory) {
            $scope.contacts = [];
            $scope.predicate = 'Id';
            $scope.reverse = false;
            $scope.order = function(predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };

            $scope.currentPage = 1;
            $scope.totalItems = $scope.contacts.length;
            $scope.numPerPage = 10;
            $scope.paginate = function paginate(value) {
                var begin, end, index;
                begin = ($scope.currentPage - 1) * $scope.numPerPage;
                end = begin + $scope.numPerPage;
                index = $scope.contacts.indexOf(value);
                return (begin <= index && index < end);
            };

            var loadContacts = function() {
                factory.getContacts().then(function success(data) {
                    $scope.contacts = data.data;
                    $scope.totalItems = $scope.contacts.length;
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
                    data.data.BirthDate = new Date(data.data.BirthDate);
                    $scope.currentContact = data.data;
                    $('#contactForm').slideToggle();
                }, function error(e) {
                    console.log(e);
                });
            };

            $scope.addContact = function addContact() {
                $scope.currentContact = {};
                $('#contactForm').slideToggle();
            };

            $scope.disable = function disable() {
                $('#contactForm').slideUp();
            };

            $scope.save = function save(item) {
                if (!item.Id) {
                    factory.post(item).then(function success(data) {
                        $('#contactForm').slideUp();
                        loadContacts();
                    }, function error(e) {
                        console.log(e);
                    });
                } else {
                    factory.put(item).then(function success(data) {
                        $('#contactForm').slideUp();
                        loadContacts();
                    }, function error(e) {
                        console.log(e);
                    });
                }
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
    ]);
})();