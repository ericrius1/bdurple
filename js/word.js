var randFloat = THREE.Math.randFloat;
var Text = function() {


  var wordGeo = new THREE.TextGeometry('Peace', {
    size: 50,
    height: 5,
    curveSegments: 8,
    font: 'helvetiker'
  });
  var word = new THREE.Mesh(wordGeo);
  word.position.x -=100;
  scene.add(word);

  var wordPoints = THREE.GeometryUtils.randomPointsInGeometry(wordGeo, 1000);

  var wordParticleGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture('assets/star.png'),
    maxAge: 40
  });

  var emitterParams = {
    sizeStart: 20,
    accelerationSpread: new THREE.Vector3(10, 10, 10)
  }

  createEmitterPoints();
  word.add(wordParticleGroup.mesh);

  var shnur = "WTF";

  function createEmitterPoints(){
    for(var i = 0; i < wordPoints.length; i++){
      var emitter = new SPE.Emitter(emitterParams);
      emitter.position = wordPoints[i];
      wordParticleGroup.addEmitter(emitter);
    }
  }

  this.update = function(){
    word.rotation.y += .01;
    wordParticleGroup.tick();
  }

  // wordGeo.computeVertexNormals();
  // wordGeo.computeBoundingBox();
}