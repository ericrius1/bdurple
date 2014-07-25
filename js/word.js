var randFloat = THREE.Math.randFloat;
var Text = function() {
  var curEmitterIndex = 0;
  var emitters = [];
  var targets = [];
  var numEmitters = 700;
  var curTargetIndex = 0;
  var targetFindTime = 10000;
  var wordTransitionTime = 5000

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

  var peaceGeo = new THREE.TextGeometry('Peace', {
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

  var salaamWord = new THREE.Mesh(shalomGeo);
  scene.add(wordContainer)
  wordContainer.add(salaamWord)

  var peaceWord = new THREE.Mesh(peaceGeo);
  wordContainer.add(peaceWord)
  scene.add(wordContainer)

  peaceWord.translateX(5);

  var shalomPoints = THREE.GeometryUtils.randomPointsInGeometry(shalomGeo, numEmitters);
  var salaamPoints = THREE.GeometryUtils.randomPointsInGeometry(salaamGeo, numEmitters);
  var peacePoints = THREE.GeometryUtils.randomPointsInGeometry(peaceGeo, numEmitters);
  targets.push(peacePoints, shalomPoints, salaamPoints);

  // wordContainer.remove(peaceWord)
  wordContainer.remove(shalomWord)
  wordContainer.remove(salaamWord)

  var particleGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture('assets/star.png'),
    maxAge: 2
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
      colorStart: new THREE.Color(0xff0000),
      colorEnd: new THREE.Color(0x0000ff)
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
    easing(TWEEN.Easing.Cubic.Out).
    onUpdate(function() {
      emitter.position.set(curPos.x, curPos.y, curPos.z);
    }).start();

    setTimeout(function() {
      //Make sure we change emitter targets once we finish the transition
      if (++curEmitterIndex === emitters.length) {
        curEmitterIndex = 0;
        if (++curTargetIndex === targets.length) {
          curTargetIndex = 0;
        }
        setEmitterTargets(targets[curTargetIndex]);
        //wait a while then switch to new targets
        setTimeout(function() {
          console.log('find new target!')
          findTarget();
        }, targetFindTime + wordTransitionTime)
      } else {
        findTarget()
      }
    }, 2)
  }

  this.update = function() {
    particleGroup.tick();
  }

}