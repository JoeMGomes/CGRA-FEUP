/**
 * MyTree
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyTree extends CGFobject {
	constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, treeTopTexture) {
		super(scene);
		this.trunkHeight = trunkHeight;
		this.trunkRadius = trunkRadius;
		this.treeTopHeight = treeTopHeight;
		this.treeTopRadius = treeTopRadius;
		this.trunkTexture = trunkTexture;
		this.treeTopTexture = treeTopTexture;
		this.degreeToRad = Math.PI / 180;
		this.initBuffers(scene);
		//this.initMaterials(scene);
	}
	initBuffers(scene) {
		scene.cone = new MyCone(scene, 10, 1);
		scene.cylinder = new MyCylinder(scene, 5);
	}

	display() {
		this.scene.pushMatrix();
		//this.scene.translate(3+Math.sqrt(2), -1,0)
		this.scene.scale(this.trunkRadius, this.trunkHeight, this.trunkRadius);
		//this.scene.rotate (-180*this.degreeToRad,0,0,1);
		this.scene.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, this.trunkHeight, 0);
		this.scene.scale(this.treeTopRadius, this.treeTopHeight, this.treeTopRadius);
		this.scene.cone.display();
		this.scene.popMatrix();
	}
}
