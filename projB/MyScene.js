/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
	constructor() {
		super();
		this.degreeToRad = Math.PI / 180;
	}
	init(application) {
		super.init(application);
		this.initCameras();
		this.initLights();

		//Background color
		this.gl.clearColor(0.0, 0.0, 0.0, 0.0);

		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);
		this.enableTextures(true);
		this.setUpdatePeriod(50);

		//Interface
		this.speedFactor = 1;
		this.scaleFactor = 1;
		
		//Initialize scene objects
		this.axis = new CGFaxis(this);
		this.plane = new Plane(this, 32);
		this.house = new MyHouse(this);
        this.bird = new MyBird(this,0,0,0,0,0);
        
        this.oldTime = 0;
        

		//Objects connected to MyInterface
	}
	initLights() {
		this.lights[0].setPosition(15, 2, 5, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].enable();
		this.lights[0].update();
	}
	initCameras() {
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(45, 45, 45), vec3.fromValues(0, 0, 0));
	}
	setDefaultAppearance() {
		this.setAmbient(0.2, 0.4, 0.8, 1.0);
		this.setDiffuse(0.2, 0.4, 0.8, 1.0);
		this.setSpecular(0.2, 0.4, 0.8, 1.0);
		this.setShininess(10.0);
	}

	checkKeys() {
		var text = 'Keys pressed: ';
		var keysPressed = false;
		// Check for key codes e.g. in ​https://keycode.info/
		if (this.gui.isKeyPressed('KeyW')) {
			text += ' W ';
			keysPressed = true;
			this.bird.accelerate(this.speedFactor, true);
			console.log(this.bird.x,this.bird.z,this.bird.speed);
		}
		if (this.gui.isKeyPressed('KeyS')) {
			text += ' S ';
			keysPressed = true;
			this.bird.accelerate(this.speedFactor,false);
			console.log(this.bird.x,this.bird.z,this.bird.speed);
		}
		if (this.gui.isKeyPressed('KeyA')) {
			text += ' A ';
			keysPressed = true;
			this.bird.rotate(this.speedFactor,true);
			console.log(this.bird.x,this.bird.z,this.bird.speed);
		}
		if (this.gui.isKeyPressed('KeyD')) {
			text += ' D ';
			keysPressed = true;
			this.bird.rotate(this.speedFactor,false);
			console.log(this.bird.x,this.bird.z,this.bird.speed);
		}
		if (this.gui.isKeyPressed('KeyR')) {
			text += ' R ';
			keysPressed = true;
			this.bird.resetValues();
			console.log(this.bird.x,this.bird.z,this.bird.speed);
		}
		if (keysPressed)console.log(text);
    }
   
	update(t) {
        this.checkKeys();
        if(this.oldTime == 0){
			 this.oldTime = t;
        }else{
		var delta = (t - this.oldTime) / 1000.0;
       	var  d = this.bird.speed * delta;
		this.oldTime = t;
		this.bird.move(d); //TODO
		}
		
       
	}

	display() {
		// ---- BEGIN Background, camera and axis setup
		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		// Initialize Model-View matrix as identity (no transformation
		this.updateProjectionMatrix();
		this.loadIdentity();
		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Draw axis
		this.axis.display();

		//Apply default appearance
		this.setDefaultAppearance();

		// ---- BEGIN Primitive drawing section
		this.pushMatrix();
		this.rotate(-0.5 * Math.PI, 1, 0, 0);
		this.scale(60, 60, 1);
		this.plane.display();
		this.popMatrix();

		//this.house.display();
		this.pushMatrix()
		this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
		this.bird.display();
		this.popMatrix();
		// ---- END Primitive drawing section
	}


}
