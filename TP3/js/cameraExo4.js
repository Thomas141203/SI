function cameraLumiere(camera){
    camera.up = new THREE.Vector3( 0, 0, 1 );
    let xPos = 4;
    let yPos = -25;
    let zPos = 4;
    let xDir = 0;
    let yDir = 0;
    let zDir = 0;
    camera.position.set(xPos, yPos, zPos);
    camera.lookAt(xDir, yDir, zDir);
    actuaPosCameraHTML(xPos, yPos, zPos,xDir, yDir, zDir);
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
    guiCamera.add(menuGUI,"cameraxPos",-borneVue,borneVue).onChange(function () {
        camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
        actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
        camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
    });
    guiCamera.add(menuGUI,"camerayPos",-borneVue,borneVue).onChange(function () {
        camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
        actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
        camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
    });
    guiCamera.add(menuGUI,"camerazPos",-borneVue,borneVue).onChange(function () {
        camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
        actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
        camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
    });
    guiCamera.add(menuGUI,"cameraZoom",-10,10).onChange(function () {
        camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
        camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
    });
    guiCamera.add(menuGUI,"cameraxDir",-borneVue,borneVue).onChange(function () {
        camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
        actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
        camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
    });
    guiCamera.add(menuGUI,"camerayDir",-borneVue,borneVue).onChange(function () {
        camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
        actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
        camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
    });
    guiCamera.add(menuGUI,"camerazDir",-borneVue,borneVue).onChange(function () {
        camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
        actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
        camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
    });
}

function planRepere(scene){
    const geometry = new THREE.PlaneGeometry(25, 25, 30, 30);
    const planeR = surfPhong(geometry,"#FF5555",1,true,"#AAFFFF");
    const planeG = surfPhong(geometry,"#336633",1,true,"#FFAAFF");
    const planeB = surfPhong(geometry,"#AAAAFF",1,true,"#FFAAAA");
    planeR.rotateX(Math.PI/2);
    planeB.rotateX(Math.PI/2);
    planeB.rotateY(Math.PI/2);
    planeR.receiveShadow = true; 
    planeR.castShadow = true;
    planeG.receiveShadow = true; 
    planeG.castShadow = true;
    planeB.receiveShadow = true; 
    planeB.castShadow = true;
    scene.add(planeR);
    scene.add(planeG);
    scene.add(planeB);
}

function lumiere(scene){
    let lumPt = new THREE.PointLight(0xff55ff);
    lumPt.position.set(2,-15,10.3);
    lumPt.intensity = 0.51;
    lumPt.shadow.camera.far=2000;
    lumPt.shadow.camera.near=0;
    scene.add(lumPt);
    let lumPt1 = new THREE.PointLight(0x00ffff);
    lumPt1.castShadow = true;
    lumPt1.shadow.camera.far=2000;
    lumPt1.shadow.camera.near=0;
    lumPt1.position.set(5,5,15);
    lumPt1.intensity = 0.751;
    scene.add(lumPt1);
    let dCon = 0.51;
    let spotConique1 = new THREE.SpotLight(0x00FFFF);
    spotConique1.position.set(10, 0, 10.5);
    spotConique1.target.position.set(8,0,0);
    spotConique1.target.updateMatrixWorld();
    spotConique1.castShadow = true;
    spotConique1.shadow.camera.left = -dCon;
    spotConique1.shadow.camera.right = dCon;
    spotConique1.shadow.camera.top = dCon;
    spotConique1.shadow.camera.bottom = -dCon;
    spotConique1.shadow.camera.near =0.2;
    spotConique1.shadow.camera.far =80;
    spotConique1.shadow.camera.fov = 20;
    spotConique1.shadow.radius = 1;
    spotConique1.intensity = 2.5;
    spotConique1.angle = Math.PI/12;
    spotConique1.shadow.mapSize = new THREE.Vector2(Math.pow(2,10), Math.pow(2,10));
    scene.add(spotConique1);
    let visualisationConeSpot = new THREE.SpotLightHelper(spotConique1);
    scene.add(visualisationConeSpot);
    let dCon1=0.1;
    let spotConique2 = new THREE.SpotLight(0xFF00FF);
    spotConique2.position.set(3, -6, 1);
    spotConique2.target.position.set(7,1,4);
    spotConique2.target.updateMatrixWorld();
    spotConique2.castShadow = true;
    spotConique2.shadow.camera.left = -dCon1;
    spotConique2.shadow.camera.right = dCon1;
    spotConique2.shadow.camera.top = dCon1;
    spotConique2.shadow.camera.bottom = -dCon1;
    spotConique2.shadow.camera.far=80;
    spotConique2.shadow.camera.near=0.2;
    spotConique2.shadow.radius = 10;
    spotConique2.intensity = 2.5;
    spotConique2.angle = Math.PI/24;
    spotConique2.shadow.mapSize = new THREE.Vector2(Math.pow(2,10), Math.pow(2,10)); 
    scene.add(spotConique2);
    let visualisationConeSpot2 = new THREE.SpotLightHelper(spotConique2);
    scene.add(visualisationConeSpot2);
     
    let spotConique3 = new THREE.SpotLight(0xFFFF00);
    spotConique3.position.set(8, -6, 1);
    spotConique3.target.position.set(6,1,2);
    spotConique3.target.updateMatrixWorld();
    spotConique3.castShadow = true;
    spotConique3.shadow.camera.left = -dCon1;
    spotConique3.shadow.camera.right = dCon1;
    spotConique3.shadow.camera.top = dCon1;
    spotConique3.shadow.camera.bottom = -dCon1;
    spotConique3.shadow.camera.far=80;
    spotConique3.shadow.camera.near=0.2;
    spotConique3.shadow.radius = 10;
    spotConique3.intensity = 8.5;
    spotConique3.angle = Math.PI/24;
    spotConique3.shadow.mapSize = new THREE.Vector2(Math.pow(2,10), Math.pow(2,10)); 
    scene.add(spotConique3);
    let visualisationConeSpot3 = new THREE.SpotLightHelper(spotConique3);
    scene.add(visualisationConeSpot3);
    const dCyl=0.2;
    let LumiereDirectionnelle = new THREE.DirectionalLight(0x8888FF);
    LumiereDirectionnelle.position.set(1, 10, 1);
    LumiereDirectionnelle.target.position.set(1,0,1);
    LumiereDirectionnelle.target.updateMatrixWorld();
    LumiereDirectionnelle.castShadow = true;
    LumiereDirectionnelle.shadow.camera.near = 0.2;
    LumiereDirectionnelle.shadow.camera.far = 200;
    LumiereDirectionnelle.shadow.camera.left = -dCyl;
    LumiereDirectionnelle.shadow.camera.right = dCyl;
    LumiereDirectionnelle.shadow.camera.top = dCyl;
    LumiereDirectionnelle.shadow.camera.bottom = -dCyl;
    LumiereDirectionnelle.intensity = 0.5;
    LumiereDirectionnelle.shadow.mapSize.width = Math.pow(2,10);
    LumiereDirectionnelle.shadow.mapSize.height = Math.pow(2,10);
    scene.add(LumiereDirectionnelle);
}