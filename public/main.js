(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
'use strict';

class Component {

	constructor() {


	}


}

module.exports = Component;
},{}],3:[function(require,module,exports){
'use strict';

const Brain = require('../Brain.js');

class E {

	constructor(element, stopPropagation) {

		this._tag = '';
		this._id = '';
		this._classes = [];
		this._children = [];
		this._attributes = [];
		this._controller = null;
		/**
		 * @private {E} Elemento pai
		 */
		this._parent = null;

		this.stopPropagation = stopPropagation;
		this.base(element);
		this._original = element;
	}

	get id() {

		return this._id;
	}

	set id(id) {

		this._id = id;
	}

	get parent() {

		return this._parent;
	}

	set parent(element) {

		this._parent = element;
	}

	get children() {

		return this._children;
	}

	get tag() {

		return this._tag;
	}

	set tag(tagName) {

		return this._tag = tagName;
	}

	get after() {

		const thisIndex = this.parent.children.findIndex(child => child === this);
		return this.parent.children(thisIndex + 1);
	}

	set after(element) {

		const index = this.parent.children.findIndex(child => child === this);
		this.parent.insertChild(element, index + 1);
	}

	set controller(id) {

		this._controller = Brain.getById(id);
		this._controller.link(this);
	}

	addClass(className) {

		if (this._classes.indexOf(className) < 0) {

			this._classes.push(className);
		}
	}

	removeClass(className) {

		this._classes.splice(this._classes.indexOf(className), 1);
	}

	append(element) {

		return this.insertChild(element, this._children.length);
	}

	insertChild(element, index) {

		this._children.splice(index, 0, element);
		return element.parent = this;
	}

	base(element) {

		this.tag = element.tagName;
		this.id = (element.id || '').toLowerCase();

		if (!this.stopPropagation) {

			element.childNodes.forEach(node => {

				this.append(new E(node));
			});
		}
	}
}


module.exports = E;
},{"../Brain.js":1}],4:[function(require,module,exports){
'use strict';

class Transmitter {


}

module.exports = Transmitter;
},{}],5:[function(require,module,exports){
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
},{"./Brain.js":1,"./Component.js":2,"./DOM/E.js":3,"./Transmitter.js":4}],6:[function(require,module,exports){
window.Try = require('./app/try.js');
},{"./app/try.js":5}]},{},[6]);
