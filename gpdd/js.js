$(document).ready( function () {

    var pattern = /[а-яoiq]/i;
    var arrow = ".ae_empty";
    $("#ae_vin_button").click(function () {
        var mas = 0;
        var b = $("#ae_vin_input").val();
        b = b.toUpperCase();
        if( $("#ae_vin_button").val()== "Изменить") { // Если необходимо изменить введенный VIN
            $("#ae_vin_button").val("Готово");
            $(".ae_history_period ul li").remove()
            $("#ae_captcha_input").val("");
            $(arrow).slideUp("slow");
            $(".ae_arrow").css("transform", "rotate(45deg)")
            $("#ae_vin_input").val("");
            $("#ae_vin_button").css({color: "white",
                borderWidth: "0px",
                backgroundColor: "#4bb15a"})
            arrow = ".ae_empty";
            for (var i=0; i<$("#ae_empty").length; i++) {
            $("div[id^='ae_empty']").removeClass().addClass("ae_empty");}

        }

        else {
            if (b == "") {
                $("#ae_error_input").css({opacity: "1", visibility: "visible"});
                $("#ae_error_input").text("Введите VIN ")
            }
            if (pattern.test($("#ae_vin_input").val())) {
                $("#ae_error_input").css({opacity: "1", visibility: "visible"});
                $("#ae_error_input").text("VIN не должен содержать русские буквы, а так же буквы Q,I,O")
            }


            else {

                var request = new XMLHttpRequest();
                request.open('GET', 'json.json');

                request.onreadystatechange = function () {
                    if (this.readyState = 4 && this.status == 200) {
                        response = JSON.parse(this.responseText);

                        if (b in response.auto && mas == 0) { // ТО: показать капчу

                            arrow = ".ae_captcha";
                            $(".ae_empty").slideUp("slow");
                            $("#ae_vin_button").val("Изменить");
                            $("#ae_vin_button").css({
                                color: "#51df82",
                                border: "2px solid #51df82",
                                backgroundColor: "white"
                            });
                            $("div[id^='ae_empty']").removeClass().addClass("ae_captcha");
                            $(".ae_section:first-of-type .ae_captcha").slideDown("slow");
                            $(".ae_arrow").css("transform", "rotate(45deg)")
                            $(".ae_section:first-of-type .ae_arrow").css("transform", "rotate(225deg)");
                            mas++
                            var length=0;
                            for (el in response.captcha) {
                                length++
                            }
                            var rand = "pic_"+ random(length);
                                captcha();
                            function captcha() {
                                $(".ae_captcha_pic").css({backgroundImage: "url(" + response.captcha[rand][0]+")", backgroundSize: "contain", backgroundRepeat: "no-repeat"})
                            }
                                $("#ae_captcha_button").click( function () {
                                        var max = 0;
                                    if ( $("#ae_captcha_input").val() == "") {
                                        $("#ae_error_captcha").text("Введите значение")
                                        $("#ae_error_captcha").css({opacity: "1", visibility: "visible"});

                                    }
                                        else if (response.captcha[rand][1]!= $("#ae_captcha_input").val()){
                                        rand = "pic_"+ random(length);
                                        captcha();
                                        $("#ae_error_captcha").text("Ошибка, попробуйте еще раз");
                                        $("#ae_error_captcha").css({opacity: "1", visibility: "visible"});
                                    }
                                        else if(response.captcha[rand][1] = $("#ae_captcha_input").val() && max==0) {
                                        var b = $("#ae_vin_input").val();
                                            for (var i=0; i<$(".ae_history_info .ae_col_3").length; i++) {
                                                $(".ae_history_info .ae_col_3:eq("+i+")").text(response.auto[b].ownerHistory[i]);
                                            }

                                            for (var i=0; i<response.auto[b].ownerPeriods.length; i++) {
                                                $(".ae_history_period ul").append("<li>"+response.auto[b].ownerPeriods[i]+"</li>")
                                            }

                                        arrow = ".ae_found";
                                        $(".ae_arrow").css("transform", "rotate(45deg)")
                                        $(".ae_section:first-of-type .ae_arrow").css("transform", "rotate(225deg)");
                                        $(".ae_captcha").slideUp("slow");
                                        $(".ae_section:first-of-type .ae_found").slideDown("slow");
                                        nowdata(".ae_found #ae_date");
                                        buildCols();
                                        max++;
                                    }
                                    setTimeout(function () {
                                        $("#ae_error_captcha").css({ opacity:"0"})
                                    }, 5000)
                                })

                            //      // alert(response.captcha[rand][0])

                        }
                        else if(mas==0 && b != ""){ //ТО: покать что нет такого в базе
                            arrow = ".ae_notfound";
                            $(".ae_empty").slideUp("slow");
                            $("#ae_vin_button").val("Изменить");
                            $("#ae_vin_button").css({
                                color: "#51df82",
                                border: "2px solid #51df82",
                                backgroundColor: "white"
                            });
                            $("div[id^='ae_empty']").removeClass().addClass("ae_notfound");
                            $(".ae_section:first-of-type .ae_notfound").slideDown("slow");
                            $(".ae_arrow").css("transform", "rotate(45deg)")
                            $(".ae_section:first-of-type .ae_arrow").css("transform", "rotate(225deg)");
                            nowdata(".ae_notfound #ae_date");
                            mas++;
                        }
                        // for (var i = 0; i < response.auto.length; i++) {
                        //  if (b==response.auto[i])  alert(i);
                        // }

                    }
                    else {
                        alert("Eror")  // тут сообщаем о сетевой ошибке
                    }

                }
                request.send(null);

            }
        }

       setTimeout(function () {
           $("#ae_error_input").css({ opacity:"0"})
       }, 5000)

    })
    $(".ae_arrow").click(function () {
                if ($(".ae_section").has(this).find(arrow).css("display")=="none") {
            $(".ae_section").has(this).find(arrow).slideDown("slow");
            $(this).css("transform","rotate(225deg)");
        }
        else {$(".ae_section").has(this).find(arrow).slideUp("slow");
            $(this).css("transform","rotate(45deg)")
        }
    })
    function random(max) {
        return Math.floor(Math.random() * (max)) + 1;
    }
    function buildCols() {
        var size = $(".ae_history_info").css("width");
        size = parseInt(size.split("px")[0]);
        for (var i = 0; i < $(".ae_col_2").length; i++) {
            var next = $(".ae_col_2:eq(" + i + ")").next().css("width");
            next = parseInt(next.split("px")[0]);
            var prev = $(".ae_col_2:eq(" + i + ")").prev().css("width");
            prev = parseInt(prev.split("px")[0]);
            var sizeCol = size * 0.9 - prev - next;
            $(".ae_col_2:eq(" + i + ")").css("width", sizeCol)
        }
    }
    function nowdata(element) {
        var now = new Date(),
            monthName ;
        switch (now.getMonth()) {
            case 0 : monthName = "января";
                break;
            case 1 : monthName = "Февраля";
                break;
            case 2 : monthName = "марта";
                break;
            case 3 : monthName = "опреля";
                break;
            case 4 : monthName = "мая";
                break;
            case 5 : monthName = "июня";
                break;
            case 6 : monthName = "июля";
                break;
            case 7 : monthName = "августа";
                break;
            case 8 : monthName = "сентября";
                break;
            case 9 : monthName = "октября";
                break;
            case 10 : monthName = "ноября";
                break;
            case 11 : monthName = "декабря";
                break;
        }
        $(element).text("Проверка проведена "+now.getDate()+" "+monthName + " "+now.getFullYear()+ " в "+now.getHours()+":"+now.getMinutes())
    }

})