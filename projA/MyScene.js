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
		this.floor = new MyQuad(this);

		this.texCoords = [0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0];

		//Objects connected to MyInterface
		this.displayAxis = false;
		this.displayHouse = false;
		this.displayPyr = false;
		this.displayTreeGroup = false;
		this.displayTreeRow = false;
		this.displayHill = false;
		this.displaySky = true;

		this.ambientIDs = {'Day': 0, 'Night': 1};
		this.selectAmbient = 0;
		
	}
	initLights() {
		this.lights[0].setPosition(50, 100, 50, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 0.1);
		this.lights[0].disable();
		this.lights[0].update();

		this.lights[1].setPosition(50, 100, 50, 1);
		this.lights[1].setDiffuse(.03, 1.0, .03, 0.1);
		this.lights[1].disable();
		this.lights[1].update();
	}
	initCameras() {
		this.camera = new CGFcamera(0.4, 0.1, 1000, vec3.fromValues(250, 90, 250), vec3.fromValues(-100, 0, -100));
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

		if (this.selectAmbient == 1){
			this.lights[0].disable();
			this.lights[0].update();
			this.lights[1].enable();
			this.lights[1].update();
		}else{
			this.lights[0].enable();
			this.lights[0].update();
			this.lights[1].disable();
			this.lights[1].update();
		}
		//this.textureTree.apply();
		//this.prism.display();
		if (this.displayHouse) this.house.display();
		//this.cyl.display();
		if (this.displayPyr) this.piramid.display();
		if (this.displayTreeGroup) this.treeGroup.display();
		if (this.displayTreeRow) this.treeRow.display();
		if (this.displayHill){
			this.pushMatrix();
			this.translate (10,4.5,0);
			this.hill.display();
			this.popMatrix();
		}
		if (this.displaySky){ 
			this.textureBack.apply();
			this.pushMatrix();
			this.scale(200,200,200);
			this.sky.display();
			this.popMatrix();
		}

		this.texCoords = [0,250,
			250,250,
			0,0,
			250,0]
		this.updateTexCoords();
		this.textureGrass.apply();
		this.rotate (-90*this.degreeToRad, 1,0,0);
		this.scale (500,500,1,1);
		this.floor.display();

		// ---- END Primitive drawing section
	}
}
