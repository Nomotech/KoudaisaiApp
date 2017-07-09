var object= new THREE.Object3D();

class Text{
	constructor(str){
		this.object= new THREE.Object3D();
		this.height=500;
		this.width =500;

		//canvas
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width; 
		this.canvas.height =this.height;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.fillStyle = '#FFFFFF';
		this.ctx.textAlign = 'center';
		this.ctx.textBaseline = 'middle';
		this.ctx.font = "30px sans-serif";
		this.ctx.fillText(str,this.width/2,this.height/2);
		this.ctx.font = "30px sans-serif";
		
		//texture
		this.texture = new THREE.Texture(this.canvas);
		this.texture.needsUpdate = true;

		this.mesh = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(this.width,this.height),
			new THREE.MeshPhongMaterial({
				//color: 0x00FFFF ,
				color: 0xFFFFFF ,
				transparent:true,
				map: this.texture,
				opacity:0.9999,
				side:THREE.DoubleSide,
			})
		);
		this.mesh.rotation.y = 90 * Math.PI / 180;

		this.object.add(this.mesh);
		this.object.position.set(0,0,0);

		object.add(this.object);
	}

	setPosition(x,y,z){
		this.object.position.set(x,y,z);
	}
}