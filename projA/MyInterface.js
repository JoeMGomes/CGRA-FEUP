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
        this.gui.add(this.scene, 'displayTree').name('Display Tree');
        this.gui.add(this.scene, 'displayPyr').name('Display Pyr');


		return true;
	}
}
