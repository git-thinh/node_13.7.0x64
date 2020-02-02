var cacheSingleton = function cacheSingleton() {
	// Defining a var instead of this (works for variable & function) will create a private definition

	const NodeCache = require("node-cache");
	const myCache = new NodeCache();

	var socketList = {};

	this.add = function (userId, socket) {
		if (!socketList[userId]) {
			socketList[userId] = socket;
		}
	};

	this.remove = function (userId) {
		if (socketList[userId]) {
			delete socketList[userId];
		}
	};

	this.getSocketList = function () {
		return socketList;
	};

	if (cacheSingleton.caller != cacheSingleton.getInstance) {
		throw new Error("This object cannot be instanciated");
	}
};

/* ************************************************************************
CLASS DEFINITION
************************************************************************ */

cacheSingleton.instance = null;
cacheSingleton.getInstance = function () {
	if (this.instance === null) this.instance = new cacheSingleton();
	return this.instance;
};
module.exports = cacheSingleton.getInstance();