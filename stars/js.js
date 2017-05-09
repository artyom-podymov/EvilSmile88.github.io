
window.onload = function () {
    $("#star").append($("<table><tr><td id='1'></td><td id='2'></td><td id='3'></td><td id='4'></td><td id='5'></td></tr> </table> <div class='result'>Количество голосов: <span id='voices'>0</span></div>"));
        var j = 0;
        var mass = [];
    $("td").css("max-width","50px");
    $("td").css("max-heingh","50px")

   $("td").hover(function (event) {
       if (j ==0) {

       $('td').css("background-position", "0px 0px");
       var el = parseInt(event.currentTarget.getAttribute("id"));
       el = "-n+" + el;
           $("td:nth-of-type("+el+")").css("background-position","center")
       j++
   }
     else j=0;
   });
  $("td").bind("click", function (event) {
            $('td').css("background-position", "0px 0px");
              mass.push(parseInt(event.currentTarget.getAttribute("id")));
              $("#voices").text(mass.length);
              var voices = srArefm(mass);
                var el = "-n+" + voices;
                alert("Вы поставили " + event.currentTarget.getAttribute("id"))
              $("td:nth-of-type("+el+")").css("background-position","bottom")

  })
    $("table").mouseout(function (event) {
        $('td').css("background-position", "0px 0px");

        $("#voices").text(mass.length);
        var voices = srArefm(mass);
        var el = "-n+" + voices;
        $("td:nth-of-type("+el+")").css("background-position","bottom")
    })
    function srArefm(mas) {
            var result=0;
            var a;
            for (i = 0; i<mas.length; i++) {
                result += mas[i];
            }
            result = Math.round(result/mas.length);
        return result
    }
}
