

function repere(MaScene){ 
    var PointO3 = new THREE.Vector3(0, 0, 0);
    var vecI = new THREE.Vector3(1, 0, 0);
    var vecJ = new THREE.Vector3(0, 1, 0);
    var vecK = new THREE.Vector3(0, 0, 1);
    vecteur(MaScene, PointO3, vecI, 0xFF0000, 0.25, 0.125 );
    vecteur(MaScene, PointO3, vecJ, 0x00FF00, 0.25, 0.125 );
    vecteur(MaScene, PointO3, vecK, 0x0000FF, 0.25, 0.125 );
}
    
/**
 * If the absolute value of the number is less than 0.00000001, then return 0. Otherwise, return the
 * number
 * @param x - the x-coordinate of the point
 * @returns the value of x rounded to the nearest 50th decimal place.
 */
function isZero(x){
    var val = parseFloat(Number(x).toPrecision(50));
    if(parseFloat(Math.abs(x).toPrecision(50)) < 0.00000001) 
        val=0;
    return val;
}
    
    
function vecteurProdVec(MaScene,A,u,v,CoulHexa,longCone,RayonCone){
    let w = new THREE.Vector3(0,0,0);
    let C = new THREE.Vector3(0,0,0);
    w.crossVectors(u,v);
    w.normalize();
    C.addVectors(A,w);
    vecteur(MaScene,A,C,CoulHexa,longCone,RayonCone);
}
    
function vecteur(MaScene,A,B,CoulHexa,longCone,RayonCone){
    var vecAB = new THREE.Vector3( B.x-A.x, B.y-A.y, B.z-A.z );
    vecAB.normalize();
    MaScene.add( new THREE.ArrowHelper( vecAB, A, B.distanceTo(A), CoulHexa, longCone, RayonCone ));
}