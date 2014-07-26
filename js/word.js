var randFloat = THREE.Math.randFloat;
var Text = function() {
  var curEmitterIndex = 0;
  var emitters = [];
  var targets = [];
  var numEmitters = 811;
  var curTargetIndex = 0;
  var targetFindTime = 11111;
  var wordTransitionTime = 5000
  var targetIntervalTime = 1111;
  var minTargetIntervalTime = 11;
  var targetIntegralDecremenetFactor = 1.05;
  var shalomGeo = new THREE.TextGeometry('Shalom', {
    size: 4,
    height: .1,
    curveSegments: 6,
    font: 'josefin slab'
  });

  var salaamGeo = new THREE.TextGeometry('Salaam', {
    size: 4,
    height: 1,
    curveSegments: 6,
    font: 'josefin slab'
  });

  var peaceGeo = new THREE.TextGeometry('Peace', {
    size: 4,
    height: 1,
    curveSegments: 6,
    font: 'josefin slab'
  });

  var wordContainer = new THREE.Object3D();
  wordContainer.position.x -= 8.0;
  scene.add(wordContainer)

  var shalomWord = new THREE.Mesh(shalomGeo);
  wordContainer.add(shalomWord)

  var salaamWord = new THREE.Mesh(salaamGeo);
  wordContainer.add(salaamWord)


  var peaceWord = new THREE.Mesh(peaceGeo);
  wordContainer.add(peaceWord)

  var peacePoints = THREE.GeometryUtils.randomPointsInGeometry(peaceGeo, numEmitters);
  var shalomPoints = THREE.GeometryUtils.randomPointsInGeometry(shalomGeo, numEmitters);
  var salaamPoints = THREE.GeometryUtils.randomPointsInGeometry(salaamGeo, numEmitters);
  targets.push(salaamPoints, shalomPoints, peacePoints);

  wordContainer.remove(peaceWord)
  wordContainer.remove(shalomWord)
  wordContainer.remove(salaamWord)

  var particleGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture('assets/star.png'),
    maxAge: 2,
  });
  createEmitterPoints();
  wordContainer.add(particleGroup.mesh);
  setEmitterTargets(targets[curTargetIndex]);
  findTarget();



  function getEmitterParams() {
    return {
      position: new THREE.Vector3(0, 30, 0),
      acceleration: new THREE.Vector3(-.2, 0, -0.2),
      accelerationSpread: new THREE.Vector3(.2, .2, .2),
      colorStart: new THREE.Color(0xe48d24),
      colorMiddle: new THREE.Color(0x9d540f),
      opacityMiddle: 1,
      particleCount: 60
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
    to(targetPos, targetFindTime).
    easing(TWEEN.Easing.Cubic.InOut).
    onUpdate(function() {
      emitter.position.set(curPos.x, curPos.y, curPos.z);
    }).start();

    setTimeout(function() {
      if(targetIntervalTime > minTargetIntervalTime){
        targetIntervalTime/=targetIntegralDecremenetFactor;
      }

      //Make sure we change emitter targets once we finish the transition
      if (++curEmitterIndex === emitters.length) {
        curEmitterIndex = 0;
        if (++curTargetIndex === targets.length) {
          curTargetIndex = 0;
        }
        setEmitterTargets(targets[curTargetIndex]);
        //wait a while then switch to new targets
        setTimeout(function() {
          findTarget();
        }, targetFindTime + wordTransitionTime)
      } else {
        findTarget()
      }
    }, targetIntervalTime)
  }

  this.update = function() {
    particleGroup.tick();
  }

}