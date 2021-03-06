const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/books", (req, res, next) => {
  Book.find({})
    .then(bookDocuments => {
      // we need to render in the `.then()` because that is WHEN the bookDocuments are accessible
      res.render("books.hbs", { booksList: bookDocuments });
    })
    .catch(err => {
      next(err);
    });
});

router.get("/books/add", (req, res, next) => {
  // display a form
  res.render("bookAdd.hbs");
});

router.get("/books/:id", (req, res, next) => {
  Book.findById(req.params.id)
    .then(bookDocument => {
      res.render("bookDetails.hbs", bookDocument);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/books", (req, res, next) => {
  // create a book
  Book.create({
    title: req.body.title,
    description: req.body.description,
    rating: req.body.rating,
    author: req.body.author
  })
    .then(createdBook => {
      res.redirect(`/books/${createdBook._id}`);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
