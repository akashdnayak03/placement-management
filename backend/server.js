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
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log(result);

    res.json(result);
  });
});

app.delete("/students/:id", (req, res) => {
  const stdid = req.params.id;
  const query = "DELETE FROM students WHERE id = ?";
  console.log(stdid);
  db.query(query, [stdid], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      console.log("err2");
      return res.status(404).json({ message: "No student Found" });
    }
    res.json({ status: "succuss", message: "deleted successfully" });
  });
});

app.post("/students", (req, res) => {
  const { id, name, email, phone, department, cgpa, skills } = req.body;
  console.log(req.body);
  if (!id || !name || !email) {
    res.status(400).json({ message: "required Name,id and email" });
    return;
  }
  const query =
    "insert into students (student_id,name,email,phone,department,cgpa,skills) values (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [id, name, email, phone, department, cgpa, skills],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ status: "success", message: "Student added successfully" });
    }
  );
});

app.get("/companies", (req, res) => {
  const query = `select * from companies order by created_at desc`;
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.delete("/companies/:id", (req, res) => {
  const compid = req.params.id;
  const query = `DELETE FROM companies WHERE id = ${compid}`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      console.log("err2");
      return res.status(404).json({ message: "No company Found" });
    }

    res.json({ status: "succuss", message: "deleted successfully" });
  });
});

app.post("/companies", (req, res) => {
  const { name, email, phone, industry, website } = req.body;
  console.log(req.body);
  if (!name || !email) {
    res.status(400).json({ message: "required Name and email" });
    return;
  }
  const query = "insert into companies (name,email,phone,industry,website) values (?, ?, ?, ?, ?)";
  db.query(query, [name, email, phone, industry, website], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ status: "success", message: "Company added successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
