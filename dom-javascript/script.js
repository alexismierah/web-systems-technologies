// script.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');
    const tableBody = document.querySelector('tbody');

    // Event listener for form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
        const nameInput = document.querySelector('input[type="text"]');
        const emailInput = document.querySelector('input[type="email"]');
        const roleSelect = document.getElementById('countries');

        // Check for empty fields
        if (nameInput.value.trim() === '' || emailInput.value.trim() === '') {
            alert('Please fill out all fields.');
            return;
        }

        // Call appendValues function if validation passes
        appendValues(nameInput.value, emailInput.value, roleSelect.value);
        // Clear the form inputs
        nameInput.value = '';
        emailInput.value = '';
    });

    // Event listener for actions on table rows
    tableBody.addEventListener('click', function (event) {
        if (event.target.tagName === 'I') { // If the clicked element is an icon
            const row = event.target.closest('tr');
            const action = event.target.classList.contains('fa-trash-alt') ? 'delete' : 'edit';

            if (action === 'delete') {
                row.remove(); // Remove the row from the table
            } else if (action === 'edit') {
                // Call editRow function to handle editing
                editRow(row);
            }
        }
    });
});

// Function to append values to the table
function appendValues(name, email, role) {
    const tableBody = document.querySelector('tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td class="border p-2">${tableBody.children.length + 1}</td>
        <td class="border p-2">${name}</td>
        <td class="border p-2">${email}</td>
        <td class="border p-2">${role}</td>
        <td class="border p-2">
            <button class="text-blue-500 p-1"><i class="fas fa-edit"></i></button>
            <button class="text-red-500 p-1"><i class="fas fa-trash-alt"></i></button>
        </td>
    `;
    tableBody.appendChild(newRow);
}

// Function to handle editing of table row
function editRow(row) {
    const name = row.cells[1].innerText; // Get name from the table cell
    const email = row.cells[2].innerText; // Get email from the table cell
    const role = row.cells[3].innerText; // Get role from the table cell

    // Populate the form fields with the row data
    document.querySelector('input[type="text"]').value = name;
    document.querySelector('input[type="email"]').value = email;
    document.getElementById('countries').value = role;

    // Remove the row from the table
    row.remove();
}
