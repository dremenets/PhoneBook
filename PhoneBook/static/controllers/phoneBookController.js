(function () {
    'use strict';

    var controllerId = 'phoneBookController';

    angular.module("PhoneBookApp").controller(controllerId, ['$scope', 'phoneBookFactory', 'ngDialog', phoneBookController]);

    function phoneBookController($scope, factory, ngDialog) {
        $scope.contacts = [];

        var loadContacts = function () {
            factory.getContacts().then(function success(data) {
                $scope.contacts = data.data;
            }, function error(e) {
                console.log(e);
            });
        }

        loadContacts();

        $scope.uploadFile = function uploadFile(files) {
            var fd = new FormData();
            fd.append("file", files[0]);
            factory.upload(fd).then(function success() {
                loadContacts();
            }, function error(e) {
                console.log(e);
            });
        };

        $scope.exportFile = function exportFile() {
            window.open('/api/contacts/download', '_blank', '');
        };

        $scope.edit = function edit(item) {
            var itemToEdit = item;
            ngDialog.open({
                template: 'static/views/edit.html',
                className: 'ngdialog-theme-default',
                resolve: { contact: angular.copy(itemToEdit) },
                controller: ['$scope', function ctrl ($scope, contact) {
                    debugger
                    $scope.contact = contact;

                    $scope.save = function () {
                        dialog.close($scope.contact);
                    };

                    $scope.close = function () {
                        dialog.close(undefined);
                    };
                }]
            });
        };
    }
})();