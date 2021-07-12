import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Color,
  Points,
  TextureLoader,
} from 'three'
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js'
import tImage from '../img/kirakira.png'

const Study = () => {
  const container = document.getElementById('canvas-container5')
  const renderer = new WebGLRenderer()
  const width = window.innerWidth
  const height = window.innerHeight

  // レンダラーを作成
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)

  // canvasにレンダラー追加
  container.appendChild(renderer.domElement)

  // カメラ作成
  const camera = new PerspectiveCamera(75, width / height, 0.1, 100)
  camera.position.set(0, 0, 5)

  // シーンを作成
  const scene = new Scene()

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const textureLoader = new TextureLoader()
  const texture = textureLoader.load(tImage)

  const geometry = new BufferGeometry()
  const count = 1000
  const position = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i++) {
    position[i] = (Math.random() - 0.5) * 10
  }

  geometry.setAttribute('position', new BufferAttribute(position, 3))

  const material = new PointsMaterial({
    size: 0.3,
    sizeAttenuation: true,
    color: new Color('#ffffff'),
    map: texture,
    transparent: true,
    depthTest: false,
  })

  const particle = new Points(geometry, material)
  scene.add(particle)

  const render = () => {
    particle.rotation.x -= 0.001
    controls.update()
    requestAnimationFrame(render)
    renderer.render(scene, camera)
  }
  render()
}

export default Study
