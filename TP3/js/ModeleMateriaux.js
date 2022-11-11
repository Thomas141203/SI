
function surfPhong(geom,coulD,transpa,bolTrans,coulSpe){ 
    let Material = new THREE.MeshPhongMaterial({
      color: coulD,
      opacity: transpa,
      transparent: bolTrans,
      specular:coulSpe, 
      flatShading: true,
      side: THREE.DoubleSide,
    });
    let maillage = new THREE.Mesh(geom,Material);
    return maillage;
}
   
function surfMateriauBasic(geom,coul){
    let Materiau = new THREE.MeshBasicMaterial({color: coul});
    let maillage = new THREE.Mesh(geom,Materiau);
    return maillage; 
}

function surfGouraud(geom,coul){
    let Materiau = new THREE.MeshLambertMaterial({color: coul});
    let maillage = new THREE.Mesh(geom,Materiau);
    return maillage; 
} 
   
function surfFilDeFer(ObjetGeometrique,coul,tailleFil) {
    let ProprieteFilDeFer = new THREE.MeshBasicMaterial({
        color:coul,
        wireframeLinewidth: tailleFil
    });
    ProprieteFilDeFer.wireframe = true;
    let maillage = new THREE.Mesh(ObjetGeometrique, ProprieteFilDeFer);
    return maillage;
}