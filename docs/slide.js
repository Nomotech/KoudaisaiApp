function checkEndAnimation(){
	if(	!start_time[0][0]&
		!start_time[1][0]&
		!start_time[2][0]&
		!start_time[3][0]&
		!start_time[4][0]&
		!start_time[5][0]&
		!start_time[6][0]
	){
		move_flag=0;
		state++;
	}
}

function move(){

	switch(state + 0.1 * move_flag){
		case 0.0:   for(i=0;i<line_num;i++)l[i].object.scale.set(1.0,0.0,1.0);
					break;
		case 0.1: 	var ease1 = ease("easeInOutExpo",start_time[0],50);
					ease1 = checkPlay(ease1);
					cameraPos.x = 1500 + 9500 * (1.0 - ease1);
					if(!start_time[0][0]){move_flag=0;state++;}
					break;
		case 1.0:   break;
		case 1.1:   
					var easing = new Array(7);
					for(let i = 0;i<7;i++) easing[i] = ease("easeInOutExpo",start_time[i],40);
					
					Drawline(l[0],point[0],point[1],easing[0]);
					Drawline(l[1],point[1],point[2],easing[1]);
					Drawline(l[2],point[2],point[3],easing[2]);
					Drawline(l[3],point[3],point[4],easing[3]);
					Drawline(l[4],point[4],point[5],easing[4]);	
					Drawline(l[5],point[5],point[0],easing[5]);
	
					for(let i = 1; i< 7;i++){
						for(let j = 0; j < 5;j++){
							Drawline(l[i * 6 + j],point[i * 6 + j],point[i * 6 + j + 1],easing[i]);	
						}
						Drawline(l[i * 6 + 5],point[i * 6 + 5],point[i * 6],easing[i]);
					}

					txt_intro.object.scale.set(1.0,easing[2],1.0);
					txt_function.object.scale.set(1.0,easing[6],1.0);
					txt_heatmap.object.scale.set(1.0,easing[4],1.0);
					//Drawline(l[0],point[0],point[1],ease1);
					if(!start_time[0][0]&!start_time[1][0]&!start_time[2][0]&!start_time[3][0]&!start_time[4][0]&!start_time[5][0]&!start_time[6][0]){move_flag=0;state++;}
					break;
		case 2.0:   break;
		case 2.1: 
					var ease1 = ease("easeInOutExpo",start_time[0],50);
					var ease2 = ease("easeInOutExpo",start_time[2],50);
					ease1 = checkPlay(ease1);
					ease2 = checkPlay(ease2);
					cameraPos.x = 1500 - 1500 * ease2;
					cameraPos.y = 200 * ease1;
					cameraPos.z = 0 - 550 * ease1;
					p[0].object.position.set(-20000 * (1.0 - ease2),0,0);
					if(!start_time[0][0]&!start_time[2][0]){move_flag=0;state++;}
					break;
		case 3.0:   cameraPos.x = 0;
					cameraPos.y = 200;
					cameraPos.z = -550;
					break;
		case 3.1: 
					var ease1 = ease("easeInOutExpo",start_time[0],50);
					ease1 = checkPlay(ease1);
					cameraPos.x = 0 - 1000 * ease1;
					p[1].object.position.set(-20000 * (1.0 - ease1),0,0);
					if(!start_time[0][0]){move_flag=0;state++;}
					break;
		case 4.0:   break;
		case 4.1:
					var ease1 = ease("easeInOutExpo",start_time[0],50);
					var ease2 = ease("easeInOutExpo",start_time[2],50);
					ease1 = checkPlay(ease1);
					ease2 = checkPlay(ease2);
					cameraPos.x = -1000 + 2500 * ease1;
					cameraPos.y = 200 - 200 * ease2;
					cameraPos.z = -550 + 550 * ease2;
					p[0].object.position.set(-20000 * ease1,0,0);
					p[1].object.position.set(-20000 * ease1,0,0);
					if(!start_time[0][0]&!start_time[2][0]){move_flag=0;state++;}
					break;
		case 5.0:   
					cameraPos.x = 1500;
					cameraPos.y = 0;
					cameraPos.z = 0;
					p[0].object.scale.set(0.0,0.0,0.0);
					p[1].object.scale.set(0.0,0.0,0.0);
					break;
		case 5.1:
					var ease1 = ease("easeInOutExpo",start_time[0],50);
					var ease2 = ease("easeInOutExpo",start_time[2],50);
					ease1 = checkPlay(ease1);
					ease2 = checkPlay(ease2);
					cameraPos.x = 1500 - 1500 * ease2;
					cameraPos.y =  0 -100 * ease1;
					cameraPos.z =  0 - 400 * ease1;
					p[2].object.position.set(-20000 * (1.0 - ease2),0,0);
					if(!start_time[0][0]&!start_time[2][0]){move_flag=0;state++;}
					break;
		case 6.0:   cameraPos.x = 0;
					cameraPos.y = -100;
					cameraPos.z = -400;
					break;
		case 6.1:
					var ease1 = ease("easeInOutExpo",start_time[0],30);
					var ease2 = ease("easeInOutExpo",start_time[1],30);
					var ease3 = ease("easeInOutExpo",start_time[1],40);
					ease1 = checkPlay(ease1);
					cameraPos.x = 0 - 1000 * ease1;
					mapImg.setScale(1.0,0.3 * ease2,0.3 * ease3);
					p[3].object.position.set(-20000 * (1.0 - ease1),0,0);
					if(!start_time[0][0]&!start_time[1][0]){move_flag=0;state++;}
					break;
		case 7.0:   break;
		case 7.1:
					var ease1 = ease("easeInOutExpo",start_time[0],50);
					ease1 = checkPlay(ease1);
					cameraPos.x = -1000 - 600 * ease1;		//-1600
					cameraPos.y = -100 - 100 * ease1;		//-200
					cameraPos.z = -400 + 200 * ease1;		//-200
					if(!start_time[0][0]){move_flag=0;state++;}
					break;
		case 8.0:   break;
		case 8.1:
					var ease1 = ease("easeInOutExpo",start_time[0],10);
					var ease2 = ease("easeInOutExpo",start_time[1],10);
					ease1 = checkPlay(ease1);
					ease2 = checkPlay(ease2);
					userpointImg.setScale(1.0,ease1,1.0);
					distinationImg.setScale(1.0,ease2,1.0);
					if(!start_time[0][0],!start_time[1][0]){move_flag=0;state++;}
					break;
		case 9.0:  break;
		case 9.1:
					var ease1 = ease("easeInOutExpo",start_time[0],50);
					ease1 = checkPlay(ease1);
					cameraPos.x = -1600 + 600 * ease1;
					cameraPos.y = -200 + 100 * ease1;
					cameraPos.z = -200 - 200 * ease1;
					if(!start_time[0][0]){move_flag=0;state++;}
					break;
		case 10.0:  cameraPos.x = -1000;		//-1600
					cameraPos.y = -100;		//-200
					cameraPos.z = -400;		//-200

					break;
		case 10.1: 	
					var ease1 = ease("easeInOutExpo",start_time[0],30);
					ease1 = checkPlay(ease1);
					mapImg.setScale(1.0,0.3,0.3 * (1.0 - ease1));
					userpointImg.setScale(1.0,1.0 - ease1,1.0);
					distinationImg.setScale(1.0,1.0 - ease1,1.0);

					cameraPos.x = -1000 - 1000 * ease1;
					p[4].object.position.set(-20000 * (1.0 - ease1),0,0);
					if(!start_time[0][0]){move_flag=0;state++;}
					break;
		case 11.0:   break;
		case 11.1:
					var ease1 = ease("easeInOutExpo",start_time[0],30);
					ease1 = checkPlay(ease1);
					cameraPos.x = -2000 - 1000 * ease1;
					p[5].object.position.set(-20000 * (1.0 - ease1),0,0);
					if(!start_time[0][0]){move_flag=0;state++;}
					break;
		case 12.0:  break;
		case 12.1:
					var ease1 = ease("easeInOutExpo",start_time[0],30);
					ease1 = checkPlay(ease1);
					cameraPos.x = -3000 - 1000 * ease1;
					p[6].object.position.set(-20000 * (1.0 - ease1),0,0);
					if(!start_time[0][0]){move_flag=0;state++;}
					break;
		case 13.0:  break;
		case 13.1:
					var ease1 = ease("easeInOutExpo",start_time[0],30);
					ease1 = checkPlay(ease1);
					cameraPos.x = -4000 - 1000 * ease1;
					p[7].object.position.set(-20000 * (1.0 - ease1),0,0);
					if(!start_time[0][0]){move_flag=0;state++;}
					break;
		case 14.0:  break;
		case 14.1:
					var ease1 = ease("easeInOutExpo",start_time[0],30);
					ease1 = checkPlay(ease1);
					cameraPos.x = -5000 - 1000 * ease1;
					p[8].object.position.set(-20000 * (1.0 - ease1),0,0);
					if(!start_time[0][0]){move_flag=0;state++;}
					break;
		case 15.0:  break;
		case 15.1:
					var ease1 = ease("easeInOutExpo",start_time[0],30);
					ease1 = checkPlay(ease1);
					cameraPos.x = -6000 - 1000 * ease1;
					p[9].object.position.set(-20000 * (1.0 - ease1),0,0);
					if(!start_time[0][0]){move_flag=0;state++;}
					break;
		case 16.0: 	break;
		case 16.1:
					var ease1 = ease("easeInOutExpo",start_time[0],80);
					var ease2 = ease("easeInOutExpo",start_time[5],50);
					ease1 = checkPlay(ease1);
					ease2 = checkPlay(ease2);
					cameraPos.x = -7000 + 8500 * ease1;
					cameraPos.y = -100 + 100 * ease2;
					cameraPos.z = -400 + 400 * ease2;
					for(let i = 2 ; i <= 9;i++)p[i].object.position.set(-20000 * ease1,0,0);
		
					if(!start_time[0][0]&!start_time[5][0]){move_flag=0;state++;}
					break;
		case 17.0:  cameraPos.x = 1500;
					cameraPos.y = 0;
					cameraPos.z = 0;
					for(let i = 2 ; i <= 9;i++) p[i].object.scale.set(0.0,0.0,0.0); 
					break;
		case 17.1:
					var ease1 = ease("easeInOutExpo",start_time[0],50);
					var ease2 = ease("easeInOutExpo",start_time[2],50);
					ease1 = checkPlay(ease1);
					ease2 = checkPlay(ease2);
					cameraPos.x = 1500 - 1500 * ease2;
					cameraPos.y =  0 - 100 * ease1;
					cameraPos.z =  0 - 700 * ease1;
					p[10].object.position.set(-10000 * (1.0 - ease2),0,0);
					if(!start_time[0][0]&!start_time[2][0]){move_flag=0;state++;}
					break;
		case 18.0:  cameraPos.x = 0;
					cameraPos.y = -100;
					cameraPos.z = -700;
					break;
		case 18.1:
					var ease1 = ease("easeInOutExpo",start_time[0],50);
					var ease2 = ease("easeInOutExpo",start_time[2],50);
					ease1 = checkPlay(ease1);
					ease2 = checkPlay(ease2);
					cameraPos.x = 0 + 1500 * ease1;
					cameraPos.y =  -100 +100 * ease2;
					cameraPos.z =  -700 + 700 * ease2;
					p[10].object.position.set(-20000 * ease1,0,0);
					if(!start_time[0][0]&!start_time[2][0]){move_flag=0;state++;}
					break;
		case 19.0:  cameraPos.x = 1500;
					cameraPos.y = 0;
					cameraPos.z = 0;
					p[10].object.scale.set(0.0,0.0,0.0); 
					break;
		case 19.1:
					var ease1 = ease("easeInOutExpo",start_time[0],50);
					var ease2 = ease("easeInOutExpo",start_time[2],50);
					ease1 = checkPlay(ease1);
					ease2 = checkPlay(ease2);
					cameraPos.x = 1500 - 1500 * ease2;
					cameraPos.z =  0 - 550 * ease1;
					p[11].object.position.set(-20000 * (1.0 - ease2),0,0);
					if(!start_time[0][0]&!start_time[2][0]){move_flag=0;state++;}
					break;
		case 20.0:  cameraPos.x = 0;
					cameraPos.y = 0;
					cameraPos.z = -550;
					break;
		case 20.1:
					var ease1 = ease("easeInOutExpo",start_time[0],30);
					ease1 = checkPlay(ease1);
					cameraPos.x = 0 - 1000 * ease1;
					p[12].object.position.set(-20000 * (1.0 - ease1),0,0);
					if(!start_time[0][0]){move_flag=0;state++;}
					break;
		case 21.0:   break;
		case 21.1:
					var ease1 = ease("easeInOutExpo",start_time[0],30);
					ease1 = checkPlay(ease1);
					cameraPos.x = -1000 - 1000 * ease1;
					p[13].object.position.set(-20000 * (1.0 - ease1),0,0);
					if(!start_time[0][0]){move_flag=0;state++;}
					break;
		case 22.0:   break;
		case 22.1:
					var ease1 = ease("easeInOutExpo",start_time[0],30);
					ease1 = checkPlay(ease1);
					cameraPos.x = -2000 - 1000 * ease1;
					p[14].object.position.set(-20000 * (1.0 - ease1),0,0);
					if(!start_time[0][0]){move_flag=0;state++;}
					break;
		case 23.0:   break;
		case 23.1:
					var ease1 = ease("easeInOutExpo",start_time[0],50);
					var ease2 = ease("easeInOutExpo",start_time[3],50);
					ease1 = checkPlay(ease1);
					ease2 = checkPlay(ease2);
					cameraPos.x = -3000 + 4500 * ease1;
					cameraPos.z = -550 + 550 * ease2;
					for(let i = 11 ; i <= 14;i++)p[i].object.position.set(-20000 * ease1,0,0);
					if(!start_time[0][0]&!start_time[3][0]){move_flag=0;state++;}
					break;	
		case 24.0:  cameraPos.x = 1500;
					cameraPos.z = 0;
					for(let i = 11 ; i <= 14;i++) p[i].object.scale.set(0.0,0.0,0.0); 
					break;
		case 24.1:
					var ease1 = ease("easeInOutExpo",start_time[0],30);
					var ease2 = ease("easeInOutExpo",start_time[1],30);
					ease1 = checkPlay(ease1);
					ease2 = checkPlay(ease2);
					cameraPos.x = 1500 + 9500 * ease1;
					txt_intro.object.scale.set(1.0,1.0,1.0 - ease1);
					txt_function.object.scale.set(1.0,1.0,1.0 - ease1);
					txt_heatmap.object.scale.set(1.0,1.0,1.0 - ease1);
					if(!start_time[0][0]&!start_time[1][0]){move_flag=0;state++;}
					break;	
		case 25.0: 
				cameraPos.x = 11000;
				state = 0;
				for(let i = 0; i<plate_num;i++) p[i].object.scale.set(1.0,1.0,1.0);
				break;
		default :break;
	}
	if(move_flag==0) play = 1;
}


function update(){
	t++;
}


function render() {
	requestAnimationFrame(render);

	fase();
	move();
	update();

	renderer.render(scene, camera);
	camera.position.set(cameraPos.x,cameraPos.y,cameraPos.z);
}
render();