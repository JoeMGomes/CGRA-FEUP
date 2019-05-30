/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyTerrain extends CGFobject {

    constructor(scene) {
        super(scene);
        this.initShader(scene)
        this.initBuffers(scene);
    }

    initBuffers(scene){
        this.plane = new Plane(scene,32);
    }

    initShader(scene) {

        this.colortexture = new CGFtexture(scene, "images/terrain.jpg");
        this.heightTexture = new CGFtexture(scene, "images/heightmapTest.png");
        this.altimetry = new CGFtexture(scene, "images/altimetry.png");

        this.terrainMaterial = new CGFappearance(scene);
        this.terrainMaterial.setAmbient(0.3, 0.3, 0.3, 1);
        this.terrainMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
        this.terrainMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.terrainMaterial.setShininess(120);

        this.terrainMaterial.setTexture(this.colortexture);

        this.shader = new CGFshader(scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.shader.setUniformsValues({ uSampler2: 1 });
        this.shader.setUniformsValues({ uSampler3: 2 });
    }

    display() {

        this.heightTexture.bind(1);
        this.altimetry.bind(2);

        this.terrainMaterial.apply();
        this.scene.setActiveShader(this.shader);
        this.plane.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.setDefaultAppearance();

    }
}
