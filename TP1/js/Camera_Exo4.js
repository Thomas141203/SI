
function cameraLumiere(camera){
    camera.up = new THREE.Vector3( 0, 0, 1 );
    var xPos=0;
    var yPos=13;
    var zPos=0;
    var xDir=10;
    var yDir=0;
    var zDir=0;
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
    guiCamera.add(menuGUI,"cameraxPos",-15,15).onChange(function(){
        camera.position.set(menuGUI.cameraxPos*isZero(menuGUI.cameraZoom), menuGUI.camerayPos*isZero(menuGUI.cameraZoom), menuGUI.camerazPos*isZero(menuGUI.cameraZoom));
        actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);    camera.lookAt(isZero(menuGUI.cameraxDir), isZero(menuGUI.camerayDir), isZero(menuGUI.camerazDir));
    });

    guiCamera.add(menuGUI,"camerayPos",-15,15).onChange(function(){
        camera.position.set(menuGUI.cameraxPos*isZero(menuGUI.cameraZoom), menuGUI.camerayPos*isZero(menuGUI.cameraZoom), menuGUI.camerazPos*isZero(menuGUI.cameraZoom));
        actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
        camera.lookAt(isZero(menuGUI.cameraxDir), isZero(menuGUI.camerayDir), isZero(menuGUI.camerazDir));
    });

    guiCamera.add(menuGUI,"camerazPos",-15,15).onChange(function(){
        camera.position.set(menuGUI.cameraxPos*isZero(menuGUI.cameraZoom), menuGUI.camerayPos*isZero(menuGUI.cameraZoom), menuGUI.camerazPos*isZero(menuGUI.cameraZoom));
        actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
        camera.lookAt(isZero(menuGUI.cameraxDir), isZero(menuGUI.camerayDir), isZero(menuGUI.camerazDir));
    });
    
    guiCamera.add(menuGUI,"cameraZoom",-10,10).onChange(function(){
        camera.position.set(menuGUI.cameraxPos*isZero(menuGUI.cameraZoom), menuGUI.camerayPos*isZero(menuGUI.cameraZoom), menuGUI.camerazPos*isZero(menuGUI.cameraZoom));
        camera.lookAt(isZero(menuGUI.cameraxDir), isZero(menuGUI.camerayDir), isZero(menuGUI.camerazDir))
    });

    guiCamera.add(menuGUI,"cameraxDir",-15,15).onChange(function(){
        camera.position.set(menuGUI.cameraxPos*isZero(menuGUI.cameraZoom), menuGUI.camerayPos*isZero(menuGUI.cameraZoom), menuGUI.camerazPos*isZero(menuGUI.cameraZoom));
        actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
        camera.lookAt(isZero(menuGUI.cameraxDir), isZero(menuGUI.camerayDir), isZero(menuGUI.camerazDir))
    });

    guiCamera.add(menuGUI,"camerayDir",-15,15).onChange(function(){
        camera.position.set(menuGUI.cameraxPos*isZero(menuGUI.cameraZoom), menuGUI.camerayPos*isZero(menuGUI.cameraZoom), menuGUI.camerazPos*isZero(menuGUI.cameraZoom));
        actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
        camera.lookAt(isZero(menuGUI.cameraxDir), isZero(menuGUI.camerayDir), isZero(menuGUI.camerazDir))
    });

    guiCamera.add(menuGUI,"camerazDir",-15,15).onChange(function(){
        camera.position.set(menuGUI.cameraxPos*isZero(menuGUI.cameraZoom), menuGUI.camerayPos*isZero(menuGUI.cameraZoom), menuGUI.camerazPos*isZero(menuGUI.cameraZoom));
        actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
        camera.lookAt(isZero(menuGUI.cameraxDir), isZero(menuGUI.camerayDir), isZero(menuGUI.camerazDir))
    });
}

function lumiere(scene){
    let lumPt = new THREE.PointLight(0xff55ff);
    lumPt.position.set(3,3,-3);
    lumPt.intensity = 1;
    lumPt.shadow.camera.far=2000;
    lumPt.shadow.camera.near=0;
    let lumPt1 = new THREE.PointLight(0xffffff);
    lumPt1.castShadow = true;
    lumPt1.shadow.camera.far=2000;
    lumPt1.shadow.camera.near=0;
    lumPt1.position.set(5,5,15);
    lumPt1.intensity = 1;
    scene.add(lumPt1);
    let dCon=0.1;
    let spotConique1 = new THREE.SpotLight(0x44FF44);
    spotConique1.position.set(1, 1, 3);
    spotConique1.target.position.set(1,1,0);
    spotConique1.target.updateMatrixWorld();
    spotConique1.castShadow = true;
    spotConique1.shadow.camera.left = -dCon;
    spotConique1.shadow.camera.right = dCon;
    spotConique1.shadow.camera.top = dCon;
    spotConique1.shadow.camera.bottom = -dCon;
    spotConique1.shadow.camera.near = 0.2;
    spotConique1.shadow.camera.far = 80;
    spotConique1.shadow.camera.fov = 120;
    spotConique1.shadow.radius = 1;
    spotConique1.intensity = 0.5;
    spotConique1.angle = Math.PI/12;
    spotConique1.shadow.mapSize = new THREE.Vector2(Math.pow(2,10), Math.pow(2,10));
    scene.add(spotConique1);
    let dCon1=0.1;
    let spotConique2 = new THREE.SpotLight(0x4444FF);
    spotConique2.position.set(4, 1, 1);
    spotConique2.target.position.set(0,1,1);
    spotConique2.target.updateMatrixWorld();
    spotConique2.castShadow = true;
    spotConique2.shadow.camera.left = -dCon1;
    spotConique2.shadow.camera.right = dCon1;
    spotConique2.shadow.camera.top = dCon1;
    spotConique2.shadow.camera.bottom = -dCon1;
    spotConique2.shadow.camera.far = 80;
    spotConique2.shadow.camera.near = 0.2;
    spotConique2.shadow.radius = 10;
    spotConique2.intensity = 0.5;
    spotConique2.angle = Math.PI/12;
    spotConique2.shadow.mapSize = new THREE.Vector2(Math.pow(2,10), Math.pow(2,10)); 
    scene.add(spotConique2);
    
    
    const dCyl=0.2;
    let LumiereDirectionnelle = new THREE.DirectionalLight(0x8888FF);
    LumiereDirectionnelle.position.set(1, 10, 1);
    LumiereDirectionnelle.target.position.set(1,0,1);
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