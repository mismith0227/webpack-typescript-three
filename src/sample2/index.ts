import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  PointLight,
  BoxGeometry,
  MeshLambertMaterial,
  Mesh,
  Vector2,
} from 'three'

const sample2 = () => {
  // スクロール量
  let scrollY = 0

  // マウス座標
  let mouse = new Vector2(0, 0)

  // ウィンドウサイズ
  const width = window.innerWidth
  const height = window.innerHeight

  // レンダラーを作成
  const renderer = new WebGLRenderer()
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)

  // レンダラーのcanvas追加
  const container = document.getElementById('canvas-container2')
  container.appendChild(renderer.domElement)

  const fov = 60
  const fovRad = (fov / 2) * (Math.PI / 180) // 視野角をラジアンに変換
  const dist = height / 2 / Math.tan(fovRad) // ウィンドウぴったりのカメラ距離

  // カメラを作成（視野角、画面のアスペクト比、カメラに映る最短距離、カメラに映る最速距離）
  const camera = new PerspectiveCamera(fov, width / height, 1, dist * 2)
  camera.position.z = dist

  // シーンを作成
  const scene = new Scene()

  // ライトを作成
  const light = new PointLight(0x00ffff)
  light.position.set(0, 0, 400)

  // ライトをシーンに追加
  scene.add(light)

  // 立方体のジオメトリを作成（幅、高さ、奥行き）
  const element = document.getElementById('scroll-container_title')
  const rect = element.getBoundingClientRect()
  const depth = 300
  const geo = new BoxGeometry(rect.width, rect.height, depth)

  // マテリアルを作成
  const mat = new MeshLambertMaterial({ color: 0xffffff })

  // ジオメトリとマテリアルからメッシュを作成
  const mesh = new Mesh(geo, mat)
  // mesh.rotation.x = Math.PI / 4
  // mesh.rotation.y = Math.PI / 4

  // windouw中心からDomRect中心
  const center = new Vector2(rect.x + rect.width / 2, rect.y + rect.height / 2)
  const diff = new Vector2(center.x - width / 2, center.y - height / 2)
  mesh.position.set(diff.x, -(diff.y + scrollY), -depth / 2)

  const offsetY = mesh.position.y

  // メッシュをシーンに追加
  scene.add(mesh)

  const loop = (): void => {
    requestAnimationFrame(loop)

    // // msから秒に変換
    // const sec = performance.now() / 1000

    // // 1秒で45度回転する
    // mesh.rotation.x = sec * (Math.PI / 4)
    // mesh.rotation.y = sec * (Math.PI / 4)

    // // スクロールに追従させる
    mesh.position.y = offsetY + scrollY

    // 画面に表示
    renderer.render(scene, camera)
  }

  const mouseMoved = (x: number, y: number) => {
    mouse.x = x - width / 2
    mouse.y = -y + height / 2

    light.position.x = mouse.x
    light.position.y = mouse.y
  }

  const scrolled = (y: number) => {
    scrollY = y
  }

  window.addEventListener('mousemove', (e) => {
    mouseMoved(e.clientX, e.clientY)
  })

  window.addEventListener('scroll', (e) => {
    scrolled(window.scrollY)
  })

  loop()
}

export default sample2
