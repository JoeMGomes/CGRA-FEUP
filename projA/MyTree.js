/**
 * MyTree
 * @constructor
 * @param scene - Reference to MyScene object
 * @param trunkHeight - tree trunk height
 * @param trunkRadius - tree trunk radius
 * @param treeTopHeight - tree top height
 * @param treeTopRadius - tree top radius
 * @param trunkTexture - texture for the tree trunk
 * @param treeTopTexture - texture for the tree top
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
		this.initBuffers(scene);
	}
	initBuffers(scene) {
		scene.cone = new MyCone(scene, 10, 1);
		scene.cylinder = new MyCylinder(scene, 10);
	}

	display() {
		this.trunkTexture.apply();
		this.scene.pushMatrix();
		this.scene.scale(this.trunkRadius, this.trunkHeight, this.trunkRadius);
		this.scene.cylinder.display();
		this.scene.popMatrix();

		this.treeTopTexture.apply();
		this.scene.pushMatrix();
		this.scene.translate(0, this.trunkHeight, 0);
		this.scene.scale(this.treeTopRadius, this.treeTopHeight, this.treeTopRadius);
		this.scene.cone.display();
		this.scene.popMatrix();
	}
}
