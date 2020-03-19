const Sequelize = require("sequelize");
const db = require("./database");
const Coffee = require("./coffee.model");

const Pug = db.define("pugs", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.REAL,
    defaultValue: 0
  },
  biography: Sequelize.TEXT
});

Pug.beforeSave(pug => {
  let { name } = pug;
  pug.name = name.charAt(0).toUpperCase() + name.slice(1);
});

Pug.findByCoffee = async function(coffeeName) {
  try {
    const foundPug = await Pug.findAll({
      include: [
        {
          model: Coffee,
          as: "favoriteCoffee",
          where: {
            name: coffeeName
          }
        }
      ]
    });

    return foundPug;
  } catch (err) {
    console.log(err);
  }
};

Pug.prototype.setFavoriteCoffee = function(coffee) {
  this.favoriteCoffeeId = coffee.id;
};

Pug.prototype.isPuppy = function() {
  return this.age < 1 ? true : false;
};

Pug.prototype.shortBio = function() {
  const periodIndex = this.biography.indexOf(".");
  const exclaimIndex = this.biography.indexOf("!");
  const questionIndex = this.biography.indexOf("?");

  const symMap = [periodIndex, exclaimIndex, questionIndex];

  const existingSymbolIndexes = symMap.filter(num => num !== -1);

  return this.biography.slice(0, Math.min(...existingSymbolIndexes));
};

module.exports = Pug;
