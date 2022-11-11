function init(){
    var stats = initStats();
    let rendu = new THREE.WebGLRenderer({antialias: true});
    rendu.shadowMap.enabled = true;
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 100);
    rendu.shadowMap.enabled = true;
    rendu.setClearColor(new THREE.Color(0xFFFFFF));
    rendu.setSize(window.innerWidth*.9, window.innerHeight*.9);
    cameraLumiere(camera);
    repere(scene);

    let n = 0;
    while (n<3 || isNaN(n))
        n = parseInt(prompt("Entrer le nombre de faces (entier naturel supérieur ou égal à 3)"));

    let h = 1.5; 
    let coulArete = "#44AAAA";
    let epai = 4;
    let CoulPt = "#BB88BB";
    let dimPt = 0.05;
    for(let k=0; k<n; k++) 
        faceEuler(scene, 1.5, n, k, h, coulArete, epai, CoulPt, dimPt);

    var gui = new dat.GUI();
    let menuGUI = new function(){
        this.cameraxPos = camera.position.x;
        this.camerayPos = camera.position.y;
        this.camerazPos = camera.position.z;
        this.cameraZoom = 1;
        this.cameraxDir = 0;
        this.camerayDir = 0;
        this.camerazDir = 0.5;
        
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

function faceEuler(MaScene,R,n,k,h,coulArete,epai,CoulPt,dimPt){
    let alpha = (n-2)*Math.PI/2/n;
    let co = Math.cos(alpha);
    let si = Math.sin(alpha);
    let PtA = new THREE.Vector3(-R*co,R*si,h);    
    let PtB = new THREE.Vector3(R*co,R*si,h);
    let PtC = new THREE.Vector3(PtB.x,PtB.y,0);
    let PtD = new THREE.Vector3(PtA.x,PtA.y,0);
    let PtBC = new THREE.Vector3(PtB.x,PtB.y,h);
    let PtAC = new THREE.Vector3(PtA.x,PtA.y,h);
    let PtCB = new THREE.Vector3(PtB.x,PtB.y,0);
    let PtDB = new THREE.Vector3(PtA.x,PtA.y,0);
    let cote = new THREE.Geometry();
    let CenHaut = new THREE.Vector3(0,0,h);
    let CenBas = new THREE.Vector3(0,0,0);
    if (k==0){
        tracePt(MaScene, CenHaut, "#FF00FF",dimPt);
        tracePt(MaScene, CenBas, "#FF00FF",dimPt);
    }

    let couvercle = new THREE.Geometry();
    let fond = new THREE.Geometry();
    couvercle.vertices = [ PtBC, PtAC, CenHaut];
    couvercle.faces = [ new THREE.Face3( 0, 1, 2 ) ]; 
    couvercle.rotateZ(k*2*Math.PI/n);

    let GCx=0, GCy=0,GCz=0;
    for (let j=0;j<3;j++){
        GCx += couvercle.vertices[j].x;
        GCy += couvercle.vertices[j].y;
        GCz += couvercle.vertices[j].z;
    }

    let PtGC = new THREE.Vector3(GCx/3.,GCy/3.,GCz/3.);
    let v1C= new THREE.Vector3(couvercle.vertices[1].x-couvercle.vertices[0].x,couvercle.vertices[1].y-couvercle.vertices[0].y,couvercle.vertices[1].z-couvercle.vertices[0].z);
    let v2C= new THREE.Vector3(couvercle.vertices[2].x-couvercle.vertices[0].x,couvercle.vertices[2].y-couvercle.vertices[0].y,couvercle.vertices[2].z-couvercle.vertices[0].z);
    vecteurProdVec(MaScene,PtGC,v1C,v2C,"#00FF00", 0.25, 0.125)
    let aretesCouvercleGeometrie = new THREE.EdgesGeometry( couvercle );
    let aretesCouvercle = new THREE.LineSegments( aretesCouvercleGeometrie, new THREE.LineBasicMaterial( { color: coulArete, linewidth:epai } ) );
    MaScene.add( aretesCouvercle );
    tracePt(MaScene, PtGC, "#FFFF00",dimPt);
    fond.vertices = [ PtDB, PtCB, CenBas];
    fond.faces = [ new THREE.Face3( 0, 1, 2 ) ]; 
    fond.rotateZ(k*2*Math.PI/n);
    let GHx=0, GHy=0,GHz=0;
    for (let j=0;j<3;j++){
        GHx += fond.vertices[j].x;
        GHy += fond.vertices[j].y;
        GHz += fond.vertices[j].z;
    }
    let PtGH = new THREE.Vector3(GHx/3.,GHy/3.,GHz/3.);
    let v1F= new THREE.Vector3(fond.vertices[1].x-fond.vertices[0].x,fond.vertices[1].y-fond.vertices[0].y,fond.vertices[1].z-fond.vertices[0].z);
    let v2F= new THREE.Vector3(fond.vertices[2].x-fond.vertices[0].x,fond.vertices[2].y-fond.vertices[0].y,fond.vertices[2].z-fond.vertices[0].z);
    vecteurProdVec(MaScene,PtGH,v1F,v2F,"#00FF00", 0.25, 0.125)
    let aretesFondGeometrie = new THREE.EdgesGeometry( fond );
    let aretesFond = new THREE.LineSegments( aretesFondGeometrie, new THREE.LineBasicMaterial( { color: coulArete, linewidth:epai } ) );
    MaScene.add( aretesFond );
    tracePt(MaScene, PtGH, "#FFFF00",dimPt);
    cote.vertices = [PtA, PtB, PtC, PtD];
    cote.faces = [new THREE.Face3(0, 1, 2), new THREE.Face3(0, 2, 3)];
    cote.rotateZ(k*2*Math.PI/n);
    let PtG = new THREE.Vector3((cote.vertices[2].x+cote.vertices[0].x)/2,(cote.vertices[2].y+cote.vertices[0].y)/2,(cote.vertices[2].z+cote.vertices[0].z)/2);
    let vAD= new THREE.Vector3(cote.vertices[1].x-cote.vertices[0].x,cote.vertices[1].y-cote.vertices[0].y,cote.vertices[1].z-cote.vertices[0].z);
    let vAC= new THREE.Vector3(cote.vertices[2].x-cote.vertices[0].x,cote.vertices[2].y-cote.vertices[0].y,cote.vertices[2].z-cote.vertices[0].z);
    vecteurProdVec(MaScene,PtG,vAD,vAC,"#000000", 0.25, 0.125)
    let aretesCoteGeometrie = new THREE.EdgesGeometry( cote );
    let aretesCote = new THREE.LineSegments( aretesCoteGeometrie, new THREE.LineBasicMaterial( { color: coulArete, linewidth:epai } ) );
    MaScene.add( aretesCote );
    tracePt(MaScene, PtG, "#FFFF00",dimPt);
    tracePt(MaScene, cote.vertices[0], CoulPt,dimPt);
    tracePt(MaScene, cote.vertices[3], CoulPt,dimPt);
    let could = "rgb("+Math.floor(55*(n-k)/n)+","+Math.floor(55*(k)/n)+","+Math.floor(15-14*Math.cos(k*108*Math.PI))+")";
    let coul = "rgb("+Math.floor(255*k/n)+","+Math.floor(255*(n-k)/n)+","+Math.floor(150+120*Math.cos(k*Math.PI))+")";
    let coteMaterial = new THREE.MeshPhongMaterial({
        color : coul,
        opacity: 0.75,
        transparent: true,
        wireframe: false, 
        shininess: 100, 
        specular: 0xFFFFFF,
        emissive: could,
        side: THREE.DoubleSide,
    });
    MaScene.add(new THREE.Mesh(fond, coteMaterial));
    MaScene.add(new THREE.Mesh(couvercle, coteMaterial));
    MaScene.add(new THREE.Mesh(cote, coteMaterial));
}