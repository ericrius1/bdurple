var Statue = function() {
  var peaceMaterial;
  var particleGroup = new SPE.Group({
    texture: new THREE.ImageUtils.loadTexture('assets/point.png'),
    maxAge: 11,
    blending: THREE.NormalBlending
  })

  var circleEmitter = new SPE.Emitter({
    accelerationSpread: new THREE.Vector3(.01, .01, .01),
    positionSpread: new THREE.Vector3(0.2, 0.2, 0.2),
    opacityMiddle: 1,
    particleCount: 7000,
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
    peaceMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: shaders.vertexShaders.peace,
      fragmentShader: shaders.fragmentShaders.peace,
    });

    var height = radius * 2;
    var peaceGeo = new THREE.PlaneGeometry(111, 111);
    peaceRug = new THREE.Mesh(peaceGeo, peaceMaterial);
    peaceRug.rotation.x = -Math.PI/2;
    peaceRug.position.y = -radius - 2;
    scene.add(peaceRug);


  }
  this.update = function() {
    var time = clock.getElapsedTime();
    circleEmitter.position.x = radius * Math.cos(-time * speed);
    circleEmitter.position.y = radius * Math.sin(-time * speed);
    particleGroup.tick();
    peaceMaterial.uniforms.time.value = time * .05;
  }

}