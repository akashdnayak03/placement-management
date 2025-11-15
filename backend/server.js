const express = require("express");
const cours = require("cors");
const path = require("path");
const PORT = 3000;

const app = express();
const db = require("./db");

app.use(cours());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/stats", (req, res) => {
  const query = `select count(*) as total_placements,
                   count(case when status = 'Selected' then 1 end) as selected,
                   count(case when status = 'Applied' then 1 end) as applied,
                   count(case when status = 'Interview' then 1 end) as interview,
                   count(case when status = 'Rejected' then 1 end) as rejected
                   from placements`;
  db.query(query, (err, statResult) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }

    db.query(
      "select count(*) as totalStudents from students",
      (err, studentResult) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: err.message });
        }

        db.query(
          "select count(*) as totalCompanies from companies",
          (err, companiResult) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ error: err.message });
            }

            res.json({
              total_placements: statResult[0].total_placements,
              selected: statResult[0].selected,
              applied: statResult[0].applied,
              interview: statResult[0].interview,
              rejected: statResult[0].rejected,
              total_companies: companiResult[0].totalCompanies,
              total_students: studentResult[0].totalStudents,
            });
          }
        );
      }
    );
  });
});

app.get("/students", (req, res) => {
  const query = `select * from students order by created_at desc`;
  db.query(query, (err, result) => {
    if (err){ return res.status(500).json({ error: err.message });}
   console.log(result) 
  
  res.json(result)  ;
    
  });
});

app.delete('/students/:id',(req,res)=>{
  const stdid = req.params.id;
const query = 'DELETE FROM students WHERE id = ?';
 console.log(stdid)
  db.query(query,[stdid],(err,result)=>{
    if(err){
       console.log(err.message);
      return res.status(500).json({error : err.message});
    }
    if(result.affectedRows === 0){
       console.log('err2');
      return res.status(404).json({ message:'No student Found'});
    }
    res.json({status:'succuss', message:'deleted successfully'});
  })
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
