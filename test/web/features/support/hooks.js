var Hooks = function () {
  	this.Before(function (callback) {
    	callback();
  	});
};

module.exports = Hooks;
