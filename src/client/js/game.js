import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls.js';

export {
    init
}

const BOARD_SIZE_SIZE = 700;
const BOARD_SIZE_HEIGHT = 10;

const KUBE_SIZE = 70;

const KUBE_ONBOARD_Y_POSITION = (KUBE_SIZE / 2) + (BOARD_SIZE_HEIGHT / 2)

const KUBE_COLOR = {
    PLAYER1: 0x216e3a,
    PLAYER2: 0x9c9852,
}

const KUBE_TYPE = {
    STAR : 1,
    COMET : 2,
    EARTHQUAKE : 3,
    TSUNAMI : 4,
    TORNADO : 5,
    FIRE : 6,
    ECLIPSE : 7,
    SHIELD : 8,
    KEY : 9,
    EYE : 10,
}

let scene;
let camera;
let renderer;
let controls;

function init() {
  
    scene = new THREE.Scene();

    const kubeSelectionHeight = window.innerHeight / 10;
    const boardHeight = window.innerHeight - kubeSelectionHeight;

    initRenderer(boardHeight);
    initCamera(boardHeight);
    initLight();
    initBoard();

    // for(let i = 1; i<8; i++)
    //     for(let j = 1; j<8; j++)
    //     initKube(KUBE_TYPE.STAR, i, j, 1);
    
    initKube(KUBE_TYPE.STAR, 1, 1, 1);

    initOrbitControl();
    render();

    // document.addEventListener("click", handleClick);
    // $(document.body).append($('<div>hello</div>'))
    let $viewCube = $('.view-cube');
    $viewCube.css('top', window.innerHeight - $viewCube.height());

  $viewCube.append('<div>test</div>')
}

// function handleClick(e) {
//     var relativeX = (e.pageX - $(e.target).offset().left),
//         relativeY = (e.pageY - $(e.target).offset().top);

//         alert("X: " + relativeX + "  Y: " + relativeY);

// }

function initOrbitControl() {

    controls = new OrbitControls(camera, renderer.domElement)
}

function render() {
    // Render
    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function initRenderer(boardHeight) {
    // Renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor("#afe1fa");
    renderer.setSize(window.innerWidth,boardHeight);
    document.body.appendChild(renderer.domElement);
}

function initCamera(boardHeight) {
    // Camera
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/boardHeight,0.1,2000)
    camera.position.z = 600;
    camera.position.y = 550;
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth,boardHeight);
        camera.aspect = window.innerWidth / boardHeight;
        camera.updateProjectionMatrix();
    })
}

function initLight() {
    
    const {x, y, z} = {...camera.position};

    // light
    const light1 = new THREE.PointLight(0xFFFFFF, 1, 0)
    light1.position.set(0,z,0);
    scene.add(light1);

    // light
    const light2 = new THREE.PointLight(0xFFFFFF, 1, 0)
    light2.position.set(x,100,z);
    scene.add(light2);
    
    // light
    const light3 = new THREE.PointLight(0xFFFFFF, 1, 0)
    light3.position.set(z,100,x);
    scene.add(light3);
    
    // light
    const light4 = new THREE.PointLight(0xFFFFFF, 1, 0)
    light4.position.set(-z,100,x);
    scene.add(light4);

    // light
    const light5 = new THREE.PointLight(0xFFFFFF, 1, 0)
    light5.position.set(x,100,-z);
    scene.add(light5);
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
    scene.add(mesh);
    camera.lookAt(mesh.position.x, mesh.position.y, mesh.position.z);
}

function initKube(kubeType, x, y, player) {
    // Board
    let geometry;
    let mesh;
    let material;
    let cubeMaterial;
    let kubeImage;
    let kubeColor;

    switch(player) {
        case 1:
            kubeColor = KUBE_COLOR.PLAYER1;
            break;
        case 2:
            kubeColor = KUBE_COLOR.PLAYER2;
            break;
    }


    switch(kubeType) {
        case KUBE_TYPE.STAR:
            kubeImage = 'kube_star.png';
            break;
    }

    kubeImage = + '/img/' + kubeImage;
  
    geometry = new THREE.BoxGeometry(KUBE_SIZE, KUBE_SIZE , KUBE_SIZE);
    cubeMaterial = [
      new THREE.MeshLambertMaterial({color: kubeColor}), // right
      new THREE.MeshLambertMaterial({color: kubeColor}), // left
      new THREE.MeshLambertMaterial({color: kubeColor}), // top
      new THREE.MeshLambertMaterial({color: kubeColor}), // bottom
      new THREE.MeshLambertMaterial({color: kubeColor}), // front
      new THREE.MeshLambertMaterial({color: kubeColor}) // back
    ];

    material = new THREE.MeshFaceMaterial(cubeMaterial);

    y = 8 - y;

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = KUBE_ONBOARD_Y_POSITION;
    mesh.position.x = ((BOARD_SIZE_SIZE / 2) * -1) + (x * 100) - 50;
    mesh.position.z = ((BOARD_SIZE_SIZE / 2) * -1) + (y * 100) - 50;
    scene.add(mesh);
}