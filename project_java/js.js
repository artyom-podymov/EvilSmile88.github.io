$(document).ready(function () {
    var a =1;
    // $(".content").css("-webkit-filter","blur(2px)");
    $(".log_in").click(function () {
        $("#logIn").attr("class","submitLog");
        $("#logIn").val("Войти");

        $(this).css({backgroundColor: "#687891", zIndex: "2"});
        $(".reg").css({backgroundColor: "#394b66", zIndex: "1"})
    });
    $(".reg").click(function () {
        $("#logIn").attr("class","submitReg");
        $("#logIn").val("Регистрация");

        $(this).css({backgroundColor: "#687891", zIndex: "2"})
        $(".log_in").css({backgroundColor: "#394b66", zIndex: "1"})
    });
    $(".close").click(function () {
        $(".log_back").css({opacity: "0"})
        $(".content").css("-webkit-filter","blur(0px)");
        setTimeout(function () {
            $(".log_back").css("display","none");
        },510)
    });
    $(".log").click(openLog)

    // $("form").submit(function () {
    //     if ($("input[id^='input']").val()== "") {
    //         $("form span:first-of-type").val("Заполните поля");
    //         showMessaga("email_message");
    //         return false
    //     }
    // })
    $("#begin").click(function () {
        if (a==1) openLog()
    })

})
function openLog() {
    $(".log_back").css("display","flex");
    setTimeout(function () {
        $(".log_back").css({opacity: "1"})
        $(".content").css("-webkit-filter","blur(2px)");
    },10)
}
function showMessaga(id) {
    $("form #"+id).css({opacity: "1"})
    setTimeout(function () {
        $("form span:first-of-type").css({opacity: "0"})
    },3000)
}
