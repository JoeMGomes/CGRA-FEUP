/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
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

		var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
			
		for(var i = 0; i <= this.slices; i++) {

			var sa=Math.sin(ang);
			var saa=Math.sin(ang+alphaAng);
			var ca = Math.cos(ang);
			var caa=Math.cos(ang+alphaAng);

			this.vertices.push(ca, 1, sa); //0 //4
			this.vertices.push(ca, 0, sa); //3 //7

			this.texCoords.push(ang/(Math.PI*2), 1);
			this.texCoords.push(ang/(Math.PI*2), 0);

			var normal= [
				ca,
				0,
				sa
			];
			// push normal once for each vertex of this triangle
			this.normals.push(...normal);
			this.normals.push(...normal);

			ang+=alphaAng;
		}

		for (var i = 0; i < this.slices; i++) {
			this.indices.push((2*i+2), (2*i+1) , (2*i));
			this.indices.push((2*i+1), (2*i+2) , (2*i+3));
		}
		

		//alert(this.vertices.length);
		//alert(this.normals.length);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}