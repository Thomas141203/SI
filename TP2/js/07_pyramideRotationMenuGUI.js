const borneVue=6;//amplitude de deplacement de la camera

function saisieReel(mes){
 let val=0;
 do{
  val = parseFloat(prompt("Entrer "+mes));
 } while (isNaN(val) || (Math.abs(val)>borneVue));
 return val;
}

function faceTriangulaire(MaScene,PtA,PtB,PtC,CoulFace){
 var faceT = new THREE.Geometry();
    faceT.vertices = [PtA, PtB, PtC];
    faceT.faces = [
        new THREE.Face3( 0, 2, 1 )
    ];
    var faceTM = surfPhong(faceT,CoulFace,0.75,false,"#636e72");
    MaScene.add(faceTM);
    return faceT;
}

function pyramide(MaScene,coulArete,epai,CoulPt,dimPt){
 let baseCarre = new THREE.Geometry();
 let faceTriangle1  = new THREE.Geometry();
 let faceTriangle2  = new THREE.Geometry();
 let faceTriangle3  = new THREE.Geometry();
 let faceTriangle4  = new THREE.Geometry();
 let pyra  = new THREE.Geometry();
 let PtA = new THREE.Vector3(1,-1,0);
 let PtB = new THREE.Vector3(-1,-1,0);
 let PtC = new THREE.Vector3(-1,1,0);
 let PtD = new THREE.Vector3(1,1,0);
 let PtP = new THREE.Vector3(0,0,1);
 pyra.vertices = [PtA, PtB, PtC, PtD, PtP];
 pyra.faces=[
   new THREE.Face3( 0, 1, 2 ),
   new THREE.Face3( 0, 2, 3 ),
   new THREE.Face3( 0, 1, 4 ),
   new THREE.Face3( 1, 2, 4 ),
   new THREE.Face3( 2, 3, 4 ),
   new THREE.Face3( 3, 4, 4 ),
 ]
 baseCarre.vertices = [PtA, PtB, PtC, PtD];
 baseCarre.faces = [
   new THREE.Face3( 0, 1, 2 ),
   new THREE.Face3( 0, 2, 3 ),
    ];
 let tabVecteur = new Array(10);
 for (let i = 0; i< tabVecteur.length;i++)
   tabVecteur[i]= new THREE.Vector3(0,0,0);
 let faceBase = surfPhong(baseCarre,"#00FFFF",0.75,true,"#636e72");
 MaScene.add(faceBase);
 faceTriangle1=faceTriangulaire(MaScene,PtA,PtD,PtP,"#FF0000");
 faceTriangle2=faceTriangulaire(MaScene,PtD,PtC,PtP,"#00FF00");
 faceTriangle3=faceTriangulaire(MaScene,PtC,PtB,PtP,"#0000FF");
 faceTriangle4=faceTriangulaire(MaScene,PtA,PtP,PtB,"#FF0099");
 let aretesGeometrie = new THREE.EdgesGeometry(pyra);
 let aretes = new THREE.LineSegments( aretesGeometrie, new THREE.LineBasicMaterial( { color: coulArete, linewidth:epai } ) );//aretes.edgeThickness = 40.0;
 MaScene.add(aretes);
 for(let j=0;j<pyra.vertices.length;j++) 
    tracePt(MaScene,pyra.vertices[j],CoulPt,dimPt);
 let tabTemp=new Array(2);
 tabTemp = faceVisible(MaScene,baseCarre,"#888888",dimPt);
 tabVecteur[0]=tabTemp[0];
 tabVecteur[1]=tabTemp[1];
 tabTemp = faceVisible(MaScene,faceTriangle1,"#888888",dimPt);
 tabVecteur[2]=tabTemp[0];
 tabVecteur[3]=tabTemp[1];
 tabTemp = faceVisible(MaScene,faceTriangle2,"#888888",dimPt);
 tabVecteur[4]=tabTemp[0];
 tabVecteur[5]=tabTemp[1];
 tabTemp = faceVisible(MaScene,faceTriangle3,"#888888",dimPt);
 tabVecteur[6]=tabTemp[0];
 tabVecteur[7]=tabTemp[1];
 tabTemp = faceVisible(MaScene,faceTriangle4,"#888888",dimPt);
 tabVecteur[8]=tabTemp[0];
 tabVecteur[9]=tabTemp[1];
 return tabVecteur;
}//fin fonction pyramide

