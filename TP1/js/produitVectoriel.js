
function init(){
    var stats = initStats();
    let rendu = new THREE.WebGLRenderer({ antialias: true });
    rendu.shadowMap.enabled = true;
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 100);
    rendu.shadowMap.enabled = true;
    rendu.setClearColor(new THREE.Color(0xFFFFFF));
    rendu.setSize(window.innerWidth*.9, window.innerHeight*.9);
    cameraLumiere(camera);
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

        this.actualisation = function(){
            posCamera();
            reAffichage();
        }; 
    }; 

    ajoutCameraGui(gui,menuGUI,camera)
    gui.add(menuGUI, "actualisation");
    menuGUI.actualisation();

    let origine = new THREE.Vector3(0,0,0);
    let vecU = new THREE.Vector3(-7,4,-4);
    let vecV = new THREE.Vector3(4,8,1);
    let vecW = new THREE.Vector3(4,-1,-8);
    let vecR = new THREE.Vector3(0,0,0);
    let vecNul = new THREE.Vector3(0,0,0);
    let scalaire = 1/9;
    vecU.multiplyScalar(scalaire);
    vecV.multiplyScalar(scalaire);
    vecW.multiplyScalar(scalaire);
    vecR.crossVectors(vecU, vecV);
    vecNul.subVectors(vecR, vecW);
    vecteur(scene, origine, vecU, 0xFFFF00, 0.25, 0.125)
    vecteur(scene, origine, vecV, 0xFF00FF, 0.25, 0.125)
    vecteur(scene, origine, vecW, 0x00FFFF, 0.25, 0.125)

    //Les vecteurs
    document.getElementById("result").innerHTML += " Une base (u, v, w) est orthonormale si elle est constituée de vecteurs de norme 1 et orthogonaux deux à deux. <br/>";
    document.getElementById("result").innerHTML += "On rappelle les vecteurs u, v et w conclutrespectivement :<br/>";
    document.getElementById("result").innerHTML += '<span id="vecU">u = (' + vecU.x + "; " + vecU.y + "; " + vecU.z + ")</span><br/>";
    document.getElementById("result").innerHTML += '<span id="vecV">v = (' + vecV.x + "; "+vecV.y + "; " + vecV.z + ")</span><br/>";
    document.getElementById("result").innerHTML += '<span id="vecW">w = (' + vecW.x + "; "+vecW.y + "; " + vecW.z + ")</span><br/><br/>";

    //Les normes des vecteurs
    document.getElementById("result").innerHTML += "Et les normes de ses vecteurs sont : <br/>";
    document.getElementById("result").innerHTML += '<span id="vecU"> norme de u : '+vecU.dot(vecU)+'<br/>';
    document.getElementById("result").innerHTML += '<span id="vecV"> norme de v : '+vecV.dot(vecV)+'<br/>';
    document.getElementById("result").innerHTML += '<span id="vecW"> norme de w : '+vecW.dot(vecW)+'<br/><br/>';

    //Produit scalaire
    document.getElementById("result").innerHTML += "u . v = " + vecU.dot(vecV) + "<br/>";
    document.getElementById("result").innerHTML += "u . w = " + vecU.dot(vecW) + "<br/>";
    document.getElementById("result").innerHTML += "u . w = " + vecV.dot(vecW) + "<br/>";
    document.getElementById("result").innerHTML += "On en conclut<br/>";

    document.getElementById("result").innerHTML += '<span id="vec0"> vecNul w - u &times; v ? : (' + vecNul.getComponent(0) + ", " + vecNul.getComponent(1) + ", " +  vecNul.getComponent(2) + ')<span><br/>'
    if (Math.abs(vecNul.dot(vecNul)) < 0.00001)
        document.getElementById("result").innerHTML += '<span id="directe"> La base est directe </span><br />';
    else document.getElementById("result").innerHTML += '<span id="indirecte"> La base est indirecte';
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