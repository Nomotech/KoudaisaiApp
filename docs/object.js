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

class Image{
	constructor(path,width,height,x,y,z){
		this.object= new THREE.Object3D();
		this.height = height;
		this.width =width;
		this.x = x;
		this.y = y;
		this.z = z;
		let loader = new THREE.TextureLoader();
		
		//texture
		this.texture = loader.load(path);
		this.texture.needsUpdate = true;

		this.mesh = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(this.width,this.height),
			new THREE.MeshPhongMaterial({
				//color: 0x00FFFF ,
				color: 0xFFFFFF ,
				transparent:true,
				map: this.texture,
				opacity:0.99999,
				side:THREE.DoubleSide,
			})
		);
		this.mesh.rotation.y = 90 * Math.PI / 180;

		this.mesh.position.set(this.x,this.y,this.z);
		this.move_start = 0;
	
		this.object.add(this.mesh);

		object.add(this.object);
	}
	setPosition(x,y,z){
		this.object.position.set(x,y,z);
	}
	setScale(x,y,z){
		this.object.scale.set(x,y,z);
	}
}


class Plate{
	constructor(path = null,w = 900,h = 500){
		this.object= new THREE.Object3D();
		this.height=h;
		this.width =w;
		this.plate = new THREE.Object3D();

		//canvas
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width; 
		this.canvas.height =this.height;
		let ctx = this.canvas.getContext('2d');
		ctx.fillStyle = '#FFFFFF';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.font = "150px sans-serif";
		ctx.fillText(i,this.width/2,this.height/2);
		ctx.font = "30px sans-serif";

		//texture
		//this.texture = new THREE.Texture(this.canvas);
		if(path != null){
			this.texture = loader.load(path);
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
			this.plate.add(this.mesh);
		
		}
		this.x = 0;
		this.y = 0;
		this.z = 0;
		

		this.back = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(this.width,this.height),
			new THREE.MeshPhongMaterial({
				//color: 0x00FFFF ,
				color: 0x0066FF ,
				transparent:true,
				opacity:0.2,
				side:THREE.DoubleSide,
			})
		);
		this.back.rotation.y = 90 * Math.PI / 180;
		this.back.position.set(-1,0,0);

		this.frame_material = new THREE.LineBasicMaterial( { 
			linewidth: 1,
			transparent:true,
			opacity:0.5,
			color: 0x00FFFF 
		} );
	    this.frame_geometry = new THREE.Geometry();
	    this.frame_geometry.vertices.push(new THREE.Vector3(0, this.height/2, this.width/2));
	    this.frame_geometry.vertices.push(new THREE.Vector3(0, this.height/2,-this.width/2));
	    this.frame_geometry.vertices.push(new THREE.Vector3(0,-this.height/2,-this.width/2));
	    this.frame_geometry.vertices.push(new THREE.Vector3(0,-this.height/2, this.width/2));
	    this.frame_geometry.vertices.push(new THREE.Vector3(0, this.height/2, this.width/2));
		this.frame_mesh = new THREE.Line( this.frame_geometry, this.frame_material );

		this.move_start = 0;

		this.plate.add(this.back);
		this.plate.add(this.frame_mesh);
		this.object.add(this.plate);

		object.add(this.object);
		this.object.position.set(-20000,0,0);	 
	}

	setWidth(w){
		this.width = w; 
	}

	setHeight(h){
		this.height = h;
	}
}