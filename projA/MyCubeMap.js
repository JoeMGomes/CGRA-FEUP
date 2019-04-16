/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initBuffers();
	}
	initBuffers() {
		this.vertices1 = [
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

        this.vertices = this.vertices1.map(x => x * 90);
    
		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,
			1, 2, 3,

			4, 5, 6, 
			6, 5, 7,

			8, 10, 9,
			9, 10, 11,

			14, 12, 13,
			14, 13, 15,

			16, 19, 17,
			17, 19, 18,
			
			22, 20, 21,
			21, 23, 22
		];

		this.normals= [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,

			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1,

			-1,0,0,
			-1,0,0,
			-1,0,0,
			-1,0,0,

			1,0,0,
			1,0,0,
			1,0,0,
			1,0,0,

			0,1,0,
			0,1,0,
			0,1,0,
			0,1,0,

			0,-1,0,
			0,-1,0,
			0,-1,0,
			0,-1,0

        ];
        
        this.texCoords = [
			0.25, 0.5,
			0.25, 0.25,
			0.5, 0.5,
			0.5, 0.25,

			1.0, 0.5,
			1.0, 0.25,
			0.75, 0.5,
			0.75, 0.25,

			0.5, 0.5,
			0.5, 0.25,
			0.75, 0.5,
			0.75, 0.25,

			0.25, 0.5,
			0.25, 0.25,
			0.0, 0.5,
			0.0, 0.25,

			0.25, 0.5,
			0.5, 0.5,
			0.5, 0.75,
			0.25, 0.75,
			

			0.25, 0.25,
			0.5, 0.25,
			0.25, 0.0,
			0.5, 0.0
        ];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	updateBuffers(complexity){
		this.initBuffers();
        this.initNormalVizBuffers();
	}
}

