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

    let ProprieteCbe = new THREE.LineBasicMaterial({ 
        color:"#FF0000",
        linewidth: 5   
    });

    let nb = 100;
    let R = 1.5;
    let ch = 1;
    let PtsTab = PtsCourbePara(ch,R,nb);
    let courbePara = new THREE.Line(PtsTab, ProprieteCbe);
    scene.add(courbePara);
    let sphereGeom1 = new THREE.SphereGeometry(R, 160, 60);
    let MaterialPhong = new THREE.MeshPhongMaterial({
        color: "#008799",
        opacity: 1,
        transparent: true,
        wireframe: false,
        emissive: 0x000000,
        specular:"#378484", 
        flatShading: true,
        shininess: 50,
        side: THREE.DoubleSide,
    });
    let spherePhong = new THREE.Mesh(sphereGeom1,MaterialPhong);
    scene.add(spherePhong);
    
       var axes = new THREE.AxesHelper(1);    
       scene.add(axes);
    
    var gui = new dat.GUI();
    let menuGUI = new function(){
        this.cameraxPos = camera.position.x;
        this.camerayPos = camera.position.y;
        this.camerazPos = camera.position.z;
        this.cameraZoom = 1;
        this.cameraxDir = 0;
        this.camerayDir = 0;
        this.camerazDir = 0;
        this.choixCbe = 1;
        this.NbrePts = 100;
        this.CouleurCourbe = ProprieteCbe.color.getStyle();
        this.Epaisseur = ProprieteCbe.linewidth;
        this.AffichagePhong = true;
        this.spherePhongPosX = spherePhong.position.x;
        this.spherePhongPosY = spherePhong.position.y;
        this.spherePhongPosZ = spherePhong.position.z;
        this.CouleurPhong = MaterialPhong.color.getStyle();
        this.opacitePhong = MaterialPhong.opacity;
        this.emissivePhong = MaterialPhong.emissive.getHex();
        this.specularPhong = MaterialPhong.specular.getStyle();
        this.brillancePhong = MaterialPhong.shininess;
        if(MaterialPhong.flatShading)
            this.lissage = "Oui";
        else 
            this.lissage = "Non";
        if(MaterialPhong.wireframe)
            this.FilDeFer = "Oui";
        else 
            this.FilDeFer = "Non";
        switch(MaterialPhong.side){
            case 1 : this.faces = "Avant"; break;
            case 0 : this.faces = "Arriere"; break;
            case 2 : this.faces = "DeuxFaces";
        }
        
        this.actualisation = function () {
        posCamera();
        reAffichage();
        };
    }; 
    ajoutCameraGui(gui,menuGUI,camera)
    ajoutPropriete(gui, menuGUI);
    ajoutSpehrePhong(gui, menuGUI);
    gui.add(menuGUI, "actualisation");
    menuGUI.actualisation();
    renduAnim();
   
    document.getElementById("webgl").appendChild(rendu.domElement);
      
    rendu.render(scene, camera);
    function posCamera(){
        camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom),menuGUI.camerayPos*testZero(menuGUI.cameraZoom),menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
        camera.lookAt(menuGUI.cameraxDir,menuGUI.camerayDir,menuGUI.camerazDir);
        actuaPosCameraHTML(camera);
    }
   
    function actuaPosCameraHTML(xPos, yPos, zPos,xDir, yDir, zDir){
        document.forms["controle"].PosX.value = xPos;
        document.forms["controle"].PosY.value = yPos;
        document.forms["controle"].PosZ.value = zPos;
        document.forms["controle"].DirX.value = xDir;
        document.forms["controle"].DirY.value = yDir;
        document.forms["controle"].DirZ.value = zDir;
    }
   
    function ajoutCameraGui(gui,menuGUI,camera){
        let guiCamera = gui.addFolder("Camera");
        guiCamera.add(menuGUI,"cameraxPos",-10,10).onChange(function () {
            camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
            actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
            camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
        });
        guiCamera.add(menuGUI,"camerayPos",-10,10).onChange(function () {
            camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
            actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
            camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
        });
        guiCamera.add(menuGUI,"camerazPos",-10,10).onChange(function () {
            camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
            actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
            camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
        });
        guiCamera.add(menuGUI,"cameraZoom",-10,10).onChange(function () {
            camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
            camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
        });
        guiCamera.add(menuGUI,"cameraxDir",-10,10).onChange(function () {
            camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
            actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
            camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
        });
        guiCamera.add(menuGUI,"camerayDir",-10,10).onChange(function () {
            camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
            actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
            camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
        });
        guiCamera.add(menuGUI,"camerazDir",-10,10).onChange(function () {
            camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));    actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
            camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
        });
    }
    
    function ajoutPropriete(gui,menuGUI){
        let guiChoixCbe = gui.addFolder("Propriété des courbes");
        guiChoixCbe.add(menuGUI,"choixCbe",[1,2,3,4]).onChange(function(){
            ch = parseInt(menuGUI.choixCbe);
            PtsTab = PtsCourbePara(ch,R,nb);
            if(courbePara) 
                scene.remove(courbePara);
            courbePara = new THREE.Line(PtsTab, ProprieteCbe);
            scene.add(courbePara);
        });

        guiChoixCbe.add(menuGUI,"NbrePts",10,1000).onChange(function(){
            nb = Math.ceil(menuGUI.NbrePts);
            PtsTab = PtsCourbePara(ch,R,nb);
            if (courbePara) scene.remove(courbePara);
            courbePara = new THREE.Line(PtsTab, ProprieteCbe);
            scene.add(courbePara);
        });

        guiChoixCbe.add(menuGUI,"Epaisseur",3,10).onChange(function(){
            menuGUI.Epaisseur = Math.ceil(menuGUI.Epaisseur);
            ProprieteCbe.linewidth = Math.ceil(menuGUI.Epaisseur);
        });

        guiChoixCbe.addColor(menuGUI,"CouleurCourbe").onChange(function(evt){
            ProprieteCbe.color.setStyle(evt);
        }); 
    }

    function ajoutSpehrePhong(gui, menuGUI){
        let guiSpherePhong = gui.addFolder("Sphère : Phong"); 
        gui.add(menuGUI,"AffichagePhong").onChange(function(evt){
            if(!evt) 
                scene.remove(spherePhong);
            else 
                scene.add(spherePhong);
        });

        guiSpherePhong.add(menuGUI,"FilDeFer",["Oui","Non"]).onChange(function(evt){
            if (evt=="Oui") 
                MaterialPhong.wireframe = true;
            else 
                MaterialPhong.wireframe = false;
        });

        guiSpherePhong.addColor(menuGUI,"CouleurPhong").onChange(function(evt){
            MaterialPhong.color.setStyle(evt);
        });

        guiSpherePhong.addColor(menuGUI,"emissivePhong").onChange(function(evt){
            MaterialPhong.emissive = new THREE.Color(evt);
        });

        guiSpherePhong.addColor(menuGUI,"specularPhong").onChange(function(evt){
            MaterialPhong.specular = new THREE.Color(evt);
        });

        guiSpherePhong.add(menuGUI,"brillancePhong",0,200).onChange(function(evt){
            MaterialPhong.shininess = evt;
        });

        guiSpherePhong.add(menuGUI,"lissage",["Oui","Non"]).onChange(function(evt){
            if (evt=="Oui") 
                MaterialPhong.flatShading = true;
            else 
                MaterialPhong.flatShading = false; 
        });

        guiSpherePhong.add(menuGUI,"opacitePhong",0,1).onChange(function(evt){
            MaterialPhong.opacity = evt;
        }); 

        guiSpherePhong.add(menuGUI,"faces",["Avant","Arriere","DeuxFaces"]).onChange(function(evt){
            if (evt == "Avant") 
                MaterialPhong.side = 1;
            else if (evt == "Arriere") 
                MaterialPhong.side = 0;
            else 
                MaterialPhong.side = 2;
        }); 
    }

    function reAffichage(){
        setTimeout(function (){ 
        
        }, 200);
        rendu.render(scene, camera);
    }
    
    
    function renduAnim() {
        stats.update();
        requestAnimationFrame(renduAnim);
        rendu.render(scene, camera);
    }
    
}
   
