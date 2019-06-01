/**
* MyQuadLight
* @constructor
* @param scene - Reference to MyScene object
*/

class MyQuadLight extends CGFobject {
	constructor(scene) {
		super(scene);
		this.scene.quadl = new MyQuad(scene);
		this.initMaterials();
	}
	initMaterials(){
		this.lightning = new CGFappearance(this.scene);
        this.lightning.setAmbient(1.0, 1.0, 1.0, 1);
        this.lightning.setDiffuse(1.0, 1.0, 1.0, 1);
        this.lightning.setSpecular(1.0, 1.0, 1.0, 1);
        this.lightning.setShininess(120);
	}
	display(){
		this.lightning.apply();
		this.scene.pushMatrix();
		this.scene.translate(0,0.6,0);
		this.scene.scale(0.15,1.15,1);
		this.scene.quadl.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
		this.scene.translate(0,0.6,0);
		this.scene.scale(0.15,1.15,1);
		this.scene.rotate(Math.PI, 0,1,0);
		this.scene.quadl.display();
		this.scene.popMatrix();
	}
}