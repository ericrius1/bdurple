var scene, camera, controls, renderer, text, shaders, clock, statue, time;

shaders = new ShaderLoader('shaders');
shaders.shaderSetLoaded = function() {

  var audio = loadAudio('assets/splendor.mp3');
}

shaders.load('vs-peace', 'peace', 'vertex');
shaders.load('fs-peace', 'peace', 'fragment');


function init() {
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
  camera.position.z = 22;
  scene = new THREE.Scene();

  controls = new THREE.OrbitControls(camera);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  // renderer.setClearColor(0xffffff);
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  clock = new THREE.Clock();
  text = new Text();
  statue = new Statue();



}


function animate() {
  time = clock.getElapsedTime();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  TWEEN.update();
  controls.update();
  statue.update();
  text.update();
}

// handle resizing windows
window.onload = function() {
  window.addEventListener('resize', onWindowResize, false);
};

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}


function loadAudio(uri) {
  var audio = new Audio();
  audio.addEventListener('canplaythrough', function() {
    this.play();
    init();
    animate();
  }, false);
  audio.src = uri;
  return audio;
}