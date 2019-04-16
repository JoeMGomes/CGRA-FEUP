/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
	constructor() {
		super();
	}

	init(application) {
		// call CGFinterface init
		super.init(application);
		// init GUI. For more information on the methods, check:
		// http://workshop.chromeexperiments.com/examples/gui
		this.gui = new dat.GUI();

		var obj = this;

		this.gui.add(this.scene, 'displayAxis').name('Display axis');
		this.gui.add(this.scene, 'displayTexture').name('Display Texture');

		this.gui.add(this.scene, 'selectAmbient', this.scene.ambientIDs).name('Select Ambient');

		return true;
	}
}
