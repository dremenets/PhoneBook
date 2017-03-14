(function () {
    'use strict';

    var controllerId = 'phoneBookController';

    angular.module("PhoneBookApp").controller(controllerId, ['$scope', 'phoneBookFactory', phoneBookController])

    function phoneBookController($scope, factory) {
        $scope.contacts = [];

        factory.getContacts().then(function success(data) {
            $scope.contacts = data.data;
        }, function error(e) {
            console.log(e);
        });
    }
})();