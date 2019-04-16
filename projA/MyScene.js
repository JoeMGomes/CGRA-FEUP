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
		this.initMaterials();

		//Background color
		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);
		this.enableTextures(true);

		//Initialize scene objects
		this.axis = new CGFaxis(this);
		this.house = new MyHouse(this);
		this.treeGroup = new MyTreeGroupPatch(this);
		this.treeRow = new MyTreeRowPatch(this);
		this.hill = new MyVoxelHill(this, 5);
		this.hill2 = new MyVoxelHill(this, 6);
		this.sky = new MyCubeMap(this);
		this.floor = new MyQuad(this);
		this.fire = new MyFire(this);

		this.texCoords = [ 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0 ];

		//Objects connected to MyInterface
		this.displayAxis = false;
		this.displayTexture = true;

		this.ambientIDs = { 'Day': 0, 'Night': 1 };
		this.selectAmbient = 0;
	}
	initLights() {
		this.lights[0].setPosition(-35, 35, -35, 1);
		this.lights[0].setDiffuse(1.0, 0.91, 0.7, 1);
		this.lights[0].setSpecular(1.0, 0.91, 0.7, 1);
		this.lights[0].setConstantAttenuation(0.045);
		this.lights[0].disable();
		this.lights[0].update();

		this.lights[1].setPosition(12, 32, 30, 1);
		this.lights[1].setDiffuse(0.31, 0.412, 0.533, 1);
		this.lights[1].setSpecular(0.31, 0.412, 0.533, 1);
		this.lights[1].setConstantAttenuation(0.6);
		this.lights[1].disable();
		this.lights[1].update();

		this.lights[2].setPosition(2, 0.3, 2, 1);
		this.lights[2].setDiffuse(0.808, 0.318, 0.0, 1.0);
		this.lights[2].setSpecular(0.808, 0.118, 0.0, 1.0);
		this.lights[2].setConstantAttenuation(0.1);
		this.lights[2].setLinearAttenuation(0.8);
		this.lights[2].disable();
		this.lights[2].update();
	}
	initCameras() {
		this.camera = new CGFcamera(
			Math.PI / 2,
			0.1,
			1500,
			vec3.fromValues(-1.2989, 3.0047, 5.0191),
			vec3.fromValues(2.7858, 0.25253, 1.23462)
		);
	}
	setDefaultAppearance() {
		this.setAmbient(0.4, 0.6, 1, 1.0);
		this.setDiffuse(0.2, 0.4, 0.8, 1.0);
		this.setSpecular(0.2, 0.4, 0.8, 1.0);
		this.setShininess(10.0);
	}
	initMaterials() {
		this.textureDay = new CGFappearance(this);
		this.textureDay.setAmbient(0.1, 0.1, 0.1, 1);
		this.textureDay.setDiffuse(0.9, 0.9, 0.9, 1);
		this.textureDay.setSpecular(0.1, 0.1, 0.1, 1);
		this.textureDay.setShininess(10.0);
		this.textureDay.setTexture(new CGFtexture(this, 'images/skyboxsun.png'));

		this.textureNight = new CGFappearance(this);
		this.textureNight.setAmbient(0.1, 0.1, 0.1, 1);
		this.textureNight.setDiffuse(0.9, 0.9, 0.9, 1);
		this.textureNight.setSpecular(0.1, 0.1, 0.1, 1);
		this.textureNight.setShininess(10.0);
		this.textureNight.setTexture(new CGFtexture(this, 'images/skyboxnight.png'));

		this.textureGrass = new CGFappearance(this);
		this.textureGrass.setAmbient(0.1, 0.1, 0.1, 1);
		this.textureGrass.setDiffuse(0.9, 0.9, 0.9, 1);
		this.textureGrass.setSpecular(0.1, 0.1, 0.1, 1);
		this.textureGrass.setShininess(10.0);
		this.textureGrass.setTexture(new CGFtexture(this, 'images/grass2.jpg'));
		this.textureGrass.setTextureWrap('REPEAT', 'REPEAT');
	}
	updateTexCoords() {
		this.floor.updateTexCoords(this.texCoords);
	}
	updateLights() {
		if (this.selectAmbient == 1) {
			this.lights[0].disable();
			this.lights[0].update();
			this.lights[1].enable();
			this.lights[1].update();
			this.lights[2].enable();
			this.lights[2].setVisible(true);
			this.lights[2].update();
		} else {
			this.lights[0].enable();
			this.lights[0].update();
			this.lights[1].disable();
			this.lights[1].update();
			this.lights[2].disable();
			this.lights[2].setVisible(false);
			this.lights[2].update();
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
		if (this.displayAxis) this.axis.display();

		//Apply default appearance
		this.setDefaultAppearance();

		//Apply the lights according to the ambient mode
		this.updateLights();

		// ---- BEGIN Primitive drawing section

		//Enable textures for object with specific materials
		if (this.displayTexture) {
			this.enableTextures(true);
		} else {
			this.enableTextures(false);
		}

		//Fire
		this.pushMatrix();
		this.translate(2, 0, 2);
		this.fire.display();
		this.popMatrix();

		//House
		this.house.display();

		//Tree Group
		this.pushMatrix();
		this.scale(1, .8, 1);
		this.translate(-5, 0, -18);
		this.treeGroup.display();
		this.popMatrix();

		this.pushMatrix();
		this.translate(25, 0, 7);
		this.rotate(-Math.PI / 2, 0, 1, 0);
		this.scale(1, .8, 1);
		this.treeGroup.display();
		this.popMatrix();

		//Tree Row
		this.pushMatrix();
		this.translate(0, 0, -20);
		this.treeRow.display();
		this.translate(4, 0, -3);
		this.treeRow.display();
		this.popMatrix();

		this.pushMatrix();
		this.pushMatrix();
		this.translate(17, 0, -30);
		this.rotate(-50 * this.degreeToRad, 0, 1, 0);
		this.treeRow.display();
		this.popMatrix();

		//Hill
		this.pushMatrix();
		this.translate(10, 4.5, 0);
		this.hill.display();
		this.translate(5, 1, -11);
		this.hill2.display();
		this.translate(7, -1, 12);
		this.hill.display();
		this.popMatrix();
	

		this.enableTextures(true);

		//CubeMap
		if (this.selectAmbient == 1) this.textureNight.apply();
		else this.textureDay.apply();
		this.pushMatrix();
		this.rotate(Math.PI, 0, 1, 0);
		this.sky.display();
		this.popMatrix();
		

		//Floor
		this.texCoords = [ 0, 250, 250, 250, 0, 0, 250, 0 ];
		this.updateTexCoords();

		this.pushMatrix();
		this.textureGrass.apply();
		this.rotate(-90 * this.degreeToRad, 1, 0, 0);
		this.scale(500, 500, 1, 1);
		this.floor.display();
		this.popMatrix();

		// ---- END Primitive drawing section
	}
}
