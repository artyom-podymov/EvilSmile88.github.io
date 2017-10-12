window.onload = function () {
    var pause = true;
    var screen = document.querySelector('.screen')
    var height = window.innerHeight;
    var width = window.innerWidth;
    var canvas = document.getElementById('canvas');
    var score = 0;
    var postScore;
    var  rightHitBox, leftHitBox;
    var orientMob, checkOrientation = true, useAlpha;
    var changeOrientaion = false;
    var cityTexture, cloudTexture1, cloudTexture2, cloudTexture3, cloudTexture4, cloudTexture5, cloudTexture6,
        derijabTexture, roadTexture, barierTexture, newsTexture1, newsTetxture2;
    if(window.orientation == -90) changeOrientaion = true;
    var scoreCheck = 5;
    var armoView = document.getElementById('armo');
    var acceleration;
    var bust, currentBust;
    var ship, gate, fon, charge, aim, roadLine, shipShadow, portal, billboard, billboardShadow, news, bridge, barier, reds;
    var cloud1, cloud2, cloud3, cloud4, cloud5, derij;
    var firstAimMaterial, secondAimMaterial, thierdAimMaterial;
    var laser, laser1, laser2, laser3;
    var bullets = [];
    var armo;
    var setGameOver = false;
    var cloudArray;
    var new1, new2;
    var speed = 0.15;
    var useGiroSensor = false;

    var gateSound = document.getElementById("gate-audio");
    var missSound = document.getElementById("gate-miss");
    var song = document.getElementById("song");
    var pauseSound = document.getElementById("pause-sound");
    var blasterSound = document.getElementById("blaster");
    var achivment = document.getElementById("achivment");

    var redAlertSound = document.getElementById("red-alert");
    var offLine = document.getElementById("off-line");

    // gateSound.volume = 1;
    // missSound.volume = 0.7;
    song.volume = 0.2;
    // pauseSound.volume = 1;
    // blasterSound.volume = 1;
    // achivment.volume = 0.3;
    // redAlertSound.volume = 0.7;
    // offLine.volume = 1;

    var arraySound = [gateSound, missSound, pauseSound, blasterSound, achivment, redAlertSound, offLine]
    arraySound.forEach(function (elem) {
        elem.volume = 0;
    })
    var donotHit = false;
    var boost = 1;
    var energy = 3;
    var batary = document.getElementById('batary');
    var a = 0, b = 0, x =0 , z = 0, q = 0;
    var stopMove = false;
    restartList(3, batary)
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    var ball = {
        rotateY: 0
    };

    var renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0xcccccc);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    var texturLoader = new THREE.TextureLoader();
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 5000);
    camera.position.set(0, 4, 1010);

    var controls = new THREE.TrackballControls( camera );

    controls.rotateSpeed = 0.05;
    controls.zoomSpeed = 0.05;
    controls.panSpeed = 0.05;

    // setGameOver = true;
    // gameOver()

    function restartList(count, list) {
        for (var i = 0; i< count; i++) {
            var cell = document.createElement("li");
            list.appendChild(cell)
        }
    }
    function restartArmo() {
        var lenght = 3 - armo.length;
        for (var i = 0; i< lenght; i++) {
            var cell = document.createElement("li");
            armoView.appendChild(cell)
        }
    }
    document.querySelector('.pause-button').addEventListener("click", pauseGame)
    document.querySelector('#restart').addEventListener("click", restartGame)
    function pauseGame() {
        if(this == document.querySelector('.pause-button') ) this.classList.toggle("pause-button--active")
        if (pause && !setGameOver) {
            document.querySelector('.pause').style.display = "none"
            pauseSound.play()
            screen.style.display = 'none';
            pause  = !pause;
            song.play();
            loop();
        }
        else if (!pause && !setGameOver) {
            pauseSound.play();
            document.querySelector('.pause').style.display = "block"
            screen.style.display = 'flex';
            pause = !pause;
            song.pause()
        }
        if (setGameOver) {
            document.querySelector('.interference').style.display = "block";
            document.querySelector('.pause-button').classList.toggle("pause-button--hidden");
            redAlert()
            setTimeout(function () {
                $(".game-over").slideToggle("slow");
                $(".game-over").css('display', "flex")
            },400)
            pauseSound.play();
            document.querySelector('#your-score').innerHTML = score;
            screen.style.display = 'flex';
            song.pause()
        }
    }

    function createLigth() {
        var spotLight = new THREE.SpotLight( 0x555555, 5, 3000);
        spotLight.position.set(-100, 450, 1200);
        scene.add(spotLight);
    }
    function createFon() {
        Promise.all([
            cityTexture = texturLoader.load('pic/road2-min.jpg'),
            cloudTexture1 = texturLoader.load('pic/cloud1.png'),
            cloudTexture2 = texturLoader.load('pic/cloud2.png'),
            cloudTexture3 = texturLoader.load('pic/cloud3.png'),
            cloudTexture4 = texturLoader.load('pic/cloud4.png'),
            cloudTexture5 = texturLoader.load('pic/cloud5.png'),
            cloudTexture6 = texturLoader.load('pic/cloud6.png'),
            derijabTexture =  texturLoader.load('pic/derijab2.png'),
            fon = new THREE.Mesh(new THREE.PlaneGeometry(2000,2000,1,1),new THREE.MeshBasicMaterial( { color: 0xffffff, map: cityTexture } )),
        ]).then(
            function (result) {
                $(".loading-container__text").text("Road Loading...")
                createRoad()
                // song.play();
                // document.querySelector('.loading').style.display = 'none';
            },
            function (error) {
                alert("Ошибка: " + error.message)
            }
        )



        fon.position.z = -2000;
        fon.position.y = 60;
        scene.add(fon);

        var planeGeometry = new THREE.PlaneGeometry(600,300,1,1);
        var materialPlane = new THREE.MeshBasicMaterial( {map: cloudTexture1, transparent: true } );
        cloud1 = new THREE.Mesh(planeGeometry,materialPlane);
        cloud1.position.z = -500;
        cloud1.position.y = 400;
        cloud1.position.x = -700;
        scene.add(cloud1);

        var planeGeometry = new THREE.PlaneGeometry(600,300,1,1);
        var materialPlane = new THREE.MeshBasicMaterial( {map: cloudTexture2, transparent: true, opacity: 0.9 } );
        cloud2 = new THREE.Mesh(planeGeometry,materialPlane);
        cloud2.position.z = 0;
        cloud2.position.y = 400;
        cloud2.position.x = -200;
        scene.add(cloud2);

        var planeGeometry = new THREE.PlaneGeometry(600,300,1,1);
        var materialPlane = new THREE.MeshBasicMaterial( {map: cloudTexture3, transparent: true, opacity: 0.5 } );
        cloud3 = new THREE.Mesh(planeGeometry,materialPlane);
        cloud3.position.z = -200;
        cloud3.position.y = 300;
        cloud3.position.x = 200;
        scene.add(cloud3);

        var planeGeometry = new THREE.PlaneGeometry(600,300,1,1);
        var materialPlane = new THREE.MeshBasicMaterial( {map: cloudTexture4, transparent: true, opacity: 0.7 } );
        cloud4 = new THREE.Mesh(planeGeometry,materialPlane);
        cloud4.position.z = -300;
        cloud4.position.y = 200;
        cloud4.position.x = -1200;
        scene.add(cloud4);

        var planeGeometry = new THREE.PlaneGeometry(600,300,1,1);
        var materialPlane = new THREE.MeshBasicMaterial( {map: cloudTexture5, transparent: true, opacity: 0.9 } );
        cloud5 = new THREE.Mesh(planeGeometry,materialPlane);
        cloud5.position.z = 200;
        cloud5.position.y = 250;
        cloud5.position.x = 500;
        scene.add(cloud5);

        var planeGeometry = new THREE.PlaneGeometry(600,300,1,1);
        var materialPlane = new THREE.MeshBasicMaterial( {map: cloudTexture6, transparent: true, opacity: 0.9 } );
        cloud6 = new THREE.Mesh(planeGeometry,materialPlane);
        cloud6.position.z = 300;
        cloud6.position.y = 300;
        cloud6.position.x = -1400;
        scene.add(cloud6);

        var planeGeometry = new THREE.PlaneGeometry(1000,400,1,1);
        var materialPlane = new THREE.MeshBasicMaterial( {map: derijabTexture, transparent: true } );
        derij = new THREE.Mesh(planeGeometry,materialPlane);
        derij.scale.set(0.2, 0.2, 0.2)
        derij.position.z = -1000;
        derij.position.y = 600;
        derij.position.x = 1500;
        scene.add(derij);

        cloudArray = [cloud1, cloud2, cloud3, cloud4, cloud5, cloud6]

    }

    function afterLoading() {
        createBridge();
        // arraySound.forEach(function (elem) {
        //     elem.play();
        // })
        $(".loading-container__text").text("Objects Loading...")
        $('.loading-container').css("display","none");
        $('.interference').css("display","block");
        redAlert()
        // $("#start").mouseenter(function () {
        //     $(".start-container >.start-container__icon").eq(0).toggleClass("start-container__icon--hover");
        // }).mouseleave(function () {
        //     $(".start-container >.start-container__icon").eq(0).toggleClass("start-container__icon--hover");
        // })

        // $("#tutorial").mouseenter(function () {
        //     $(".tutorial >.start-container__icon").eq(0).toggleClass("start-container__icon--hover");
        // }).mouseleave(function () {
        //     $(".tutorial >.start-container__icon").eq(0).toggleClass("start-container__icon--hover");
        // })
        $("#start").click(function () {
            arraySound.forEach(function (elem) {
                elem.play();
            })
            setTimeout(function () {
                gateSound.volume =  pauseSound.volume = blasterSound.volume = offLine.volume = 1;
                missSound.volume = redAlertSound.volume = 0.7;
                song.volume = 0.2;
                achivment.volume = 0.3;
            },3000)

            $(".pause-button").toggleClass("pause-button--hidden");
            $('.interference').css("display","none");
            $('.start-back').css("display","none");
            $('.start-container').css("display","none");
            $('.start-count').css("display","block");
            // setTimeout(function () {
            //     $(".start-count").text("Steady")
            // },1500);
            // setTimeout(function () {
            //     $(".start-count").text("Go")
            // },3000)
            // setTimeout(function () {
            //     $(".start-count").css("display","none")
            //
            // },4500)
            pauseGame();
            window.addEventListener("keydown", check);
        })
    }
    // oncanplaythrough="myOnCanPlayThroughFunction()"
    // onloadeddata="myOnLoadedData()"
    function createRoad() {
        Promise.all([
            // roadTexture = texturLoader.load('pic/asphalt.jpg'),
            barierTexture = texturLoader.load('pic/stop2.png'),
            newsTexture1 = texturLoader.load('pic/news1.jpg'),
            newsTexture2 = texturLoader.load('pic/news2.jpg'),
        ]).then(
            function (result) {
                $(".loading-container__text").text("Sounds Loading...");
                afterLoading()
                // console.log(fon.material)
                // afterLoading()
                // song.play();
                // document.querySelector('.loading').style.display = 'none';
            },
            function (error) {
                alert("Ошибка: " + error.message)
            }
        )
        var planeGeometry = new THREE.PlaneGeometry(80,2000,1,1);
        var materialPlane = new THREE.MeshLambertMaterial( { color: 0x333333, transparent: true,  opacity: 0.7,} );
        var plane = new THREE.Mesh(planeGeometry,materialPlane);
        plane.position.z = 0;
        plane.position.y = -8;
        plane.rotation.x = 1.57;
        plane.rotation.y = 3.15;
        scene.add(plane);

        var planeGeometry = new THREE.PlaneGeometry(80,2000,1,1);
        var materialPlane = new THREE.MeshLambertMaterial( { color: 0x999999} );
        var plane = new THREE.Mesh(planeGeometry,materialPlane);
        plane.position.z = 0;
        plane.position.y = -12;
        plane.rotation.x = 1.574;
        plane.rotation.y = 3.15;
        scene.add(plane);

        var planeGeometry = new THREE.PlaneGeometry(80,2000,1,1);
        var materialPlane = new THREE.MeshLambertMaterial( { color: 0x555555 } );
        var plane = new THREE.Mesh(planeGeometry,materialPlane);
        plane.position.z = 0;
        plane.position.y = -8;
        plane.position.x = 280;
        plane.rotation.x = 1.57;
        plane.rotation.z = 0.3;
        plane.rotation.y = 3.15;
        scene.add(plane);

        var planeGeometry = new THREE.PlaneGeometry(80,2000,1,1);
        var materialPlane = new THREE.MeshBasicMaterial( { color: 0x777777 } );
        var plane = new THREE.Mesh(planeGeometry,materialPlane);
        plane.position.z = 0;
        plane.position.y = -22;
        plane.position.x = 280;
        plane.rotation.x = 1.58;
        plane.rotation.z = 0.3;
        plane.rotation.y = 3.15;
        scene.add(plane);


        var planeGeometry = new THREE.PlaneGeometry(80,2000,1,1);
        var materialPlane = new THREE.MeshLambertMaterial( { color: 0x555555 } );
        var plane = new THREE.Mesh(planeGeometry,materialPlane);
        plane.position.z = 0;
        plane.position.y = -8;
        plane.position.x = -280;
        plane.rotation.x = 1.57;
        plane.rotation.z = -0.3;
        plane.rotation.y = 3.15;
        scene.add(plane);

        var planeGeometry = new THREE.PlaneGeometry(80,2000,1,1);
        var materialPlane = new THREE.MeshBasicMaterial( { color: 0x777777 } );
        var plane = new THREE.Mesh(planeGeometry,materialPlane);
        plane.position.z = 0;
        plane.position.y = -22;
        plane.position.x = -280;
        plane.rotation.x = 1.58;
        plane.rotation.z = -0.3;
        plane.rotation.y = 3.15;
        scene.add(plane);


        var cube = new THREE.Mesh( new THREE.CubeGeometry( 3, 3, 1500 ), new THREE.MeshLambertMaterial({ color: 0xaaaaaa }) );
        cube.position.z = 250;
        cube.position.y = -7;
        cube.position.x = -40;
        scene.add(cube)

        var cube = new THREE.Mesh( new THREE.CubeGeometry( 3, 2, 1500 ), new THREE.MeshLambertMaterial({ color: 0xaaaaaa }) );
        cube.position.z = 250;
        cube.position.y = -5;
        cube.position.x = 315;
        cube.rotation.y = 0.3;
        scene.add(cube)

        var cube = new THREE.Mesh( new THREE.CubeGeometry( 3, 20, 2), new THREE.MeshLambertMaterial({ color: 0xaaaaaa }) );
        cube.position.z = 250;
        cube.position.y = -15;
        cube.position.x = 315;
        cube.rotation.y = 0.3;
        scene.add(cube)

        var cube = new THREE.Mesh( new THREE.CubeGeometry( 3, 20, 2), new THREE.MeshLambertMaterial({ color: 0xaaaaaa }) );
        cube.position.z = 200;
        cube.position.y = -15;
        cube.position.x = 385;
        cube.rotation.y = 0.3;
        scene.add(cube)

        var cube = new THREE.Mesh( new THREE.CubeGeometry( 3, 20, 2), new THREE.MeshLambertMaterial({ color: 0xaaaaaa }) );
        cube.position.z = 600;
        cube.position.y = -15;
        cube.position.x = 422;
        cube.rotation.y = 0.3;
        scene.add(cube)

        var cube = new THREE.Mesh( new THREE.CubeGeometry( 3, 20, 2), new THREE.MeshLambertMaterial({ color: 0xaaaaaa }) );
        cube.position.z = 550;
        cube.position.y = -15;
        cube.position.x = 485;
        cube.rotation.y = 0.3;
        scene.add(cube)

        var cube = new THREE.Mesh( new THREE.CubeGeometry( 3, 2, 1500 ), new THREE.MeshLambertMaterial({ color: 0xaaaaaa }) );
        cube.position.z = 250;
        cube.position.y = -9;
        cube.position.x = -315;
        cube.rotation.y = -0.3;
        scene.add(cube)

        var cube = new THREE.Mesh( new THREE.CubeGeometry( 3, 20, 2), new THREE.MeshLambertMaterial({ color: 0xaaaaaa }) );
        cube.position.z = 400;
        cube.position.y = -19;
        cube.position.x = -365;
        cube.rotation.y = 0.3;
        scene.add(cube)

        var cube = new THREE.Mesh( new THREE.CubeGeometry( 3, 20, 2), new THREE.MeshLambertMaterial({ color: 0xaaaaaa }) );
        cube.position.z = 350;
        cube.position.y = -19;
        cube.position.x = -435;
        cube.rotation.y = 0.3;
        scene.add(cube)

        var cube = new THREE.Mesh( new THREE.CubeGeometry( 3, 3, 1500 ), new THREE.MeshLambertMaterial({ color: 0xaaaaaa }) );
        cube.position.z = 250;
        cube.position.y = -7;
        cube.position.x = 40;
        scene.add(cube)

        var planeGeometry = new THREE.PlaneGeometry(4,100,1,1);
        var materialPlane = new THREE.MeshLambertMaterial( { color: 0xffffff } );
        roadLine = new THREE.Mesh(planeGeometry,materialPlane);
        roadLine.position.z = 0;
        roadLine.rotation.x = -1.57;
        roadLine.position.y = -5;
        scene.add(roadLine)
    }

    function createBridge() {
        reds.position.z = bridge.position.z = -1500;
        reds.position.x = bridge.position.x = 35;
        reds.scale.set(5,5,5)
        bridge.scale.set(5,5,5)
        reds.position.y = bridge.position.y = -19;

        var planeGeometry = new THREE.PlaneGeometry(70,20,1,1);
        var materialPlane = new THREE.MeshLambertMaterial( {  map: barierTexture, transparent: true, opacity: 0.4 } );
        barier = new THREE.Mesh(planeGeometry,materialPlane);
        barier.position.z = bridge.position.z
        barier.position.y = 4;
        barier.position.x = -2;


        scene.add(bridge)
        scene.add(reds)
    }
    function createGate() {
        // var geometry = new THREE.TorusGeometry(7, 0.5, 30, 30);
        // var material = new THREE.MeshLambertMaterial({ color: 0x51a0d8 });
        // gate = new THREE.Mesh(geometry, material);
        gate.position.z = -2000;
        gate.rotation.y = 1.5;
        gate.position.x = randomInteger(-12, 12);
        gate.position.y = 1.9;
        portal.position.z = -2000;
        portal.rotation.y = -0.08;
        portal.position.y = 2.1;
        portal.position.x =  gate.position.x;
        scene.add(gate);
        scene.add(portal)
    }
    function createBust() {
        bust.position.z = -1000;
        bust.position.y = 1.9;
        // scene.add(charge);
    }

    function createArmo() {
        laser1 = laser.clone();
        laser2 = laser.clone();
        laser3 = laser.clone();
        laser3.position.z = laser2.position.z = laser1.position.z = 990;
        laser3.position.y = laser2.position.y = laser1.position.y = 2;

        armo = [laser1, laser2, laser3]
    }

    function shutLaser() {
        blasterSound.play();
        removeChild(armoView)
        var bullet = armo.pop();
        bullet.position.z = 990;
        bullet.position.y = 2;
        bullet.position.x = ship.position.x;
        bullets.unshift(bullet);
        scene.add(bullet);

    }

    function removeChild(list) {
        for (var i =0; i<list.childNodes.length; i++) {
            if (list.childNodes[i].nodeType == 1) {
                list.removeChild(list.childNodes[i]);
                break
            }
        }
    }



    // for (var i =0; i< geometry.faces.length; i++) {
    //     geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random())
    // }

    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) { };

    var objectLoader = new THREE.OBJLoader();

    objectLoader.load('obj/gate3.obj', function (object) {
        var meshes = [];
        object.traverse( function ( child )
        {
            if ( child instanceof THREE.Mesh )
            {
                meshes.push(child);
            }
        });
        var  material = new THREE.MeshLambertMaterial( { color: 0xff5555, opacity: 0.4,  transparent: true} ),
            geometry = new THREE.CircleGeometry( 8.7, 20 );
        portal = new THREE.Mesh(geometry,material);
        gate = meshes[0];
        gate.material = new THREE.MeshLambertMaterial( { color: 0xaaaaaa} )

        // 0x51a0d8
    }, onProgress, onError)

    objectLoader.load('obj/billboard.obj', function (object) {
        var meshes = [];
        object.traverse( function ( child )
        {
            if ( child instanceof THREE.Mesh )
            {
                meshes.push(child);
            }
        });
        var  material = new THREE.MeshLambertMaterial( { color: 0xff5555, opacity: 0.8,  transparent: true, map: newsTexture1} ),
            geometry = new THREE.PlaneGeometry( 17, 15.4 );
        news = new THREE.Mesh(geometry,material);
        billboard = meshes[0];
        news.position.z = billboard.position.z = 990;
        billboard.scale.set(3,3,3)
        news.position.x =billboard.position.x = -30;
        billboard.position.y = 8;
        news.position.y = 16.4;
        billboard.rotation.y = 1.6;
        billboard.material = new THREE.MeshLambertMaterial( { color: 0x999999 })
        scene.add(billboard)
        scene.add(news)

        var  material = new THREE.MeshLambertMaterial( { color: 0x000000, opacity: 0.4,  transparent: true  } ),
            geometry = new THREE.PlaneGeometry( 20, 7 );
        billboardShadow = new THREE.Mesh(geometry,material);

        billboardShadow.position.z = billboard.position.z;
        // shipShadow.position.y = 1.5;
        billboardShadow.position.x = -27;
        billboardShadow.rotation.x = -1.57;
        billboardShadow.position.y = -5;
        scene.add(billboardShadow)

    }, onProgress, onError)

    objectLoader.load('obj/charge.obj', function (object) {
        var meshes = [];
        object.traverse( function ( child )
        {
            if ( child instanceof THREE.Mesh )
            {
                meshes.push(child);
            }
        });

        charge = meshes[0];
        charge.material = new THREE.MeshLambertMaterial( { color: 0xee9930 })

    }, onProgress, onError)

    objectLoader.load('obj/laser.obj', function (object) {
        var meshes = [];
        object.traverse( function ( child )
        {
            if ( child instanceof THREE.Mesh )
            {
                meshes.push(child);
            }
        });
        laser = meshes[0];
        laser.material = new THREE.MeshLambertMaterial( { color: 0xff5555 })

    }, onProgress, onError)

    objectLoader.load('obj/bridge.obj', function (object) {
        var meshes = [];
        object.traverse( function ( child )
        {
            if ( child instanceof THREE.Mesh )
            {
                meshes.push(child);
            }
        });

        bridge = meshes[0];
        bridge.material = new THREE.MeshLambertMaterial( { color: 0xcccccc })

    }, onProgress, onError)

    objectLoader.load('obj/blaster2.obj', function (object) {
        var meshes = [];
        object.traverse( function ( child )
        {
            if ( child instanceof THREE.Mesh )
            {
                meshes.push(child);
            }
        });

        blaster = meshes[0];
        blaster.material = new THREE.MeshLambertMaterial( { color: 0x26b7eb })
    }, onProgress, onError)

    objectLoader.load('obj/red.obj', function (object) {
        var meshes = [];
        object.traverse( function ( child )
        {
            if ( child instanceof THREE.Mesh )
            {
                meshes.push(child);
            }
        });

        reds = meshes[0];
        reds.material = new THREE.MeshLambertMaterial( { color: 0xff0000 })

    }, onProgress, onError)

    objectLoader.load('obj/aim.obj', function (object) {
        var meshes = [];
        object.traverse( function ( child )
        {
            if ( child instanceof THREE.Mesh )
            {
                meshes.push(child);
            }
        });

        aim = meshes[0];
        firstAimMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, opacity: 0.5, transparent: true } )
        secondAimMaterial = new THREE.MeshLambertMaterial( { color: 0xff5555, opacity: 1, transparent: true } )
        thierdAimMaterial = new THREE.MeshLambertMaterial( { color: 0x26b7eb, opacity: 1, transparent: true } )
        aim.material = firstAimMaterial
        aim.position.z = 900;
        aim.scale.set(3,3,3);
        aim.position.y = -2;
        aim.rotation.order = 'YXZ';
        aim.rotation.y = 3.17;
        scene.add(aim)
    }, onProgress, onError)

    objectLoader.load('obj/ship1.obj', function (object) {
        var meshes = [];
        var mesh;
        object.traverse( function ( child )
        {
            if ( child instanceof THREE.Mesh )
            {
                meshes.push(child);
            }
        });
        var  material = new THREE.MeshLambertMaterial( { color: 0x000000, opacity: 0.3,  transparent: true  } ),
            geometry = new THREE.CircleGeometry( 3, 20 );
        shipShadow = new THREE.Mesh(geometry,material);
        $(".loading-container__text").text("Environment Loading...");
        shipShadow.position.z =  985;
        // shipShadow.position.y = 1.5;
        shipShadow.rotation.x = -1.57;
        shipShadow.position.y = -5;
        scene.add(shipShadow)
        ship = meshes[0];
        ship.position.z = 990;
        ship.position.y = 1.9;
        ship.rotation.order = 'YXZ';
        ship.rotation.y = 1.57;
        ship.material = new THREE.MeshPhongMaterial( { color: 0xaaaaaa, ambient: 0xff0000 } )
        createArmo();
        createFon();
        createGate();
        scene.add(ship);
        createLigth();
        loop();
    }, onProgress, onError )

    function setDiviceOrient(alpha, beta, gamma) {
        var orientGamma = Math.abs(gamma);
        if (30 < orientGamma && orientGamma < 90)  { orientMob = beta; useAlpha = false}
        else  { useAlpha = true; orientMob = alpha}
        checkOrientation = false;
    }

    renderer.render(scene,camera);

    if (!useGiroSensor && document.querySelector(".controls")) {
        document.querySelector('.controls__left').addEventListener("touchstart", function () {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            this.style.opacity = '1'
             if (!changeOrientaion) left();
             else right()
        }, false);
        document.querySelector('.controls__left').addEventListener("touchend", function () {stopMove = true;
            this.style.backgroundColor = 'transparent';
            this.style.opacity = '0.5';
            setTimeout(function () {
                stopMove = false;
            }, 100)
        }, false);
        document.querySelector('.controls__right').addEventListener("touchstart", function () {
            this.style.backgroundColor = 'white';
            this.style.opacity = '1'
            if (!changeOrientaion) right();
            else left()
        }, false);
        document.querySelector('.controls__right').addEventListener("touchend", function () {stopMove = true;
            this.style.backgroundColor = 'transparent';
            this.style.opacity = '0.5';
            setTimeout(function () {
                stopMove = false;
            }, 100)
        }, false);
    }

    document.querySelector(".laser").addEventListener('touchstart', function () {
        this.style.opacity = '1'
        shutLaser();
    })
    document.querySelector(".laser").addEventListener('touchend', function () {
        this.style.opacity = '0.5'
    })

    window.addEventListener('deviceorientation', function(event) {
        if (event.absolute && useGiroSensor) {
            if (checkOrientation) setDiviceOrient(event.alpha, event.beta, event.gamma);
            speed = 0.15;
            aim.scale.set(1,1,1);
            aim.position.y = 1;
            if (useAlpha) {
                acceleration = Math.abs(orientMob - event.alpha)
                if (event.alpha > (orientMob+2.5)) { if(!changeOrientaion) leftMob(); else  rightMob()}
                else if (event.alpha < (orientMob-2.5)) { if(!changeOrientaion) rightMob(); else leftMob()}
                else { stopMove=true; setTimeout(function () {
                    stopMove = false;
                }, 10)
                }
            }
            else {
                if (changeOrientaion) {
                    orientMob = 0.5;
                    if (event.beta > (orientMob+2.5)) rightMob();
                    else if (event.beta < (orientMob-2.5)) leftMob();
                    else { stopMove=true; setTimeout(function () {
                        stopMove = false;
                    }, 10)
                    }
                }
                else if (!changeOrientaion) {
                    if (event.beta > (orientMob+2.5)) leftMob();
                    else if (event.beta < (orientMob-2.5)) rightMob();
                    else { stopMove=true; setTimeout(function () {
                        stopMove = false;
                    }, 10)
                    }
                }
            }

        }
    });
    window.addEventListener("keyup", function (e) {
        if (e.keyCode == 65 || e.keyCode == 68) { stopMove = true;
            setTimeout(function () {
                stopMove = false;
            }, 100)
        }
    });


    function shakeShip() {
        var k = 0;
        return function () {
            if (ship.position.z < 993 && k == 0){
                shipShadow.position.z += Math.PI/100;
                ship.position.z += Math.PI/100;
            }
            else k = 1;
            if (ship.position.z > 990 && k == 1) {
                ship.position.z -= Math.PI/50;
                shipShadow.position.z -= Math.PI/50;
            }

            else k =0;
        }
    }
    var shake= shakeShip();
    function randomInteger(min, max) {
        var rand = min + Math.random() * (max - min)
        rand = rand.toFixed(1);
        return rand;
    }
    function check(e) {
        if (e.keyCode == 32 && armo.length > 0 && !pause) {
            // console.log(fon.material);
            shutLaser();
            // console.log(bullets);
        }
        if (e.keyCode == 27 && !setGameOver) pauseGame();
        if (!changeOrientaion) {
            if (e.keyCode == 65) left()
            if (e.keyCode == 68) right()
        }
        else {
            if (e.keyCode == 65) right()
            if (e.keyCode == 68) left()
        }
    }
    function left() {
        if (ship.position.x > -12 && !pause) {
            ship.rotation.x -= Math.PI/ 80;
            // ship.rotation.x -= Math.PI/ 500;
            ship.position.x -= Math.PI/ (speed*40);
            shipShadow.position.x -= Math.PI/ (speed*40);
            // aim.rotation.z -= Math.PI/ 100;
            aim.position.x -= Math.PI/ (speed*40);
            if (!stopMove) requestAnimationFrame(function (number) { left() })
        }

    }
    function leftMob() {
        if (ship.position.x > -12) {
            ship.rotation.x -= Math.PI/ 1600;
            // ship.rotation.x -= Math.PI/ 500;
            ship.position.x -= Math.PI/ (speed*500);
            shipShadow.position.x -= Math.PI/ (speed*500);
            // ship.position.x -= Math.PI/ (speed*50);
            // aim.rotation.z -= Math.PI/ 100;
            aim.position.x -= Math.PI/ (speed*500);
            if (!stopMove) requestAnimationFrame(function (number) { leftMob(acceleration) })
        }

    }
    function right() {
        if (ship.position.x < 12 && ! pause) {
            ship.rotation.x += Math.PI/ 80;
            ship.position.x += Math.PI/ (speed*40);
            shipShadow.position.x += Math.PI/ (speed*40);
            // aim.rotation.z += Math.PI/ 100;
            aim.position.x += Math.PI/ (speed*40);
            if (!stopMove) requestAnimationFrame(function (number) { right() })
        }
    }
    function rightMob() {
        if (ship.position.x < 12) {
            ship.rotation.x += Math.PI/ 1600;
            ship.position.x += Math.PI/ (speed*500);
            shipShadow.position.x += Math.PI/ (speed*500);
            // aim.rotation.z += Math.PI/ 100;
            aim.position.x += Math.PI/ (speed*500);
            if (!stopMove) requestAnimationFrame(function (number) { rightMob() })
        }
    }

    function moveClouds() {
        for (var i =0; i< cloudArray.length; i++) {
            if(cloudArray[i].position.x > 2000) cloudArray[i].position.x = -1700;
        }

        derij.position.x -= Math.PI/ 10;

        cloud1.position.x += Math.PI/ 170;
        cloud4.position.x += Math.PI/ 150;
        cloud3.position.x += Math.PI/ 120;
        cloud5.position.x += Math.PI/ 70;
        cloud2.position.x += Math.PI/ 60;
        cloud6.position.x += Math.PI/ 50;
    }

    function moveRoad() {
        if (roadLine.position.z < 1300) {
            roadLine.position.z += Math.PI * boost / (speed -0.05);
        }
        else {
            roadLine.position.z = -1400;

        }

        if (bridge.position.z < 1300) {
            reds.position.z = bridge.position.z += Math.PI * boost /(speed*2);
            if  ( b == 1) barier.position.z = bridge.position.z
        }
        else {
            reds.position.z = bridge.position.z = -5000;
            showBarier();
        }

        if (b == 1 && barier.position.z > 1000) {
            changeOrientaion = true;
            document.querySelector('.interference').style.display = "block";
            redAlert();
            song.volume = 0.05;
            offLine.play();
            setTimeout(function () {
                var arr = document.querySelectorAll('.interference div');
                for (var i =0 ; i< arr.length; i++) {
                    arr[i].style.animationName = 'interference';
                }

            }, 4600)
            setTimeout( function () {
                changeOrientaion = false;
                song.volume = 0.2;
                document.querySelector('.interference').style.display = "none"
            },5000)
            scene.remove(barier);
            b = 0;
        }

        if (billboard.position.z < 1300) {
            billboardShadow.position.z = news.position.z = billboard.position.z += Math.PI * boost /speed;
        }
        else {
            var articleNumber = randomInteger(0.1, 0.2)
            billboard.position.z = -2000;
            if (randomInteger(0.1, 0.2) == 0.1) billboardShadow.position.x = news.position.x = billboard.position.x = -30;
            else billboardShadow.position.x = news.position.x = billboard.position.x = 30;
            if ( articleNumber == 0.1) news.material = new THREE.MeshLambertMaterial( { color: 0xff5555, opacity: 0.8,  transparent: true, map: newsTexture1} );
            else  if( articleNumber == 0.2) news.material = new THREE.MeshLambertMaterial( { color: 0xff5555, opacity: 0.8,  transparent: true, map: newsTexture2} );
        }
    }
    function restartMesh(mesh, hitBoxSize, pos) {
        if( score == scoreCheck && speed > 0.07) {
            speed = speed - 0.01;
            scoreCheck +=7;
        }
        if (mesh.position.z > 800 && mesh == gate) {
            gateSound.play();
            gateSound.playbackRate = 1/(speed * 5);
        }
        if (mesh.position.z < 1000) {
            if (mesh == gate) {  mesh.position.z += Math.PI * boost / speed; portal.position.z += Math.PI / speed;}
            else if (mesh == bust) (mesh.position.z += Math.PI / (speed+1))
            // else if (mesh == nitro) (mesh.position.z += Math.PI / (speed+1));
        }
        else {
            mesh.position.z = pos;
            mesh.position.x = randomInteger(-12, 12);
            portal.position.z = pos;
            portal.position.x = gate.position.x;
        }
    }

    function checkHit(object, target) {
        if (target.position.z.toFixed(0) > 1000) {
            if (leftHitBox < target.position.x && target.position.x < rightHitBox) {
                score++;
                // console.log(speed)
                // alert("a=" + leftHitBox + " b=" + rightHitBox + " mesh=" + object.position.x + ' pos=' + target.position.x)
                document.getElementById('score').innerHTML = score;
            }
            else if (energy != 0 && donotHit == false) {
                if (!changeOrientaion) {
                    interference();
                    document.querySelector('.interference').style.display = "block";
                    setTimeout(function () {
                        document.querySelector('.interference').style.display = "none"
                    }, 600)
                }
                removeChild(batary)
                energy -= 1;
                changeColorShip();
                missSound.play()
                if (speed < 0.12) speed += 0.005;
            }
            else {
                ship.material = new THREE.MeshLambertMaterial({color: 0xff5555})
                // alert("a=" + a + " b=" + b + " mesh=" + mesh.position.x + ' pos=' + ship.position.x)
                // alert("Game Over");
                gameOver()
                // restartGame()

            }
        }
    }

    function gameOver() {
        setGameOver = true;
        pause = true;
        pauseGame()
    }
    function changeColorShip() {
        switch(energy) {
            case 0:
                ship.material = new THREE.MeshLambertMaterial({color: 0xff5555})
                break;
            case 1:
                ship.material = new THREE.MeshLambertMaterial({color: 0xff7777})
                break;
            case 2:
                ship.material = new THREE.MeshLambertMaterial({color: 0xbb9999})
                break;
            case 3:
                ship.material = new THREE.MeshLambertMaterial({color: 0xaaaaaa})
                break;
        }
    }
    function interference() {
        var arr = document.querySelectorAll('.interference div');
        document.querySelector('.black-screen').style.backgroundColor = "black";
        for (var i =0 ; i< arr.length-1; i++) {
            arr[i].style.width = randomInteger(1, 20) + "vw";
            arr[i].style.animationDelay = randomInteger(0.1, 0.3) + "s";
            arr[i].style.height = randomInteger(1, 10) + "vh";
            arr[i].style.top = randomInteger(1, 100) + "vh";
            arr[i].style.animationName = 'interference';
            arr[i].style.left = randomInteger(1, 100) + "vw"
            arr[i].style.backgroundColor = "rgba(0,0,0," + randomInteger(1, 1) + ")";
        }
    }

    function redAlert() {
        var arr = document.querySelectorAll('.interference div');
        document.querySelector('.black-screen').style.backgroundColor = "rgba(255,0,0, 0.4)";
        for (var i =0 ; i< arr.length-1; i++) {
            arr[i].style.width = randomInteger(1, 20) + "vw";
            arr[i].style.animationDelay = randomInteger(0.1, 0.3) + "s";
            arr[i].style.animationFillMode = "forwards"
            arr[i].style.height = randomInteger(1, 10) + "vh";
            arr[i].style.top = randomInteger(1, 100) + "vh";
            arr[i].style.animationName = 'red-alert-start';
            arr[i].style.left = randomInteger(1, 100) + "vw"
            arr[i].style.backgroundColor = "rgba(255,0,0," + randomInteger(1, 1) + ")";
        }
    }
    $(document.forms.score_list).submit(function (event) {
        event.preventDefault();
        postScore = JSON.stringify({
            name: this.elements.user.value,
            score: score
        })
        fetch("https://aqueous-hollows-48230.herokuapp.com/",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "post",
                body: postScore
            })
        // var jqxhr = $.post("", postScore)
        //     .done(function(data) { console.log("second success"); })
        //     .fail(function() { console.log("error"); })
    })

    function restartGame() {
        setGameOver = false;
        $(".game-over").slideToggle("slow");
        var arr = document.querySelectorAll('.interference div');
        setTimeout( function () {
            pauseGame();
            for (var i =0 ; i< arr.length; i++) {
                arr[i].style.animationName = 'interference';
            }
        },500)
        setTimeout( function () {
            $(".pause-button").toggleClass("pause-button--hidden")
            $('.interference').css("display","none");
            $('.game-over').css("display","none");
            $('.screen').css("display","none");
            // document.querySelector('.pause-button').classList.toggle("pause-button--hidden");
            // document.querySelector('.interference').style.display = "none"
            // document.querySelector('.game-over').style.display = "none"
            // document.querySelector('.screen').style.display = "none"
            ship.material = new THREE.MeshLambertMaterial({color: 0xaaaaaa});
            song.currentTime = 0;
            checkOrientation = true;
            ship.rotation.x = 0;
            ship.position.x = 0;
            aim.position.x = 0;
            shipShadow.position.x = 0;
            score = 0;
            document.getElementById('score').innerHTML = score;
            fon.position.z = -2000;
            restartList(3, batary);
            restartArmo();
            createArmo();
            speed = 0.15;
            scoreCheck = 5;
            energy = 3;
            restartMesh(gate, 6)
        },1000)

    }
    function checkBust(object, target) {
        if (target.position.z.toFixed(0) > 1000 && leftHitBox < target.position.x && target.position.x < rightHitBox ) {
            if (energy <= 3 && a && currentBust == "charge") {
                // alert("a=" + leftHitBox + " b=" + rightHitBox + " mesh=" + object.position.x + ' pos=' + target.position.x)
                energy++;
                changeColorShip();
                achivment.play();
                a = 0;
                scene.remove(target);
                target.position.z = -1000;
                restartList(1, batary);
            }
            else  if(armo.length<3 && a && currentBust == "blaster") {
                var cell = document.createElement("li");
                armoView.appendChild(cell);
                switch(armo.length) {
                    case 0:
                        armo.push(laser.clone());
                        break;
                    case 1:
                        armo.push(laser2);
                        break;
                    case 2:
                        armo.push(laser3);
                        break;
                }
                achivment.play();
                a = 0;
                scene.remove(target);
                target.position.z = -1000;
            }
            // else if (leftHitBox < target.position.x && target.position.x < rightHitBox && target == nitro)
            // {
            //     a = 0;
            //     donotHit = true;
            //     boost = 1.5;
            //     var posit = ship.position.z;
            //     ship.position.z = 950;
            //     scene.remove(target);
            //     target.position.z = -1000;
            //     object.material = new THREE.MeshLambertMaterial({color: 0x5555ff})
            //     setTimeout(function () {
            //         boost = 1;
            //         donotHit == false;
            //         ship.position.z = posit;
            //     }, 5000)
            // }
            else { scene.remove(target); target.position.z = -1000; a = 0;}
        }
    }

    function _hit() {
        if(bust) restartMesh(bust, 6, -1500);
        if (bust) checkBust(ship, bust);
        // if(nitro) restartMesh(nitro, 6, -1500);
        // if (nitro) checkCharge(ship, nitro);
        restartMesh(gate, 6, -1000);
        checkHit(ship, gate)
    }
    function showBust() {
        var rand = randomInteger(-20, 20);
        if (a == 0) {
            if (rand == 9) {
                bust = charge.clone();
                createBust();
                bust.position.z = -1500;
                scene.add(bust);
                currentBust = 'charge'
                a = 1;
            }
            else if (rand == 8  || rand == 10) {
                bust = blaster.clone();
                createBust();
                bust.position.z = -1500;
                scene.add(bust);
                currentBust = 'blaster';
                a = 1;
            }
        }
    }

        function showBarier() {
            var rand = randomInteger(1, 2);
            if (rand == 1) {
                redAlertSound.play();
                barier.position.z = bridge.position.z;
                barier.scale.y = 1
                scene.add(barier);
                b = 1;
            }
        }

        function takeAim() {
            if (b==1 && !changeOrientaion) {
                if (barier.position.z<-700) {
                    aim.material = secondAimMaterial;
                }
                else  aim.material = thierdAimMaterial;
            }
            else {
                aim.material = firstAimMaterial;
            }
        }

    function emitationGForce() {
        if (-1< ship.position.x <1) {
            ship.rotation.x = 0;
        }
        if (ship.position.z > 985) {
            ship.position.z -= Math.PI/20
            shipShadow.position.z = ship.position.z -5;
        }
            if (ship.position.y < 2.001 && x == 0)
                ship.position.y += Math.PI/50;
            else x = 1;
            if (ship.position.y > 2.000 && x == 1)
                ship.position.y -= Math.PI/50;
            else x =0;
         // if (-1< ship.position.x < 1 && speed < 0.1) {
        //     ship.rotation.x = 0
        // }
    }

    function checkBullets() {
        if (bullets.length > 0) {
            for (var i = 0; i < bullets.length; i++) {
                if (bullets[i].position.z > 300) {
                    bullets[i].position.z -= Math.PI;
                    if( b == 1 && bullets[i].position.z < barier.position.z + 300) {
                        // scene.remove(barier);
                        b = 0 ;
                        z = 1;
                        scene.remove(bullets[i]); bullets.splice(i,1)
                    }
                }
                else {scene.remove(bullets[i]); bullets.splice(i,1)}
            }
        }
    }

    function destroybarier() {
        if (barier.scale.y > 0 ) { barier.scale.y -= Math.PI/100; barier.position.z = bridge.position.z }
        else {scene.remove(barier); z = 0; }
    }
    
    restartMesh(bust, 7, -1500);
    function loop() {
        if (z==1) destroybarier()
        fon.position.z += Math.PI/30;
        checkBullets();
        rightHitBox = parseFloat(ship.position.x) + 6;
        leftHitBox = ship.position.x - 6;
        shake();
        takeAim();
        if (roadLine) moveRoad();
        moveClouds()
        showBust();
        _hit();
        if (speed < 0.1) emitationGForce()

        if (ship.position.z < 986 && speed > 0.1) {
            ship.position.z += Math.PI/10
            shipShadow.position.z = ship.position.z -5;
        }
        // directionalLight.position.z += Math.PI;
        // console.log(directionalLight.position.z)


        renderer.render(scene,camera);
//         controls.update();
        if (!pause) requestAnimationFrame(function (number) { loop() })
    }
};

