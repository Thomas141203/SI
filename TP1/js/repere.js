function init(){
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.up = new THREE.Vector3( 0, 0, 1 );
    camera.position.set(3.5,2.5,1.25);
    camera.lookAt(scene.position);
    var rendu = new THREE.WebGLRenderer();
    rendu.shadowMap.enabled = true;
    rendu.setClearColor(new THREE.Color(0xFFFFFF));
    rendu.setSize(window.innerWidth*.9, window.innerHeight*.9);

    repere(scene)

    document.getElementById("webgl").appendChild(rendu.domElement);
   
    rendu.render(scene, camera);
}
