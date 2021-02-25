const express = require("express")
const router = express()

const mongodb = require("mongodb")
const mongoClinet = mongodb.MongoClient;
const dbURL="mongodb+srv://adigujar:12345@cluster0.j3tiw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"



router.get('/mentor', async(req, res) => {
    try {
        let client = await mongoClinet.connect(dbURL)
        let db = client.db("students-mentor");
        let mentors =await db.collection("mentors").find().toArray()
        client.close()
        res.json(mentors)
    } catch (error) {
        res.json({
            message:"Someting Went Worng"})
        
    }
})

router.post('/mentors-students/:id', async(req, res) => {
  try {
      let client = await mongoClinet.connect(dbURL)
      let db = client.db("students-mentor");
      let mentor =await db.collection("mentors").findOneAndUpdate({id:parseInt(req.params.id)},{$set:{students:req.body.students}})
      client.close()
      res.json(mentor)
  } catch (error) {
      res.json({
          message:"Someting Went Worng"})
      
  }
})

router.post('/new-mentors', async(req, res)=> {
   try {
    let client = await mongoClinet.connect(dbURL)
    let db = client.db("students-mentor");
    let mentor =await db.collection("mentors").find().toArray()
    await db.collection("mentors").insertOne({name:req.body.name,id:mentor.length + 1})
    client.close();
    res.json({
        message:"succes"
    })
       
   } catch (error) {
    res.json({
        message:"err"})
   }
  });

module.exports = router;