import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Fog,
  Object3D,
  SphereGeometry,
  Mesh,
  MeshPhongMaterial,
  AmbientLight,
  DirectionalLight,
} from 'three'
import { EffectComposer } from '../../node_modules/three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from '../../node_modules/three/examples/jsm/postprocessing/RenderPass.js'
import { GlitchPass } from '../../node_modules/three/examples/jsm/postprocessing/GlitchPass.js'

const Study = () => {
  let camera, scene, renderer, composer
  let object, light

  let glitchPass

  const width = window.innerWidth
  const height = window.innerHeight

  renderer = new WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  document.body.appendChild(renderer.domElement)

  camera = new PerspectiveCamera(70, width / height, 1, 1000)
  camera.position.z = 400

  scene = new Scene()
  scene.fog = new Fog(0x000000, 1, 1000)

  object = new Object3D()
  scene.add(object)

  const geometry = new SphereGeometry(1, 4, 4)

  for (let i = 0; i < 100; i++) {
    const material = new MeshPhongMaterial({
      color: 0xffffff * Math.random(),
      flatShading: true,
    })

    const mesh = new Mesh(geometry, material)
    mesh.position
      .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
      .normalize()
    mesh.position.multiplyScalar(Math.random() * 400)
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2)
    mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50
    object.add(mesh)
  }

  scene.add(new AmbientLight(0x222222))
  light = new DirectionalLight(0xffffff)
  light.position.set(1, 1, 1)
  scene.add(light)

  composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  glitchPass = new GlitchPass()
  composer.addPass(glitchPass)

  glitchPass.goWild = false

  const render = () => {
    requestAnimationFrame(render)

    composer.render()
  }
  render()
}

export default Study
