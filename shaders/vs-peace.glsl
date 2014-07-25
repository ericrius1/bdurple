float PI = 3.1415926535;
varying vec2 vUv;
void main( void ) {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}