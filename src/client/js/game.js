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
let $viewCube;

function init() {
  
    scene = new THREE.Scene();

    const { kubeSelectionHeight, boardHeight } = { ...getSizes() };

    initRenderer();
    initCamera();
    initLight();
    initBoard();

    initKube(KUBE_TYPE.STAR, 1, 1, 1);

    initOrbitControl();
    render();

    setElementSize();

    $('#kube-slider').lightSlider(
        {
            pager:false,
            item:4,
            slideMargin: 0
        }
    );

    window.addEventListener('resize', () => {
        setElementSize();
    })

}

function getSizes() {
    const kubeSelectionHeight = window.innerHeight / 7;
    const boardHeight = window.innerHeight - kubeSelectionHeight;

    return {
        kubeSelectionHeight,
        boardHeight
    }
}

function setElementSize() {

    const { kubeSelectionHeight, boardHeight } = { ...getSizes() };

    let $kubeSelector = $("#kube-selector");
    $kubeSelector.height(kubeSelectionHeight);
    $kubeSelector.width(window.innerWidth / 2);
    $kubeSelector.css('top', window.innerHeight - $kubeSelector.height());

    let $kubeContainer = $(".kube-container");
    $kubeContainer.height(kubeSelectionHeight);
    
    let $kubeImage = $(".kube-container img");
    $kubeImage.width(kubeSelectionHeight);
    $kubeImage.height(kubeSelectionHeight);

    renderer.setSize(window.innerWidth,boardHeight);
    camera.aspect = window.innerWidth / boardHeight;
    camera.updateProjectionMatrix();
}

function initOrbitControl() {

    controls = new OrbitControls(camera, renderer.domElement)
}

function render() {
    // Render
    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function initRenderer() {
    const { boardHeight } = { ...getSizes() };

    // Renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor("#afe1fa");
    renderer.setSize(window.innerWidth,boardHeight);
    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    const { boardHeight } = { ...getSizes() };

    // Camera
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/boardHeight,0.1,2000)
    camera.position.z = 600;
    camera.position.y = 550;
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

    // light
    const light6 = new THREE.PointLight(0xFFFFFF, 1, 0)
    light6.position.set(0,-z,0);
    scene.add(light6);
}

function initBoard() {
    // Board
    let geometry;
    let mesh;
    let cubeMaterial;
  
    geometry = new THREE.BoxGeometry(BOARD_SIZE_SIZE, BOARD_SIZE_HEIGHT , BOARD_SIZE_SIZE);
    cubeMaterial = [
      new THREE.MeshLambertMaterial({color: 0x13104f}), // right
      new THREE.MeshLambertMaterial({color: 0x13104f}), // left
      new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('/img/board.png'), side: THREE.DoubleSide }), // top
      new THREE.MeshLambertMaterial({color: 0x13104f}), // bottom
      new THREE.MeshLambertMaterial({color: 0x13104f}), // front
      new THREE.MeshLambertMaterial({color: 0x13104f}) // back
    ];

    mesh = new THREE.Mesh(geometry, cubeMaterial);
    scene.add(mesh);
    camera.lookAt(mesh.position.x, mesh.position.y, mesh.position.z);
}

function initKube(kubeType, x, y, player) {
    // Board
    let geometry;
    let mesh;
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

    y = 8 - y;

    mesh = new THREE.Mesh(geometry, cubeMaterial);
    mesh.position.y = KUBE_ONBOARD_Y_POSITION;
    mesh.position.x = ((BOARD_SIZE_SIZE / 2) * -1) + (x * 100) - 50;
    mesh.position.z = ((BOARD_SIZE_SIZE / 2) * -1) + (y * 100) - 50;
    scene.add(mesh);
}