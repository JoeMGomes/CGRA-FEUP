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
        this.displayAxis = false;
        this.displayHouse = true;
        this.displayBird = true;
        this.displayTrees = true;
        this.displayNest = true;
        this.displayBranches = true;

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.terrain = new MyTerrain(this);
        this.map = new MySkyBox(this);
        this.house = new MyHouse(this);
        this.bird = new MyBird(this, 0, 0, 0, 0, 0);
        this.nest = new MyNest(this,-23, 5, -6);
        this.treeBranches = [
                                new MyTreeBranch(this, -1, 3, 8),
                                new MyTreeBranch(this,4,3.2,6),
                                new MyTreeBranch(this,8,3,3),
                                new MyTreeBranch(this,-8,3,-3.5)
                        ];

        this.plants = [
            new MyLSPlant(this),
            new MyLSPlant(this),
            new MyLSPlant(this),
            new MyLSPlant(this),
            new MyLSPlant(this),
            new MyLSPlant(this),
            new MyLSPlant(this),
            new MyLSPlant(this)
        ];

        this.generatePlants();
        this.lightning = new MyLightning(this);

        this.oldTime = 0;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(16.68649673461914, 29.773422241210938, 62.07229232788086), vec3.fromValues(1.1595165729522705, 2.7738912105560303, -0.9989054799079895));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    generatePlants(){
        for (let i=0; i < this.plants.length; i++){
            this.plants[i].doGenerate(); //one for each tree
        }
    }
    checkKeys() {
        var text = 'Keys pressed: ';
        var keysPressed = false;
        // Check for key codes e.g. in ​https://keycode.info/
        if (this.gui.isKeyPressed('KeyW')) {
            text += ' W ';
            keysPressed = true;
            this.bird.accelerate(this.speedFactor, true);
        } else if (this.gui.isKeyPressed('KeyS')) {
            text += ' S ';
            keysPressed = true;
            this.bird.accelerate(this.speedFactor, false);
        } else if (this.gui.isKeyPressed('KeyA')) {
            text += ' A ';
            keysPressed = true;
            this.bird.rotate(this.speedFactor, true);
        } else if (this.gui.isKeyPressed('KeyD')) {
            text += ' D ';
            keysPressed = true;
            this.bird.rotate(this.speedFactor, false);
        } else if (this.gui.isKeyPressed('KeyR')) {
            text += ' R ';
            keysPressed = true;
            this.bird.resetValues();
        }
        if (this.gui.isKeyPressed('KeyP')) {
            text += ' P ';
            keysPressed = true;
            this.bird.catching = true;
        }
        if (this.gui.isKeyPressed('KeyL')) {
            text += ' L ';
            keysPressed = true;
            this.randomAngle = Math.random()*40-20;
            this.lightning.startAnimation(this.oldTime /1000.0);
        }
    }

    checkBranches() {

        for(let i = 0; i< this.treeBranches.length; i++) {

            let xCond =Math.abs(this.treeBranches[i].x - this.bird.x )< 1.5;
            let zCond =Math.abs(this.treeBranches[i].z - this.bird.z) < 1.5;

            if(xCond && zCond) {
                this.treeBranches.splice(i,1);
                this.bird.caught = true;
            }
        }

    }
    checkNest(){
        let xCond =Math.abs(this.nest.x - this.bird.x )< 2;
        let zCond =Math.abs(this.nest.z - this.bird.z) < 2;

        if(xCond && zCond && this.bird.caught) {
            this.bird.caught = false;
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
        if (this.displayAxis)
            this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        //SkyBox
        this.pushMatrix();
        //this.scale (0.68,0.68,0.68);
        this.map.display();
        this.popMatrix();

        //HOUSE
        if (this.displayHouse){
            this.pushMatrix();
            this.translate(-8.5,2.5,-8);
            this.scale(.9, .9, .9);
            this.rotate(25*this.degreeToRad,0,1,0);
            this.house.display();
            this.popMatrix();
        }

        //BRANCH
        if(this.displayBranches){
            this.pushMatrix();
            for(let i = 0; i< this.treeBranches.length; i++) {
                this.treeBranches[i].display();
            }
            this.popMatrix();
        }

        //NEST
        if (this.displayNest){
            this.pushMatrix();
            this.scale(.5, .5, .5);
            this.nest.display();
            this.popMatrix();
        }

        //BIRD
        if (this.displayBird){
            this.pushMatrix();
            this.translate(-1, 0, -2);
            this.scale(this.scaleFactor * 0.5, this.scaleFactor * 0.5, this.scaleFactor * 0.5);
            this.bird.display();
            this.popMatrix();
        }

       //TERRAIN
        this.pushMatrix();
        this.rotate(-0.5 * Math.PI, 1, 0, 0);
        this.scale(60, 60, 1);
        this.terrain.display();
        this.popMatrix();

        //LIGHTNING

        this.pushMatrix();
        this.rotate(this.randomAngle*this.degreeToRad, 0,0,1);
        this.translate(0, 18, 0);
        this.scale(2,2,2);
        this.rotate(- Math.PI, 1, 0, 0);
        this.rotate(Math.PI, 0, 1, 0);
        this.lightning.display();
        this.popMatrix();

        //PLANTS
        if (this.displayTrees){
            this.pushMatrix();
            this.translate(-4,2.5,-9);
            this.plants[0].display();
            this.popMatrix();  

            this.pushMatrix();
            this.translate(-1,2.5,-13);
            this.plants[1].display();
            this.popMatrix();  

            this.pushMatrix();
            this.translate(-5,2.5,-15);
            this.plants[2].display();
            this.popMatrix();  

            this.pushMatrix();
            this.translate(4, 2, 4);
            this.plants[3].display();
            this.popMatrix();  

            this.pushMatrix();
            this.translate(6, 2, 6);
            this.plants[4].display();
            this.popMatrix();  

            this.pushMatrix();
            this.translate(-2, 2, 4);
            this.plants[5].display();
            this.popMatrix();  

            this.pushMatrix();
            this.translate(-2, 2, 7);
            this.plants[6].display();
            this.popMatrix();  

            this.pushMatrix();
            this.translate(1, 2, 5);
            this.plants[7].display();
            this.popMatrix();  
        }

        // ---- END Primitive drawing section
    }
}
