const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Candy = sequelize.define("candy", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  candyName: Sequelize.STRING,
  description: Sequelize.STRING,
  price: Sequelize.FLOAT,
  quantity: Sequelize.INTEGER,
});

// Add the updateQuantity function
Candy.updateQuantity = async (id, quantity) => {
  try {
    const candy = await Candy.findByPk(id);
    if (candy) {
      if (candy.quantity >= quantity) {
        candy.quantity -= quantity;
        await candy.save();
        return candy;
      } else {
        return null; // Return null if quantity is not enough
      }
    }
    return null;
  } catch (error) {
    throw error;
  }
};

module.exports = Candy;
