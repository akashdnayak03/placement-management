async function submitCompanyForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const industry = document.getElementById("industry").value.trim();
  const website = document.getElementById("website").value.trim();

  if (!name || !email) {
    alert("Name and Email are required fields.");
    return;
  }

  try {
    const response = await fetch("/companies", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email, phone, industry, website }),
    });

    const result = await response.json();

    if (result.status === "success") {
      alert("Company added successfully!");
      window.location.href = "compaines.html";
    } else {
      alert(result.message || "Failed to add company.");
    }
  } catch (err) {
    alert(err.message);
  }
}

if (document.getElementById("companyForm")) {
  document.getElementById("companyForm").addEventListener("submit",submitCompanyForm );
}
