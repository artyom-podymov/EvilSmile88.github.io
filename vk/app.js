var app = angular.module("App", []);
app.controller("AppCtrl", function ($scope) {
    $scope.a = function () {
        alert("ass")
    };
    $scope.nav = [
        {class: "current_nav", url: "img/gallery.png", title: "gallery", alt: "gallery"}
    ]
    $scope.vk = {
        data: {},
        appID: 6085608,
        appPermissions: 7,
        albums_content: [],
        init: function(){
            VK.Auth.login($scope.authInfo, $scope.vk.appPermissions);
        }
    };
    $scope.authInfo = function(response){
        if(response.session){ // Авторизация успешна
            show();
            function show() {
                $scope.vk.data.user = response.session.user;
                $(".current_user").text($scope.vk.data.user.first_name);
                console.log($scope.vk.data.user)
                $(".current_file").slideDown("slow", function () {
                    $(".current_file").css("display","flex")
                })
            }
        }else alert("Авторизоваться не удалось!");
        VK.Api.call('photos.getAlbums', {owner_id: $scope.vk.data.user.id}, function (r) {
            var albums =[{id: -6, title: "Profile"}, {id:-7, title: "Wall"}];
            if (r.response) {
                for (var i=0; i<r.response.length; i++) {
                    var obj = {id: r.response[i].aid, title: r.response[i].title};
                    albums[albums.length] = obj;
                }
                $scope.vk.albums = albums;
                console.log($scope.vk.albums);
            }
        })
       setTimeout(function () {
           var j = 0;
                for (var i = 0; i<$scope.vk.albums.length; i++) {
                    VK.Api.call('photos.get', {owner_id: $scope.vk.data.user.id, album_id: $scope.vk.albums[i].id, rev: 1, extended: 1, count: 1000}, function (r) {
                        if (r.response) {
                            var obj = {album_id: $scope.vk.albums[j].id, album_title: $scope.vk.albums[j].title, album_content: r.response};
                            if (r.response.lenght > 0) {
                                $scope.vk.albums_content[$scope.vk.albums_content.length] = obj
                            }
                            j++;
                        }
                    })
                }
                console.log($scope.vk.albums_content)
        }, 1000);

    }
    $scope.currentNav = function (event) {
        $(".nav div").removeClass("current_nav").addClass("not_current_nav")
        event.currentTarget.setAttribute("class", "current_nav")
    }
})

