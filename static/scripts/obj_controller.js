//Create the three.js Scene
var scene = new THREE.Scene();

// Create a new Perspective Camera:
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = -350

//Create a Full Screen WebGl Renderer:
var renderer = new THREE.WebGL1Renderer({antialias: true, alpha: true})
renderer.setClearColor('#DDDDDD');
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// ¿Responsive?
window.addEventListener('resize', ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

// Luces y tal:
var light = new THREE.PointLight(0xFFFFFF, 1.4, 1000)
light.position.set(0,15,15)
light.intensity = 2
scene.add(light)

// Variables para los objetos:
var candadoObj;

// Cargar Objeto:
var objLoader = new THREE.OBJLoader();


var textureLoader = new THREE.TextureLoader();

var normalTexture = textureLoader.load('../Modelos/NormalMaps/NormalMap.png')

var material = new THREE.MeshPhongMaterial({map: normalTexture})
material.metalness = 0.1
material.roughness = 1.2
material.reflectivity = 0.5
material.color = new THREE.Color(0x029BE4)


objLoader.load('../Modelos/Candado.obj', function (object) {

    object.traverse(function(node)
    {
        if (node.isMesh) node.material = material
    })

    scene.add(object);
    candadoObj = object;
    object.position.z -= 370
    object.rotation.x = -0.10
})

var render = function()
{
    requestAnimationFrame(render);
    candadoObj.rotation.y -= .01

    // Rotar el objeto porque yolo:
    renderer.render(scene, camera)
}

render();

