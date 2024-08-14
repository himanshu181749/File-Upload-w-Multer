const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route to render the form
app.get('/', (req, res) => {
  res.render('home');
});

// Route to handle the form submission
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.body, req.file);
  res.send(
    `File uploaded successfully! <a href="/images/${req.file.filename}">View Image</a>`
  );
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
