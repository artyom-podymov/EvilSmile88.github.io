window.onload = function () {
    var height = window.innerHeight;
    var width = window.innerWidth;
    var canvas = document.getElementById('canvas');
    var score = 0;
    var orientMob;
    var scoreCheck = 5;
    var ship, gate, fon, charge, aim, roadLine, shipShadow, portal;
    var speed = 0.15;
    var energy = 3;
    var batary = document.getElementById('batary');
    var a = 0, x =0;
    var stopMove = false;
    changeEnergy(3)
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

  function changeEnergy(count) {
      for (var i = 0; i< count; i++) {
          var cell = document.createElement("li");
          batary.appendChild(cell)
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
      var texture = texturLoader.load('road2.jpg')
     var planeGeometry = new THREE.PlaneGeometry(2000,2000,1,1);
     var materialPlane = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture } );
      fon = new THREE.Mesh(planeGeometry,materialPlane);
     fon.position.z = -2000;
     fon.position.y = 60;
     scene.add(fon);
 }
 function createRoad() {
     var planeGeometry = new THREE.PlaneGeometry(80,2000,1,1);
     var materialPlane = new THREE.MeshLambertMaterial( { color: 0x555555 } );
     var plane = new THREE.Mesh(planeGeometry,materialPlane);
     plane.position.z = 0;
     plane.position.y = -8;
     plane.rotation.x = 1.57;
     plane.rotation.y = 3.15;
     scene.add(plane);

     var cube = new THREE.Mesh( new THREE.CubeGeometry( 3, 3, 1500 ), new THREE.MeshLambertMaterial({ color: 0xaaaaaa }) );
     cube.position.z = 250;
     cube.position.y = -7;
     cube.position.x = -40;
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
 function createGate() {
         // var geometry = new THREE.TorusGeometry(7, 0.5, 30, 30);
         // var material = new THREE.MeshLambertMaterial({ color: 0x51a0d8 });
         // gate = new THREE.Mesh(geometry, material);
         gate.position.z = -1000;
         gate.rotation.y = 1.5;
         gate.position.x = randomInteger(-12, 12);
         gate.position.y = 1.9;
         portal.position.z = -1000;
         portal.rotation.y = -0.08;
         portal.position.y = 2.1;
         portal.position.x =  gate.position.x;
         scene.add(gate);
         scene.add(portal)
 }
    function createCharge() {
        charge.position.z = -1000;
        charge.position.y = 1.9;
        charge.rotation.y = 1.5;
        // scene.add(charge);
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
        var texture = texturLoader.load('portal.png')
        var  material = new THREE.MeshLambertMaterial( { color: 0x14b4d8, opacity: 0.4,  transparent: true} ),
            geometry = new THREE.CircleGeometry( 8.7, 20 );
        portal = new THREE.Mesh(geometry,material);
        gate = meshes[0];
        gate.material = new THREE.MeshLambertMaterial( { color: 0xaaaaaa} )

        // 0x51a0d8
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
        aim.position.y = -1.5;
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
        shipShadow.position.z = 985;
        // shipShadow.position.y = 1.5;
        shipShadow.rotation.x = -1.57;
        shipShadow.position.y = -5;
        scene.add(shipShadow)
        ship = meshes[0];
        ship.position.z = 990;
        ship.position.y = 1.9;
        ship.rotation.order = 'YXZ';
        ship.rotation.y = 1.57;
        ship.material = new THREE.MeshLambertMaterial( { color: 0xaaaaaa } )

        // ship.castShadow = true;
        // plane.receiveShadow = true;
        createRoad();
        createFon()
        createGate();
        createCharge();
        // setTimeout(function () {
        //     createGate2()
        // }, 1000)
        scene.add(ship);
        createLigth();
        loop();
    }, onProgress, onError )

    renderer.render(scene,camera);

    window.addEventListener("keydown", check);

    window.addEventListener('deviceorientation', function(event) {
        if (!orientMob) orientMob = event.beta;
        if (event.beta != null) {
            speed = 0.2;
            aim.scale.set(1,1,1);
            aim.position.y = 1;
            if (200 < orientMob && orientMob < 360) {
             if (event.beta > (orientMob+2.5)) leftMob();
            else if (event.beta < (orientMob-2.5)) rightMob();
            else { stopMove=true; setTimeout(function () {
                stopMove = false;
            }, 10)
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
        if (e.keyCode == 65) left()
        if (e.keyCode == 68) right()
    }
    function left() {
        if (ship.position.x > -12) {
            ship.rotation.x -= Math.PI/ 80;
            // ship.rotation.x -= Math.PI/ 500;
            ship.position.x -= Math.PI/ (speed*40);
            shipShadow.position.x -= Math.PI/ (speed*40);
            // aim.rotation.z -= Math.PI/ 100;
            aim.position.x -= Math.PI/ 7;
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
            // aim.position.x -= Math.PI/ 7;
            if (!stopMove) requestAnimationFrame(function (number) { leftMob() })
        }

    }
    function right() {
        if (ship.position.x < 12) {
            ship.rotation.x += Math.PI/ 80;
            ship.position.x += Math.PI/ (speed*40);
            shipShadow.position.x += Math.PI/ (speed*40);
            // aim.rotation.z += Math.PI/ 100;
            aim.position.x += Math.PI/ 7;
            if (!stopMove) requestAnimationFrame(function (number) { right() })
        }
    }
    function rightMob() {
        if (ship.position.x < 12) {
            ship.rotation.x += Math.PI/ 1600;
            ship.position.x += Math.PI/ (speed*500);
            shipShadow.position.x += Math.PI/ (speed*500);
            // aim.rotation.z += Math.PI/ 100;
            // aim.position.x += Math.PI/ 7;
            if (!stopMove) requestAnimationFrame(function (number) { rightMob() })
        }
    }

    function moveRoad() {
        if (roadLine.position.z < 1300) {
            roadLine.position.z += Math.PI / (speed -0.05);
        }
        else {
            roadLine.position.z = 0;

        }
    }
    function restartMesh(mesh, hitBoxSize, pos) {
            if( score == scoreCheck && scoreCheck <60) {
                speed = speed - 0.015;
                scoreCheck +=5;
            }
            if (mesh.position.z < 1000) {
                if (mesh == gate) { mesh.position.z += Math.PI / speed; portal.position.z += Math.PI / speed;}
                else if (mesh == charge) (mesh.position.z += Math.PI / (speed+1))
                rightHitBox = parseFloat(ship.position.x) + hitBoxSize;
                leftHitBox = ship.position.x - hitBoxSize;
            }
            else {
                rightHitBox = 0;
                leftHitBox = 0;
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
                object.material = new THREE.MeshLambertMaterial({color: 0xaaaaaa})
                document.getElementById('score').innerHTML = score;
            }
            else if (energy != 0) {
                object.material = new THREE.MeshLambertMaterial({color: 0xff5555})
                batary.removeChild(batary.childNodes[1]);
                energy -= 1;
                if (speed < 0.12) speed += 0.015;
            }
            else {
                ship.material = new THREE.MeshLambertMaterial({color: 0xff5555})
                // alert("a=" + a + " b=" + b + " mesh=" + mesh.position.x + ' pos=' + ship.position.x)
                alert("Game Over");
                score = 0;
                fon.position.z = -2000;
                changeEnergy(3)
                speed = 0.15;
                scoreCheck = 5;
                energy = 3;
                restartMesh(gate, 6)
            }
        }
    }
    function checkCharge(object, target) {
        if (target.position.z.toFixed(0) > 1000) {
            if (leftHitBox < target.position.x && target.position.x < rightHitBox && energy <= 3 && charge) {
                // alert("a=" + leftHitBox + " b=" + rightHitBox + " mesh=" + object.position.x + ' pos=' + target.position.x)
                energy++;
                a = 0;
                scene.remove(charge);
                charge.position.z = -1000;
                object.material = new THREE.MeshLambertMaterial({color: 0xee9930})
                changeEnergy(1);
            }
            else { scene.remove(charge); charge.position.z = -1000; a =0;}
        }
    }

    function _hit() {
        if(charge) restartMesh(charge, 6, -1500);
        if (charge) checkCharge(ship, charge);
        restartMesh(gate, 6, -1000);
        checkHit(ship, gate)
    }
    function showCharge() {
        var rand = randomInteger(-20, 20);
        if (rand == 9  && a == 0) {
            scene.add(charge);
            console.log("allooooo");
            a = 1;
        }
    }

    function emitationGForce() {
        if (ship.position.y < 2.001 && x == 0 && speed < 0.1)
            ship.position.y += Math.PI/50;
        else x = 1;
        if (ship.position.y > 2.000 && x == 1 && speed < 0.1)
            ship.position.y -= Math.PI/50;
        else x =0;
    }
    function loop() {
        fon.position.z += Math.PI/30;
        var leftHitbox, rightHitBox;
        shake();
        moveRoad();
        showCharge();
        _hit();
        emitationGForce()
        // directionalLight.position.z += Math.PI;
        // console.log(directionalLight.position.z)


        renderer.render(scene,camera);
//         controls.update();
        requestAnimationFrame(function (number) { loop() })
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