function repere(MaScene){ 
    var PointO3 = new THREE.Vector3(0,0,0);
    var vecI = new THREE.Vector3(1, 0, 0);
    var vecJ = new THREE.Vector3(0, 1, 0);
    var vecK = new THREE.Vector3(0, 0, 1);
    vecteur(MaScene,PointO3,vecI, 0xFF0000, 0.25, 0.125);
    vecteur(MaScene,PointO3,vecJ, 0x00FF00, 0.25, 0.125);
    vecteur(MaScene,PointO3,vecK, 0x0000FF, 0.25, 0.125);
}
    
function vecteur(MaScene, A, B, CoulHexa, longCone, RayonCone){
    var vecAB = new THREE.Vector3(B.x-A.x, B.y-A.y, B.z-A.z);
    vecAB.normalize();
    MaScene.add(new THREE.ArrowHelper(vecAB, A, B.distanceTo(A), CoulHexa, longCone, RayonCone ));
}


const PrecisionArrondi=50;
const epsilon = 0.00000001;
function testZero(x){
    var val=parseFloat(Number(x).toPrecision(PrecisionArrondi));
    if (parseFloat(Math.abs(x).toPrecision(PrecisionArrondi))<epsilon) val=0;
    return val;
}
   

function spereJS(scene, rendu, camera){
    const geometry = new THREE.SphereGeometry(15, 32, 16);
    const material = new THREE.MeshBasicMaterial({color: 0xffff00});
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    function animate(){
        requestAnimationFrame(animate);

        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;

        
    };

    animate();    
    rendu.render(scene, camera);
}

