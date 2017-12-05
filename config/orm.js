var connection = require("../config/connection.js");



// Helper function for SQL syntax
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString(); 
}

// Helper function for SQL syntax.
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }

  return arr.toString();
}


// Object for all our SQL statement functions.

var orm = {
  //request(call) all, tableInputs = cats
  all: function(tableInput, cb) {
    //create a query string to select all from tableInput
    var queryString = "SELECT * FROM " + tableInput + ";";


    //connnect to sql
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      //res actions = *
      //callback, is the response for the request.*
      //calling-back result.and passing it
      // back through the function to orm.all
      // function on cat.js *
      cb(result);
    });
  },

  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    // burger_name, devoured
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    //the name entered in the form
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

// Export the orm object for the model (burger.js).
module.exports = orm;