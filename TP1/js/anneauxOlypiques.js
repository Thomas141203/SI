
function anneau(MaScene, position, rotation, continent){ 
    let rayMajeur = 1;
    let rayMineur = 0.075;
    let nbeMeridien = 100;
    let nbeParallel = 20;
    let tore = new  THREE.TorusGeometry(rayMajeur, rayMineur, nbeParallel, nbeMeridien, Math.PI * 2)     
    let Material = new THREE.MeshPhongMaterial({
        color: continent,
        opacity: 0.75,
        transparent: false,
        wireframe: false,
        side :THREE.DoubleSide,
    });
    tore.rotateX(Math.PI/2+rotation/180*Math.PI);
    tore.translate(position.x,position.y,position.z);
    let anneau = new THREE.Mesh(tore, Material);
    MaScene.add(anneau);
}

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
    lumiere(scene);
    repere(scene);

    let largeur_anneau  = 1;
    let ecart_anneau  = 0.2;
    let bleu = new THREE.Vector3(-2*largeur_anneau-2*ecart_anneau,0,largeur_anneau/2);
    let jaune = new THREE.Vector3(-largeur_anneau-ecart_anneau,0,-largeur_anneau/2);
    let noir = new THREE.Vector3(0,0,largeur_anneau/2);
    let vert = new THREE.Vector3(largeur_anneau+ecart_anneau,0,-largeur_anneau/2);
    let rouge = new THREE.Vector3(2*largeur_anneau+2*ecart_anneau,0,largeur_anneau/2);
    let r = 20;
    anneau(scene, bleu, r, "#0000FF") 
    anneau(scene, jaune, -r, "#FFFF00") 
    anneau(scene, noir, r, "#000000") 
    anneau(scene, vert, -r, "#00FF00")
    anneau(scene, rouge, r, "#FF0000") 
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
    renduAnim();

    function posCamera(){
        camera.position.set(menuGUI.cameraxPos*isZero(menuGUI.cameraZoom),menuGUI.camerayPos*isZero(menuGUI.cameraZoom),menuGUI.camerazPos*isZero(menuGUI.cameraZoom));
        camera.lookAt(menuGUI.cameraxDir,menuGUI.camerayDir,menuGUI.camerazDir);
        actuaPosCameraHTML();
    }

    function actuaPosCameraHTML(){
        document.forms["controle"].PosX.value=isZero(menuGUI.cameraxPos);
        document.forms["controle"].PosY.value=isZero(menuGUI.camerayPos);
        document.forms["controle"].PosZ.value=isZero(menuGUI.camerazPos); 
        document.forms["controle"].DirX.value=isZero(menuGUI.cameraxDir);
        document.forms["controle"].DirY.value=isZero(menuGUI.camerayDir);
        document.forms["controle"].DirZ.value=isZero(menuGUI.camerazDir);
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