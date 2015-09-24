var config = require('../config.js'); // should be before [app = require(...)]
var logger = require('../../../server/lib/utils/logger.js');
var app = require('../../../server/server.js');

var async = require('async');
var lodash = require('lodash');
var assert = require('chai').assert;
var supertest = require('supertest');

var bookModel = app.models.Book;

describe('Book model:', function() {

	describe('/Books/vat/{id}', function() {

		beforeEach(function (done) {
	      	bookModel.destroyAll(function(err, info) {
				done();
			});
	    });

	    afterEach(function() {
	    });

		it('should return vat = price * 10% when price > 0', function(done) {
			
			var bookList = [
				{
					"title": "The first book",
					"price": 5
				},
				{
					"title": "The fantastic book vol.1",
					"price": 6
				},
				{
					"title": "The fantastic book vol.2",
					"price": 12
				},
				{
					"title": "The fantastic book vol.3",
					"price": 7
				},
				{
					"title": "The last book",
					"price": 9
				}
			];

			async.each(bookList, function(book, callback) {
				bookModel.create(book, function(err, obj) {
					book.id = obj.id;
					callback();
				});
			}, function (error) {
				async.each(bookList, function(book, callback) {
					supertest(app)
				  		.get('/api/Books/vat/' + book.id)
				  		.query({ id: book.id })
				  		.expect('Content-Type', /json/)
				  		.expect(200)
				  		.end(function(err, res) {
				  			assert(lodash.isNull(err));
				  			var output = res.body;
				  			assert.equal((book.price * 10)/100, output.book.vat);
				    		callback();
				  		});	
				}, function(err) {
					done();
				});
				
			});
		});

		it('should return vat == 0 when price is undefined', function(done) {
			var book = {
				"title": "The first book",
				"description": "book without price (undefined)"
			}

			bookModel.create(book, function(err, obj) {
				supertest(app)
			  		.get('/api/Books/vat/' + obj.id)
			  		.expect('Content-Type', /json/)
			  		.expect(200)
			  		.end(function(err, res) {
			  			assert(lodash.isNull(err));
			  			var output = res.body;
			  			assert.equal(book.title, output.book.title);
			  			assert.equal(book.description, output.book.description);
			  			assert.equal(0, output.book.vat);
			    		done();
			  		});	
			});
		});
	});
});