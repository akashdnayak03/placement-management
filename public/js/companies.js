async function loadCompanies() {
  try {
    const response = await fetch("/companies");
    const companies = await response.json();
    console.log(companies);
    const noCompanies = document.getElementById("noCompanies");
    const tableBody = document.getElementById("companiesTableBody");

    if (companies.length != 0 && tableBody) {
      tableBody.innerHTML = companies
        .map(
          (company) => `
                <tr>
                    <td>${company.name}</td>
                    <td>${company.email}</td>
                    <td>${company.industry || "-"}</td>
                    <td>${company.phone || "-"}</td>
                    <td>
                        ${
                          company.website
                            ? `<a href="${company.website}" target="_blank" class="btn btn-sm btn-outline-primary">
                                <i class="fas fa-external-link-alt me-1"></i>Visit
                            </a>`
                            : "-"
                        }
                    </td>
                    <td class="table-actions">
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteCompany(${
                          company.id
                        }, '${company.name}')">
                            <i class="fas fa-trash me-1"></i>Delete
                        </button>
                    </td>
                </tr>
            `
        )
        .join("");
      if (noCompanies) noCompanies.style.display = "none";
    } else if (noCompanies) {
      noCompanies.style.display = "block";
      if (tableBody) tableBody.innerHTML = "";
    }
  } catch (error) {
    console.error("Error loading companies:", error);
  }
}

async function deleteCompany(id, name) {
  if (confirm(`Are you sure you want to delete company "${name}"?`)) {
    try {
      const response = await fetch(`/companies/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.status === "success") {
        showAlert("Company deleted successfully!", "success");
        loadCompanies();
      } else {
        throw new Error(result.message || "Failed to delete company");
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      showAlert("Error: " + error.message, "danger");
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("companiesTableBody")) {
    loadCompanies();
  }

  if (document.getElementById("companyForm")) {
    document
      .getElementById("companyForm")
      .addEventListener("submit", submitCompanyForm);
  }
});
