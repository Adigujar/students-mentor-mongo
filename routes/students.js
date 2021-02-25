const express = require("express")
const router = express()

const mongodb = require("mongodb")
const mongoClinet = mongodb.MongoClient;
const dbURL="mongodb+srv://adigujar:12345@cluster0.j3tiw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"



router.get('/students', async(req, res) => {
    try {
        let client = await mongoClinet.connect(dbURL)
        let db = client.db("students-mentor");
        let students =await db.collection("students").find().toArray()
        client.close()
        res.json(students)
    } catch (error) {
        res.json({
            message:"err"})
        
    }
})

router.post('/students-mentor/:id', async(req, res) => {
  try {
      let client = await mongoClinet.connect(dbURL)
      let db = client.db("students-mentor");
      let students =await db.collection("students").findOneAndUpdate({id:parseInt(req.params.id)},{$set:{mentor:req.body.mentor}})
      client.close()
      res.json(students)
  } catch (error) {
      res.json({
          message:"err"})
      
  }
})

router.post('/new-students', async(req, res)=> {
   try {
    let client = await mongoClinet.connect(dbURL)
    let db = client.db("students-mentor");
    let students =await db.collection("students").find().toArray()
    await db.collection("students").insertOne({name:req.body.name,id:students.length + 1})
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