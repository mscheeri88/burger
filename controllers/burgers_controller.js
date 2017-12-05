var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");


// Create all our routes and set up logic within those routes where required.

//default url route
router.get("/", function(req, res) {
  //requests the cat.all function
// res.send('yoo')
  // responds, with the data from result*
  burger.all(function(data) {
  
  //need to turn the data into an object for handlebars to work
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
   
   // renders the hbsObject to the index.handlebars page    
     res.render("index", hbsObject);
  });
});


//to create a new burger entered in the form input
router.post("/", function(req, res) {

  burger.create([
   //this will be the cols
    "burger_name", "devoured"
  ], [
    //and this vals for the cols3
    req.body.burger_name, req.body.devoured
  ], function() {
    res.redirect("/");
  });
});


//this router is for udating if devoured or not
router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function() {
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;