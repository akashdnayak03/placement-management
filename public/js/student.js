async function loadStudent() {
  try {
    const tbody = document.getElementById("studentTablebody");
    const nostudent = document.getElementById("nosyudents");

    const response = await fetch("/students");
    const students = await response.json();

    if (tbody && students.length > 0) {
      tbody.innerHTML = students
        .map(
          (student) => `
            <tr>
                  <td>${student.student_id}</td>
                  <td>${student.name}</td>
                  <td>${student.email}</td>
                  <td>${student.department || "-"}</td>
                  <td>${student.cgpa || "-"}</td>
                  <td class='table-actions'>
                     <a href='student-details.html?id=${
                       student.id
                     }' class='btn btn-outline-primary'>
                         <i class='fas fa-eye me-1'>
                         </i>
                     </a>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteStudent(${
                      student.id
                    }, '${student.name}')">
                            <i class="fas fa-trash me-1"></i>Delete
                        </button>
                  </td>
                  
            </tr>
            `
        )
        .join("");
    } else {
      nostudent.style.display = "block";
    }
  } catch (err) {
    alert(err.message);
  }
}

async function deleteStudent(id, name) {
  if (confirm(`Do yo want to delete ${name}`)) {
    try {
      const response = await fetch(`/students/${id}`, {
        method: "delete",
      });
      const res = await response.json();

      if (res.status === "succuss") {
        alert(`${name} deleted `);
        loadStudent();
      } else {
        throw new Error(res.message || "failed to delete");
      }
    } catch (err) {
      alert(err.message);
    }
  }
}

document.addEventListener("DOMContentLoaded", loadStudent);
