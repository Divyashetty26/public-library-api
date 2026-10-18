const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Public Library API is running" });
});

let books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        available: true
    }
];
let members = [
    {
        id: 1,
        name: "Rahul Kumar",
        email: "rahul@example.com",
        phone: "9876543210"
    }
];
let borrowings = [];
app.get("/borrowings", (req, res) => {
    res.json(borrowings);
});
app.post("/borrowings", (req, res) => {
    const book = books.find(b => b.id == req.body.bookId);
    const member = members.find(m => m.id == req.body.memberId);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (!member) {
        return res.status(404).json({ message: "Member not found" });
    }

    if (!book.available) {
        return res.status(400).json({ message: "Book is not available" });
    }

    const newBorrowing = {
        id: borrowings.length + 1,
        bookId: req.body.bookId,
        memberId: req.body.memberId,
        borrowDate: req.body.borrowDate,
        returnDate: null,
        status: "Borrowed"
    };

    borrowings.push(newBorrowing);

    book.available = false;

    res.status(201).json(newBorrowing);
});
app.get("/borrowings/:id", (req, res) => {
    const borrowing = borrowings.find(b => b.id == req.params.id);

    if (!borrowing) {
        return res.status(404).json({ message: "Borrowing not found" });
    }

    res.json(borrowing);
});
app.put("/borrowings/:id", (req, res) => {
    const borrowing = borrowings.find(b => b.id == req.params.id);

    if (!borrowing) {
        return res.status(404).json({ message: "Borrowing not found" });
    }

    borrowing.returnDate = req.body.returnDate;
    borrowing.status = "Returned";

    const book = books.find(b => b.id == borrowing.bookId);

    if (book) {
        book.available = true;
    }

    res.json(borrowing);
});

app.delete("/borrowings/:id", (req, res) => {
    const index = borrowings.findIndex(
        b => b.id == req.params.id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Borrowing not found"
        });
    }

    const deletedBorrowing = borrowings.splice(index, 1)[0];

    const book = books.find(
        b => b.id == deletedBorrowing.bookId
    );

    if (book && deletedBorrowing.status === "Borrowed") {
        book.available = true;
    }

    res.json({
        message: "Borrowing deleted successfully",
        borrowing: deletedBorrowing
    });
});

app.get("/books", (req, res) => {
    res.json(books);
});
app.get("/members", (req, res) => {
    res.json(members);
});
app.post("/members", (req, res) => {
    const newMember = {
        id: members.length + 1,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    };

    members.push(newMember);

    res.status(201).json(newMember);
});
app.get("/members/:id", (req, res) => {
    const member = members.find(m => m.id == req.params.id);

    if (!member) {
        return res.status(404).json({ message: "Member not found" });
    }

    res.json(member);
});
app.put("/members/:id", (req, res) => {
    const member = members.find(m => m.id == req.params.id);

    if (!member) {
        return res.status(404).json({ message: "Member not found" });
    }

    member.name = req.body.name;
    member.email = req.body.email;
    member.phone = req.body.phone;

    res.json(member);
});
app.delete("/members/:id", (req, res) => {
    const index = members.findIndex(m => m.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Member not found" });
    }

    const deletedMember = members.splice(index, 1);

    res.json({
        message: "Member deleted successfully",
        member: deletedMember[0]
    });
});
app.post("/books", (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        available: req.body.available
    };

    books.push(newBook);

    res.status(201).json(newBook);
});
app.get("/books/:id", (req, res) => {
    const book = books.find(b => b.id == req.params.id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
});
app.put("/books/:id", (req, res) => {
    const book = books.find(b => b.id == req.params.id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    book.title = req.body.title;
    book.author = req.body.author;
    book.category = req.body.category;
    book.available = req.body.available;

    res.json(book);
});
app.delete("/books/:id", (req, res) => {
    const index = books.findIndex(b => b.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = books.splice(index, 1);

    res.json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});