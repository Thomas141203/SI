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
    
    let R = 1.5;
    let n = 0;
    while(n<3 || isNaN(n)){
        n = parseInt(prompt("Entrer le nombre de faces (entier naturel supérieur ou égal à 3)"));
    }
    
    let h = 1.5; 
    let coulArete = "#44AAAA";
    let epai = 4;
    let CoulPt = "#BB88BB";
    let dimPt = 0.05;
    for(let k=0; k<n; k++){
        face(scene, R, n, k, h, coulArete, epai, CoulPt, dimPt);
    }

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
    rendu.render(scene, camera)
    
    function reAffichage(){
        setTimeout(function (){
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

function face(MaScene,R,n,k,h,coulArete,epai,CoulPt,dimPt){
    let alpha = (n-2)*Math.PI/2/n;
    let co = Math.cos(alpha);
    let si = Math.sin(alpha);
    let PtA = new THREE.Vector3(-R*co,R*si,h);    
    let PtB = new THREE.Vector3(R*co,R*si,h);
    let PtC = new THREE.Vector3(PtB.x,PtB.y,0);
    let PtD = new THREE.Vector3(PtA.x,PtA.y,0);
    let cote = new THREE.Geometry();
    cote.vertices = [PtA, PtB, PtC, PtD];
    cote.faces = [ new THREE.Face3( 0, 1, 2 ), new THREE.Face3( 0, 2, 3 )];
    cote.rotateZ(k*2*Math.PI/n);
    let PtG = new THREE.Vector3((cote.vertices[2].x+cote.vertices[0].x)/2,(cote.vertices[2].y+cote.vertices[0].y)/2,(cote.vertices[2].z+cote.vertices[0].z)/2);
    let vAD= new THREE.Vector3(cote.vertices[1].x-cote.vertices[0].x,cote.vertices[1].y-cote.vertices[0].y,cote.vertices[1].z-cote.vertices[0].z);
    let vAC= new THREE.Vector3(cote.vertices[2].x-cote.vertices[0].x,cote.vertices[2].y-cote.vertices[0].y,cote.vertices[2].z-cote.vertices[0].z);
    vecteurProdVec(MaScene,PtG,vAD,vAC,"#000000", 0.25, 0.125)
    let aretesGeometrie = new THREE.EdgesGeometry( cote );
    let aretes = new THREE.LineSegments( aretesGeometrie, new THREE.LineBasicMaterial( { color: coulArete, linewidth:epai } ) );
    MaScene.add( aretes );
    tracePt(MaScene, PtG, CoulPt,dimPt);
    tracePt(MaScene, cote.vertices[0], CoulPt,dimPt);
    tracePt(MaScene, cote.vertices[3], CoulPt,dimPt);
    
    let could = "rgb(" + Math.floor(55*(n-k)/n) + "," + Math.floor(55*(k)/n) + "," + Math.floor(15-14*Math.cos(k*108*Math.PI)) + ")";
    let coul = "rgb(" + Math.floor(255*k/n)+"," + Math.floor(255*(n-k)/n) + "," + Math.floor(150+120*Math.cos(k*Math.PI)) + ")";
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
    MaScene.add(new THREE.Mesh(cote, coteMaterial));
}