import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Mesh,
  SpotLight,
  MeshPhongMaterial,
  Color,
  SphereGeometry,
} from 'three'

const Study = () => {
  const width = window.innerWidth
  const height = window.innerHeight

  // レンダラーを作成
  const renderer = new WebGLRenderer()

  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)

  // canvasにレンダラー追加
  const container = document.getElementById('canvas-container3')
  container.appendChild(renderer.domElement)

  // カメラ作成
  const camera = new PerspectiveCamera(75, width / height, 0.1, 1000)

  // シーンを作成
  const scene = new Scene()

  // ライトを作成
  const spotLight = new SpotLight(0xffffff)
  spotLight.position.set(100, 100, 100)
  spotLight.castShadow = true
  spotLight.shadowMapWidth = 1024
  spotLight.shadowMapHeight = 1024
  spotLight.shadowCameraNear = 500
  spotLight.shadowCameraFar = 4000
  spotLight.shadowCameraFov = 30
  scene.add(spotLight)

  // マテリアルを作成
  const Mat = () => {
    const material = new MeshPhongMaterial({
      color: new Color('rgb(273,125,125)'),
      emissive: new Color('rgb(273,125,125)'),
      specular: new Color('rgb(93,195,255)'),
      wireframe: true,
      transparent: true,
      shininess: 1,
      opacity: 0.15,
    })
    return material
  }

  // ジオメトリを作成
  const geometry = new SphereGeometry(50, 20, 20, 0, Math.PI * 2, 0, Math.PI)
  const sphere = new Mesh(geometry, Mat())

  scene.add(sphere)

  camera.position.z = 90

  const render = () => {
    requestAnimationFrame(render)

    const sec = performance.now() / 1000

    sphere.rotation.x = sec * (Math.PI / 4)
    sphere.rotation.y = sec * (Math.PI / 4)

    renderer.render(scene, camera)
  }
  render()
}

export default Study
