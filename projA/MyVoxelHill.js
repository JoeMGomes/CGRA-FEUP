/**
* MyVoxelHill
* @constructor
*/

class MyVoxelHill extends CGFobject {
	constructor(scene, levels) {
		super(scene);
		this.levels = levels;
		this.initBuffers(scene);
		this.initTextures(scene);
	}
	initBuffers(scene) {
		this.unitCube = new MyUnitCubeQuad(scene);
	}
	initTextures(scene) {
		this.roofTexture = new CGFappearance(scene);
		this.roofTexture.setAmbient(0.1, 0.1, 0.1, 1);
		this.roofTexture.setDiffuse(0.9, 0.9, 0.9, 1);
		this.roofTexture.setSpecular(0.1, 0.1, 0.1, 1);
		this.roofTexture.setShininess(10.0);
		this.roofTexture.setTexture(new CGFtexture(scene, 'images/hill.jpg'));
	}
	display() {
		this.roofTexture.apply();
		this.side_numb = 1;
		this.scene.pushMatrix();
		for (var i = 1; i <= this.levels; i++) {
			this.scene.pushMatrix();
			for (var j = 1; j <= this.side_numb; j++) {
				this.unitCube.display();
				this.scene.translate(1, 0, 0);
			}
			this.scene.translate(-1, 0, 1);
			for (var j = 2; j <= this.side_numb; j++) {
				this.unitCube.display();
				this.scene.translate(0, 0, 1);
			}

			this.scene.translate(-1, 0, -1);
			for (var j = 2; j <= this.side_numb; j++) {
				this.unitCube.display();
				this.scene.translate(-1, 0, 0);
			}

			this.scene.translate(1, 0, -1);
			for (var j = 3; j <= this.side_numb; j++) {
				this.unitCube.display();
				this.scene.translate(0, 0, -1);
			}
			this.scene.popMatrix();
			this.scene.translate(-1, -1, -1);
			this.side_numb += 2;
		}
		this.scene.popMatrix();
	}
}
