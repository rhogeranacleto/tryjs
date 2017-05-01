'use strict';

const BRAINS = [];

class Brain {

	constructor(id) {

		this.id = id;
		this._es = [];
	}

	get(key) {

	}

	set(key, value) {

	}

	link(element) {

		this._es.push(element);
	}

	static register(brain) {

		BRAINS.push(brain);
	}

	static getById(id) {

		return BRAINS.find(brain => brain.id === id);
	}
};

module.exports = Brain;