const borneVue = 50;

function latheBezTab(nbePtCbe,nbePtRot,tabP,coul,opacite,bolTranspa){
    let tabp= new Array(tabP.length);
    for (let j=0;j<tabp.length;j++)
    tabp[j]= new THREE.Vector2(tabP[j].x,tabP[j].y);
    let points = new Array(nbePtCbe+1);
    for(let k=0;k<=nbePtCbe;k++){
    let t2=k/nbePtCbe; 
    t2=t2.toPrecision(PrecisionArrondi);
    let v0= new THREE.Vector2(0,0);
    v0.addScaledVector(tabp[0],Ber(t2,0,tabp.length-1));
    for(let j=1;j<tabp.length;j++){
    let v1= new THREE.Vector2(0,0);
    v1.addScaledVector(tabp[j],Ber(t2,j,tabp.length-1));
    v0.add(v1);
    }
    points[k] = new THREE.Vector2(v0.x,v0.y);
    }
    let latheGeometry = new THREE.LatheGeometry(points,nbePtRot,0,2*Math.PI); 
    let lathe = surfPhong(latheGeometry,coul,opacite,bolTranspa,"#223322");
    return lathe;
}

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

    const largPlan = 75;
    const hautPlan = 25;
    const nbSegmentLarg = 30;
    const nbSegmentHaut = 30;
    const PlanSolGeometry = new THREE.PlaneGeometry(largPlan,hautPlan,nbSegmentLarg,nbSegmentHaut);
    const PlanSol = surfPhong(PlanSolGeometry,"#FF2255",1,true,"#335533");
    PlanSol.position.z = -4;
    PlanSol.receiveShadow = true; 
    PlanSol.castShadow = true;
    scene.add(PlanSol);

    let coef = 1;
    let P0 = new THREE.Vector3(0.6,4,0);
    let P1 = new THREE.Vector3(1,1,0);
    let P2 = new THREE.Vector3(2,1,0);
    let P3 = new THREE.Vector3(2.5,0,0);
    let M0 = new THREE.Vector3(P3.x,P3.y,0);
    let M1 = new THREE.Vector3(0,0,0);
    let M2 = new THREE.Vector3(3,-3,0);
    let M3 = new THREE.Vector3(0.5,-2,0);
    let vP2P3 = new THREE.Vector3(0,0,0);
    let vTan2 = new THREE.Vector3(0,0,0);
    vP2P3.subVectors(P3,P2);
    vTan2.addScaledVector(vP2P3,coef);
    M1.addVectors(M0,vTan2);    
    let tabP= new Array(4);   
    let tabP1= new Array(3);

    for (let k=0;k<tabP.length;k++){
        tabP[k]= new THREE.Vector3(0,0,0);
    }
    for (let k=0;k<tabP1.length;k++){
        tabP1[k]= new THREE.Vector3(0,0,0);
    }

    tabP[0].copy(P0);tabP[1].copy(P1);
    tabP[2].copy(P2);tabP[3].copy(P3); 
    tabP1[0].copy(M0);tabP1[1].copy(M1);tabP1[2].copy(M3)
    let epai=5;
    let nbPtCB=50;
    let nbePtRot=150;
    let dimPt=0.075;

    for (let k=0;k<tabP.length-1;k++)
        tracePt(scene, tabP[k], "#008888",dimPt,true);

    tracePt(scene, P3, "#000000",dimPt,true);

    for (let k=1;k<tabP1.length;k++)
        tracePt(scene, tabP1[k], "#880088",dimPt,true);

    let lathe1 = latheBezTab(nbPtCB,nbePtRot,tabP,"#884400",0.95,false); 
    let lathe2 = latheBezTab(nbPtCB,nbePtRot,tabP1,"#008844",0.95,false);
    scene.add(lathe1);
    scene.add(lathe2);
    let cbeBez1 = traceBezierTab(tabP,100,"#885599",epai);
    scene.add(cbeBez1);
    let cbeBez2 = traceBezierTab(tabP1,100,"#88FF99",epai);
    scene.add(cbeBez2);

    let gui = new dat.GUI();
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

    function reAffichage() {
        setTimeout(function () {
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