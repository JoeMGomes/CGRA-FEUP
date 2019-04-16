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

		this.gui.add(this.scene, 'displayHouse').name('Display House');
		this.gui.add(this.scene, 'displayPyr').name('Display Pyr');
		this.gui.add(this.scene, 'displayTreeRow').name('Display Tree Row');
		this.gui.add(this.scene, 'displayTreeGroup').name('Display Tree Gr.');
		this.gui.add(this.scene, 'displayHill').name('Display Hill');
		this.gui.add(this.scene, 'displaySky').name('Display Sky');
		this.gui.add(this.scene, 'displayFire').name('Display Fire');
		this.gui.add(this.scene, 'displayTexture').name('Display Texture');
		this.gui.add(this.scene, 'log').name("Log");

		this.gui.add(this.scene, 'selectAmbient', this.scene.ambientIDs).name('Select Ambitent');

		return true;
	}
}
