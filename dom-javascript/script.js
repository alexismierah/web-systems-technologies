// script.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('accountForm');
    const tableBody = document.querySelector('#userTable tbody');

    // Event listener for form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const roleSelect = document.getElementById('role');

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
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            const action = target.dataset.action;
            const row = target.closest('tr');
            if (action === 'delete') {
                deleteRow(row);
            } else if (action === 'edit') {
                editRow(row);
            } else if (action === 'save') {
                saveRow(row);
            }
        }
    });
});

// Function to append values to the table
function appendValues(name, email, role) {
    const tableBody = document.querySelector('#userTable tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td class="border p-2">${tableBody.children.length + 1}</td>
        <td class="border p-2">${name}</td>
        <td class="border p-2">${email}</td>
        <td class="border p-2">${role}</td>
        <td class="border p-2">
            <button class="text-blue-500 p-1" data-action="edit"><i class="fas fa-edit"></i></button>
            <button class="text-red-500 p-1" data-action="delete"><i class="fas fa-trash-alt"></i></button>
        </td>
    `;
    tableBody.appendChild(newRow);
}

// Function to handle editing of table row
function editRow(row) {
    const cells = row.cells;
    const name = cells[1].innerText;
    const email = cells[2].innerText;
    const role = cells[3].innerText;

    cells[1].innerHTML = `<input type="text" class="border rounded p-1" value="${name}">`;
    cells[2].innerHTML = `<input type="email" class="border rounded p-1" value="${email}">`;
    cells[3].innerHTML = `<select class="border rounded p-1"><option value="Admin" ${role === 'Admin' ? 'selected' : ''}>Admin</option><option value="User" ${role === 'User' ? 'selected' : ''}>User</option></select>`;

    // Change the action button to "Save"
    const actionsCell = cells[4];
    const editButton = actionsCell.querySelector('button[data-action="edit"]');
    editButton.innerHTML = '<i class="fas fa-save"></i>';
    editButton.dataset.action = 'save';
}

// Function to save edited row
function saveRow(row) {
    const cells = row.cells;
    const name = cells[1].querySelector('input').value;
    const email = cells[2].querySelector('input').value;
    const role = cells[3].querySelector('select').value;

    cells[1].innerHTML = name;
    cells[2].innerHTML = email;
    cells[3].innerHTML = role;

    // Change the action button back to "Edit"
    const actionsCell = cells[4];
    const saveButton = actionsCell.querySelector('button[data-action="save"]');
    saveButton.innerHTML = '<i class="fas fa-edit"></i>';
    saveButton.dataset.action = 'edit';
}

// Function to delete row
function deleteRow(row) {
    row.remove();
}
