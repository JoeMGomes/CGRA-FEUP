/**
* MyBird
* @constructor
* @param scene - Reference to MyScene object
*/

class MyBird extends CGFobject {
	constructor(scene,orientation,x,y,z,speed) {
		super(scene);
        this.initBuffers(scene);
        this.orientation = orientation;
        this.x = x;
        this.y = y;
        this.z = z;
        this.speed = speed;
	}
	initBuffers(scene) {
		scene.cylinder = new MyCylinder(scene,5);
		scene.pyramid = new MyPyramid(scene, 5, 2);
        scene.plane = new MyQuad (scene);
        scene.cone = new MyCone (scene, 5,0.2);
        //triangulo
    }
    
    display() {

        //corpo
        this.scene.pushMatrix();
        this.scene.rotate(-90*this.scene.degreeToRad, 0,0,1);
        this.scene.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate (1,0,0);
        this.scene.rotate(-90*this.scene.degreeToRad, 0,0,1);
        this.scene.cone.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(72.5/2.0*this.scene.degreeToRad, 1,0,0);
        this.scene.rotate(90*this.scene.degreeToRad, 0,0,1);
        this.scene.cone.display();
        this.scene.popMatrix();
        ///////

        //cabeca
        this.scene.pushMatrix();
        this.scene.translate(0.3,0.8,0.8);
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(-90*this.scene.degreeToRad, 0,0,1);
        this.scene.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate (0.8,0.8,0.8);
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(-90*this.scene.degreeToRad, 0,0,1);
        this.scene.cone.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.3,0.8,0.8);
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(72.5/2.0*this.scene.degreeToRad, 1,0,0);
        this.scene.rotate(90*this.scene.degreeToRad, 0,0,1);
        this.scene.cone.display();
        this.scene.popMatrix();

		//cubo
	/*	this.wallTexture.apply();
		this.scene.pushMatrix();
		this.scene.translate(0, 0.5, 0);
		this.scene.scale(2, 1, 1.3);
		this.scene.unitCube.display();
		this.scene.popMatrix();*/
	}

}