const router = require("express").Router();
const { Coffee } = require("../models");

// Your code here!
// Remember that these routes are already mounted on
// /api/coffee!

router.get("/", async (req, res) => {
  try {
    const allCoffee = await Coffee.findAll({ raw: true });
    res.send(allCoffee);
  } catch (err) {
    console.log(err);
  }
});

router.get("/ingredients/:ingredientName", async (req, res) => {
  const { ingredientName } = req.params;
  try {
    const foundCoffee = await Coffee.findByIngredient(ingredientName);
    res.send(foundCoffee);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:coffeeId", async (req, res) => {
  const { coffeeId } = req.params;
  const foundCoffee = await Coffee.findById(coffeeId);

  if (!foundCoffee) res.sendStatus(404);
  else res.send(foundCoffee);
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  const newCoffee = await Coffee.build({ name });
  newCoffee.save();
  res.status(201).send(newCoffee);
});

module.exports = router;
