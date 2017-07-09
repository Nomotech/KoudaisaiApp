'use strict';
console.debug = function(){/* NOP */};
console.info = function(){/* NOP */};
//console.log = function(){/* NOP */};
console.warn = function(){/* NOP */};
//console.error = function(){/* NOP */};

let width = window.innerWidth-windowMargine;
let height =window.innerHeight-windowMargine;

let i;
let j;
let scene;
let camera;
let renderer;
let t = 0;

let plane_width = 2000;

let loader = new THREE.TextureLoader();

//scene ステージ
scene = new THREE.Scene();

//renderer 実際に描画を行う
renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(width,height);
renderer.setClearColor(0x000030);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('stage').appendChild(renderer.domElement);

//camera
let cameraPos = {x:11000,y:0,z:0};
let cameraVec = {x:-100,y:0,z:0};
camera = new THREE.PerspectiveCamera(45, width / height,1,10000);
camera.position.set(cameraPos.x,cameraPos.y,cameraPos.z);
camera.lookAt({x:cameraPos.x + cameraVec.x,y:cameraPos.y + cameraVec.y,z:cameraPos.z + cameraVec.z});
//controlを追加し、マウスによるカメラコントロールを追加
//let controls = new THREE.OrbitControls(camera, renderer.domElement);

//点光源
// light
let light = new THREE.DirectionalLight( 0xffffff,0.5 );
light.position.set(0, 1000, 0 );
light.castShadow = true;
light.shadow.camera.near = 0;
light.shadow.camera.far = 10000;
light.shadow.camera.top = plane_width;
light.shadow.camera.bottom = -plane_width;
light.shadow.camera.left = plane_width;
light.shadow.camera.right = -plane_width;
light.shadow.mapSize.width = plane_width;
light.shadow.mapSize.height = plane_width;
//scene.add( light );

// 環境光を追加
let ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);

// 影
renderer.shadowMapEnabled = true; 



//mesh 物体
// - geometry 形状
// - material　材質

//地面
let planeGeometry = new THREE.PlaneBufferGeometry(plane_width,plane_width);
let planeMaterial = new THREE.MeshPhongMaterial({color:"#fff",side:THREE.DoubleSide});
let plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.position.set(0,0,0); // 位置を調整 rotate,scale
plane.rotation.x = 90 * Math.PI / 180;// 初期状態だと縦になっているので、横になるように回転
plane.receiveShadow = true;
//scene.add(plane);



let frame = {};
let geometry = new THREE.IcosahedronGeometry( 1,1 )
let material = new THREE.MeshPhongMaterial({ 
	color: 0xFFFFFF,
	wireframe: true,
	transparent: true,
	opacity:0.05
});
frame.mesh = new THREE.Mesh(geometry, material);
frame.mesh.position.set(0,0,0);
frame.mesh.castShadow = true;
//object.add(frame.mesh);

