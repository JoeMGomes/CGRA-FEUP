/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyLeaf extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initBuffers(scene);
        this.initMaterials(scene);
    }
    initBuffers(scene){
        scene.leaf = new MyTriangle(scene);
    }
    initMaterials(scene){
        this.green = new CGFappearance(scene);
		this.green.setAmbient(0.1, 0.6, 0.1, 1);
		this.green.setDiffuse(0.2, 1.0, 0.4, 1);
		this.green.setSpecular(0.1, 0.6, 0.1, 1);
		this.green.setShininess(10.0);
    }
    display(){
        this.green.apply();
        this.scene.pushMatrix();
        this.scene.rotate(-3*Math.PI/4,0, 0, 1);
        this.scene.leaf.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-3*Math.PI/4,0, 0, 1);
        this.scene.rotate(Math.PI, 0,1,0);
        this.scene.leaf.display();
        this.scene.popMatrix();
    }
}