
var scene, camera, controls, renderer, text, shaders, clock;

shaders = new ShaderLoader('shaders');
shaders.shaderSetLoaded = function(){
    init();
    animate();
}

shaders.load('vs-butterfly', 'butterfly', 'vertex');
shaders.load('fs-butterfly','butterfly', 'fragment');


function init() {
  camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 20000);
  camera.position.z = 50;
  scene = new THREE.Scene();

  controls = new THREE.OrbitControls(camera);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  clock = new THREE.Clock();
  // text = new Text();
  butterfly = new Butterfly();



}


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    TWEEN.update();
    controls.update();
    // text.update();
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



