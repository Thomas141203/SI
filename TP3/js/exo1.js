const borneVue = 50;
 
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

    const PlanSol = surfPhong(new THREE.PlaneGeometry(75, 25, 30, 30), "#FF2255", 1, true, "#335533");
    PlanSol.position.z = -5;
    PlanSol.receiveShadow = true; 
    PlanSol.castShadow = true;
    scene.add(PlanSol);
    
    let coef = parseFloat(prompt("Valeur de k ? "));
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
    tracePt(scene, P0, "#008888", 0.05, true);
    tracePt(scene, P1, "#008888", 0.05, true);
    tracePt(scene, P2, "#008888", 0.05, true);
    tracePt(scene, P3, "#880000", 0.05, true);
    tracePt(scene, M1, "#000088", 0.05, true);
    tracePt(scene, M2, "#880088", 0.05, true);
    tracePt(scene, M3, "#880088", 0.05, true);
    scene.add(TraceBezierCubique(P0, P1, P2, P3, 100, "#FF00FF", 5));
    scene.add(TraceBezierCubique(M0, M1, M2, M3, 100, "#0000FF", 5));
    scene.add(lathe(50, 150, P0, P1, P2, P3, "#884400", 1, false));
    scene.add(lathe(50, 150, M0, M1, M2, M3, "#008844", 1, false));
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

function lathe(nbePtCbe, nbePtRot, P0, P1, P2, P3, coul, opacite, bolTranspa){
    let p0 = new THREE.Vector2(P0.x,P0.y);
    let p1 = new THREE.Vector2(P1.x,P1.y);
    let p2 = new THREE.Vector2(P2.x,P2.y);
    let p3 = new THREE.Vector2(P3.x,P3.y);
    let Cbe3 = new THREE.CubicBezierCurve(p0,p1,p2,p3);
    let points = Cbe3.getPoints(nbePtCbe);
    let latheGeometry = new THREE.LatheGeometry(points,nbePtRot,0,2*Math.PI);
    let lathe = surfPhong(latheGeometry,coul,opacite,bolTranspa,"#223322");
    return lathe;
}