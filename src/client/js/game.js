import * as THREE from '/build/three.module.js';

export {
    init
}

const BOARD_SIZE_SIZE = 500;
const BOARD_SIZE_HEIGHT = 10;

const KUBE_SIZE = 35;

let scene;
let camera;
let renderer;

function init() {
  
    scene = new THREE.Scene();

    initRenderer();
    initCamera();
    initLight();
    initBoard();

    initKube();

    render();
  
}

function render() {
    // Render
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function initRenderer() {
    // Renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor("#afe1fa");
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    // Camera
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
    camera.position.z = 350;
    camera.position.y = 450;
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth,window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    })
}

function initLight() {
    // light
    var light1 = new THREE.PointLight(0xFFFFFF, 1, 0)
    light1.position.set(0,250,0);
    scene.add(light1);
}

function initBoard() {
    // Board
    let geometry;
    let mesh;
    let material;
    let cubeMaterial;
  
    geometry = new THREE.BoxGeometry(BOARD_SIZE_SIZE, BOARD_SIZE_HEIGHT , BOARD_SIZE_SIZE);
    cubeMaterial = [
      new THREE.MeshLambertMaterial({color: 0x1c5c31}), // right
      new THREE.MeshLambertMaterial({color: 0x1c5c31}), // left
      new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('/img/board.png'), side: THREE.DoubleSide }), // top
      new THREE.MeshLambertMaterial({color: 0x1c5c31}), // bottom
      new THREE.MeshLambertMaterial({color: 0x1c5c31}), // front
      new THREE.MeshLambertMaterial({color: 0x1c5c31}) // back
    ];
    material = new THREE.MeshFaceMaterial(cubeMaterial);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -2;
    scene.add(mesh);
    camera.lookAt(mesh.position.x, mesh.position.y, mesh.position.z);
}

function initKube() {
    // Board
    let geometry;
    let mesh;
    let material;
    let cubeMaterial;
  
    geometry = new THREE.BoxGeometry(KUBE_SIZE, KUBE_SIZE , KUBE_SIZE);
    cubeMaterial = [
      new THREE.MeshLambertMaterial({color: 0x1c5c31}), // right
      new THREE.MeshLambertMaterial({color: 0x1c5c31}), // left
      new THREE.MeshLambertMaterial({color: 0x1c5c31}), // left
      new THREE.MeshLambertMaterial({color: 0x1c5c31}), // bottom
      new THREE.MeshLambertMaterial({color: 0x1c5c31}), // front
      new THREE.MeshLambertMaterial({color: 0x1c5c31}) // back
    ];
    material = new THREE.MeshFaceMaterial(cubeMaterial);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 12;
    scene.add(mesh);

}