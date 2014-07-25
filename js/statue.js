var Statue = function() {
  var peaceLines;
  var particleGroup = new SPE.Group({
    texture: new THREE.ImageUtils.loadTexture('assets/point.png'),
    maxAge: 11,
    blending: THREE.NormalBlending
  })

  var circleEmitter = new SPE.Emitter({
    accelerationSpread: new THREE.Vector3(.01, .01, .01),
    positionSpread: new THREE.Vector3(0.2, 0.2, 0.2),
    opacityMiddle: 1,
    particleCount: 10000,
    velocitySpread: new THREE.Vector3(.1, .1, .1),
    colorStart: new THREE.Color(0x0002fb),
    colorMiddle: new THREE.Color(0x089201),
  });
  var radius = 11
  var speed = .7;

  particleGroup.addEmitter(circleEmitter);
  scene.add(particleGroup.mesh);

  createLines();

  function createLines() {
    var uniforms = {
      time: {
        type: 'f',
        value: 1.0
      },
    }
    peaceMat = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: shaders.vertexShaders.peace,
      fragmentShader: shaders.fragmentShaders.peace,
    });

    var height = radius * 2;
    var peaceGeo = new THREE.PlaneGeometry(2, radius* 2);
    peaceLines = new THREE.Mesh(peaceGeo, peaceMat);
    peaceLines.position.y += radius - height / 2;
    scene.add(peaceLines);


  }
  this.update = function() {
    var time = clock.getElapsedTime();
    circleEmitter.position.x = radius * Math.cos(-time * speed);
    circleEmitter.position.y = radius * Math.sin(-time * speed);
    particleGroup.tick();
    peaceLines.material.uniforms.time.value = time * .05;
  }

}