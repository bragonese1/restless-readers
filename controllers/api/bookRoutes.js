const router = require('express').Router();
const { Book } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all books
router.get('/', async (req, res) => {
  try {
    const bookData = await Book.findAll();

    if (!bookData) {
      res.status(404).json({ message: 'No books found' });
      return;
    }

    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Submit a new book
router.post('/', withAuth, async (req, res) => {
  try {
    const newBook = await Book.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBook);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get a specific book
router.get('/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {});

    if (!bookData) {
      res.status(404).json({ message: 'No book with this id!' });
      return;
    }

    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a specific book
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [updatedRowCount] = await Book.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!updatedRowCount) {
      res.status(404).json({ message: 'No book found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Book updated successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a specific book
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [deletedRowCount] = await Book.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletedRowCount) {
      res.status(404).json({ message: 'No book found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Book deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
