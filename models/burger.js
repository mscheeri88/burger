var orm = require("../config/orm.js");

var burger = {
  //cat.all function w/ callback parameter,then request
  all: function(cb) {
    //orm.all, with cats parameter 
    orm.all("burgers", function(result) {
     //result is cb'ed here*
     //and cb passes back through 
     //to get request function* 
      cb(result);
    });
  },
  
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("burgers", cols, vals, function(res) {
      cb(res);
    });
  },

  update: function(objColVals, condition, cb) {
    orm.update("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;