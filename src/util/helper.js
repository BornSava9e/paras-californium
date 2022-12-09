
    function printDate(){
    let dt = new Date()
    console.log(`Today's date is ${dt}`)
}


{
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function printMonth(){
const d = new Date();
let name = month[d.getMonth()];
console.log(`Month is ${name}`)
}

}

{
    function getBatchInfo(){
        console.log("Californium, W3D4, The topic for today is Nodejs module system");
    }
}

module.exports.printDate = printDate
module.exports.printMonth = printMonth
module.exports.getBatchInfo = getBatchInfo