// Faraday Penetration Test IDE
// Copyright (C) 2013  Infobyte LLC (http://www.infobytesec.com/)
// See the file 'doc/LICENSE' for the license information

angular.module('faradayApp')
    .controller('vulnModelModalNew',
                ['$scope', '$modalInstance', 'VulnModel', 'vulnModelsManager', 'EXPLOITATIONS', 'EASEOFRESOLUTION',
                 function($scope, $modalInstance, VulnModel, vulnModelsManager, EXPLOITATIONS, EASEOFRESOLUTION) {

        $scope.data;
        $scope.exploitations;
        $scope.models;

        var init = function() {
            $scope.exploitations = EXPLOITATIONS;
            $scope.easeofresolution = EASEOFRESOLUTION;
            $scope.data = new VulnModel;
            $scope.models = vulnModelsManager.models;
            // $scope.exploitations = ['a'];

            $scope.$watch(function() {
                return $scope.data.model;
            }, function(newVal, oldVal) {
                if(newVal == "Other") {
                    $scope.other = true;
                } else if(oldVal == "Other") {
                    $scope.other = false;
                }
            }, true);
        };

        $scope.open = function($event, isStart) {
            $event.preventDefault();
            $event.stopPropagation();

            if(isStart) $scope.openedStart = true; else $scope.openedEnd = true;
        };

        $scope.ok = function() {
            if($scope.other) {
                $scope.data.model = $scope.other_model;
            }

            if ($scope.data.easeofresolution === ""){
                $scope.data.easeofresolution = null;
            }

            $modalInstance.close($scope.data);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.toggleImpact = function(key) {
            $scope.data.impact[key] = !$scope.data.impact[key];
        };

        $scope.newPolicyViolation = function() {
            if ($scope.new_policyviolation !== "") {
                // we need to check if the policy violation already exists
                if ($scope.data.policyviolations.filter(function(policyviolation) {return policyviolation === $scope.new_policyviolation}).length === 0) {
                    $scope.data.policyviolations.push($scope.new_policyviolation);
                    $scope.new_policyviolation = "";
                }
            }
        };

        $scope.newReference = function() {
            if ($scope.new_reference !== "") {
                // we need to check if the reference already exists
                if ($scope.data.references.filter(function(reference) {return reference === $scope.new_reference}).length === 0) {
                    $scope.data.references.push($scope.new_reference);
                    $scope.new_reference = "";
                }
            }
        };

        init();
    }]);
