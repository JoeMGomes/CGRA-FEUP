/**
 * MyLightning
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends MyLSystem {
    constructor(scene) {
        super(scene);
        this.tInitial = 0;
        this.depth = 0;
    }
    initGrammar() {

        this.grammar = {
            "F": new MyQuadLight(this.scene),
            "X": new MyQuadLight(this.scene)
        };

    }
    initParameters() {
        this.axiom = "X"; // "X"; //
        this.angle = 25.0 * Math.PI / 180.0;
        this.iterations = 3;
        this.scale = Math.pow(0.5, this.iterations - 1);
        this.productions = {
            "F": ["FF"],
            "X": ["F[-X][X]F[-X]+FX", "F[-X][x]+X", "F[+X]-X", "F[-X][X]F[-X]+X", "F[-X][x]+X", "F[+X]-X", "F[/X][X]F[\\X]+X", "F[\X][X]/X", "F[/X]\X", "F[^X][X]F[&X]^X", "F[^X]&X", "F[&X]^X"]
        };
    }

    updating(t) {
        if (this.depth != 0) {
            this.timelapse = t - this.tInitial;
            if (this.timelapse <= 1 || this.depth <= this.axiom.length) {
                this.update(this.timelapse);
            }
            else {
                this.depth = 0;
            }
        }
    }

    update(timelapse) {

        this.depth = this.axiom.length * timelapse;
         console.log("Time-lapse = ", timelapse);
         console.log(this.depth);
         console.log("length = ", this.axiom.length)
    }

    startAnimation(t) {
        this.initParameters();
        this.iterate();
        this.tInitial = t;
        this.depth = 1;
    }

    display() {
        if (this.depth == 0) {
            return;
        }

        this.pushpop = 0;
        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);

        var i;

        // percorre a cadeia de caracteres
        for (i = 0; i < this.axiom.length; ++i) {

            // verifica se sao caracteres especiais
            switch (this.axiom[i]) {
                case "+":
                    // roda a esquerda
                    this.scene.rotate(this.angle, 0, 0, 1);
                    break;

                case "-":
                    // roda a direita
                    this.scene.rotate(-this.angle, 0, 0, 1);
                    break;

                case "[":
                    // push
                    ++this.pushpop;
                    this.scene.pushMatrix();
                    break;

                case "]":
                    // pop
                    --this.pushpop;
                    this.scene.popMatrix();
                    break;

                // processa primitiva definida na gramatica, se existir
                default:
                    var primitive = this.grammar[this.axiom[i]];

                    if (i >= this.depth) {
                        break;
                    }

                    if (primitive) {
                        primitive.display();
                        this.scene.translate(0, 1, 0);
                    }
                    break;
            }
        }
        for (i = 0; i < this.pushpop; ++i) {
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}