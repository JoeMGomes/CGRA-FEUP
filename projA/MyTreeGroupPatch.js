/**
 * MyTreeGroupPatch
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyTreeGroupPatch extends CGFobject {
	constructor(scene) {
        super(scene);
        this.initMaterials(scene);
        this.initBuffers(scene);
		
	}
	initBuffers(scene) {
        let trunkRadius = Math.random() * 0.3 + 0.2;
		this.tree1 = new MyTree(scene, Math.random() * 3 + 0.5, trunkRadius, Math.random() * 4 + 0.8, Math.random() * 1 + trunkRadius + 0.1, this.textureTrunk, this.textureTree);
        trunkRadius = Math.random() * 0.3 + 0.2;
        this.tree2 = new MyTree(scene, Math.random() * 3 + 0.5, trunkRadius, Math.random() * 4 + 0.8, Math.random() * 1 + trunkRadius + 0.1, this.textureTrunk, this.textureTree);
        trunkRadius = Math.random() * 0.3 + 0.2;
        this.tree3 = new MyTree(scene, Math.random() * 3 + 0.5, trunkRadius, Math.random() * 4 + 0.8, Math.random() * 1 + trunkRadius + 0.1, this.textureTrunk, this.textureTree);
        trunkRadius = Math.random() * 0.3 + 0.2;
        this.tree4 = new MyTree(scene, Math.random() * 3 + 0.5, trunkRadius, Math.random() * 4 + 0.8, Math.random() * 1 + trunkRadius + 0.1, this.textureTrunk, this.textureTree);
        trunkRadius = Math.random() * 0.3 + 0.2;
        this.tree5 = new MyTree(scene, Math.random() * 3 + 0.5, trunkRadius, Math.random() * 4 + 0.8, Math.random() * 1 + trunkRadius + 0.1, this.textureTrunk, this.textureTree);
        trunkRadius = Math.random() * 0.3 + 0.2;
        this.tree6 = new MyTree(scene, Math.random() * 3 + 0.5, trunkRadius, Math.random() * 4 + 0.8, Math.random() * 1 + trunkRadius + 0.1, this.textureTrunk, this.textureTree);
        trunkRadius = Math.random() * 0.3 + 0.2;
        this.tree7 = new MyTree(scene, Math.random() * 3 + 0.5, trunkRadius, Math.random() * 4 + 0.8, Math.random() * 1 + trunkRadius + 0.1, this.textureTrunk, this.textureTree);
        trunkRadius = Math.random() * 0.3 + 0.2;
        this.tree8 = new MyTree(scene, Math.random() * 3 + 0.5, trunkRadius, Math.random() * 4 + 0.8, Math.random() * 1 + trunkRadius + 0.1, this.textureTrunk, this.textureTree);
        trunkRadius = Math.random() * 0.3 + 0.2;
        this.tree9 = new MyTree(scene, Math.random() * 3 + 0.5, trunkRadius, Math.random() * 4 + 0.8, Math.random() * 1 + trunkRadius + 0.1, this.textureTrunk, this.textureTree);
    
    }
    initMaterials(scene){
        this.textureTree = new CGFappearance(scene);
		this.textureTree.setAmbient(0.1, 0.1, 0.1, 1);
		this.textureTree.setDiffuse(0.9, 0.9, 0.9, 1);
		this.textureTree.setSpecular(0.1, 0.1, 0.1, 1);
		this.textureTree.setShininess(10.0);
        this.textureTree.setTexture(new CGFtexture(scene, 'images/tree4.jpg'));
        this.textureTree.setTextureWrap('REPEAT', 'REPEAT');

		this.textureTrunk = new CGFappearance(scene);
		this.textureTrunk.setAmbient(0.1, 0.1, 0.1, 1);
		this.textureTrunk.setDiffuse(0.9, 0.9, 0.9, 1);
		this.textureTrunk.setSpecular(0.1, 0.1, 0.1, 1);
		this.textureTrunk.setShininess(10.0);
        this.textureTrunk.setTexture(new CGFtexture(scene, 'images/bark6.jpg'));
        this.textureTrunk.setTextureWrap('REPEAT', 'REPEAT');
    }
	display() {
        this.scene.pushMatrix();
        this.tree1.display();
        this.scene.translate(3,0,1);
        this.tree2.display();
        this.scene.translate(2,0,-1);
        this.tree3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1,0,5);
        this.tree4.display();
        this.scene.translate(3,0,-0.5);
        this.tree5.display();
        this.scene.translate(3.5,0,1);
        this.tree6.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1,0,9);
        this.tree7.display();
        this.scene.translate(3,0,-0.5);
        this.tree8.display();
        this.scene.translate(2,0,1.5);
        this.tree9.display();
        this.scene.popMatrix();
        
	}
}
