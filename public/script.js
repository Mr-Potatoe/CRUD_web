document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('addStudentForm');
    const editForm = document.getElementById('editStudentForm');
    const studentsList = document.getElementById('studentsList');
    const editCard = document.getElementById('editStudentCard');
    const cancelEditButton = document.getElementById('cancelEdit');

    let editingStudentId = null;

    // Function to fetch and display all students in a table
    const fetchStudents = async () => {
        try {
            const response = await fetch('/students');
            const data = await response.json();
            studentsList.innerHTML = data.map(student => `
                <tr>
                    <td style="text-align: center">${student.student_id}</td>
                    <td  style="text-align: center">${student.name}</td>
                    <td  style="text-align: center">${student.program}</td>
                    <td  style="text-align: center">${student.year_level}</td>
                    <td  style="text-align: center">
                        <button style="margin-right: 5px; border-radius: 5px; background-color: black" onclick="editStudent(${student.id})">Edit</button>
                        <button style="margin-right: 5px; border-radius: 5px;  background-color: red" onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    // Function to add a new student
    addForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(addForm);
        const data = {
            student_id: formData.get('student_id'),
            name: formData.get('name'),
            program: formData.get('program'),
            year_level: formData.get('year_level')
        };

        try {
            const response = await fetch('/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert('Student added successfully!');
                addForm.reset();
                fetchStudents(); // Refresh the student list
            } else {
                alert('Error adding student.');
            }
        } catch (error) {
            console.error('Error adding student:', error);
        }
    });

    // Function to delete a student
    window.deleteStudent = async (id) => {
        try {
            const response = await fetch(`/students/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('Student deleted successfully!');
                fetchStudents(); // Refresh the student list
            } else {
                alert('Error deleting student.');
            }
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    // Function to edit a student
    window.editStudent = async (id) => {
        try {
            const response = await fetch(`/students/${id}`);
            const student = await response.json();
            editingStudentId = id;
            document.getElementById('edit_student_id').value = student.student_id;
            document.getElementById('edit_name').value = student.name;
            document.getElementById('edit_program').value = student.program;
            document.getElementById('edit_year_level').value = student.year_level;
            editCard.style.display = 'block';
        } catch (error) {
            console.error('Error fetching student for edit:', error);
        }
    };

    // Function to update a student
    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(editForm);
        const data = {
            student_id: formData.get('edit_student_id'),
            name: formData.get('edit_name'),
            program: formData.get('edit_program'),
            year_level: formData.get('edit_year_level')
        };

        try {
            const response = await fetch(`/students/${editingStudentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert('Student updated successfully!');
                editCard.style.display = 'none';
                fetchStudents(); // Refresh the student list
            } else {
                alert('Error updating student.');
            }
        } catch (error) {
            console.error('Error updating student:', error);
        }
    });

    // Function to cancel editing
    cancelEditButton.addEventListener('click', () => {
        editCard.style.display = 'none';
    });

    fetchStudents(); // Initial fetch
});
