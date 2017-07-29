window.onload = function () {
    var sectionArray = document.getElementsByClassName("section"),
        navArray = document.getElementsByClassName("nav__element"),
        offsets = [],
        middle_offsets=[];

    for (var i =0; i<sectionArray.length; i++) {
        offsets.push(sectionArray[i].offsetTop)
        middle_offsets.push(sectionArray[i].offsetTop-window.innerHeight*0.5)
    }

    for(var i=0;i<navArray.length;i++){
        navArray[i].addEventListener( "click" , function(event){
            scrollTo(offsets[event.currentTarget.getAttribute("data-index")])
        }, false);
    }

    window.onscroll = function () {
        var winScrollTop =  document.body.scrollTop || window.pageYOffset;
        for (var i=0; i<middle_offsets.length; i++) {
            if (winScrollTop>=middle_offsets[i]) {
                document.querySelector('.nav__element--active').classList.remove('nav__element--active')
                navArray[i].classList.add('nav__element--active');
            }
        }
    }

    document.body.addEventListener('keyup', function (event) {
        var curentIndex = parseInt(document.querySelector('.nav__element--active').getAttribute('data-index'));
        if (event.keyCode == 40) {
           var nextIndex = curentIndex+1;
            scrollTo(offsets[nextIndex])
        }
        else if (event.keyCode == 38) {
            var prevIndex = curentIndex-1;
            scrollTo(offsets[prevIndex])
        }
    },false)

    document.body.onkeydown = function (event) {
        event.preventDefault()
    }
    console.log(offsets)
    console.log(middle_offsets)

    function scrollTo(index) {
        var offset = document.body.scrollTop || window.pageYOffset;
        if (index>offset) {
            var hand = setInterval(function () {
                if (offset > index) {
                    clearInterval(hand)
                }
                else {
                    window.scrollBy(0, 5);
                    offset += 5
                }
            }, 1)
        }
        else if (index<offset){
            var hand = setInterval(function () {
                if (offset < index) {
                    clearInterval(hand)}
                else {
                    window.scrollBy(0, -5);
                    offset -= 5
                }
            }, 1)
        }
    }
}
