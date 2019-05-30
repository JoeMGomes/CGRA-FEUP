/**
* MyNest
* @constructor
* @param scene - Reference to MyScene object
*/

class MyNest extends CGFobject {
    constructor(scene,x,y,z) {
        super(scene);
        //this.degreeToRad = Math.PI / 180;
        this.initBuffers(scene);
        this.initTextures(scene);
        this.x = x;
        this.y = y;
        this.z = z;
    }
    initBuffers(scene) {
        scene.stick = new MyCylinder(scene,5);
    }
    initTextures(scene) {
        this.stickMaterial = new CGFappearance(scene);
        this.stickMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.stickMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.stickMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.stickMaterial.setShininess(10.0);
        this.stickMaterial.setTexture(new CGFtexture(scene, 'images/column.jpg'));

    }
    display() {

        let ramos = 30.0;
        let ang = 0;
        let step = (Math.PI*2)/ramos;

        this.stickMaterial.apply()

        this.scene.pushMatrix()
        this.scene.translate(this.x,this.y,this.z);

        //DESENHAR Um setor
        for(var i = 0.0; i < ramos; i++) {
            this.scene.pushMatrix()
            this.scene.rotate(ang,0,1,0);

            this.scene.pushMatrix()
            this.scene.rotate(-Math.PI/2, 0,0,1);
            this.scene.scale(.1,2,.1)
            this.scene.stick.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(1.8,0,-0.4);
            this.scene.rotate(Math.PI/4,1,0,-1);
            this.scene.scale(.1,1,.1)
            this.scene.stick.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(1.8,0,0.4);
            this.scene.rotate(-Math.PI/4,1,0,1);
            this.scene.scale(.1,1,.1)
            this.scene.stick.display();
            this.scene.popMatrix();

            this.scene.popMatrix();//Pop do loop
            ang += step
        }
        this.scene.popMatrix();
    }
}
