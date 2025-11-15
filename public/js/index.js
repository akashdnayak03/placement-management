const API_BASE_URL = 'http://localhost:3000';

async function fetchStats() {
    try{
        const response = await fetch(`/stats`);
        const result = await response.json();
        
        console.log(result.total_Students)

        document.getElementById('total-students').textContent = result.total_students;
        document.getElementById('total-companies').textContent = result.total_companies;
        document.getElementById('total-placement').textContent = result.total_placements;
        document.getElementById('interviews').textContent = result.interview;
        document.getElementById('applied').textContent = result.applied;
        document.getElementById('selected-students').textContent = result.selected;
        document.getElementById('rejected').textContent= result.rejected;
    }
    catch (error) {
           alert(error.message);
    }

}

document.addEventListener('DOMContentLoaded', fetchStats);

fetchStats();