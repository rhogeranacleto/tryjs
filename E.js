/*jshint strict:false */
'use strict';

class E {

	constructor(element) {

		this.element = element;
		this.classes = [];
		this.attributes = [];
		this.children = [];
	}

	append(element) {

		this.children.push(element);
		//adicionar movimentos

	}
}

module.exports = E;