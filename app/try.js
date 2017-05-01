'use strict';

const Brain = require('./Brain.js');
const Component = require('./Component.js');
const Transmitters = require('./Transmitter.js');
const E = require('./DOM/E.js');
const COMPONENTS = [];
const TRANSMITTERS = [];
var VirtualDOM;

class Try {

	static get VirtualDOM() {

		return VirtualDOM;
	}

	static get Brain() {

		return Brain;
	}

	static get Component() {

		return Component;
	}

	static compile(element) {

		return new E(element);
	}

	static start() {

		window.addEventListener('load', function () {

			VirtualDOM = Try.compile(document.getElementsByTagName('html')[0]);
		});
	}
}

window.Try = Try;

module.exports = Try;