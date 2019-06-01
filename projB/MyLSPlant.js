/**
 * MyLSPlant
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLSPlant extends MyLSystem{
	constructor(scene) {
        super(scene);
    }

    initGrammar(){
        this.grammar = {
            "F": new MyBranch(this.scene),
            "X": new MyLeaf(this.scene)
        };
    }

    setParameters(){
		this.axiomp = "X";
        this.anglep = 30.0;
        this.iterationsp = 4;
        this.scene.scaleFactor2 = 0.53;
    }

    doGenerate() {
        this.setParameters();
        this.generate(
            this.axiomp,
            {
                "F": [ "FF"],
                "X": [ "F[-X][X]F[-X]+X", "F[-X][x]+X[&X]^X", "F[+X]-X[&X]^X", "F[/X][X]F[\\X]+X", "F[\X][X]/X", "F[\X]\X", "F[^X][X]F[&X]^X", "F[^X]&X[&X]^X", "F[&X]^X[&X]^X"]
            },
            this.anglep,
            this.iterationsp,
            this.scene.scaleFactor2
        );
    }
}