/**
* MyHouse
* @constructor
* @param scene - Reference to MyScene object
*/

class MyHouse extends CGFobject {
	constructor(scene) {
		super(scene);
		//this.degreeToRad = Math.PI / 180;
		this.initBuffers(scene);
		this.initTextures(scene);
	}
	initBuffers(scene) {
		scene.unitCube = new MyUnitCubeQuad(scene);
		scene.pyramid = new MyPyramid(scene, 4, 1);
		scene.prism = new MyPrism(scene, 10);
	}
	initTextures(scene) {
		this.roofTexture = new CGFappearance(scene);
		this.roofTexture.setAmbient(0.1, 0.1, 0.1, 1);
		this.roofTexture.setDiffuse(0.9, 0.9, 0.9, 1);
		this.roofTexture.setSpecular(0.1, 0.1, 0.1, 1);
		this.roofTexture.setShininess(10.0);
		this.roofTexture.setTexture(new CGFtexture(scene, 'images/roof.jpg'));

		this.columnTexture = new CGFappearance(scene);
		this.columnTexture.setAmbient(0.1, 0.1, 0.1, 1);
		this.columnTexture.setDiffuse(0.9, 0.9, 0.9, 1);
		this.columnTexture.setSpecular(0.1, 0.1, 0.1, 1);
		this.columnTexture.setShininess(10.0);
		this.columnTexture.setTexture(new CGFtexture(scene, 'images/column.jpg'));

		this.wallTexture = new CGFappearance(scene);
		this.wallTexture.setAmbient(0.1, 0.1, 0.1, 1);
		this.wallTexture.setDiffuse(0.9, 0.9, 0.9, 1);
		this.wallTexture.setSpecular(1, 1, 1, 1);
		this.wallTexture.setShininess(15.0);
		this.wallTexture.setTexture(new CGFtexture(scene, 'images/wall.jpg'));
	}
	display() {
		//cubo
		this.wallTexture.apply();
		this.scene.pushMatrix();
		this.scene.translate(0, 0.5, 0);
		this.scene.scale(2, 1, 1.3);
		this.scene.unitCube.display();
		this.scene.popMatrix();

		//chamine
		this.scene.pushMatrix();
		this.scene.translate(-0.7, 1.6, 0);
		this.scene.scale(0.3, 0.5, 0.3);
		this.scene.unitCube.display();
		this.scene.popMatrix();

		//piramide
		this.roofTexture.apply();
		this.scene.pushMatrix();
		this.scene.translate(0, 1, 0);
		this.scene.scale(2.2, 1, 1.5);
		this.scene.rotate(45 * this.scene.degreeToRad, 0, 1, 0);
		this.scene.pyramid.display();
		this.scene.popMatrix();

		//colunas
		//1
		this.columnTexture.apply();
		this.scene.pushMatrix();
		this.scene.translate(1.4, 0, 0.9);
		this.scene.scale(0.15, 1, 0.15);
		this.scene.prism.display();
		this.scene.popMatrix();
		//2
		this.scene.pushMatrix();
		this.scene.translate(-1.4, 0, 0.9);
		this.scene.scale(0.15, 1, 0.15);
		this.scene.prism.display();
		this.scene.popMatrix();
		//3
		this.scene.pushMatrix();
		this.scene.translate(-1.4, 0, -0.9);
		this.scene.scale(0.15, 1, 0.15);
		this.scene.prism.display();
		this.scene.popMatrix();
		//4
		this.scene.pushMatrix();
		this.scene.translate(1.4, 0, -0.9);
		this.scene.scale(0.15, 1, 0.15);
		this.scene.prism.display();
		this.scene.popMatrix();
	}
}
