var randFloat = THREE.Math.randFloat;
var Text = function() {
  var curEmitterIndex = 0;
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
      emitter.targetPosition = wordPoints[i];
      particleGroup.addEmitter(emitter);
    }
  }

  function findTarget(){
    var emitter = emitters[curEmitterIndex];

    var curPos = {
      x: emitter.position.x,
      y: emitter.position.y,
      z: emitter.position.z,
    }

    var targetPos = {
      x: emitter.targetPosition.x,
      y: emitter.targetPosition.y,
      z: emitter.targetPosition.z,

    }

    var moveTween = new TWEEN.Tween(curPos).
      to(targetPos, 1000).
      onUpdate(function(){
        emitter.position.set(curPos.x, curPos.y, curPos.z);
      }).start();
    moveTween.onComplete(function(){
      if(curEmitterIndex++ < emitters.length){
        findTarget();
      }
    })


  }

  this.update = function(){
    particleGroup.tick();
  }

}