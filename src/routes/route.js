const express = require('express');
const router = express.Router();
const intro = require('./introduction')
const employee = require('./employee')
const _ = require('underscore')
const load = require('lodash')
const logger1 = require('../logger/logger')
const util1 = require('../util/helper')
const validator = require('../validator/formatter')

router.get('/test-me', function (req, res) {
    console.log("email from introduction module", intro.myEmail)
    intro.myFunction('Sabiha')
    console.log("email from employee module", employee.myEmail)

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let result = _.first(days, 4)
    console.log(`Result from underscore function is ${result}`)

    logger1.welcome("Paras");
    util1.printDate();
    util1.printMonth();
    util1.getBatchInfo();
    console.log(validator.clearWhiteSpace("                 Hello                    "))
    console.log(validator.lwrCase("FunCTioNuP"));
    console.log(validator.uprCase("FunctionUp"));
    
    let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    console.log(_.chunk(month, 4))

    let num = [1,3,5,7,9,11,13,15,17,19]
    console.log(load.tail(num))

    let arr1 = [1,2,3]
    let arr2 = [4,2,5]
    let arr3 = [7,6,3]
    let arr4 = [1,8,9]
    let arr5 = [1,2,10]

    console.log(load.union(arr1,arr2,arr3,arr4,arr5))

    const array1 = [ ["horror","The Shinning"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labrinth"] ]
    let result1 = load.fromPairs(array1)
    console.log(result1)

    res.send('any dummy text')
});


router.get('/test-you', function(req, res){
    console.log("I am here")
    res.send("very important text")
})


module.exports = router;