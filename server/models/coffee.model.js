const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("./database");

const Coffee = db.define("coffee", {
  // your code here
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: []
  }
});

Coffee.beforeValidate(coffee => {
  if (!coffee.ingredients.includes("love")) {
    coffee.ingredients = [...coffee.ingredients, "love"];
  }
});

Coffee.findByIngredient = async function(ingredient) {
  return await Coffee.findAll({
    where: {
      ingredients: {
        [Op.contains]: [ingredient]
      }
    }
  });
};

Coffee.prototype.getIngredients = function() {
  return this.ingredients.join(", ");
};

module.exports = Coffee;
