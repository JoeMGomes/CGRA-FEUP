/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
	constructor() {
		super();
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
		//this.prism = new MyPrism(this,6);
		this.piramid = new MyPyramid(this,6,1);
		this.cyl = new MyCylinder(this, 6);
		this.house = new MyHouse(this);
		this.tree = new MyTree(this, 2, 0.5, 2, 1, this.textureTrunk, this.textureTree);

		this.displayAxis = false;
		this.displayHouse = false;
		this.displayTree = false;
		this.displayPyr = true;

		//Objects connected to MyInterface
	}
	initLights() {
		this.lights[0].setPosition(15, 2, 5, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].enable();
		this.lights[0].update();
	}
	initCameras() {
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(20, 20, 20), vec3.fromValues(0, 0, 0));
	}
	setDefaultAppearance() {
		this.setAmbient(0.2, 0.4, 0.8, 1.0);
		this.setDiffuse(0.2, 0.4, 0.8, 1.0);
		this.setSpecular(0.2, 0.4, 0.8, 1.0);
		this.setShininess(10.0);
	}
	initMaterials() {
		this.textureTree = new CGFappearance(this);
		this.textureTree.setAmbient(0.1, 0.1, 0.1, 1);
		this.textureTree.setDiffuse(0.9, 0.9, 0.9, 1);
		this.textureTree.setSpecular(0.1, 0.1, 0.1, 1);
		this.textureTree.setShininess(10.0);
		this.textureTree.setTexture(new CGFtexture(this, 'images/tree.png'));

		this.textureTrunk = new CGFappearance(this);
		this.textureTrunk.setAmbient(0.1, 0.1, 0.1, 1);
		this.textureTrunk.setDiffuse(0.9, 0.9, 0.9, 1);
		this.textureTrunk.setSpecular(0.1, 0.1, 0.1, 1);
		this.textureTrunk.setShininess(10.0);
		this.textureTrunk.setTexture(new CGFtexture(this, 'images/bark2.jpg'));
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

		// ---- BEGIN Primitive drawing section
		// this.prism.enableNormalViz();

		//this.textureTree.apply();
		//this.prism.display();
		if (this.displayHouse) this.house.display();
		//this.cyl.display();
		if (this.displayPyr) this.piramid.display();
		if (this.displayTree) this.tree.display();

		// ---- END Primitive drawing section
	}
}
