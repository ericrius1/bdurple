var randFloat = THREE.Math.randFloat;
var Text = function() {
  var curEmitterIndex = 0;
  var emitters  = [];

  var shalomGeo = new THREE.TextGeometry('Shalom', {
    size: 4,
    height: 1,
    curveSegments: 6,
    font: 'josefin slab'
  });

  var anchor = new THREE.Object3D();
  var shalomWord = new THREE.Mesh(shalomGeo);
  shalomWord.position.x -=8;
  scene.add(anchor)
  anchor.add(shalomWord)
  shalomWord.visible = false;

  var wordPoints = THREE.GeometryUtils.randomPointsInGeometry(shalomGeo, 1000);

  var particleGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture('assets/star.png'),
    maxAge: 2
  });
  createEmitterPoints();
  shalomWord.add(particleGroup.mesh);
  findTarget();
  


  function getEmitterParams(){
    return {
      position: new THREE.Vector3(0, 30, 0),
      accelerationSpread: new THREE.Vector3(.1, .1, .1)
    }
  }
  function createEmitterPoints(){
    for(var i = 0; i < wordPoints.length; i++){
      var emitter = new SPE.Emitter(getEmitterParams());
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
      to(targetPos, 10000).
      onUpdate(function(){
        emitter.position.set(curPos.x, curPos.y, curPos.z);
      }).start();

    if(++curEmitterIndex < emitters.length){
      setTimeout(function(){
        findTarget()
      }, 10)
    }
  }

  this.update = function(){
    particleGroup.tick();
  }

}