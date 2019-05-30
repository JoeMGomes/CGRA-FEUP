/**
* MyQuadLight
* @constructor
* @param scene - Reference to MyScene object
*/

class MyQuadLight extends CGFobject {
	constructor(scene) {
		super(scene);
		this.scene.quadl = new MyQuad(scene);
	}

	display(){
		this.scene.pushMatrix();
		this.scene.translate(0,0.6,0)
		this.scene.scale(0.15,1.15,1);
		this.scene.quadl.display();
		this.scene.popMatrix();
	}
}