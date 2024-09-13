// Import necessary modules
const express = require('express'); // Import the Express library
const bodyParser = require('body-parser'); // Import body-parser for parsing incoming request bodies
const path = require('path'); // Import path module for resolving file paths
const db = require('./db_connection'); // Import the database connection module
require('dotenv').config(); // Load environment variables from a .env file

// Initialize the Express application
const app = express();
const PORT = process.env.PORT; // Use the PORT from environment variables

// Middleware to parse JSON bodies
app.use(bodyParser.json()); // This middleware will parse incoming requests with JSON payloads

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files like HTML, CSS, and JS from the 'public' directory

// Create a new student
app.post('/students', (req, res) => {
    // Extract fields from the request body
    const { student_id, name, program, year_level } = req.body;

    // SQL query to insert a new student into the database
    const sql = 'INSERT INTO students (student_id, name, program, year_level) VALUES (?, ?, ?, ?)';
    
    // Execute the query
    db.query(sql, [student_id, name, program, year_level], (err, result) => {
        if (err) {
            console.error('Error inserting student:', err); // Log error to the console
            res.status(500).send('Error inserting student'); // Send a 500 error response to the client
            return;
        }
        // Send a success response with the new student's ID
        res.status(201).send(`Student created with ID: ${result.insertId}`);
    });
});

// Read all students
app.get('/students', (req, res) => {
    // SQL query to select all students from the database
    const sql = 'SELECT * FROM students';
    
    // Execute the query
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching students:', err); // Log error to the console
            res.status(500).send('Error fetching students'); // Send a 500 error response to the client
            return;
        }
        // Send the list of students as a JSON response
        res.json(results);
    });
});

// Read a single student by ID
app.get('/students/:id', (req, res) => {
    // Extract the student ID from the request parameters
    const studentId = req.params.id;
    
    // SQL query to select a student by ID
    const sql = 'SELECT * FROM students WHERE id = ?';
    
    // Execute the query
    db.query(sql, [studentId], (err, results) => {
        if (err) {
            console.error('Error fetching student:', err); // Log error to the console
            res.status(500).send('Error fetching student'); // Send a 500 error response to the client
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Student not found'); // Send a 404 response if no student is found with the given ID
            return;
        }
        // Send the student data as a JSON response
        res.json(results[0]);
    });
});

// Update a student by ID
app.put('/students/:id', (req, res) => {
    // Extract the student ID from the request parameters
    const studentId = req.params.id;
    
    // Extract the new data from the request body
    const { student_id, name, program, year_level } = req.body;
    
    // SQL query to update the student's data by ID
    const sql = 'UPDATE students SET student_id = ?, name = ?, program = ?, year_level = ? WHERE id = ?';
    
    // Execute the query
    db.query(sql, [student_id, name, program, year_level, studentId], (err, result) => {
        if (err) {
            console.error('Error updating student:', err); // Log error to the console
            res.status(500).send('Error updating student'); // Send a 500 error response to the client
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Student not found'); // Send a 404 response if no student is found with the given ID
            return;
        }
        // Send a success message
        res.send('Student updated successfully');
    });
});

// Delete a student by ID
app.delete('/students/:id', (req, res) => {
    // Extract the student ID from the request parameters
    const studentId = req.params.id;
    
    // SQL query to delete a student by ID
    const sql = 'DELETE FROM students WHERE id = ?';
    
    // Execute the query
    db.query(sql, [studentId], (err, result) => {
        if (err) {
            console.error('Error deleting student:', err); // Log error to the console
            res.status(500).send('Error deleting student'); // Send a 500 error response to the client
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Student not found'); // Send a 404 response if no student is found with the given ID
            return;
        }
        // Send a success message
        res.send('Student deleted successfully');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log a message to the console when the server starts
});