function faceVisible(MaScene,face,CoulPt,dimPt){
 let nFaces=face.vertices.length;
 let GHx=0, GHy=0,GHz=0;
 for (let j=0;j<nFaces;j++){
   GHx+=face.vertices[j].x;
   GHy+=face.vertices[j].y;
   GHz+=face.vertices[j].z;
 }
 let v1x = face.vertices[1].x-face.vertices[0].x;
 let v1y = face.vertices[1].y-face.vertices[0].y;
 let v1z = face.vertices[1].z-face.vertices[0].z;
 let v2x = face.vertices[2].x-face.vertices[0].x;
 let v2y = face.vertices[2].y-face.vertices[0].y;
 let v2z = face.vertices[2].z-face.vertices[0].z;
 let PtGH = new THREE.Vector3(GHx/nFaces,GHy/nFaces,GHz/nFaces);
 let v1F= new THREE.Vector3(v1x,v1y,v1z);
 let v2F= new THREE.Vector3(v2x,v2y,v2z);
 let w = new THREE.Vector3(0,0,0);
 let xPos=document.forms["controle"].PosX.value;
 let yPos=document.forms["controle"].PosY.value;
 let zPos=document.forms["controle"].PosZ.value;
 let vec = new THREE.Vector3(PtGH.x-xPos,PtGH.y-yPos,PtGH.z-zPos);
 let coulVect = "#0000FF";
 w.crossVectors(v1F,v2F);
 if (testZero(vec.dot(w))<0) coulVect="#FFFF00";
 tracePt(MaScene,PtGH,CoulPt,dimPt);
 let tab = new Array (2);
 tab[0]= new THREE.Vector3(PtGH.x,PtGH.y,PtGH.z);
 tab[1] = (vecteurProdVecRetroune(MaScene,PtGH,v1F,v2F,coulVect, 0.25, 0.125));
 return tab;
}//fin faceVisible

 // fin fonction TP
 var thetaRot=0;
function init(){
 var stats = initStats();
    // creation de rendu et de la taille
 let rendu = new THREE.WebGLRenderer({ antialias: true });
 rendu.shadowMap.enabled = true;
 let scene = new THREE.Scene();   
 let result;
 let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 100);
 rendu.shadowMap.enabled = true;
 rendu.setClearColor(new THREE.Color(0xFFFFFF));
 rendu.setSize(window.innerWidth*.9, window.innerHeight*.9);
 cameraLumiere(scene,camera);
 lumiere(scene);
 repere(scene);
 let dimP=0.025;
 let epaiCbe=2;
 let R=1.5;
 let n=10;
 let h=1.5; 
 let coulArete="#00AAAA";
 let epai=14;
 let CoulPt="#BB88BB";
 let dimPt=0.05;
 let tabloVecteur = new Array(10);
 for (let i = 0; i< tabloVecteur.length;i++)
   tabloVecteur[i]= new THREE.Vector3(0,0,0);
 tabloVecteur = pyramide(scene,coulArete,epai,CoulPt,dimPt); 
 //********************************************************
 //
 //  D E B U T     M E N U     G U I
 //
 //********************************************************
 
 
 //********************************************************
 //
 //  F I N     M E N U     G U I
 //
 //********************************************************
 renduAnim();
 
  // definition des fonctions idoines
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
 } // fin fonction posCamera
 
function calcuVect(G,vec,camera){
 let v = new THREE.Vector3(G.x-camera.position.x,G.y-camera.position.y,G.z-camera.position.z);
 vec.normalize();
 let coulVect = "#000000";
 let scal=testZero(vec.dot(v));
 if (scal<0) coulVect="#FF8800";
 return (new THREE.ArrowHelper( vec,G, 1, coulVect,0.25,0.125));
}

 let tableauVecteurHelper = new Array(5);
 for (let i = 0; i< tableauVecteurHelper.length;i++){
   tableauVecteurHelper[i]= calcuVect(tabloVecteur[2*i],tabloVecteur[2*i+1],camera);
   scene.add(tableauVecteurHelper[i]);
 }
 
  // ajoute le rendu dans l'element HTML
 document.getElementById("webgl").appendChild(rendu.domElement);
   
  // affichage de la scene
 rendu.render(scene, camera);
  
 
 function reAffichage() {
   setTimeout(function () {  
   for (let i = 0; i< tableauVecteurHelper.length;i++)
    scene.remove(tableauVecteurHelper[i]);
   thetaRot+=Math.PI/200;
   xPos = 8 * Math.cos(thetaRot);
   yPos = 8 * Math.sin(thetaRot);
   zPos=2*Math.sin(thetaRot*3);
   camera.position.set(xPos, yPos, zPos);
   camera.lookAt(0,0,0);
  document.forms["controle"].PosX.value=testZero(xPos);
  document.forms["controle"].PosY.value=testZero(yPos);
  document.forms["controle"].PosZ.value=testZero(zPos);
   for (let i = 0; i< tableauVecteurHelper.length;i++){
    tableauVecteurHelper[i]= calcuVect(tabloVecteur[2*i],tabloVecteur[2*i+1],camera);
    scene.add(tableauVecteurHelper[i]);
   }
  }, 200);// fin setTimeout(function ()
    // rendu avec requestAnimationFrame
  rendu.render(scene, camera);
 }// fin fonction reAffichage()
 
 
  function renduAnim() {
    stats.update();
    reAffichage();

    // rendu avec requestAnimationFrame
    requestAnimationFrame(renduAnim);
// ajoute le rendu dans l'element HTML
    rendu.render(scene, camera);
  }
 
} // fin fonction init()