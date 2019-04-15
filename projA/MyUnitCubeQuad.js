/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyUnitCubeQuad extends CGFobject {

    constructor(scene) {
		super(scene);
        this.initBuffers(scene);
        this.initTextures(scene);
	}
	initBuffers(scene) {
        scene.quadSide = new MyQuad (scene);
        scene.quadTop = new MyQuad (scene);
        scene.quadBottom = new MyQuad (scene);
    }
    initTextures(scene){
        this.textureSide = new CGFappearance(scene);
        this.textureSide.setAmbient(0.1, 0.1, 0.1, 1);
        this.textureSide.setDiffuse(0.9, 0.9, 0.9, 1);
        this.textureSide.setSpecular(0.1, 0.1, 0.1, 1);
        this.textureSide.setShininess(10.0);
        //this.textureSide.setTexture(new CGFtexture(scene, 'images/mineSide.png'));

        this.textureBottom = new CGFappearance(scene);
        this.textureBottom.setAmbient(0.1, 0.1, 0.1, 1);
        this.textureBottom.setDiffuse(0.9, 0.9, 0.9, 1);
        this.textureBottom.setSpecular(0.1, 0.1, 0.1, 1);
        this.textureBottom.setShininess(10.0);
        //this.textureBottom.setTexture(new CGFtexture(scene, 'images/mineBottom.png'));

        this.textureTop = new CGFappearance(scene);
        this.textureTop.setAmbient(0.1, 0.1, 0.1, 1);
        this.textureTop.setDiffuse(0.9, 0.9, 0.9, 1);
        this.textureTop.setSpecular(0.1, 0.1, 0.1, 1);
        this.textureTop.setShininess(10.0);
       // this.textureTop.setTexture(new CGFtexture(scene, 'images/mineTop.png'));
    }
    display(){
        //this.textureSide.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        //Front face
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.scene.quadSide.display();
        this.scene.popMatrix();

        //Back face
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.quadSide.display();
        this.scene.popMatrix();

        //Left face
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);    
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.quadSide.display();
        this.scene.popMatrix();

        //Right face
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);    
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.quadSide.display();
        this.scene.popMatrix();

        //this.textureTop.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        //Top face
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);    
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.quadSide.display();
        this.scene.popMatrix();

        //this.textureBottom.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        //Bottom face
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);    
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.quadSide.display();
        this.scene.popMatrix();
    }


}


/*updateBuffers(complexity){

}*/

