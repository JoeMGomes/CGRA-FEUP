/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			//Face traseira
			-0.5, -0.5, -0.5,	//0
			-0.5, 0.5, -0.5,	//1
			0.5, -0.5, -0.5,	//2
			0.5, 0.5, -0.5,		//3
			
			//Face frontal
			-0.5, -0.5, 0.5,	//4
			-0.5, 0.5, 0.5,		//5
			0.5, -0.5, 0.5,		//6
			0.5, 0.5, 0.5,		//7

			//Face lateral direita
			0.5, -0.5, -0.5,	//8
			0.5, 0.5, -0.5,		//9
			0.5, -0.5, 0.5,		//10
			0.5, 0.5, 0.5,		//11
			
			//Face lateral esquerda
			-0.5, -0.5, -0.5,	//12
			-0.5, 0.5, -0.5,	//13
			-0.5, -0.5, 0.5,	//14
			-0.5, 0.5, 0.5,		//15

			//Face inferior
			-0.5, -0.5, -0.5,	//16
			0.5, -0.5, -0.5,	//17
			0.5, -0.5, 0.5,		//18
			-0.5, -0.5, 0.5,	//19
			
			//Face superior
			-0.5, 0.5, -0.5,	//20
			0.5, 0.5, -0.5,		//21
			-0.5, 0.5, 0.5,		//22
			0.5, 0.5, 0.5		//23
			
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2,

			4, 6, 5, 
			6, 7, 5,

			8, 9, 10,
			9, 11, 10,

			14, 13, 12,
			14, 15, 13,

			16, 17, 19,
			17, 18, 19,
			
			22, 21, 20,
			21, 22, 23
		];

		this.normals= [
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1,

			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,

			1,0,0,
			1,0,0,
			1,0,0,
			1,0,0,

			-1,0,0,
			-1,0,0,
			-1,0,0,
			-1,0,0,

			0,-1,0,
			0,-1,0,
			0,-1,0,
			0,-1,0,

			0,1,0,
			0,1,0,
			0,1,0,
			0,1,0

		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	updateBuffers(complexity){
		this.initBuffers();
        this.initNormalVizBuffers();
	}
}

