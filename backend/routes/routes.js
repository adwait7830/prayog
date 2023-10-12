const express = require("express");
const router = express.Router();

router.route("/").post((req, res) => {
    console.log("Data: ", req.body);
    res.json({"message" : "Hello , this is Post!"});
}); 


module.exports = router;