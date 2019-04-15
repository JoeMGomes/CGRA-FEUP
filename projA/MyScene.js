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
		//this.prism = new MyPrism(this,6);
		this.piramid = new MyPyramid(this, 6, 1);
		this.cyl = new MyCylinder(this, 6);
		this.house = new MyHouse(this);
		//this.tree = new MyTree(this, 0.2, 0.5, 0.5, 0.6, this.textureTrunk, this.textureTree);
		this.treeGroup = new MyTreeGroupPatch(this);
		this.treeRow = new MyTreeRowPatch(this);
		this.hill = new MyVoxelHill(this, 5);
		this.sky = new MyCubeMap(this,2);

		//Objects connected to MyInterface
		this.displayAxis = false;
		this.displayHouse = false;
		this.displayPyr = false;
		this.displayTreeGroup = false;
		this.displayTreeRow = false;
		this.displayHill = false;
		this.displaySky = true;
	}
	initLights() {
		this.lights[0].setPosition(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].enable();
		this.lights[0].update();
	}
	initCameras() {
		this.camera = new CGFcamera(0.4, 0.1, 1000, vec3.fromValues(4, 0, 0), vec3.fromValues(0, 0, 0));
	}
	setDefaultAppearance() {
		this.setAmbient(0.4, 0.6, 1, 1.0);
		this.setDiffuse(0.2, 0.4, 0.8, 1.0);
		this.setSpecular(0.2, 0.4, 0.8, 1.0);
		this.setShininess(10.0);
	}
	initMaterials() {
			this.textureBack = new CGFappearance(this);
			this.textureBack.setAmbient(0.1, 0.1, 0.1, 1);
			this.textureBack.setDiffuse(0.9, 0.9, 0.9, 1);
			this.textureBack.setSpecular(0.1, 0.1, 0.1, 1);
			this.textureBack.setShininess(10.0);
			this.textureBack.setTexture(new CGFtexture(this, 'images/skyboxsun.png'));
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
		if (this.displayTreeGroup) this.treeGroup.display();
		if (this.displayTreeRow) this.treeRow.display();
		if (this.displayHill) this.hill.display();
		if (this.displaySky){ 
			this.textureBack.apply();
			this.sky.display();
		}

		// ---- END Primitive drawing section
	}
}
