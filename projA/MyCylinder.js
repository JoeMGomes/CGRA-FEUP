/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var step = 1/this.slices;
        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i <= this.slices; i++) {
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            
            this.texCoords.push(i*step,1);
            this.texCoords.push(i*step,0);
                      
            ang+=alphaAng;
        }

           
        for(var i = 0; i < this.slices*2 -1 ;i+=2){
            this.indices.push(i, (i+2) % (this.slices *2+2), (i+1) %(this.slices *2+2));
            this.indices.push(i+1, (i+2)%(this.slices *2+2) , (i+3)%(this.slices *2+2)); 
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

}


