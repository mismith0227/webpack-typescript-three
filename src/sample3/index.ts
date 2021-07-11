import {
  WebGLRenderer,
  Scene,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  ShaderMaterial,
} from 'three'

import vertexSource from './shaders/shader.vert'
import fragmentSource from './shaders/shader.frag'

const sample3 = () => {
  console.log('sample3')
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
  const geo = new PlaneGeometry(2, 2, 10, 10)

  // シェーダーソースを渡してマテリアルを作成
  const mat = new ShaderMaterial({
    vertexShader: vertexSource,
    fragmentShader: fragmentSource,
    wireframe: true,
  })

  const mesh = new Mesh(geo, mat)

  // メッシュをシーンに追加
  scene.add(mesh)

  const render = (): void => {
    requestAnimationFrame(render)

    // 描画ループ
    renderer.render(scene, camera)
  }

  render()
}

export default sample3
