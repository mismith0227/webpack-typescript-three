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
import tImage from '../img/flower.jpg'

const sample4 = () => {
  const loader = new TextureLoader()
  const texture = loader.load(tImage)
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

  const mouse = new Vector2(0.5, 0.5)
  let targetPercent = 0.0

  const uniforms = {
    uAspect: {
      value: width / height,
    },
    uTime: {
      value: 0.0,
    },
    uMouse: {
      value: new Vector2(0.5, 0.5),
    },
    uPercent: {
      value: targetPercent,
    },
    uFixAspect: {
      value: height / width,
    },
    uTex: {
      value: texture,
    },
  }

  const mat = new ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexSource,
    fragmentShader: fragmentSource,
  })

  const mesh = new Mesh(geo, mat)
  // メッシュをシーンに追加
  scene.add(mesh)

  const mouseMoved = (x, y) => {
    // 左上原点から左下原点に変換
    mouse.x = x / width
    mouse.y = 1.0 - y / height
  }

  const mousePressed = (x, y) => {
    mouseMoved(x, y)
    targetPercent = 1
  }

  const mouseReleased = (x, y) => {
    mouseMoved(x, y)
    targetPercent = 0.0
  }

  const render = (): void => {
    requestAnimationFrame(render)

    const sec = performance.now() / 1000

    // シェーダーに渡す時間を更新
    uniforms.uTime.value = sec

    // シェーダーに渡すマウスを更新
    uniforms.uMouse.value.lerp(mouse, 0.2)

    // シェーダーに渡す進捗度を更新
    uniforms.uPercent.value += (targetPercent - uniforms.uPercent.value) * 0.1

    // 描画ループ
    renderer.render(scene, camera)
  }

  render()

  window.addEventListener('mousemove', (e) => {
    mouseMoved(e.clientX, e.clientY)
  })
  window.addEventListener('mousedown', (e) => {
    mousePressed(e.clientX, e.clientY)
  })
  window.addEventListener('mouseup', (e) => {
    mouseReleased(e.clientX, e.clientY)
  })
}

export default sample4
