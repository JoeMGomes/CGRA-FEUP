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
        this.scene.pushMatrix();//MOVIMENTO
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.orientation*this.scene.degreeToRad,0,1,0);
        this.scene.translate(-this.x, -this.y, -this.z);

        this.scene.translate(this.x,this.y, this.z);;
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

        this.scene.popMatrix()//MOVIMENTO

        //cubo
        /*	this.wallTexture.apply();
        	this.scene.pushMatrix();
        	this.scene.translate(0, 0.5, 0);
        	this.scene.scale(2, 1, 1.3);
        	this.scene.unitCube.display();
            this.scene.popMatrix();*/
        // console.log(this.x,this.y,this.z);
        // console.log(this.orientation);
    }


    move(d) {
        if(this.x > 24) {
            this.x = 24;
        } else if(this.x < -24) {
            this.x = -24;
        }
        if(this.z > 24) {
            this.z = 24;
        } else if(this.z < -24) {
            this.z = -24;
        }

        this.x += 0.7*d*Math.cos(this.scene.degreeToRad*this.orientation);
        this.z -= 0.7*d*Math.sin(this.scene.degreeToRad*this.orientation);

    }

    rotate(speedFactor,dir) {

        if(dir) {
            this.orientation+= speedFactor*7;
        }
        else {
            this.orientation-= speedFactor*7;
        }

    }

    accelerate(factor,s) {

        if(this.speed == 0) {
            this.speed = factor;
        }

        if(s) {
            this.speed *= 1 + factor;
        } else {
            this.speed *= 1/(1+factor);
        }
        if(this.speed <= 0) {
            this.speed = 0;
        } else if(this.speed > 9) {
            this.speed = 9;
        }
    }

    resetValues() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.speed = 0;
        this.orientation = 0;
    }
}