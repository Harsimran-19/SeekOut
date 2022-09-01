import * as THREE from '../node_modules/three/build/three.module.js';
      
const scene = new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight)
camera.position.z=2.1
camera.position.x=-1
camera.position.y=0
scene.add(camera)
const texttureLoader=new THREE.TextureLoader()
//const texture=texttureLoader.load('https://bruno-simon.com/prismic/matcaps/8.png')
const texture=texttureLoader.load('https://raw.githubusercontent.com/nidorx/matcaps/master/64/C345EC_5F1DAA_9F31DB_872CCD-64px.png')
const geometry=new THREE.TorusKnotGeometry(0.5,0.2,400,20)
const material=new THREE.MeshMatcapMaterial({matcap:texture})
const mesh=new THREE.Mesh(geometry,material)
// mesh.rotation.y=Math.PI/4 
scene.add(mesh)

const renderer=new THREE.WebGLRenderer({alpha:true,canvas:canva})
renderer.setSize(window.innerWidth,window.innerHeight)
// const canvas = renderer.domElement;
// document.body.append(renderer.domElement)
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

const cursor={x:0,y:0}

window.addEventListener('mousemove',(e)=>{
    cursor.x=e.clientX/window.innerWidth-0.5
    cursor.y=e.clientY/window.innerHeight-0.5
    console.log(cursor.x);
})

const tick=()=>{
    window.requestAnimationFrame(tick)
    mesh.rotation.y+=0.01 
    const cameraX=cursor.x-1
    const cameraY=-cursor.y
    camera.position.x +=(cameraX-camera.position.x)/10;
    camera.position.y +=(cameraY-camera.position.y)/10;
    renderer.render(scene,camera)
}
tick();
// window.setTimeout(()=>{
//     renderer.render(scene,camera)
// },30)