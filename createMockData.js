var fs = require('fs')
function getRandomString(length) {
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for ( let i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}
function makeid() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (let i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}
function makeRandomPhoneNum(){
    let phNum = ''
    let combination = '0123456789'
    for(let i = 0 ; i < 10 ; i++){
        phNum += combination.charAt(Math.floor(Math.random()*combination.length)) 
    }
    return phNum
}
function randomStatus(statuses){
    return statuses[Math.floor(Math.random()*3)]
}
  
const mockData = Array.from({length:100},()=>{
    return {
    providerid:makeid(),
    providername:getRandomString(10),
    providergroupid:makeid(),
    providergroup:getRandomString(6),
    providerphone:makeRandomPhoneNum(),
    level1status:randomStatus(['In Progress','Waiting','Confirmed']),
    categoryofclosedcharts:randomStatus(['<5','<10','0','<20']) ,
    chartsopen:Math.floor(Math.random()*10)
    }
})
fs.writeFileSync('./data/tableData.json',JSON.stringify(mockData),(err)=>{
    if(err) throw err;
    console.log('*******'+'Data Created SuccessFully'+'*********')
})

console.log(mockData)