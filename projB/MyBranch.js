/**
 * MyBranch
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyBranch extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initBuffers(scene);
        this.initMaterials(scene);
    }
    initBuffers(scene){
        this.cylinder = new MyCylinder(scene, 4);
    }
    initMaterials(scene){
        this.brown = new CGFappearance(scene);
		this.brown.setAmbient(0.6, 0.1, 0.1, 1);
		this.brown.setDiffuse(0.647, 0.165, 0.165, 1);
		this.brown.setSpecular(0.6, 0.1, 0.1, 1);
		this.brown.setShininess(10.0);
    }
    display(){
        this.brown.apply();
        this.scene.pushMatrix();
        this.scene.scale(0.5, 1, 0.5);
        this.cylinder.display();
        this.scene.popMatrix();
    }
}