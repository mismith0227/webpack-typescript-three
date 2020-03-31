import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Mesh,
  MeshPhongMaterial,
  AmbientLight,
  PlaneGeometry,
  DirectionalLight,
  LoadingManager,
  Group,
  TetrahedronGeometry,
  MeshLambertMaterial,
} from 'three'

const Study = () => {
  const colors = [0xde5006, 0x42447, 0xc0a468, 0xf38d58, 0x615173]
  let obj = []
  const width = window.innerWidth
  const height = window.innerHeight

  // レンダラーを作成
  const renderer = new WebGLRenderer({ antialias: true })
  renderer.shadowMapEnabled = true
  renderer.setClearColor(0xffffff, 1)
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)

  // canvasにレンダラー追加
  const container = document.getElementById('canvas-container4')
  container.appendChild(renderer.domElement)

  // カメラ作成
  const camera = new PerspectiveCamera(45, width / height, 0.1, 1000)
  camera.position.set(-600, 0, 0)

  // シーンを作成
  const scene = new Scene()

  // ground
  const groundMaterial = new MeshPhongMaterial({
    color: 0x6c6c6c,
  })

  const plane = new Mesh(new PlaneGeometry(5000, 5000), groundMaterial)
  plane.rotation.y = -Math.PI / 2
  plane.position.x = 500
  plane.receiveShadow = true

  scene.add(plane)

  // light
  scene.add(new AmbientLight(0xffffff))
  const light = new DirectionalLight(0xdfebff, 1.75)
  light.position.set(-1000, 0, 0)
  light.position.multiplyScalar(1.3)
  light.intensity = 1
  light.castShadow = true
  light.shadowMapWidth = 1000
  light.shadowMapHeight = 1000

  const d = 500
  light.shadowCameraLeft = -d
  light.shadowCameraRight = d
  light.shadowCameraTop = d
  light.shadowCameraBottom = -d
  light.shadowCameraFar = 4000

  scene.add(light)

  const manager = new LoadingManager()
  const group = new Group()
  scene.add(group)

  while (obj.length < 200) {
    const item = new Tetrahedron()
    obj.push(item)
  }

  for (var i = 0; i < obj.length; i++) {
    group.add(obj[i].shape)
  }

  function Tetrahedron() {
    this.size = Math.random()

    this.color = colors[Math.floor(Math.random() * colors.length)]

    this.geometry = new TetrahedronGeometry(this.size * 17, 0)
    this.material = new MeshLambertMaterial({ color: this.color })
    this.shape = new Mesh(this.geometry, this.material)
    this.shape.position.set(Math.floor(Math.random() * 150) + 300, 0, 0)
    this.circle_rotation = Math.random() * Math.PI * 2
    this.shape.castShadow = true
    this.shape.receiveShadow = true
    this.circle = Math.floor(Math.random() * 100 + 300)

    this.animate = function() {
      this.shape.position.y = Math.sin(this.circle_rotation) * this.circle
      this.shape.position.z = Math.cos(this.circle_rotation) * this.circle
      this.shape.rotation.x += this.size * 0.05
      this.shape.rotation.z += this.size * 0.1
      this.circle_rotation += 0.002
    }
  }

  const render = () => {
    requestAnimationFrame(render)

    camera.lookAt(scene.position)
    renderer.render(scene, camera)
    for (var i = 0; i < obj.length; i++) {
      obj[i].animate()
    }
  }
  render()
}

export default Study
