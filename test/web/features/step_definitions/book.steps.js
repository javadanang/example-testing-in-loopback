'use strict';

var async = require('async');
var lodash = require('lodash');
var assert = require('chai').assert;
var logger = require('../../../../server/lib/utils/logger.js');

module.exports = function() {
    this.World = require('../support/world.js').World;

    this.Given(/^an empty book list$/,function(done) {
    	var self = this;
		var bookModel = self.app.models.Book;
		bookModel.destroyAll(function(err, info) {
			done();
		});
	});

	this.Given(/^a book list$/,function(table, done) {
    	var self = this;
    	var bookList = table.hashes();
		var bookModel = self.app.models.Book;
		bookModel.destroyAll(function(err, info) {
			async.each(bookList, function(book, callback) {
				bookModel.create(book, function(err, obj) {
					callback();
				});
			}, function (error) {
				done();
			});
		});
	});

    this.When(/^I add a book with the title "([^"]*)" and price "([^"]*)"$/, function (arg1, arg2, done) {
    	var self = this;
    	self.request
	      	.post('/api/Books')
	      	.send({ 
	      		title: arg1, 
	      		price: arg2 
	      	})
	      	.expect('Content-Type', /json/)
			.expect(200)
	      	.end(function(err, res) {  
	        	done();
	      	});	
    });

    this.When(/^I add a book list$/, function (table, done) {
    	var bookList = table.hashes();
    	var self = this;
    	async.eachSeries(bookList, function(book, callback) {
			self.request
		      	.post('/api/Books')
		      	.send({ 
		      		title: book["title"], 
		      		price: book["price"] 
		      	})
		      	.expect('Content-Type', /json/)
				.expect(200)
		      	.end(function(err, res) {
		        	callback();
		      	});	
		}, function (error) {
			done();
		});
    });

    this.Then(/^there are exactly "([^"]*)" items in book list$/, function (arg1, done) {
	  	var self = this;
    	self.request
	      	.get('/api/Books/count')
	      	.expect('Content-Type', /json/)
			.expect(200)
	      	.end(function(err, res) {  
	        	assert.isNumber(res.body.count, 'the output should  be a number');
	        	assert.equal(res.body.count, arg1,'Book list should have exactly ' + arg1 + ' items');
	        	done();
	      	});
	});

	this.Then(/^total price of book list should be "([^"]*)"$/, function (arg1, done) {
	  	var self = this;
    	self.request
	      	.get('/api/Books')
	      	.expect('Content-Type', /json/)
			.expect(200)
	      	.end(function(err, res) {
	      		var bookList = res.body;
	      		assert.isArray(bookList, "the output should be an array");
	      		var total = 0;
	      		bookList.forEach(function(book) {
	      			total += book.price;
	      		});
	      		assert.equal(total, arg1, 'the total price of book list should be ' + arg1);
	        	done();
	      	});
	});
}