var Butterfly = function() {
  var uniforms = {
    time: {
      type: 'f',
      value: 1.0
    },
  }
  var butterflyMat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shaders.vertexShaders.butterfly,
    fragmentShader: shaders.fragmentShaders.butterfly,
  });
  // var planeGeo = new THREE.PlaneGeometry(10, 10);
  var geo = createButterflyGeo();
  var mat = new THREE.MeshBasicMaterial({color: 'blue', side: THREE.DoubleSide})
  var plane = new THREE.Mesh(geo, butterflyMat);
  scene.add(plane);





  function createButterflyGeo(){
    var normal = new THREE.Vector3(0,0,1);
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3(-10, 0, 0));
    geo.vertices.push(new THREE.Vector3(-2, 0, 0));
    geo.vertices.push(new THREE.Vector3(-10, 10, 0));

    geo.vertices.push(new THREE.Vector3(2, 0, 0));
    geo.vertices.push(new THREE.Vector3(10, 0, 0));
    geo.vertices.push(new THREE.Vector3(10, 10, 0));


    var uva = new THREE.Vector2(0, 0);
    var uvb = new THREE.Vector2(1, 0);
    var uvc = new THREE.Vector2(1, 1);
    var uvd = new THREE.Vector2(0, 1);

    var face = new THREE.Face3(0,1,2);
    face.normal.copy(normal);
    face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone() );
    geo.faces.push(face);
    geo.faceVertexUvs[0].push([uva.clone(), uvb.clone(), uvc.clone()]);

    var face = new THREE.Face3(3,4,5);
    geo.faces.push(face);
    face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone());
    geo.faceVertexUvs[0].push([uva.clone(), uvc.clone(), uvd.clone()]);
    return geo;
  }

  this.update = function() {
    butterflyMat.uniforms.time.value = clock.getElapsedTime() * .05;

  }
}
