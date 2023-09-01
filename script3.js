console.clear();

//Create TextureLoader
const textureLoader = new THREE.TextureLoader()

//Loads sphere texture map
const normalTexture = textureLoader.load('')
//const normalTexture = textureLoader.load('deskbump2.jpg')

// Creates Canvas and assigns query selector
const canvas = document.querySelector('canvas.webgl')
THREE.ShaderChunk.shadowmap_pars_fragment = THREE.ShaderChunk.shadowmap_pars_fragment.replace( 'return shadow;', 'return max( 10.5, shadow );' );
//imports GLTF load API
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

// Creates new THREE JS Scene
const scene = new THREE.Scene()






//Create sizes const
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.3, 250)
camera.position.x = 0
camera.position.y = 2
camera.position.z = 11

scene.add(camera)



// // // // // // ORBIT CONTROLS // // // // // // //
//const controls = new OrbitControls(camera, canvas)
//controls.enableDamping = true;
//controls.dampingFactor = .1;

//removes right click panning
//controls.enablePan = false;

//controls.panSpeed = .1;
//controls.autoRotate = true;
//controls.autoRotateSpeed = 1;

//Set Focus Point of Orbit
//controls.target = new THREE.Vector3(0, 0, 0);

//Assign camera movement to differnt buttons

//controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;
//controls.mouseButtons.LEFT = THREE.MOUSE.PAN;
//controls.mouseButtons.MIDDLE = THREE.MOUSE.DOLLY;

//controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;
//controls.mouseButtons.LEFT = THREE.MOUSE.PAN;
//controls.mouseButtons.MIDDLE = THREE.MOUSE.DOLLY;




/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding;




/////////// CREATE THE SPHERE //////////
////////////////////////////////////////

// Create new Sphere Geometry
const geometry = new THREE.Geometry( .3, 64, 64 );

// Materials
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

////////////////////////////////////////
////////////////////////////////////////





///////// LOAD THE GLTF OBJECT /////////
////////////////////////////////////////

 // Creates "loader" const and assigns it to GLTFloader
const loader = new GLTFLoader();
let myModel;
// // Load a glTF resource
//// gltf is the function called when the resource is loaded 
 loader.load('scene.gltf', function ( gltf ) {
    myModel = gltf.scene;
    //adds 3d object to scene after loading
    scene.add(myModel);
   
    // WHAT IS THIS DOING?
 		gltf.animations; // Array<THREE.AnimationClip>
 		gltf.scene; // THREE.Group
 		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
 		gltf.asset; // Object
       
	},

 	// called while loading is progressing
 	function ( xhr ) {
 		console.log( ( xhr.loaded / xhr.total * 200 ) + '% loaded' );
 	},
   
 	// called when loading has errors
 	function ( error ) {
 		console.log( 'An error happened' );
	}
    
             
             
             
 );

//===============END====================//

 






/*
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX
let mouseY

let targetX
let targetY

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

function onDocumentMouseMove (event) {

    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
  
}


const clock = new THREE.Clock()
    //this bit controls how far mouse move yaws model

    function animate () {
    targetX = mouseX * .00006
    targetY = mouseY * .00005

    const elapsedTime = clock.getElapsedTime()

    //Update objects - increase number to create automated animation
    sphere.rotation.x = 0 * elapsedTime
    sphere.rotation.y = 0 * elapsedTime

    sphere.rotation.x += 2 * (targetY - sphere.rotation.x)
    sphere.rotation.y += 1.5 * (targetX - sphere.rotation.y)
  
  if (myModel){
     
     myModel.rotation.set(targetY, targetX, myModel.rotation.z);
    
  }
 
    //Update Orbital Controls
   // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
   window.requestAnimationFrame(animate)
   function myFunction(x) {
    if (x.matches) { // If media query matches
        targetY = mouseY * .00005;
    } else {
        targetY = mouseY * .000001;
    }
  }

  var x = window.matchMedia("(max-width: 1200px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes


    
}

animate()


sphere.position.x = 5
sphere.position.y = 2
sphere.position.z = 2








/////////// CREATE LIGHTS //////////
////////////////////////////////////////

//Setup SpotLight 1

const color = new THREE.Color('white'),
intensity = 10,
distance = 33,
angle = Math.PI * .06,
penumbra = 0.25,
decay = 0.5;
const spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
spotLight.position.set(6, 22, 18);
scene.add(spotLight);
scene.add( new THREE.AmbientLight(0xffffff, 0.07));
//Add light to scene
scene.add(SpotLight)
















// SpotLight 3
const SpotLight2 = new THREE.SpotLight(0xff0000, 2)
SpotLight2.position.set(1.05,-3.24,0.1)   //x y z
SpotLight2.intensity = 2.1,
distance = 30,
angle = Math.PI * 0.05,
penumbra = 0.25,
decay = 0.5;
const spotLight2 = new THREE.SpotLight2(color, intensity, distance, angle, penumbra, decay);
spotLight2.position.set(8, 8, 20);
scene.add(spotLight2);
scene.add( new THREE.AmbientLight(0x77ff, 0.07));
//Add light to scene
scene.add(SpotLight2)





scene.add(SpotLight3)
const SpotLightHelper3 = new THREE.SpotLightHelper(SpotLight3, .5) 
scene.add(SpotLightHelper3)

