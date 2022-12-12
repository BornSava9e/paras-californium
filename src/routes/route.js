const express = require('express');
const router = express.Router();
const intro = require('./introduction')
const employee = require('./employee')
const _ = require('underscore')
const load = require('lodash')
const logger1 = require('../logger/logger')
const util1 = require('../util/helper')
const validator = require('../validator/formatter')
const missNum = require("../../get-api/findnum")
router.get('/test-me', function (req, res) {
    console.log("email from introduction module", intro.myEmail)
    intro.myFunction('Sabiha')
    console.log("email from employee module", employee.myEmail)

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let result = _.first(days, 4)
    console.log(`Result from underscore function is ${result}`)

    // logger1.welcome("Paras");
    // util1.printDate();
    // util1.printMonth();
    // util1.getBatchInfo();
    // console.log(validator.clearWhiteSpace("                 Hello                    "))
    // console.log(validator.lwrCase("FunCTioNuP"));
    // console.log(validator.uprCase("FunctionUp"));
    
    // let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    // console.log(load.chunk(month, 4))

    // let num = [1,3,5,7,9,11,13,15,17,19]
    // console.log(load.tail(num))

    // let arr1 = [1,2,3]
    // let arr2 = [4,2,5]
    // let arr3 = [7,6,3]
    // let arr4 = [1,8,9]
    // let arr5 = [1,2,10]

    // console.log(load.union(arr1,arr2,arr3,arr4,arr5))

    // const array1 = [ ["horror","The Shinning"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labrinth"] ]
    // let result1 = load.fromPairs(array1)
    // console.log(result1)

    const movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]

    res.send(movies)
});

// 2 question

router.get('/movies/:indexNumber', function(req, res){
    const movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    let a = movies[req.params.indexNumber]
    res.send(a)
})
 //3 question
router.get('/movie/:indexNum1', function(req, res){
    const movies = ["Top gun Maverick","Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    let a = req.params.indexNum1
    let javi = movies[a]
    if(a<=movies.length-1){
        return res.send(javi)
    }else{
    res.send("please use a valid number")
    }
})
//4 question
router.get('/films', function(req, res){
    let movie = [{id: 1, name:"The shining"},
    {id: 2, name:"Incendies"},
    {id: 3, name:"Rang de Basanti"},
    {id: 4, name:"Finding Nemo"}
    ]
    res.send(movie)
})
//5 question
router.get('/films/:filmId', function(req, res){
   let i = req.params.filmId    
        let arrr = [{id: 1, name:"The shining"},
        {id: 2, name:"Incendies"},
        {id: 3, name:"Rang de Basanti"},
        {id: 4, name:"Finding Nemo"}
        ]

        for(let j = 0; j<arrr.length; j++){
            if(i==arrr[j].id){
                return res.send(arrr[j])
            }
        }
    res.send("No movie exists with this id")
})


router.get('/test-you', function(req, res){
    console.log("I am here")
    res.send("very important text")
})
// sol1
router.get('/sol1', function(req, res){
    let arr = [1,2,3,5,6,7]
    res.send(missNum.findMissingNumber(arr))
})
//sol2
router.get('/sol2', function(req, res){
    let arr2 = [33,34,35,37,38]
    res.send(missNum.findMissingNumber(arr2))
})


module.exports = router;