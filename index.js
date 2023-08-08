import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));



// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.locals.getCurrentDate = () => {
  const now = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  return now.toLocaleDateString(undefined, options);
};



let items = [];
let workItems = []

app.use(bodyParser.urlencoded({ extended: true }));

// Main To-do & submit
app.get("/", (req, res) => {
  res.render("index.ejs", { items });
});

app.post("/submit-main", (req, res) => {
  const newItem = req.body.newItem;
  if (newItem) {
    items.push(newItem);
  }
  res.redirect("/");
});

// Work To-do list  & submit
app.get("/work", (req, res) => {
  res.render("work.ejs", { workItems });
});

app.post("/submit-work", (req, res) => {
  const newItem = req.body.newItem;
  if (newItem) {
    workItems.push(newItem);
  }
  res.redirect("/work");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
