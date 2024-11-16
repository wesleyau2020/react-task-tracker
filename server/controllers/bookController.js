const Book = require("../models/book");

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  const { title, author } = req.body;
  try {
    const book = await Book.create({ title, author });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const { title, author } = req.body;
  try {
    const [updated] = await Book.update(
      { title, author },
      {
        where: { id: bookId },
      }
    );
    if (updated === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    const updatedBook = await Book.findByPk(bookId);
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  try {
    const deleted = await Book.destroy({
      where: { id: bookId },
    });
    if (deleted === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