function PtsCourbePara(ch,R,nb){
    let points = new Array(nb+1);
    switch (ch){
        case 1:
            for(var k=0; k<=nb; k++){
                let t2=k/nb*2*Math.PI; 
                t2 = t2.toPrecision(PrecisionArrondi);
                let x0 = R*Math.cos(t2);
                let y0 = R*Math.sin(t2);    
                points[k] = new THREE.Vector3(x0,y0,0);
            }
            break;
        case 2:
            for(var k=0; k<=nb; k++){
                let t2 = -Math.PI/2+k/nb*Math.PI; 
                t2 = t2.toPrecision(PrecisionArrondi);
                let x0 = R*Math.cos(t2);
                let z0 = R*Math.sin(t2);    
                points[k] = new THREE.Vector3(x0,0,z0);
            }
            break;
        case 3:
            let a = 0.75 * R; 
            let b = R-a;
            for(var k=0;k<=nb;k++){
                let t2=k/nb*2*Math.PI; 
                t2 = t2.toPrecision(PrecisionArrondi);
                let x0,y0,z0;
                with(Math){
                    x0 = a*cos(t2)+b*cos(3.*t2);
                    y0 = a*sin(t2)-b*sin(3.*t2);
                    z0 = 2.*sqrt(a*b)*sin(2.*t2);
                }
                points[k] = new THREE.Vector3(x0,y0,z0);
            }
            break;
        case 4:
            let n = 3;
            for(var k=0; k<=nb; k++){
                let t2 = Math.PI*n*(-0.5+k/nb);
                t2 = t2.toPrecision(PrecisionArrondi);
                let x0,y0,z0;
                with(Math){
                    x0 = R*cos(t2/n)*cos(t2);
                    y0 = R*cos(t2/n)*sin(t2);
                    z0 = R*sin(t2/n);
                }
                points[k] = new THREE.Vector3(x0,y0,z0);
            }
            break;
    }
    let PtsCbePara = new THREE.BufferGeometry().setFromPoints(points);
    return PtsCbePara;
}