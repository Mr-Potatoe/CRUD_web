# CRUD Website with Node.js, Express, and MySQL

This project demonstrates a simple CRUD (Create, Read, Update, Delete) application using Node.js, Express, and MySQL. It includes a basic setup to manage users in a MySQL database.

## Project Structure

```
crud-web/
│
├── node_modules/             // Installed Node.js modules (auto-generated by npm)
│
├── public/                   // Publicly accessible files
│   ├── index.html            // Main HTML file
│   ├── index.js              // Main JavaScript file for client-side code
│   └── styles.css            // Main CSS file for styling
│                 
│── db_connection.js          // Database connection setup
│
├── server.js                 // Main server file, sets up Express app and routes
│
├── .env                      // Environment variables (for sensitive data)
│
├── .gitignore                // Specifies files/folders to ignore in Git
│
└── package.json              // Project metadata and dependencies

```

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- [MySQL](https://www.mysql.com/) (or [MariaDB](https://mariadb.org/))

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd crud-website
   ```

2. **Install dependencies:**

   Make sure you are in the project directory and run:

   ```bash
   npm install
   ```

3. **Configure the environment variables:**

   Create a `.env` file in the root of the project and add your MySQL configuration. Here’s a sample `.env` file:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=testdb
   PORT=3000
   ```

   **Note:** Make sure to replace `yourpassword` with your actual MySQL password.

4. **Set up the MySQL database:**

   - Start your MySQL server.
   - Create the database and table by running the following SQL commands in your MySQL client:

     ```sql
     CREATE DATABASE activity_03;
     USE activity_03;

     CREATE TABLE students (
         id INT AUTO_INCREMENT PRIMARY KEY,
         student_id VARCHAR(255) NOT NULL,
         name VARCHAR(255) NOT NULL,
         program VARCHAR(255) NOT NULL,
         Year Level VARCHAR(255) NOT NULL

     );
     ```

### Running the Server

To start the server, run:

```bash
node server.js
```

The server will start on port 3000 (or the port specified in your `.env` file).

### API Endpoints

- **Create a User**
  - **Endpoint:** `POST /users`
  - **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
    ```
  - **Response:** `User created with ID: <id>`

- **Read All Users**
  - **Endpoint:** `GET /users`
  - **Response:** Array of user objects

- **Read a Single User**
  - **Endpoint:** `GET /users/:id`
  - **Response:** User object with the specified ID

- **Update a User**
  - **Endpoint:** `PUT /users/:id`
  - **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@newdomain.com"
    }
    ```
  - **Response:** `User updated successfully`

- **Delete a User**
  - **Endpoint:** `DELETE /users/:id`
  - **Response:** `User deleted successfully`

### Notes

- Make sure MySQL is running and accessible with the credentials provided in the `.env` file.
- Use tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to test the API endpoints.
- If you encounter any issues, check the console logs for error messages.

## Contributing

Feel free to fork the repository, make changes, and submit pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy coding!