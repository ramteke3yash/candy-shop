const Candy = require("../models/candy");

exports.postCandy = async (req, res, next) => {
  try {
    const candyName = req.body.candyName;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;

    const data = await Candy.create({
      candyName: candyName,
      description: description,
      price: price,
      quantity: quantity,
    });

    res.status(201).json({ newCandyDetail: data });
  } catch (error) {
    console.log("add candy is failing", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCandy = async (req, res, next) => {
  try {
    const candies = await Candy.findAll();
    res.status(200).json({ allCandies: candies });
  } catch (error) {
    console.log("get candy is failing", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.buyCandy = async (req, res, next) => {
  const candyId = req.params.id;
  const quantityToBuy = parseInt(req.params.quantity); // Parse the quantity as an integer

  try {
    const candy = await Candy.findByPk(candyId); // Find the candy by its ID
    if (!candy) {
      return res.status(404).json({ error: "Candy not found" });
    }

    if (candy.quantity >= quantityToBuy) {
      candy.quantity -= quantityToBuy; // Decrease the quantity
      await candy.save(); // Save the updated candy
      res
        .status(200)
        .json({ message: `Bought ${quantityToBuy} of ${candy.candyName}` });
    } else {
      res.status(400).json({ error: "Not enough candies" });
    }
  } catch (error) {
    console.log("Buy candy failed", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
