class App {
  /**
   * @constructor
   */
  constructor() {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.DELTA_TIME = 0
    this.LAST_TIME = Date.now()

    this.scene = new Scene(this.width, this.height)
    this.plane = new Plane()

    this.scene.add(this.plane.mesh)

    const root = document.body.querySelector('.app')
    root.appendChild(this.scene.renderer.domElement)

    this.update = this.update.bind(this)

    this.addListeners()

    requestAnimationFrame(this.update)
  }

  /**
   * @method
   * @name onResize
   * @description Triggered when window is resized
   */
  onResize() {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.scene.resize(this.width, this.height)
  }

  /**
   * @method
   * @name addListeners
   */
  addListeners() {
    window.addEventListener('resize', this.onResize.bind(this))
  }

  /**
   * @method
   * @name update
   * @description Triggered on every TweenMax tick
   */
  update() {
    this.DELTA_TIME = Date.now() - this.LAST_TIME
    this.LAST_TIME = Date.now()

    this.plane.update(this.DELTA_TIME)
    this.scene.render()

    requestAnimationFrame(this.update)
  }
}

class Plane {
  /**
   * @constructor
   */
  constructor() {
    this.size = 1000
    this.segments = 200

    this.options = new Options()
    this.options.initGUI()

    this.uniforms = {
      u_amplitude: { value: this.options.amplitude },
      u_frequency: { value: this.options.frequency },
      u_time: { value: 0.0 },
    }

    this.geometry = new THREE.PlaneBufferGeometry(
      this.size,
      this.size,
      this.segments,
      this.segments
    )
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: document.getElementById('planeVS').innerHTML,
      fragmentShader: document.getElementById('planeFS').innerHTML,
      side: THREE.DoubleSide,
      wireframe: true,
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.rotation.x = 360
  }

  /**
   * @method
   * @name update
   * @description Triggered on every TweenMax tick
   * @param {number} dt - DELTA_TIME
   */
  update(dt) {
    this.uniforms.u_amplitude.value = this.options.amplitude
    this.uniforms.u_frequency.value = this.options.frequency
    this.uniforms.u_time.value += dt / 1000
  }
}

class Scene extends THREE.Scene {
  /**
   * @constructor
   */
  constructor(width, height) {
    super()

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(width, height)
    this.renderer.setClearColor(0x000000)

    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 2000)
    this.camera.position.z = 100

    this.controls = new THREE.OrbitControls(this.camera)
  }

  /**
   * @method
   * @name render
   * @description Renders/Draw the scene
   */
  render() {
    this.renderer.autoClearColor = true
    this.renderer.render(this, this.camera)
  }

  /**
   * @method
   * @name resize
   * @description Resize the scene according to screen size
   * @param {number} newWidth
   * @param {number} newHeight
   */
  resize(newWidth, newHeight) {
    this.camera.aspect = newWidth / newHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(newWidth, newHeight)
  }
}

class Options {
  /**
   * @constructor
   */
  constructor() {
    this.amplitude = 10.0
    this.frequency = 0.05

    this.gui = new dat.GUI()
  }

  /**
   * @method
   * @name initGUI
   * @description Initialize the dat-gui
   */
  initGUI() {
    this.gui.close()

    this.gui.add(this, 'amplitude', 1.0, 15.0)
    this.gui.add(this, 'frequency', 0.01, 0.1)
  }
}

new App()
