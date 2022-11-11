const borneVue = 20;
 
function init(){
    let stats = initStats();
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
    
    const PlanSolGeometry = new THREE.PlaneGeometry(75, 125, 30, 30);
    const PlanSol = surfPhong(PlanSolGeometry,"#FF2255",1,true,"#335533");
    PlanSol.position.z = -.4;
    PlanSol.receiveShadow = true; 
    PlanSol.castShadow = true;
    scene.add(PlanSol);
    let P0 = new THREE.Vector3(1,0,0);
    let P1 = new THREE.Vector3(1,1,0);
    let P2 = new THREE.Vector3(-1,1,0);
    let P3 = new THREE.Vector3(-1,0,0);
    let M0 = new THREE.Vector3(1,0,0);
    let M1 = new THREE.Vector3(0,0,1);
    let M2 = new THREE.Vector3(-1,0,0);
    let tabP= new Array(4);   
    let tabP1= new Array(3);

    for(let k=0;k<tabP.length;k++){
        tabP[k]= new THREE.Vector3(0,0,0);
    }

    for(let k=0;k<tabP1.length;k++){
        tabP1[k]= new THREE.Vector3(0,0,0);
    }

    tabP[0].copy(P0);tabP[1].copy(P1);
    tabP[2].copy(P2);tabP[3].copy(P3); 
    tabP1[0].copy(M0);tabP1[1].copy(M1);tabP1[2].copy(M2);
    tracePt(scene, P0, "#000000",0.025,true);
    tracePt(scene, P3, "#000000",0.025,true);
    for(let k=1;k<tabP1.length-1;k++)
        tracePt(scene, tabP1[k], "#FF8888",0.025,true);
    for(let k=0;k<tabP1.length-1;k++)
        segment(scene,tabP1[k],tabP1[k+1],'#0000FF',3);
    for(let k=1;k<tabP.length-1;k++)
        tracePt(scene, tabP[k], "#880088",0.025,true);
    for(let k=0;k<tabP.length-1;k++)
        segment(scene,tabP[k],tabP[k+1],'#FF0000',3);

    BezTab(scene, 100, tabP1, "#00FF00", 2);
    BezTab(scene, 100, tabP, "#00FFFF", 2);
    DeCasteljau_Version1(scene, M0, M1, M2, 0.5, 3, 0.025, 3);
    DeCasteljau_Version2(scene, P0, P1, P2, P3, 0.5, 3, 0.025, 3);

    let gui = new dat.GUI();
    let menuGUI = new function(){
        this.cameraxPos = camera.position.x;
        this.camerayPos = camera.position.y;
        this.camerazPos = camera.position.z;
        this.cameraZoom = 1;
        this.cameraxDir = -1;
        this.camerayDir = 0;
        this.camerazDir = 0.25;    
        this.actualisation = function(){
            posCamera();
            reAffichage();
        };
    };
    ajoutCameraGui(gui,menuGUI,camera);
    gui.add(menuGUI, "actualisation");
    menuGUI.actualisation();

    renduAnim();

    function posCamera(){
        camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom),menuGUI.camerayPos*testZero(menuGUI.cameraZoom),menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
        camera.lookAt(menuGUI.cameraxDir,menuGUI.camerayDir,menuGUI.camerazDir);
        actuaPosCameraHTML();
    }
 
    function actuaPosCameraHTML(){
        document.forms["controle"].PosX.value=testZero(menuGUI.cameraxPos);
        document.forms["controle"].PosY.value=testZero(menuGUI.camerayPos);
        document.forms["controle"].PosZ.value=testZero(menuGUI.camerazPos); 
        document.forms["controle"].DirX.value=testZero(menuGUI.cameraxDir);
        document.forms["controle"].DirY.value=testZero(menuGUI.camerayDir);
        document.forms["controle"].DirZ.value=testZero(menuGUI.camerazDir);
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