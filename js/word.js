var randFloat = THREE.Math.randFloat;
var Text = function() {
  var curPointIndex = 0;
  var emitters  = [];

  var wordGeo = new THREE.TextGeometry('Peace', {
    size: 10,
    height: 1,
    curveSegments: 8,
    font: 'josefin slab'
  });

  var anchor = new THREE.Object3D();
  var word = new THREE.Mesh(wordGeo);
  word.position.x -=10;
  scene.add(anchor)
  anchor.add(word)
  word.visible = false;

  var wordPoints = THREE.GeometryUtils.randomPointsInGeometry(wordGeo, 500);

  var particleGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture('assets/star.png'),
    maxAge: 4
  });

  var emitterParams = {
    position: new THREE.Vector3(0, 30, 0),
    accelerationSpread: new THREE.Vector3(2, 2, 2)
  }

  createEmitterPoints();
  
  word.add(particleGroup.mesh);
  findTarget();

  function createEmitterPoints(){
    for(var i = 0; i < wordPoints.length; i++){
      var emitter = new SPE.Emitter(emitterParams);
      emitters.push(emitter);
      // emitter.position = wordPoints[i];
      particleGroup.addEmitter(emitter);
    }
  }

  function findTarget(){
    var emitter = 


  }

  this.update = function(){
    particleGroup.tick();
  }

}