'use stric';

const checker = /\[([\w\-]+)\:([^\]]+)\]/;

class ClassesList {

	constructor(classes) {

		var processed = classes.split(' ').map(className => ClassesList.process(className));

		this.stringClasses = processed.filter(className => typeof className === 'string');
		this.watchables = processed.filter(classObject => typeof classObject === 'object');
	}

	get classesString() {

		return this.stringClasses.concat(this.checkWatchers()).join(' ');
	}

	checkWatchers() {

		return this.watchables.map(watchable => {
			//check
			return watchable.className;
		});
	}

	static process(className) {

		var obj = checker.exec(className);

		if (obj) {

			return {
				className: obj[1],
				watcher: obj[2]
			};
		}

		return className;
	}
}