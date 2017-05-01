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

		var brain = Brain.getById(id);

		if (brain) {

			this._controller = brain
			this._controller.link(this);
		}
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