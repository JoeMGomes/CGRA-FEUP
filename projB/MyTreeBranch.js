/**
* MyTreeBranch
* @constructor
* @param scene - Reference to MyScene object
*/

class MyTreeBranch extends CGFobject {
    constructor(scene,x,y,z) {
        super(scene);
        //this.degreeToRad = Math.PI / 180;
        this.initBuffers(scene);
        this.initTextures(scene);
        this.x= x;
        this.y= y;
        this.z = z;
    }
    initBuffers(scene) {
        this.branch = new MyCylinder(scene,5);
    }
    initTextures(scene) {
        this.branchMaterial = new CGFappearance(scene);
        this.branchMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.branchMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.branchMaterial.setSpecular(1, 1, 1, 1);
        this.branchMaterial.setShininess(15.0);
        this.branchMaterial.setTexture(new CGFtexture(scene, 'images/column.jpg'));
    }
    display() {

        this.branchMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.scale(0.1, 1, 0.1);
        this.branch.display();
        this.scene.popMatrix();
    }
}
