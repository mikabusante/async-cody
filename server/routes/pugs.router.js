const router = require("express").Router();
const { Pug } = require("../models");

router.get("/", async (req, res) => {
  try {
    const allPugs = await Pug.findAll();
    res.send(allPugs);
  } catch (err) {
    console.log(err);
  }
});

router.get("/favoriteCoffee/:favoriteCoffeeName", async (req, res) => {
  const { favoriteCoffeeName } = req.params;
  try {
    const foundPug = await Pug.findByCoffee(favoriteCoffeeName);
    res.send(foundPug);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:pugId", async (req, res) => {
  const { pugId } = req.params;

  try {
    const foundPug = await Pug.findById(pugId);

    if (!foundPug) res.send(404);
    res.send(foundPug);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  const newPug = await Pug.build({ name }).save();
  res.status(201).send(newPug);
});

router.put("/:pugId", async (req, res) => {
  const { pugId } = req.params;
  const newFavoriteCoffeeId = req.body.favoriteCoffeeId;

  try {
    const foundPug = await Pug.findById(pugId);

    foundPug.favoriteCoffeeId = newFavoriteCoffeeId;
    await foundPug.save();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
