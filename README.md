# Public Library REST API

## Project Description

The Public Library REST API is a backend application developed using Node.js and Express.js. It manages books, library members, and borrowing records through REST API endpoints.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- Postman for API testing

## Features

- Manage books: create, view, update, and delete books.
- Manage members: register, view, update, and delete members.
- Manage borrowing records.
- Check whether a book is available before borrowing.
- Update book availability when a book is borrowed or returned.
- Handle requests for records that do not exist.

## Project Structure

```text
public-library-api/
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Install dependencies

Make sure Node.js and npm are installed.

Open the project folder in the terminal and run:

```bash
npm install
```

### 2. Start the server

Run:

```bash
node server.js
```

The server runs on port 3000.

### 3. Test the API

Open the following URL in a browser:

`http://localhost:3000/`

Expected response:

```json
{
  "message": "Public Library API is running"
}
```

## API Endpoints

### Books

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get a book by ID |
| POST | `/books` | Add a book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

### Members

| Method | Endpoint | Description |
|---|---|---|
| GET | `/members` | Get all members |
| GET | `/members/:id` | Get a member by ID |
| POST | `/members` | Add a member |
| PUT | `/members/:id` | Update a member |
| DELETE | `/members/:id` | Delete a member |

### Borrowing Records

| Method | Endpoint | Description |
|---|---|---|
| GET | `/borrowings` | Get all borrowing records |
| GET | `/borrowings/:id` | Get a borrowing record by ID |
| POST | `/borrowings` | Create a borrowing record |
| PUT | `/borrowings/:id` | Return a borrowed book |
| DELETE | `/borrowings/:id` | Delete a borrowing record |

## Sample Request

To add a book, send a POST request to:

`http://localhost:3000/books`

Select Body → raw → JSON in Postman and use:

```json
{
  "title": "Wings of Fire",
  "author": "A. P. J. Abdul Kalam",
  "category": "Biography",
  "available": true
}
```

## Data Storage

This version stores books, members, and borrowing records in JavaScript arrays in memory. The data resets when the server restarts.

## Testing

API endpoints can be tested using Postman with GET, POST, PUT, and DELETE requests.

## Author

Developed as part of a laboratory assignment on REST API development using Node.js and Express.js.