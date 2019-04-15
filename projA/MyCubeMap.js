/**
* MyCubeMap
* @constructor
* @param scene - Reference to MyScene object
*/

let scale = 500;
class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers(scene);
		this.initTextures(scene);
	}
	initBuffers(scene) {
		scene.quadSide = new MyQuad(scene);
		scene.quadTop = new MyQuad(scene);
		scene.quadBottom = new MyQuad(scene);
	}
	initTextures(scene) {
		this.textureBack = new CGFappearance(scene);
		this.textureBack.setAmbient(0.1, 0.1, 0.1, 1);
		this.textureBack.setDiffuse(0.9, 0.9, 0.9, 1);
		this.textureBack.setSpecular(0.1, 0.1, 0.1, 1);
		this.textureBack.setShininess(10.0);
		this.textureBack.setTexture(new CGFtexture(scene, 'images/skyrender0002.bmp'));

		this.textureFront = new CGFappearance(scene);
		this.textureFront.setAmbient(0.1, 0.1, 0.1, 1);
		this.textureFront.setDiffuse(0.9, 0.9, 0.9, 1);
		this.textureFront.setSpecular(0.1, 0.1, 0.1, 1);
		this.textureFront.setShininess(10.0);
        this.textureFront.setTexture(new CGFtexture(scene, 'images/skyrender0005.bmp'));
        
        this.textureLeft = new CGFappearance(scene);
		this.textureLeft.setAmbient(0.1, 0.1, 0.1, 1);
		this.textureLeft.setDiffuse(0.9, 0.9, 0.9, 1);
		this.textureLeft.setSpecular(0.1, 0.1, 0.1, 1);
		this.textureLeft.setShininess(10.0);
        this.textureLeft.setTexture(new CGFtexture(scene, 'images/skyrender0004.bmp'));
        
        this.textureRight = new CGFappearance(scene);
		this.textureRight.setAmbient(0.1, 0.1, 0.1, 1);
		this.textureRight.setDiffuse(0.9, 0.9, 0.9, 1);
		this.textureRight.setSpecular(0.1, 0.1, 0.1, 1);
		this.textureRight.setShininess(10.0);
		this.textureRight.setTexture(new CGFtexture(scene, 'images/skyrender0001.bmp'));

		this.textureBottom = new CGFappearance(scene);
		this.textureBottom.setAmbient(0.1, 0.1, 0.1, 1);
		this.textureBottom.setDiffuse(0.9, 0.9, 0.9, 1);
		this.textureBottom.setSpecular(0.1, 0.1, 0.1, 1);
		this.textureBottom.setShininess(10.0);
		this.textureBottom.setTexture(new CGFtexture(scene, 'images/skyrender0006.bmp'));

		this.textureTop = new CGFappearance(scene);
		this.textureTop.setAmbient(0.1, 0.1, 0.1, 1);
		this.textureTop.setDiffuse(0.9, 0.9, 0.9, 1);
		this.textureTop.setSpecular(0.1, 0.1, 0.1, 1);
		this.textureTop.setShininess(10.0);
		this.textureTop.setTexture(new CGFtexture(scene, 'images/skyrender0003.bmp'));
	}
	display() {
		this.textureBack.apply();
		//this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		//BACK face
        this.scene.pushMatrix();
		this.scene.scale(scale, scale, scale);
        this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.translate(0, 0, -0.5);
		this.scene.quadSide.display();
		this.scene.popMatrix();

        //FRONT face
        this.textureFront.apply();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.scale(scale, scale, scale);
		this.scene.translate(0, 0, 0.5);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.quadSide.display();
		this.scene.popMatrix();

        //Left face
        this.textureLeft.apply();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.scale(scale, scale, scale);
		this.scene.translate(0.5, 0, 0);
		this.scene.rotate(-Math.PI / 2, 0, 1, 0);
		this.scene.quadSide.display();
		this.scene.popMatrix();

        //Right face
        this.textureRight.apply();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.scale(scale, scale, scale);
		this.scene.translate(-0.5, 0, 0);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.quadSide.display();
		this.scene.popMatrix();

		//	this.textureTop.apply();
		//	this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        //Top face
        this.textureTop.apply();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
		this.scene.scale(scale, scale, scale);
		this.scene.translate(0, -0.5, 0);
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.scene.quadSide.display();
		this.scene.popMatrix();

		//	this.textureBottom.apply();
		//this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        //Bottom face
        this.textureBottom.apply();
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI, 1,0, 0);
		this.scene.scale(scale, scale, scale);
		this.scene.translate(0, 0.5, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.scene.quadSide.display();
		this.scene.popMatrix();
	}
}
