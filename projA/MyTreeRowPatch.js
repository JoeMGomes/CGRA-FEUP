/**
 * MyTreeRowPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyTreeRowPatch extends CGFobject {
	constructor(scene) {
        super(scene);
        this.initMaterials(scene);
        this.initBuffers(scene);
		
	}
	initBuffers(scene) {
        let trunkRadius = Math.random() * 0.3 + 0.2;
		this.tree1 = new MyTree(scene, Math.random() * 3 + 0.5, trunkRadius, Math.random() * 4 + 0.5, Math.random() * 1 + trunkRadius + 0.1, this.textureTrunk, this.textureTree);
        trunkRadius = Math.random() * 0.3 + 0.2;
        this.tree2 = new MyTree(scene, Math.random() * 3 + 0.5, trunkRadius, Math.random() * 4 + 0.5, Math.random() * 1 + trunkRadius + 0.1, this.textureTrunk, this.textureTree);
        trunkRadius = Math.random() * 0.3 + 0.2;
        this.tree3 = new MyTree(scene, Math.random() * 3 + 0.5, trunkRadius, Math.random() * 4 + 0.5, Math.random() * 1 + trunkRadius + 0.1, this.textureTrunk, this.textureTree);
        trunkRadius = Math.random() * 0.3 + 0.2;
        this.tree4 = new MyTree(scene, Math.random() * 3 + 0.5, trunkRadius, Math.random() * 4 + 0.5, Math.random() * 1 + trunkRadius + 0.1, this.textureTrunk, this.textureTree);
        trunkRadius = Math.random() * 0.3 + 0.2;
        this.tree5 = new MyTree(scene, Math.random() * 3 + 0.5, trunkRadius, Math.random() * 4 + 0.5, Math.random() * 1 + trunkRadius + 0.1, this.textureTrunk, this.textureTree);
        trunkRadius = Math.random() * 0.3 + 0.2;
        this.tree6 = new MyTree(scene, Math.random() * 3 + 0.5, trunkRadius, Math.random() * 4 + 0.5, Math.random() * 1 + trunkRadius + 0.1, this.textureTrunk, this.textureTree);
    }
    initMaterials(scene){
        this.textureTree = new CGFappearance(scene);
		this.textureTree.setAmbient(0.1, 0.1, 0.1, 1);
		this.textureTree.setDiffuse(0.9, 0.9, 0.9, 1);
		this.textureTree.setSpecular(0.1, 0.1, 0.1, 1);
		this.textureTree.setShininess(10.0);
		this.textureTree.setTexture(new CGFtexture(scene, 'images/tree4.jpg'));

		this.textureTrunk = new CGFappearance(scene);
		this.textureTrunk.setAmbient(0.1, 0.1, 0.1, 1);
		this.textureTrunk.setDiffuse(0.9, 0.9, 0.9, 1);
		this.textureTrunk.setSpecular(0.1, 0.1, 0.1, 1);
		this.textureTrunk.setShininess(10.0);
		this.textureTrunk.setTexture(new CGFtexture(scene, 'images/bark2.jpg'));
    }
	display() {
        this.scene.pushMatrix();
        this.tree1.display();
        this.scene.translate(3,0,2);
        this.tree2.display();
        this.scene.translate(2,0,-2);
        this.tree3.display();
        this.scene.translate(3,0,-1);
        this.tree4.display();
        this.scene.translate(3,0,2);
        this.tree5.display();
        this.scene.translate(2,0,1);
        this.tree6.display();
        this.scene.popMatrix();
        
	}
}
