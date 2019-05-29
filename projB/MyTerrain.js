/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyTerrain extends CGFobject {

    constructor(scene,gl) {
        super(scene);
        this.gl = gl
        this.initShader(scene)
        this.initBuffers(scene);
    }

    initBuffers(scene){
        this.plane = new Plane(scene,32);
    }

    initShader(scene) {

        this.colortexture = new CGFtexture(scene, "images/altimetry.jpg");
        this.heightTexture = new CGFtexture(scene, "images/heightmap.jpg");

        this.terrainMaterial = new CGFappearance(scene);
        this.terrainMaterial.setAmbient(0.3, 0.3, 0.3, 1);
        this.terrainMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
        this.terrainMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.terrainMaterial.setShininess(120);

        this.terrainMaterial.setTexture(this.colortexture);

        this.shader = new CGFshader(scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
    }

    display() {

        this.scene.terrainMaterial.apply();
        this.scene.setActiveShader(this.shader);
        this.plane.display();
    }
}
