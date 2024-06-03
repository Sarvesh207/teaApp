const { json } = require("body-parser");
const express = require("express");

const app = express();
app.use(express.json());

const port = 8000;

const teasData = [
  {
    id: 0,
    name: "gingerTea",
    price: "200",
  },
  {
    id: 1,
    name: "leamonTea",
    price: "200",
  },
  {
    id: 2,
    name: "iceTea",
    price: "200",
  },
];
let id = 0;

console.log(teasData);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/teas", (req, res) => {

  res.send(teasData);
});

app.get("/teas/:id", (req, res) => {


  let foundTea = teasData.find((t) => t.id === parseInt(req.params.id));

  if (!foundTea) {
    res.status(404).send("Item not found");
  }
  res.status(200).json(foundTea);
});

app.post("/teas", (req, res) => {

  const { name, price } = req.body;

  const newItem = { id: id++, name, price };
  teasData.push(newItem);
  res.status(200).send(teasData);
});

app.put("/teas/:id", (req, res) => {
    let tea = teasData.find((t) => t.id === parseInt(req.params.id));

    if (!tea) {
        return res.status(404).send("Tea not found");
    }

    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;

    return res.status(200).json(tea);
});

app.delete("/teas/:id", (req, res) => {
  console.log("I am working from delete tea route")

  const idx = teasData.findIndex((t) => t.id === parseInt(req.params.id));

  if (!idx) {
    return res.status(404).send("tea not found");
  }

  teasData.splice(idx, 1);

  return res.status(203).send("iteam deleted");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
