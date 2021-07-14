varying vec2 vUv;

uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform sampler2D uDisp;
uniform vec2 resolution;
uniform vec2 imageResolution;
uniform float dispFactor;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main(void) {
  vec2 ratio = vec2(
    min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0),
    min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0)
  );

  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  vec4 disp = texture2D(uDisp, uv);
  vec2 calcPosition = uv + rotate2d(3.14) * vec2(disp.r,disp.g) * (1.0 - dispFactor) * 0.2;

  vec4 _texture1 = texture2D(uTex1, uv);
  vec4 _texture2 = texture2D(uTex2, calcPosition);


  vec4 finalTexture = mix(_texture1, _texture2, dispFactor);

  gl_FragColor = finalTexture;
}