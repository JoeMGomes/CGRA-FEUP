<<<<<<< HEAD
/**
* MyHouse
* @constructor
*/

let degreeToRad = Math.PI/180;

class MyHouse extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initBuffers(scene);
        this.initTextures(scene);
    }
    initBuffers(scene){
        this.scene.unitCube = new MyUnitCubeQuad(scene);
        this.scene.pyramid = new MyPyramid(scene,4,1);
        this.scene.cylinder = new MyCylinder(scene,10);
    }
    initTextures(scene){
        this.roofTexture = new CGFappearance(scene);
        this.roofTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.roofTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.roofTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.roofTexture.setShininess(10.0);
        this.roofTexture.setTexture(new CGFtexture(scene, 'images/mineSide.png'));

        this.columnTexture = new CGFappearance(scene);
        this.columnTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.columnTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.columnTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.columnTexture.setShininess(10.0);
        this.columnTexture.setTexture(new CGFtexture(scene, 'images/mineBottom.png'));

        this.wallTexture = new CGFappearance(scene);
        this.wallTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.wallTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.wallTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.wallTexture.setShininess(10.0);
        this.wallTexture.setTexture(new CGFtexture(scene, 'images/mineTop.png'));
    }
    display(){
        
        //cubo
        this.wallTexture.apply();
        this.scene.pushMatrix();
        this.scene.translate(0,.5,0);
        this.scene.scale(2,1,1.3);
        this.scene.unitCube.display();
        this.scene.popMatrix();

        //piramide
        this.roofTexture.apply();
        this.scene.pushMatrix();
        this.scene.translate(0,1,0);
        this.scene.scale(2.2,1,1.5);
        this.scene.rotate(45*degreeToRad,0,1,0);
        this.scene.pyramid.display();
        this.scene.popMatrix();

        //colunas
        //1
        this.columnTexture.apply();
        this.scene.pushMatrix();
        this.scene.translate(1.4,0,.9);
        this.scene.scale(.15,1,.15);
        this.scene.cylinder.display();
        this.scene.popMatrix();
        //2
        this.scene.pushMatrix();
        this.scene.translate(-1.4,0,.9);
        this.scene.scale(.15,1,.15);
        this.scene.cylinder.display();
        this.scene.popMatrix();
        //3
        this.scene.pushMatrix();
        this.scene.translate(-1.4,0,-.9);
        this.scene.scale(.15,1,.15);
        this.scene.cylinder.display();
        this.scene.popMatrix();
        //4
        this.scene.pushMatrix();
        this.scene.translate(1.4,0,-.9);
        this.scene.scale(.15,1,.15);
        this.scene.cylinder.display();
        this.scene.popMatrix();
    }
    
}
=======
>>>>>>> 3fb0fb47151aee0c881affbe6f686b7d5c2f97d3
