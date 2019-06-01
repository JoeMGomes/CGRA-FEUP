/**
 * MySkyBox
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MySkyBox extends CGFobject {

    constructor(scene) {
        super(scene);
        this.initMaterials(scene);
        this.skyBox = new MyCubeMap(scene);
    }
    initMaterials(scene){
        this.sky = new CGFappearance(scene);
        this.sky.setAmbient(0.5, 0.5, 0.5, 1);
        this.sky.setDiffuse(0.7, 0.7, 0.7, 1);
        this.sky.setSpecular(0.5, 0.5, 0.5, 1);
        this.sky.setShininess(120);

        this.skyTexture = new CGFtexture(scene, "images/skyboxsun.png");
        this.sky.setTexture(this.skyTexture);
    }
    display(){
        this.sky.apply();
        this.skyBox.display();
    }
}
