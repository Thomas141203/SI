const borneVue=6;


function init(){
    var stats = initStats();
    let rendu = new THREE.WebGLRenderer({ antialias: true });
    rendu.shadowMap.enabled = true;
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 100);
    rendu.shadowMap.enabled = true;
    rendu.setClearColor(new THREE.Color(0xFFFFFF));
    rendu.setSize(window.innerWidth*.9, window.innerHeight*.9);
    cameraLumiere(scene,camera);
    repere(scene);

    var gui = new dat.GUI();
    let menuGUI = new function(){
        this.cameraxPos = camera.position.x;
        this.camerayPos = camera.position.y;
        this.camerazPos = camera.position.z;
        this.cameraZoom = 1;
        this.cameraxDir = 0;
        this.camerayDir = 0;
        this.camerazDir = 0;
    
        this.actualisation = function () {
            posCamera();
            reAffichage();
        }; 
    }; 

    ajoutCameraGui(gui,menuGUI,camera)
    gui.add(menuGUI, "actualisation");
    menuGUI.actualisation();
    renduAnim();

    function posCamera(){
        camera.position.set(menuGUI.cameraxPos*isZero(menuGUI.cameraZoom),menuGUI.camerayPos*isZero(menuGUI.cameraZoom),menuGUI.camerazPos*isZero(menuGUI.cameraZoom));
        camera.lookAt(menuGUI.cameraxDir,menuGUI.camerayDir,menuGUI.camerazDir);
        actuaPosCameraHTML();
    }

    function actuaPosCameraHTML(){
        document.forms["controle"].PosX.value = isZero(menuGUI.cameraxPos);
        document.forms["controle"].PosY.value = isZero(menuGUI.camerayPos);
        document.forms["controle"].PosZ.value = isZero(menuGUI.camerazPos); 
        document.forms["controle"].DirX.value = isZero(menuGUI.cameraxDir);
        document.forms["controle"].DirY.value = isZero(menuGUI.camerayDir);
        document.forms["controle"].DirZ.value = isZero(menuGUI.camerazDir);
    }
    document.getElementById("webgl").appendChild(rendu.domElement);

    rendu.render(scene, camera);


    function reAffichage(){
        setTimeout(function(){
            posCamera();
    }, 200);
        rendu.render(scene, camera);
    }


    function renduAnim(){
        stats.update();
        requestAnimationFrame(renduAnim);
        rendu.render(scene, camera);
    }

}