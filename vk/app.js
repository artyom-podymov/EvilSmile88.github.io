var app = angular.module("App", []);
app.controller("AppCtrl", function ($scope) {
    $scope.a = function () {
        alert("ass")
    };

    $scope.vk = {
            data: {},
            appID: 6085608,
            appPermissions: 7,
            init: function(){
                VK.Auth.login($scope.authInfo, $scope.vk.appPermissions);
            }
        };
    $scope.authInfo = function(response){
        if(response.session){ // Авторизация успешна
            $scope.vk.data.user = response.session.user;
            alert("Авторизоваться удалось!")
        }else alert("Авторизоваться не удалось!");
    }
})