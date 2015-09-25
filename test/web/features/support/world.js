'use strict';

process.env.NODE_ENV = 'test';

var app = require('../../../../server/server.js');
var supertest = require('supertest');

var World = function World(callback) {
	this.app = app;
  	this.request = supertest(app);
  	callback();
};

module.exports.World = World;
