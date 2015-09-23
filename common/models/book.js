var lodash = require('lodash');

module.exports = function(Book) {

	Book.vat = function(id, cb) {
		this.findById(id, function(err, book) {
			if (lodash.isNumber(book.price)) {
				book.vat = (book.price * 10) / 100;	
			} else {
				book.vat = 0;
			}
			cb(err, book);
		})
    }
     
    Book.remoteMethod(
        'vat', 
        {
          accepts: {arg: 'id', type: 'string'},
          http: {verb: 'get', path: '/vat/:id'},
          returns: {arg: 'book', type: 'object'}
        }
    );
};
