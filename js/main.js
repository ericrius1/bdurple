
var scene, camera, controls, renderer, text;


init();
animate();
function init() {
  camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 2000);
  camera.position.z = 400;
  scene = new THREE.Scene();

  controls = new THREE.OrbitControls(camera);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  text = new Text();



}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    text.update();
}

// handle resizing windows
window.onload = function(){
  window.addEventListener( 'resize', onWindowResize, false );
};

function onWindowResize(){
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}



