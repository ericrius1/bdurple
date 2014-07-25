var Butterfly = function(){
  var planeMat = new THREE.ShaderMaterial({
    vertexShader: shaders.vertexShaders.butterfly,
    fragmentShader: shaders.fragmentShaders.butterfly,
  });
  var planeGeo = new THREE.PlaneGeometry(10, 10);

  var plane = new THREE.Mesh(planeGeo, planeMat);
  scene.add(plane);

  this.update = function(){

  }
}