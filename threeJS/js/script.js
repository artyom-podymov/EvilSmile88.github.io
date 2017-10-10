window.onload = function () {
    var pause = false;
    var screen = document.querySelector('.screen')
    var height = window.innerHeight;
    var width = window.innerWidth;
    var canvas = document.getElementById('canvas');
    var score = 0;
    var  rightHitBox, leftHitBox;
    var orientMob, checkOrientation = true, useAlpha;
    changeOrientaion = false;
    if(window.orientation == -90) changeOrientaion = true;
    var scoreCheck = 5;
    var armoView = document.getElementById('armo');
    var acceleration;
    var bust, currentBust;
    var ship, gate, fon, charge, aim, roadLine, shipShadow, portal, billboard, billboardShadow, news, bridge, barier, reds, nitro;
    var cloud1, cloud2, cloud3, cloud4, cloud5, derij;
    var laser, laser1, laser2, laser3;
    var bullets = [];
    var armo;

    var cloudArray;
    var new1, new2;
    var speed = 0.15;
    var useGiroSensor = false;


    var gateSound = document.getElementById("gate-audio");
    gateSound.volume = 1;
    var missSound = document.getElementById("gate-miss");
    missSound.volume = 0.7;
    var song = document.getElementById("song");
    song.volume = 0.2;
    var pauseSound = document.getElementById("pause-sound");
    pauseSound.volume = 1;
    var blasterSound = document.getElementById("blaster");
    blasterSound.volume = 1;
    var achivment = document.getElementById("achivment");
    achivment.volume = 0.3;

    var donotHit = false;
    var boost = 1;
    var energy = 3;
    var batary = document.getElementById('batary');
    var a = 0, b = 0, x =0;
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

    function restartList(count, list) {
        for (var i = 0; i< count; i++) {
            var cell = document.createElement("li");
            list.appendChild(cell)
        }
    }
    function restartArmo() {
        var lenght = 3 - armo.length;
        console.log(lenght);
        for (var i = 0; i< lenght; i++) {
            var cell = document.createElement("li");
            armoView.appendChild(cell)
        }
    }
    document.querySelector('.pause-button').addEventListener("click", pauseGame)
    function pauseGame() {
        if(this == document.querySelector('.pause-button') ) this.classList.toggle("pause-button--active")
        if (pause) {
            pauseSound.play()
            screen.style.display = 'none';
            pause  = !pause;
            song.play();
            loop();
        }
        else {
            pauseSound.play()
            screen.style.display = 'flex';
            pause = !pause;
            song.pause()
        }
    }

    function createLigth() {
        //     // scene.add( new THREE.AmbientLight( 0x555555 ) );
        var spotLight = new THREE.SpotLight( 0x555555, 5, 3000);
        spotLight.position.set(-100, 450, 1200);
        //     directionalLight.target = ship;
        //     directionalLight.castShadow = true;
        //     directionalLight.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(100, 1, 500, 1000))
        //     directionalLight.shadow.bias = 0.01;
        //     directionalLight.shadow.mapSize.width = 2048*4;
        //     directionalLight.shadow.mapSize.height = 2048*4;
        //     // directionalLight.position.normalize();
        scene.add(spotLight);
        //
        //     pointLight = new THREE.PointLight( 0xffffff, 2.0);
        //     pointLight.position.set(-200, 200, 1600)
        //     pointLight.shadow.camera.near = 1;
        //     pointLight.shadow.camera.far = 25;
        //     // pointLight.position.x = -200;
        //     // pointLight.position.y = 200;
        //     // pointLight.position.z = 1600;
        //     pointLight.castShadow = true;
        //     // scene.add( pointLight );
        //
        //
        //     // var light = new THREE.AmbientLight(0xffffff);
        //     // scene.add(light);
    }
    function createFon() {
        var texture = texturLoader.load('pic/road2.jpg')
        var planeGeometry = new THREE.PlaneGeometry(2000,2000,1,1);
        var materialPlane = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture } );
        fon = new THREE.Mesh(planeGeometry,materialPlane);
        fon.position.z = -2000;
        fon.position.y = 60;
        scene.add(fon);

        var texture = texturLoader.load('pic/cloud1.png')
        var planeGeometry = new THREE.PlaneGeometry(600,300,1,1);
        var materialPlane = new THREE.MeshBasicMaterial( {map: texture, transparent: true } );
        cloud1 = new THREE.Mesh(planeGeometry,materialPlane);
        cloud1.position.z = -500;
        cloud1.position.y = 400;
        cloud1.position.x = -700;
        scene.add(cloud1);

        var texture = texturLoader.load('pic/cloud2.png')
        var planeGeometry = new THREE.PlaneGeometry(600,300,1,1);
        var materialPlane = new THREE.MeshBasicMaterial( {map: texture, transparent: true, opacity: 0.9 } );
        cloud2 = new THREE.Mesh(planeGeometry,materialPlane);
        cloud2.position.z = 0;
        cloud2.position.y = 400;
        cloud2.position.x = -200;
        scene.add(cloud2);

        var texture = texturLoader.load('pic/cloud3.png')
        var planeGeometry = new THREE.PlaneGeometry(600,300,1,1);
        var materialPlane = new THREE.MeshBasicMaterial( {map: texture, transparent: true, opacity: 0.5 } );
        cloud3 = new THREE.Mesh(planeGeometry,materialPlane);
        cloud3.position.z = -200;
        cloud3.position.y = 300;
        cloud3.position.x = 200;
        scene.add(cloud3);

        var texture = texturLoader.load('pic/cloud6.png')
        var planeGeometry = new THREE.PlaneGeometry(600,300,1,1);
        var materialPlane = new THREE.MeshBasicMaterial( {map: texture, transparent: true, opacity: 0.7 } );
        cloud4 = new THREE.Mesh(planeGeometry,materialPlane);
        cloud4.position.z = -300;
        cloud4.position.y = 200;
        cloud4.position.x = -1200;
        scene.add(cloud4);

        var texture = texturLoader.load('pic/cloud5.png')
        var planeGeometry = new THREE.PlaneGeometry(600,300,1,1);
        var materialPlane = new THREE.MeshBasicMaterial( {map: texture, transparent: true, opacity: 0.9 } );
        cloud5 = new THREE.Mesh(planeGeometry,materialPlane);
        cloud5.position.z = 200;
        cloud5.position.y = 250;
        cloud5.position.x = 500;
        scene.add(cloud5);

        var texture = texturLoader.load('pic/cloud4.png')
        var planeGeometry = new THREE.PlaneGeometry(600,300,1,1);
        var materialPlane = new THREE.MeshBasicMaterial( {map: texture, transparent: true, opacity: 0.9 } );
        cloud6 = new THREE.Mesh(planeGeometry,materialPlane);
        cloud6.position.z = 300;
        cloud6.position.y = 300;
        cloud6.position.x = -1400;
        scene.add(cloud6);

        var texture = texturLoader.load('pic/derijab2.png')
        var planeGeometry = new THREE.PlaneGeometry(1000,400,1,1);
        var materialPlane = new THREE.MeshBasicMaterial( {map: texture, transparent: true } );
        derij = new THREE.Mesh(planeGeometry,materialPlane);
        derij.scale.set(0.2, 0.2, 0.2)
        derij.position.z = -1000;
        derij.position.y = 600;
        derij.position.x = 1500;
        scene.add(derij);

        cloudArray = [cloud1, cloud2, cloud3, cloud4, cloud5, cloud6]

    }

    function createOcean() {
        // var texture = texturLoader.load('ocean.png')
        // var planeGeometry = new THREE.PlaneGeometry(350,2000,1,1);
        // var materialPlane = new THREE.MeshLambertMaterial( { color: 0xcccccc, transparent: true, opacity: 1, map: texture } );
        // var plane = new THREE.Mesh(planeGeometry,materialPlane);
        // plane.position.z = 5;
        // plane.position.y = -20;
        // plane.position.x = 270;
        // plane.rotation.x = 1.57;
        // plane.rotation.y = 3.15;
        // scene.add(plane);
        //
        // var planeGeometry = new THREE.PlaneGeometry(350,2000,1,1);
        // var materialPlane = new THREE.MeshLambertMaterial( { color: 0xcccccc, transparent: true, opacity: 0.2 } );
        // var plane = new THREE.Mesh(planeGeometry,materialPlane);
        // plane.position.z = 5;
        // plane.position.y = -20;
        // plane.position.x = 570;
        // plane.rotation.x = 1.57;
        // plane.rotation.y = 3.15;
        // scene.add(plane);
    }
    function createRoad() {
        var texture = texturLoader.load('pic/asphalt.jpg')
        var planeGeometry = new THREE.PlaneGeometry(80,2000,1,1);
        var materialPlane = new THREE.MeshLambertMaterial( { color: 0x555555, transparent: true,  opacity: 0.4, map: texture} );
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

        var texture = texturLoader.load('pic/stop2.png')
        var planeGeometry = new THREE.PlaneGeometry(70,20,1,1);
        var materialPlane = new THREE.MeshLambertMaterial( {  map: texture, transparent: true, opacity: 0.7 } );
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

    function createNitro() {
        nitro.position.z = -1500;
        nitro.position.y = -6;
        nitro.scale.set(2,2,2)
        // scene.add(nitro);
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
        new1 = texturLoader.load('pic/news1.jpg')
        new2 = texturLoader.load('pic/news2.jpg')
        var  material = new THREE.MeshLambertMaterial( { color: 0xff5555, opacity: 0.8,  transparent: true, map: new1} ),
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


    objectLoader.load('obj/nitro.obj', function (object) {
        var meshes = [];
        object.traverse( function ( child )
        {
            if ( child instanceof THREE.Mesh )
            {
                meshes.push(child);
            }
        });

        nitro = meshes[0];
        nitro.material = new THREE.MeshLambertMaterial( { color: 0x43b3e2 })

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
        aim.material = new THREE.MeshLambertMaterial( { color: 0xffffff, opacity: 0.5, transparent: true } )
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

        // ship.castShadow = true;
        // plane.receiveShadow = true;
        createRoad();
        createArmo();
        createBridge();
        createOcean();
        createFon();
        createGate();
        createNitro();
        // setTimeout(function () {
        //     createGate2()
        // }, 1000)
        scene.add(ship);
        createLigth();
        loop();
    }, onProgress, onError )

    function setDiviceOrient(alpha, beta, gamma) {
        // var a = alpha, b = beta, c = gamma;
        // alert( "a: "+ alpha + " b:" + beta + " g:" + gamma)
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
    window.addEventListener("keydown", check);

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

    // window.addEventListener("keyup", check2)
    // window.onkeyup = function (e) {
    //     if (e.keyCode == 37) {
    //         back()
    //     }
    // }
    // function back() {
    //     if ( ship.position.x < 0) {
    //         ship.position.x += Math.PI/ 30;
    //         requestAnimationFrame(function (number) { back() })
    //     }
    //
    // }
// Rotate an object around an arbitrary axis in object space

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
        if (e.keyCode == 32 && armo.length > 0) {
            // console.log(armo);
            shutLaser();
            // console.log(bullets);
        }
        if (e.keyCode == 27) pauseGame();
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

        // cloud1.position.x += Math.PI/ 50;
        // cloud4.position.x += Math.PI/ 60;
        // cloud3.position.x += Math.PI/ 70;
        // cloud5.position.x += Math.PI/ 120;
        // cloud2.position.x += Math.PI/ 150;
        // cloud6.position.x += Math.PI/ 170;

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
            setTimeout( function () {
                changeOrientaion = false;
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
            if ( articleNumber == 0.1) news.material = new THREE.MeshLambertMaterial( { color: 0xff5555, opacity: 0.8,  transparent: true, map: new1} );
            else  if( articleNumber == 0.2) news.material = new THREE.MeshLambertMaterial( { color: 0xff5555, opacity: 0.8,  transparent: true, map: new2} );
        }
    }
    function restartMesh(mesh, hitBoxSize, pos) {
        if( score == scoreCheck && speed > 0.07) {
            speed = speed - 0.015;
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
                console.log(speed)
                // alert("a=" + leftHitBox + " b=" + rightHitBox + " mesh=" + object.position.x + ' pos=' + target.position.x)
                document.getElementById('score').innerHTML = score;
            }
            else if (energy != 0 && donotHit == false) {
                interference();
                document.querySelector('.interference').style.display = "block";
                setTimeout(function () {
                    document.querySelector('.interference').style.display = "none"
                },600)
                removeChild(batary)
                energy -= 1;
                changeColorShip();
                missSound.play()
                if (speed < 0.12) speed += 0.005;
            }
            else {
                ship.material = new THREE.MeshLambertMaterial({color: 0xff5555})
                // alert("a=" + a + " b=" + b + " mesh=" + mesh.position.x + ' pos=' + ship.position.x)
                alert("Game Over");
                restartGame()

            }
        }
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
        for (var i =0 ; i< arr.length-1; i++) {
            arr[i].style.width = randomInteger(1, 20) + "vw";
            arr[i].style.animationDelay = randomInteger(0.1, 0.3) + "s";
            arr[i].style.height = randomInteger(1, 10) + "vh";
            arr[i].style.top = randomInteger(1, 100) + "vh";
            arr[i].style.left = randomInteger(1, 100) + "vw"
            arr[i].style.backgroundColor = "rgba(0,0,0," + randomInteger(1, 1) + ")";
        }
    }

    function restartGame() {
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
                        armo.unshift(laser1);
                        break;
                    case 1:
                        armo.unshift(laser2);
                        break;
                    case 2:
                        armo.unshift(laser3);
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
            if (rand == 9 || rand == 10) {
                bust = charge.clone();
                createBust();
                bust.position.z = -1500;
                scene.add(bust);
                currentBust = 'charge'
                console.log("charge");
                a = 1;
            }
            else if (rand == 8) {
                bust = blaster.clone();
                createBust();
                bust.position.z = -1500;
                scene.add(bust);
                currentBust = 'blaster';
                console.log("blaster");
                a = 1;
            }
        }
    }

        function showBarier() {
            var rand = randomInteger(1.0, 1.1);
            console.log(rand)
            if (rand == 1) {
                barier.position.z = bridge.position.z;
                scene.add(barier);
                // console.log("barier");
                b = 1;
            }
        }

        // else if (rand == 10 && a==0) {
        //     nitro.position.z = -1500;
        //     scene.add(nitro);
        //     console.log("nitro");
        //     a = 1;
        // }

    function emitationGForce() {
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
                if (bullets[i].position.z > 0) {
                    bullets[i].position.z -= Math.PI;
                    if( b == 1 && bullets[i].position.z < barier.position.z) {
                        scene.remove(barier);
                        b = 0 ;
                    }
                }
                else {scene.remove(bullets[i]); bullets.splice(i,1)}
            }
        }
    }

    restartMesh(bust, 7, -1500);
    function loop() {
        fon.position.z += Math.PI/30;
        checkBullets();
        rightHitBox = parseFloat(ship.position.x) + 6;
        leftHitBox = ship.position.x - 6;
        shake();
        moveClouds()
        moveRoad();
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
        // controls.update();
        if (!pause) requestAnimationFrame(function (number) { loop() })
    }

    // loop();
    // window.onresize = function () {
    //     resize()
    //     renderer.render(scene,camera);
    // }
    //
    // function resize() {
    //     height = window.innerHeight;
    //     width = window.innerWidth;
    //     canvas.setAttribute('width', width);
    //     canvas.setAttribute('height', height);
    // }
};

