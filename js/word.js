var randFloat = THREE.Math.randFloat;
var Text = function() {
  var curEmitterIndex = 0;
  var emitters = [];
  var targets = [];
  var numEmitters = 1000;
  var curTargetIndex = 0;

  var shalomGeo = new THREE.TextGeometry('Shalom', {
    size: 4,
    height: 1,
    curveSegments: 6,
    font: 'josefin slab'
  });

  var salaamGeo = new THREE.TextGeometry('Salaam', {
    size: 4,
    height: 1,
    curveSegments: 6,
    font: 'josefin slab'
  });

  var wordContainer = new THREE.Object3D();
  wordContainer.position.x -= 8;
  
  var shalomWord = new THREE.Mesh(shalomGeo);
  scene.add(wordContainer)
  wordContainer.add(shalomWord)
  shalomWord.visible = false;

  var salaamWord = new THREE.Mesh(shalomGeo);
  scene.add(wordContainer)
  wordContainer.add(salaamWord)
  salaamWord.visible = false;

  var shalomPoints = THREE.GeometryUtils.randomPointsInGeometry(shalomGeo, numEmitters);
  var salaamPoints = THREE.GeometryUtils.randomPointsInGeometry(salaamGeo, numEmitters);
  targets.push(shalomPoints, salaamPoints);

  var particleGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture('assets/star.png'),
    maxAge: 2
  });
  createEmitterPoints();
  shalomWord.add(particleGroup.mesh);
  setEmitterTargets(targets[curTargetIndex]);
  findTarget();



  function getEmitterParams() {
    return {
      position: new THREE.Vector3(0, 30, 0),
      accelerationSpread: new THREE.Vector3(.1, .1, .1)
    }
  }

  function createEmitterPoints() {
    for (var i = 0; i < numEmitters; i++) {
      var emitter = new SPE.Emitter(getEmitterParams());
      emitters.push(emitter);
      particleGroup.addEmitter(emitter);
    }
  }

  function setEmitterTargets(targetPoints) {
    for (var i = 0; i < numEmitters; i++) {
      emitters[i].targetPosition = targetPoints[i];
    }
  }

  function findTarget() {
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
    onUpdate(function() {
      emitter.position.set(curPos.x, curPos.y, curPos.z);
    }).start();

    setTimeout(function() {
      curEmitterIndex++;
      //Make sure we change emitter targets once we finish the transition
      if(curEmitterIndex === emitters.length){
        curEmitterIndex = 0;
        if(curTargetIndex === targets.length){
          curTargetIndex = 0;
        }
        setEmitterTargets(targets[curTargetIndex]);
      }
      else{
        findTarget()
      }
    }, 10)
}

this.update = function() {
  particleGroup.tick();
}

}