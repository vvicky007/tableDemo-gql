const db = require('./db')
const fs = require('fs')

const Query = {
  job:(root,{id})=>db.jobs.get(id),
  jobs:()=> db.jobs.list(),
  company:(root,{id})=>db.companies.get(id),
  tableData:(root,{start,end})=>{
   let result = [...db.tableData.list()]
   if( end+1 < result.length){
    return result.slice(start,end+1)
   }
   else{
     return result.slice(start)
   }
  },
  notes:async ()=>{
    console.log('....')
    const res = fs.readFileSync('./data/notesData.json','utf-8')
    console.log('res',res)
    if(res){
      const temp =  await JSON.parse(res)
      const temp2 =  await JSON.parse(temp)
      console.log('temp2 is',temp2)
      return temp2;
    }
    return []
  }
}
const Mutation = {
  createJobPost:(root,{input},user)=>{
    
    if(!user){
      throw new Error('Un Authorized Access')
    }
    
    const id = db.jobs.create({...input,companyId:user.companyId})
    return db.jobs.get(id)
  },
  createNotes:async (root,{input})=>{
    const data = JSON.stringify(input)
    fs.writeFileSync('./data/notesData.json',JSON.stringify(data),'utf-8')
    // const res = fs.readFileSync('./data/notesData.json','utf-8')
    const res = fs.readFileSync('./data/notesData.json')
    const temp =  JSON.parse(res)
    const temp2 =  JSON.parse(temp)
    return temp2;
  }
}
const Job = {
  // we are writing company resolver Job cause it has to be resolved for Job type
  company:(job)=>db.companies.get(job.companyId)
}
const Company = {
  jobs:(company)=>db.jobs.list().filter((j)=>j.companyId === company.id)
}
module.exports = {
  Query,Job,Company,Mutation
}