  uniform float time;
  uniform vec2 resolution;
  varying vec2 vUv;
  float PI = 3.1415926535;
  void main() {
    vec2 p = vUv + vec2(-0.5, -0.3);
    vec3 c = vec3(0);
    vec3 c2 = vec3(0);
  
    for(int i = 0; i < 20; i++){
      float t = (1.5 + .3 * 1.) * PI * float(i+3) / 10. *time *0.05;
      float x = .05 * cos(t);
      float y = .05* sin(t);
      vec2 o = 1.45 * vec2(0.5*x,.5*y);
      float hue = time * 0.03*float(i+5);
      float r = max(sin(hue)+0.35, 0.2);
      float g = max(sin(hue+PI*3./4.)+0.15, 0.2);
      float b = max(sin(hue+PI*5./4.)+0.15, 0.2);
      c += 0.003/(length(0.5*p-o*5.*(1.2-cos(time * ((0.205+0.00005*1.)*float(i+17))))))*vec3(r,g,b);
    }
    gl_FragColor = vec4(c,99);
   
  }