async function addStudent(e) {
  e.preventDefault();
  const id = document.getElementById('student-id').value;
  const name = document.getElementById('student-name').value;
  const email = document.getElementById('student-email').value;
  const phone = document.getElementById('student-number').value
  const department = document.getElementById('student-department').value;
  const cgpa = document.getElementById('student-cgpa').value;
  const skills = document.getElementById('student-skills').value;
   


  try {
    const response = await fetch("/students", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({id,name,email,phone,department,cgpa,skills}),
    });

    const result = await response.json();
    if (result.status === 'success') {
      alert("Student added successfully");
      setTimeout(() => {
        window.location.href = "student.html";
      }, 1200);
    } else {
      throw new Error("failed to add ");
    }
  } catch (err) {
    alert(err);
  }
}
