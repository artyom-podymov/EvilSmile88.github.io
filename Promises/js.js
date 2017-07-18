$(document).ready(function () {
    function get(url) {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('GET', url);
            req.onload = function() {
                $(".loading").css("display","block")
                if (req.status == 200) {
                    resolve(JSON.parse(req.response));
                }
                else {
                    reject(Error(req.statusText));
                }
            };
            req.onerror = function() {
                reject(Error("Network Error"));
            };
            req.send();
        });
    }

    get('story.json')
       .then(function(response) {
           // setTimeout( function () {
               $(".loading").css("display","none");
               var story = response;
               $("body").prepend("<h2>"+story.text+"</h2>");

               Promise.all( story.urls.map(get) )
                   .then(function (result) {
                       // setTimeout(function () {
                           $(".loading").css("display","none");
                           for (var i = 0; i<result.length; i++) {
                               $("body").append("<p>"+result[i]["text"]+"</p>")
                           }
                       // },1000)

                   });
           // },1000)

    }, function(error) {
        $(".loading").css("display","none")
        $("body").prepend("<h2> Failed! "+error+"</h2>")
        console.error("Failed!", error);
    });
})