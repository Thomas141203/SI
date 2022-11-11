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

function vecteurProdVec(MaScene,A,u,v,CoulHexa,longCone,RayonCone){
    let w = new THREE.Vector3(0,0,0);
    let C = new THREE.Vector3(0,0,0);
    w.crossVectors(u,v);
    w.normalize();
    C.addVectors(A,w);
    vecteur(MaScene,A,C,CoulHexa,longCone,RayonCone);
}

function tracePt(MaScene, P, CoulHexa,dimPt){    
    let sphereGeometry = new THREE.SphereGeometry(dimPt,12,24);
    let  sphereMaterial = new THREE.MeshBasicMaterial({color: CoulHexa });
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(P.x,P.y,P.z);
    MaScene.add(sphere);
}

const PrecisionArrondi = 50;
const epsilon = 0.00000001;
function testZero(x){
    var val = parseFloat(Number(x).toPrecision(PrecisionArrondi));
    if (parseFloat(Math.abs(x).toPrecision(PrecisionArrondi))<epsilon) 
        val=0;
    return val;
}