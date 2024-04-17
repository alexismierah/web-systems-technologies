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
                // Here you can implement editing functionality if needed
                console.log('Edit action clicked for row:', row);
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
