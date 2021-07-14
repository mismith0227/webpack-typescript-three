import {
  WebGLRenderer,
  Scene,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  ShaderMaterial,
  Vector2,
  TextureLoader,
} from 'three'

import vertexSource from './shaders/shader.vert'
import fragmentSource from './shaders/shader.frag'

import tImage1 from '../img/image1.jpg'
import tImage2 from '../img/image2.jpg'
import dImage from '../img/image3.jpg'

const Study5 = () => {
  const loader = new TextureLoader()
  const texture1 = loader.load(tImage1)
  const texture2 = loader.load(tImage2)
  const disp = loader.load(dImage)
  const width = window.innerWidth
  const height = window.innerHeight

  // レンダラー作成
  const renderer = new WebGLRenderer()
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)

  const container = document.getElementById('canvas-container')
  container.appendChild(renderer.domElement)

  // カメラ作成
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, -1)

  // シーンを作成
  const scene = new Scene()

  // 平面をつくる（幅, 高さ, 横分割数, 縦分割数）
  const geo = new PlaneGeometry(2, 2, 1, 1)

  let dispFactorValue = 0.0

  const uniforms = {
    uTex1: {
      value: texture1,
    },
    uTex2: {
      value: texture2,
    },
    uDisp: {
      value: disp,
    },
    resolution: { type: 'v2', value: new Vector2(width, height) },
    imageResolution: { type: 'v2', value: new Vector2(1024, 683) },
    dispFactor: { type: 'f', value: dispFactorValue },
  }

  const mat = new ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexSource,
    fragmentShader: fragmentSource,
  })

  const mesh = new Mesh(geo, mat)
  // メッシュをシーンに追加
  scene.add(mesh)

  const render = (): void => {
    requestAnimationFrame(render)

    const sec = performance.now() / 1000

    // シェーダーに渡す進捗度を更新
    uniforms.dispFactor.value +=
      (dispFactorValue - uniforms.dispFactor.value) * 0.1

    // 描画ループ
    renderer.render(scene, camera)
  }

  render()

  const element = document.getElementById('hover-trigger')

  element.addEventListener('mouseenter', (e) => {
    dispFactorValue = 1
  })
  element.addEventListener('mouseleave', (e) => {
    dispFactorValue = 0
  })
}

export default Study5
