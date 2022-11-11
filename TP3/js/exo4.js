const borneVue = 36;

const h = 2.75;
const g = new THREE.Vector3(0,0,-10);
const Rb = 1.75;
const angleRotationBalle = Math.PI/6;
let angle = 0
const nbrSegmentParCbe = 50;
const nb = 200;
const epai = 4;
const dimPt = 0.05;
let PtCourant = 0;
let CbeCourante = 0;
let tabPtsControleBezier = new Array(3);
for(let j = 0;j<3;j++) 
  tabPtsControleBezier[j] = new THREE.Vector3(0,0,0);
let nbeCbes=0;
 
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

    const PlanSolGeometry = new THREE.PlaneGeometry(75, 45, 70, 70);
    const PlanSol = surfPhong(PlanSolGeometry,"#559955",1,true,"#335533");
    PlanSol.receiveShadow = true; 
    PlanSol.castShadow = true;
    scene.add(PlanSol);
    const PlanFond = surfPhong(PlanSolGeometry,"#8888FF",1,true,"#335533");
    PlanFond.rotateX(Math.PI/2);
    PlanFond.translateZ(-10);
    PlanFond.receiveShadow = true; 
    PlanFond.castShadow = true;
    scene.add(PlanFond);
    
    let P0 = new THREE.Vector3(0,0,h+Rb); 
    let vectP0=new THREE.Vector3(6*Math.cos(Math.PI/4),0,6*Math.sin(Math.PI/4)); 
    vecteurTan(scene,P0,vectP0,"#FF00FF",0.25, 0.125);
    tracePt(scene, P0, "#008888",dimPt,true);
    let tabPtCourbeQ = new Array(4);
    tabPtCourbeQ = BezierAvantRebond(P0,h,vectP0);
    let  cbeBezCourbeQ = TraceBezierQuadratique(P0, tabPtCourbeQ[1], tabPtCourbeQ[2], 100,"#005555",epai);
    scene.add(cbeBezCourbeQ);

    for(let k=0;k<2;k++) 
        segment(scene,tabPtCourbeQ[k],tabPtCourbeQ[k+1],"#FF0000",epai);

    tracePt(scene, tabPtCourbeQ[1], "#008888",dimPt,true);
    tracePt(scene, tabPtCourbeQ[2], "#008888",dimPt,true);
    nbeCbes++;

    for(let j=0;j<3;j++)
        tabPtsControleBezier[j] = new THREE.Vector3(tabPtCourbeQ[j].x,0,tabPtCourbeQ[j].z);

    let tabPtCourbeR = new Array(4);
    for(let k=0;k<4;k++) 
        tabPtCourbeR[k] = new THREE.Vector3(0,0,0);
    
    tabPtCourbeR = BezierApresRebond(scene,tabPtCourbeQ);
    let  cbeBezCourbeR = TraceBezierQuadratique(tabPtCourbeR[0], tabPtCourbeR[1], tabPtCourbeR[2], 100,"#FFFF00",epai);
    scene.add(cbeBezCourbeR);

    for(let k=0;k<2;k++) 
        segment(scene,tabPtCourbeR[k],tabPtCourbeR[k+1],"#FF0000",epai);

    tracePt(scene, tabPtCourbeR[1], "#008888",dimPt,true);
    tracePt(scene, tabPtCourbeR[2], "#008888",dimPt,true);
    nbeCbes++;

    for(let j=0;j<3;j++)
        tabPtsControleBezier[tabPtsControleBezier.length] = new THREE.Vector3(tabPtCourbeR[j].x,0,tabPtCourbeR[j].z);

    do{
        tabPtCourbeR = BezierApresRebond(scene, tabPtCourbeR);
        cbeBezCourbeR = TraceBezierQuadratique(tabPtCourbeR[0], tabPtCourbeR[1], tabPtCourbeR[2], 100, "#FFFF00", epai);
        for(let k=0;k<2;k++) 
            segment(scene,tabPtCourbeR[k],tabPtCourbeR[k+1],"#FF0000",epai);
            
        tracePt(scene, tabPtCourbeR[1], "#008888", dimPt, true);
        tracePt(scene, tabPtCourbeR[2], "#008888", dimPt, true);
        nbeCbes++;
        for(let j=0;j<3;j++)
            tabPtsControleBezier[tabPtsControleBezier.length] = new THREE.Vector3(tabPtCourbeR[j].x,0,tabPtCourbeR[j].z);

        scene.add(cbeBezCourbeR);
        }
    while(tabPtCourbeR[0].distanceTo(tabPtCourbeR[2])>.95);

    let sphereGeometry = new THREE.SphereGeometry(Rb, 130, 160);
    let sphere = surfPhong(sphereGeometry, "#FFFF00", 1, true, "#FFFF00");
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    let cbeSurBalle = traceCourbePara(nb,"#FFFFFF",epai);
    let pos = PtSurBez2(tabPtsControleBezier[3*CbeCourante],tabPtsControleBezier[3*CbeCourante+1],tabPtsControleBezier[3*CbeCourante+2],PtCourant/(nbrSegmentParCbe));
    sphere.position.set(pos.x, pos.y, pos.z);
    sphere.rotateY(angle*angleRotationBalle);
    cbeSurBalle.translateX(pos.x);
    cbeSurBalle.translateY(pos.y);
    cbeSurBalle.translateZ(pos.z);
    cbeSurBalle.rotateY(angle*angleRotationBalle);
    angle++;
    scene.add(sphere);
    scene.add(cbeSurBalle);

    let gui = new dat.GUI();
    let menuGUI = new function(){
        this.cameraxPos = 7;
        this.camerayPos = -30;
        this.camerazPos = 6;
        this.cameraZoom = 1;
        this.cameraxDir = 7;
        this.camerayDir = 0;
        this.camerazDir = 5;
            
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
        camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom),menuGUI.camerayPos*testZero(menuGUI.cameraZoom),menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
        camera.lookAt(menuGUI.cameraxDir,menuGUI.camerayDir,menuGUI.camerazDir);
        actuaPosCameraHTML();
    }
    
    function actuaPosCameraHTML(){
        document.forms["controle"].PosX.value = testZero(menuGUI.cameraxPos);
        document.forms["controle"].PosY.value = testZero(menuGUI.camerayPos);
        document.forms["controle"].PosZ.value = testZero(menuGUI.camerazPos); 
        document.forms["controle"].DirX.value = testZero(menuGUI.cameraxDir);
        document.forms["controle"].DirY.value = testZero(menuGUI.camerayDir);
        document.forms["controle"].DirZ.value = testZero(menuGUI.camerazDir);
    }

    document.getElementById("webgl").appendChild(rendu.domElement);
    
    rendu.render(scene, camera);
    
    function reAffichage(){
        setTimeout(function(){
            angle++;
            if (sphere) 
                scene.remove(sphere);
            if (cbeSurBalle) 
                scene.remove(cbeSurBalle);
            posCamera();
            sphere = surfPhong(sphereGeometry,"#FFFF00",1,true,"#223322");
            cbeSurBalle.translateX(-pos.x);
            cbeSurBalle.translateY(-pos.y);
            cbeSurBalle.translateZ(-pos.z);
            pos = PtSurBez2(tabPtsControleBezier[3*CbeCourante], tabPtsControleBezier[3*CbeCourante+1], tabPtsControleBezier[3*CbeCourante+2], (PtCourant%nbrSegmentParCbe)/(nbrSegmentParCbe));
            sphere.rotateY(angle*angleRotationBalle);
            sphere.position.set(pos.x, pos.y, pos.z);
            sphere.castShadow = true;
            sphere.receiveShadow = true;
            scene.add(sphere);
            cbeSurBalle = traceCourbePara(nb,"#FFFFFF",epai);
            cbeSurBalle.translateX(pos.x);
            cbeSurBalle.translateY(pos.y);
            cbeSurBalle.translateZ(pos.z);
            cbeSurBalle.rotateY(angle*angleRotationBalle);
            scene.add(cbeSurBalle);
            PtCourant++;
            if(CbeCourante<nbeCbes){
                if(PtCourant%nbrSegmentParCbe==0) 
                    CbeCourante++
                if(CbeCourante<nbeCbes)
                    reAffichage();
                else{
                    scene.remove(cbeSurBalle);
                    pos = PtSurBez2(tabPtsControleBezier[3*(CbeCourante-1)], tabPtsControleBezier[3*(CbeCourante-1)+1], tabPtsControleBezier[3*(CbeCourante-1)+2],1);
                    sphere.position.set(pos.x, pos.y, pos.z);
                    sphere.castShadow = true;
                    sphere.receiveShadow = true;
                    scene.add(sphere);
                    cbeSurBalle = traceCourbePara(nb,"#FFFFFF",epai);
                    cbeSurBalle.translateX(pos.x);
                    cbeSurBalle.translateY(pos.y);
                    cbeSurBalle.translateZ(pos.z);
                    scene.add(cbeSurBalle);
                }
            }   
        }, 50);
        rendu.render(scene, camera);
    }
    
    function renduAnim() {
        stats.update();
        requestAnimationFrame(renduAnim);
        rendu.render(scene, camera);
    }
}