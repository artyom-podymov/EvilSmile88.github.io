var app = angular.module("App", []);
app.controller("AppCtrl", function ($scope) {
    if (window.localStorage.getItem("notes_name")) {
        // localStorage.removeItem("notes_name");
        // localStorage.removeItem("note0");
        // localStorage.removeItem("note1");
        // localStorage.removeItem("note2");
        // localStorage.removeItem("note3");
        // localStorage.removeItem("note4");
        // localStorage.removeItem("note5");
        // localStorage.removeItem("note6");
        // localStorage.removeItem("note7");
        // localStorage.removeItem("note8");
        // localStorage.removeItem("note9");
        // localStorage.removeItem("note10");

        $scope.Notes_name = JSON.parse(window.localStorage.getItem("notes_name"));
        $scope.Count = JSON.parse(window.localStorage.getItem("count"));
        $scope.Notes = [];
        for (var i=0; i<$scope.Notes_name.length; i++) {
            $scope.Notes.push(JSON.parse(window.localStorage.getItem($scope.Notes_name[i])));
        }
        console.log($scope.Notes_name);
        console.log($scope.Notes);
        // window.localStorage.notes_name = [];
    }
    else {
        $scope.Notes_name = [];
        $scope.Notes = [];
        $scope.Count = 0;
    }
    $scope.place ="Add"
    $scope.name_edit = "";
    $scope.add = false;
    $scope.tags = [];
    $scope.close = function () {
        $scope.add = false;
    }
    $scope.create_tag = function () {
        var text = $("#textarea").text();
        $scope.tags = text.match(/#\w+/g);
        // var text2 = text.split(/#\w+/g);
        //     var newText = "";
        //     for (var i=0; i<text2.length; i++) {
        //         if (text2[i]) newText += text2[i];
        //         if ($scope.tags[i]) {
        //             newText += "<span class='colored_tag'>" + $scope.tags[i] + "</span>";
        //         }
        //     }
        // $("#textarea").html(newText);
        // var sel = window.getSelection();
        // var range = document.createRange();
        // range.setStart( $("#textarea").get(0), 2);
        // sel.removeAllRanges();
        // sel.addRange(range);
    }
    $scope.post = function() {
        var text = $("#textarea").text();
        // alert(text.length);
        var a = "note"+$scope.Count;
        $scope.Notes_name.unshift(a);
        var new_note = new Note($("#textarea").text(), $scope.tags, a);
        window.localStorage.notes_name = JSON.stringify($scope.Notes_name)
        $scope.Count++;
        window.localStorage.count = JSON.stringify($scope.Count)
        $scope.Notes.unshift(new_note);
        // console.log($scope.Notes);
        $scope.add = false;
        window.localStorage[a] = JSON.stringify(new_note);
    }
    $scope.delite = function (event) {
        if (confirm("You want to delite this note?")) {
            var id = parseInt(event.currentTarget.getAttribute("data-id"));
            var name = event.currentTarget.getAttribute("data-name");
            $scope.Notes.splice(id, 1);
            $scope.Notes_name.splice(id, 1);
            localStorage.removeItem("name");
            window.localStorage.notes_name = JSON.stringify($scope.Notes_name)
        }
    }
    $scope.openEdit = function (event) {
        $scope.place = "Edit";
        $scope.add = true;
        $scope.name_edit = event.currentTarget.getAttribute("data-name")
        $scope.id_edit = parseInt(event.currentTarget.getAttribute("data-id"));
        $scope.why = $scope.Notes[$scope.id_edit].text;
    }
    $scope.edit = function () {
        if (confirm("You want to edit this note?")) {
            var text = $("#textarea").text();
            var edit_note = $scope.Notes[$scope.id_edit];
            edit_note.text = text;
            $scope.Notes[$scope.id_edit].text = text;
            window.localStorage[$scope.name_edit] = JSON.stringify(edit_note);
            $scope.add = false;
            // $scope.name_edit
        }
    }
    function Note(text, tags, name) {
        this.text = text;
        this.tags = tags;
        this.name = name;
        this.date = (function () {
            var date = new Date();
            return (date.getDate()+" " + date.getMonthName() +" "+ date.getFullYear())
        })()
    }
    $scope.reset = function () {
        $("#textarea").text("");
        $scope.tags = [];
    }
    $scope.searchTag = function (event) {
        for (var i=0; i<$scope.Notes.length; i++) {
            var str = $(".note").eq(i).attr("data-tags");
            var srch = $("input[type='search']").val();
            console.log(str);
            if (srch.length>0) {
                if (str == undefined) {
                    $(".note").eq(i).css("display", "none");
                }
            else if (str.indexOf(srch) == -1) {
                $(".note").eq(i).css("display", "none");
               }
                else $(".note").eq(i).css("display", "block");
            }
            else $(".note").css("display", "block");
        }
    }
    $scope.newReset = function () {
        alert("aaaa")
    }
    Date.prototype.getMonthName = function() {
        var month = ['Jan','Feb','Mar','Apr','May','Jun',
            'Jul','Aug','Sep','Oct','Nov','Dec'];
        return month[this.getMonth()];
    }
})


