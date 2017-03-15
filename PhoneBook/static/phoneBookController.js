(function() {
    'use strict';

    var controllerId = 'phoneBookController';

    angular.module("PhoneBookApp").controller(controllerId, ['$scope', 'phoneBookFactory', phoneBookController]);

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
            debugger;
        };
    }
})();