let plate_num = 16;
let p= new Array(plate_num);
for(i=0;i<plate_num;i++){
	//object生成
	p[i] = {};
	p[i].object= new THREE.Object3D();
	p[i].height=600;
	p[i].width =800;
	p[i].plate = new THREE.Object3D();

	//canvas
	p[i].canvas = document.createElement('canvas');
	p[i].canvas.width = p[i].width; 
	p[i].canvas.height =p[i].height;
	let ctx = p[i].canvas.getContext('2d');
	ctx.fillStyle = '#FFFFFF';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.font = "150px sans-serif";
	ctx.fillText(i,p[i].width/2,p[i].height/2);
	ctx.font = "30px sans-serif";

	//texture
	//p[i].texture = new THREE.Texture(p[i].canvas);
	p[i].texture = loader.load("./" + i + ".png");
	p[i].texture.needsUpdate = true;

	p[i].x = 0;
	p[i].y = 0;
	p[i].z = 0;
	p[i].mesh = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(p[i].width,p[i].height),
		new THREE.MeshPhongMaterial({
			//color: 0x00FFFF ,
			color: 0xFFFFFF ,
			transparent:true,
			map: p[i].texture,
			opacity:0.9999,
			side:THREE.DoubleSide,
		})
	);
	p[i].mesh.rotation.y = 90 * Math.PI / 180;

	p[i].back = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(p[i].width,p[i].height),
		new THREE.MeshPhongMaterial({
			//color: 0x00FFFF ,
			color: 0x0066FF ,
			transparent:true,
			opacity:0.2,
			side:THREE.DoubleSide,
		})
	);
	p[i].back.rotation.y = 90 * Math.PI / 180;
	p[i].back.position.set(-1,0,0);

	p[i].frame_material = new THREE.LineBasicMaterial( { 
		linewidth: 1,
		transparent:true,
		opacity:0.5,
		color: 0x00FFFF 
	} );
    p[i].frame_geometry = new THREE.Geometry();
    p[i].frame_geometry.vertices.push(new THREE.Vector3(0, p[i].height/2, p[i].width/2));
    p[i].frame_geometry.vertices.push(new THREE.Vector3(0, p[i].height/2,-p[i].width/2));
    p[i].frame_geometry.vertices.push(new THREE.Vector3(0,-p[i].height/2,-p[i].width/2));
    p[i].frame_geometry.vertices.push(new THREE.Vector3(0,-p[i].height/2, p[i].width/2));
    p[i].frame_geometry.vertices.push(new THREE.Vector3(0, p[i].height/2, p[i].width/2));
	p[i].frame_mesh = new THREE.Line( p[i].frame_geometry, p[i].frame_material );

	p[i].move_start = 0;

	p[i].plate.add(p[i].mesh);
	p[i].plate.add(p[i].back);
	p[i].plate.add(p[i].frame_mesh);
	p[i].object.add(p[i].plate);

	object.add(p[i].object);
	p[i].object.position.set(-20000,0,0);
}

p[0].plate.position.set(-800,200,-550);
p[1].plate.position.set(-1800,200,-550);
p[2].plate.position.set(-800,-100,-400);
p[3].plate.position.set(-1800,-100,-400);
p[4].plate.position.set(-2800,-100,-400);
p[5].plate.position.set(-3800,-100,-400);
p[6].plate.position.set(-4800,-100,-400);
p[7].plate.position.set(-5800,-100,-400);
p[8].plate.position.set(-6800,-100,-400);
p[9].plate.position.set(-7800,-100,-400);
p[10].plate.position.set(-800,-100,-700);
p[11].plate.position.set(-800,0,-550);
p[12].plate.position.set(-1800,0,-550);
p[13].plate.position.set(-2800,0,-550);
p[14].plate.position.set(-3800,0,-550);



let logo = {};
logo.object= new THREE.Object3D();
logo.height=195 * 1.5;
logo.width = 705 * 1.5;
logo.plate = new THREE.Object3D();

//canvas
logo.canvas = document.createElement('canvas');
logo.canvas.width = logo.width; 
logo.canvas.height = logo.height;

//texture
logo.texture = loader.load("./applogo.png");
logo.texture.needsUpdate = true;

logo.x = 0;
logo.y = 0;
logo.z = 300;
logo.mesh = new THREE.Mesh(
	new THREE.PlaneBufferGeometry(logo.width,logo.height),
	new THREE.MeshPhongMaterial({
		//color: 0x00FFFF ,
		color: 0xFFFFFF ,
		transparent:true,
		map: logo.texture,
		opacity:0.9999,
		side:THREE.DoubleSide,
	})
);
logo.mesh.rotation.y = 90 * Math.PI / 180;

logo.back = new THREE.Mesh(
	new THREE.PlaneBufferGeometry(logo.width,logo.height),
	new THREE.MeshPhongMaterial({
		//color: 0x00FFFF ,
		color: 0x0066FF ,
		transparent:true,
		opacity:0.2,
		side:THREE.DoubleSide,
	})
);
logo.back.rotation.y = 90 * Math.PI / 180;

