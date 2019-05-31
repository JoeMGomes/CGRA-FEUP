/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
        this.degreeToRad = Math.PI / 180;
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 0.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        this.setUpdatePeriod(50);

        //Interface
        this.speedFactor = 1;
        this.scaleFactor = 1;

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.terrain = new MyTerrain(this);
        this.house = new MyHouse(this);
        this.bird = new MyBird(this, 0, 0, 0, 0, 0);
        this.nest = new MyNest(this,-23, 5, -6);
        this.treeBranches = [
                                new MyTreeBranch(this, 0,2,0),
                                new MyTreeBranch(this,3,2,0)
                            ];
        this.lightning = new MyLightning(this);
        this.lSPlant = new MyLSPlant(this);

        this.lSPlant.doGenerate(); //one for each tree
        this.oldTime = 0;

        //Objects connected to MyInterface
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(10, 10, 10), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    checkKeys() {
        var text = 'Keys pressed: ';
        var keysPressed = false;
        // Check for key codes e.g. in ​https://keycode.info/
        if (this.gui.isKeyPressed('KeyW')) {
            text += ' W ';
            keysPressed = true;
            this.bird.accelerate(this.speedFactor, true);
            console.log(this.bird.x, this.bird.z, this.bird.speed);
        } else if (this.gui.isKeyPressed('KeyS')) {
            text += ' S ';
            keysPressed = true;
            this.bird.accelerate(this.speedFactor, false);
            console.log(this.bird.x, this.bird.z, this.bird.speed);
        } else if (this.gui.isKeyPressed('KeyA')) {
            text += ' A ';
            keysPressed = true;
            this.bird.rotate(this.speedFactor, true);
            console.log(this.bird.x, this.bird.z, this.bird.speed);
        } else if (this.gui.isKeyPressed('KeyD')) {
            text += ' D ';
            keysPressed = true;
            this.bird.rotate(this.speedFactor, false);
            console.log(this.bird.x, this.bird.z, this.bird.speed);
        } else if (this.gui.isKeyPressed('KeyR')) {
            text += ' R ';
            keysPressed = true;
            this.bird.resetValues();
            console.log(this.bird.x, this.bird.z, this.bird.speed);
        }
        if (this.gui.isKeyPressed('KeyP')) {
            text += ' P ';
            keysPressed = true;
            this.bird.catching = true;
            console.log("goin down");
        }
        if (this.gui.isKeyPressed('KeyL')) {
            text += ' L ';
            keysPressed = true;
            this.lightning.startAnimation(this.oldTime /1000.0);
        }
        if (keysPressed) console.log(text);
    }

    checkBranches() {

        for(let i = 0; i< this.treeBranches.length; i++) {

            let xCond =Math.abs(this.treeBranches[i].x - this.bird.x )< 1;
            let zCond =Math.abs(this.treeBranches[i].z - this.bird.z) < 1;

    

            if(xCond && zCond) {
                this.treeBranches.splice(i,1);
                this.bird.caught = true;
                console.log("Pauuuu");
            }
        }

    }
    checkNest(){
        let xCond =Math.abs(this.nest.x - this.bird.x )< 2;
        let zCond =Math.abs(this.nest.z - this.bird.z) < 2;

        if(xCond && zCond && this.bird.caught) {
            this.bird.caught = false;
            console.log("Soltouuuuu");
        }
    }
    update(t) {
        this.checkKeys();
        if (this.oldTime == 0) {
            this.oldTime = t;
        } else {
            var delta = (t - this.oldTime) / 1000.0;
            var d = this.bird.speed * delta;
            this.oldTime = t;

            this.bird.move(d);
            if(!this.bird.catching)
                this.bird.fly(t, this.speedFactor);
            else {
                this.bird.catch(t, this.speedFactor);

                if(t > this.bird.timeMarker+900 && t < this.bird.timeMarker+1100) {
                    this.checkNest();
                    this.checkBranches();
                }
            }

            this.lightning.updating(this.oldTime/1000.0);
        }
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        //Branch
        this.pushMatrix();
        for(let i = 0; i< this.treeBranches.length; i++) {
            this.treeBranches[i].display();
        }
        this.popMatrix();

        //NEST
        this.pushMatrix();
        this.scale(.5, .5, .5);
        this.nest.display();
        this.popMatrix();

        //BIRD
        this.pushMatrix()
        this.scale(this.scaleFactor * 0.5, this.scaleFactor * 0.5, this.scaleFactor * 0.5);
        this.bird.display();
        this.popMatrix();

       //TERRAIN
        this.pushMatrix();
        this.rotate(-0.5 * Math.PI, 1, 0, 0);
        this.scale(60, 60, 1);
        this.terrain.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(0, 18, 0);
        this.scale(2,2,2);
        this.rotate(- Math.PI, 1, 0, 0);
        this.rotate(Math.PI, 0, 1, 0);
        this.lightning.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(4, 0, 0);
        this.lSPlant.display();
        this.popMatrix();  

        // ---- END Primitive drawing section
    }
}
