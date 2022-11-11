function cameraLumiere(scene,camera){
    camera.up = new THREE.Vector3( 0, 0, 1 );
    var xPos=6;
    var yPos=6;
    var zPos=5;
    var xDir=0;
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
    guiCamera.add(menuGUI,"cameraxPos",-borneVue,borneVue).onChange(function(){
        camera.position.set(menuGUI.cameraxPos*isZero(menuGUI.cameraZoom), menuGUI.camerayPos*isZero(menuGUI.cameraZoom), menuGUI.camerazPos*isZero(menuGUI.cameraZoom));
        actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
        camera.lookAt(isZero(menuGUI.cameraxDir), isZero(menuGUI.camerayDir), isZero(menuGUI.camerazDir));
    });
    
    guiCamera.add(menuGUI,"camerayPos",-borneVue,borneVue).onChange(function(){
        camera.position.set(menuGUI.cameraxPos*isZero(menuGUI.cameraZoom), menuGUI.camerayPos*isZero(menuGUI.cameraZoom), menuGUI.camerazPos*isZero(menuGUI.cameraZoom));
        actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
        camera.lookAt(isZero(menuGUI.cameraxDir), isZero(menuGUI.camerayDir), isZero(menuGUI.camerazDir));
    });

    guiCamera.add(menuGUI,"camerazPos",-borneVue,borneVue).onChange(function(){
        camera.position.set(menuGUI.cameraxPos*isZero(menuGUI.cameraZoom), menuGUI.camerayPos*isZero(menuGUI.cameraZoom), menuGUI.camerazPos*isZero(menuGUI.cameraZoom));
        actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
        camera.lookAt(isZero(menuGUI.cameraxDir), isZero(menuGUI.camerayDir), isZero(menuGUI.camerazDir));
    });
    
    guiCamera.add(menuGUI,"cameraZoom",-10,10).onChange(function(){
        camera.position.set(menuGUI.cameraxPos*isZero(menuGUI.cameraZoom), menuGUI.camerayPos*isZero(menuGUI.cameraZoom), menuGUI.camerazPos*isZero(menuGUI.cameraZoom));
        camera.lookAt(isZero(menuGUI.cameraxDir), isZero(menuGUI.camerayDir), isZero(menuGUI.camerazDir))
    });

    guiCamera.add(menuGUI,"cameraxDir",-borneVue,borneVue).onChange(function(){
        camera.position.set(menuGUI.cameraxPos*isZero(menuGUI.cameraZoom), menuGUI.camerayPos*isZero(menuGUI.cameraZoom), menuGUI.camerazPos*isZero(menuGUI.cameraZoom));
        actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
        camera.lookAt(isZero(menuGUI.cameraxDir), isZero(menuGUI.camerayDir), isZero(menuGUI.camerazDir))
    });

    guiCamera.add(menuGUI,"camerayDir",-borneVue,borneVue).onChange(function(){
        camera.position.set(menuGUI.cameraxPos*isZero(menuGUI.cameraZoom), menuGUI.camerayPos*isZero(menuGUI.cameraZoom), menuGUI.camerazPos*isZero(menuGUI.cameraZoom));
        actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
        camera.lookAt(isZero(menuGUI.cameraxDir), isZero(menuGUI.camerayDir), isZero(menuGUI.camerazDir))
    });

    guiCamera.add(menuGUI,"camerazDir",-borneVue,borneVue).onChange(function(){
        camera.position.set(menuGUI.cameraxPos*isZero(menuGUI.cameraZoom), menuGUI.camerayPos*isZero(menuGUI.cameraZoom), menuGUI.camerazPos*isZero(menuGUI.cameraZoom));
        actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
        camera.lookAt(isZero(menuGUI.cameraxDir), isZero(menuGUI.camerayDir), isZero(menuGUI.camerazDir))
    });
}