logo.mesh.position.set(logo.x,logo.y,logo.z);
logo.move_start = 0;

logo.plate.add(logo.mesh);
logo.object.add(logo.plate);

object.add(logo.object);


let line_num = 300;
let l= new Array(line_num);
for(i=0;i<line_num;i++){
	l[i] = {};
	l[i].object= new THREE.Object3D();

	l[i].frame_material = new THREE.LineBasicMaterial( { 
		linewidth: 3,
		transparent:true,
		opacity:1.0,
		color: 0x0099FF
		// color: 0x66FF66 
	} );
    l[i].frame_geometry = new THREE.Geometry();
    l[i].frame_geometry.vertices.push(new THREE.Vector3(0, 0.0, 0.0));
    l[i].frame_geometry.vertices.push(new THREE.Vector3(0, 1.0, 0.0));
    l[i].frame_mesh = new THREE.Line( l[i].frame_geometry, l[i].frame_material );


	l[i].object.add(l[i].frame_mesh);

	object.add(l[i].object);
}


function Drawline(line,s,e,ease){
	let length = Math.sqrt( (s[0]-e[0]) * (s[0]-e[0]) + (s[1]-e[1]) * (s[1]-e[1]) + (s[2]-e[2]) * (s[2]-e[2]));
	let vec = [e[0]-s[0],e[1]-s[1],e[2]-s[2]];
	line.object.scale.set(1.0,length * ease,1.0);
	line.object.position.set(s[0],s[1],s[2]);
	quat(line.object,vec);
}


let point_num = 300;
let point = new Array(point_num);
for(i=0;i<point_num;i++)point[i] = [0.0,0.0,0.0];


//text
let txt_intro = new Text("Intro");
txt_intro.setPosition(10,200,-550)
txt_intro.object.scale.set(0.0,0.0,0.0);

let txt_function = new Text("Functions");
txt_function.setPosition(10,-100,-380);
txt_function.object.scale.set(0.0,0.0,0.0);

let txt_heatmap = new Text("HeatMap");
txt_heatmap.setPosition(10,-100,-720);
txt_heatmap.object.scale.set(0.0,0.0,0.0);


let cY = 0; // ↑
let cZ = -550; // →
for(let j = 0; j<6;j++){
		point[j] = [0.0,
							cY + 100 * Math.sin(j * Math.PI/3),
							cZ + 100 * Math.cos(j * Math.PI/3)];	
		l[j].frame_material.color.r = 0;
		l[j].frame_material.color.g = 255;
		l[j].frame_material.color.b = 255;
	}
for(let i = 1; i<7 ; i++){
	for(let j = 0; j<6;j++){
		point[i * 6 + j] = [0.0,
							cY + 200 * Math.sin(i * Math.PI/3 - Math.PI/6) + 100 * Math.sin(j * Math.PI/3),
							cZ + 200 * Math.cos(i * Math.PI/3 - Math.PI/6) + 100 * Math.cos(j * Math.PI/3)];	
	}
}

scene.add(object);

let play = 1;	// -1...逆再生 1...順再生	
let timer_num = 7;
let start_time = new Array(timer_num);
for(i=0;i<timer_num;i++)start_time[i] = [0];
let move_flag = 0;
let state = 0;
let faseflag = 0;

function fase(){
	if(key[13] == 1 && move_flag == 0 || faseflag == 1){
		start_time[0][0] = t;
		start_time[1][0] = t + 10;
		start_time[2][0] = t + 20;
		start_time[3][0] = t + 30;
		start_time[4][0] = t + 40;
		start_time[5][0] = t + 50;
		start_time[6][0] = t + 60;
		move_flag = 1;
		faseflag = 0;
	}
	
}

function checkPlay(ease){
	if(play < 0) ease = (1.0 - ease);
	return ease;
}

function prePage(){
	state -= 2.0;
	if(state < 0) state = 0;
	faseflag = 1;
	play = -1;
	// let po = state + 0.1 * move_flag;
	// console.log("fase: " + po);
	console.log(play);
}

