/**
* MyPrism
* @constructor
*/
class MyPrism extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var normalStep = -alphaAng /2;

        for(var i = 0; i < this.slices; i++) {
            if(i % 2 == 0 )normalStep += alphaAng;

            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
            //this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
          //  this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
            this.normals.push(Math.cos(normalStep),0, -Math.sin(normalStep));
            this.normals.push(Math.cos(normalStep),0, -Math.sin(normalStep));
            ang+=alphaAng;

        }
        for(var i = 0; i < this.slices*2 -1 ; i+=2) {
            this.indices.push(i, (i+2) % (this.slices *2), (i+1) %(this.slices *2));
            this.indices.push(i+1, (i+2)%(this.slices *2), (i+3) %(this.slices *2));
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(complexity) {
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


