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
        //triangulo
    }
    
    display() {

        //corpo
        this.scene.pushMatrix();
        this.scene.rotate(-90*this.scene.degreeToRad, 0,0,1);
        this.scene.cylinder.display();
        this.scene.popMatrix();

        //cabeca
        this.scene.pushMatrix();
        this.scene.scale(1,0.5,0.5);
        this.scene.rotate(-90*this.scene.degreeToRad, 0,0,1);
        this.scene.cylinder.display();
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