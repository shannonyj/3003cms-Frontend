/**
 * Created by shannon_z on 7/11/16.
 */


(function() {
    'use strict';
    angular.module('myApp').controller('timelineCtrl', function ($scope,$mdDialog, social,CONSTANTS) {
        $scope.showAlert = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('This is an alert title')
                    .textContent('You can specify some description text in here.')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                    .targetEvent(ev)
            );
        };
        $scope.showAdvancedFb = function(ev, id) {
            console.log('facebook');

            $mdDialog.show({
                targetEvent: ev,
                template:
                '<br><h2 style="padding-left: 1em; padding-right: 1em;">Facebook: Which region do you want it to be posted?</h2><br>' +
                '<p style="padding-left: 1em">Choose East/West/South/North/Central</p>' +
                '<p style="padding-left: 1em"><i>Click outside the window to Cancel</i></p>' +
                '<md-radio-group ng-model="data.group1" style="padding-left: 1em">' +
                '<md-radio-button value="West" class="md-primary">West</md-radio-button> ' +
                '<md-radio-button value="East"> East </md-radio-button> ' +
                '<md-radio-button value="South">South</md-radio-button>' +
                '<md-radio-button value="North">South</md-radio-button>' +
                '<md-radio-button value="Central">Central</md-radio-button>' +
                '</md-radio-group>' +
                '<br>' +
                '<md-button style="margin-right:20px;" ng-click="answer(\'useful\')">Post it now</md-button>' +
                '<br><br>',
                clickOutsideToClose:true,
            }).then(function(){
                $scope.status = 'value'
                social.facebook(id, $scope.status, function(data){
                    console.log(id);
                    console.log($scope.status);
                    console.log('Yes');
                });
            });

            function DialogController($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                };
            }

            return social.facebook(id, $scope.status, function(data){
                console.log(id);
                console.log($scope.status);
                console.log('Yes');
            });

            /*

            $mdDialog.show(confirm).then(function(result) {
                $scope.status = 'You decided to name your dog ' + result + '.';
            }, function() {
                $scope.status = 'You didn\'t name your dog.';
            });
            */
        };


        $scope.showAdvancedTwitter = function(ev) {
            console.log('Twitter');

            $mdDialog.show({
                targetEvent: ev,
                template:
                '<div ng-model="PublicCtrl">' +
                '<br><h2 style="padding-left: 1em; padding-right: 1em;">Twitter: Which region do you want it to be posted?</h2><br>' +
                '<p style="padding-left: 1em">Choose East/West/South/North/Central</p>' +
                '<p style="padding-left: 1em"><i>Click outside the window to Cancel</i></p>' +
                '<p>Test {{approvedIncidents}}</p>' +
                '<md-radio-group style="padding-left: 1em">' +
                '<md-radio-button value="West" class="md-primary">West</md-radio-button> ' +
                '<md-radio-button value="East"> East </md-radio-button> ' +
                '<md-radio-button value="South">South</md-radio-button>' +
                '<md-radio-button value="North">South</md-radio-button>' +
                '<md-radio-button value="Central">Central</md-radio-button>' +
                '</md-radio-group>' +
                '<br>' +
                '<md-button style="margin-right:20px;" ng-click="hide()">Post it now</md-button>' +
                '<br><br></div>',
                clickOutsideToClose:true,
            }).then(function(result){
                $scope.status = 'value';
                social.facebook(id, $scope.status, function(data){
                    console.log(id);
                    console.log($scope.status);
                    console.log('Yes');
                });
            });
            return;
        };
    });
}).call(this);
