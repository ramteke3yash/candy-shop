const API_BASE_URL = "http://localhost:3000";

// Cache frequently used elements
const form = document.getElementById("my-form");
const candyNameInput = document.getElementById("candyName");
const descriptionInput = document.getElementById("Description");
const priceInput = document.getElementById("price");
const quantityInput = document.getElementById("quantity");
const candyContainer = document.getElementById("candy");

const candies = [];

// Function to add a candy to the list
function addCandyToList(candy) {
  candies.push(candy);
  displayCandies();
}

// Function to display candies with buttons
function displayCandies() {
  candyContainer.innerHTML = "";

  candies.forEach((candy, index) => {
    const candyDiv = document.createElement("div");
    candyDiv.classList.add("candy-item");

    const candyInfo = document.createElement("span");
    candyInfo.textContent = `${candy.candyName} ${candy.description} ₹${candy.price} Quantity: ${candy.quantity}`;

    const buy1Button = createBuyButton(candy.id, 1);
    const buy2Button = createBuyButton(candy.id, 2);
    const buy3Button = createBuyButton(candy.id, 3);

    candyDiv.appendChild(candyInfo);
    candyDiv.appendChild(buy1Button);
    candyDiv.appendChild(buy2Button);
    candyDiv.appendChild(buy3Button);

    candyContainer.appendChild(candyDiv);
  });
}

// Function to create a buy button
function createBuyButton(candy, quantity) {
  const buyButton = document.createElement("button");
  buyButton.textContent = `Buy ${quantity}`;
  buyButton.addEventListener("click", () => buyCandy(candy, quantity));
  return buyButton;
}

// Function to buy a candy
async function buyCandy(candyId, quantity) {
  const candy = candies.find((c) => c.id === candyId);
  if (!candy) {
    console.log("candy not found");
    return;
  }

  if (candy.quantity >= quantity) {
    try {
      await updateCandyQuantity(candy.id, quantity); // Send the requested quantity to the backend
      candy.quantity -= quantity; // Update the local quantity after successful response
      displayCandies();
    } catch (error) {
      console.log("Error updating candy quantity:", error);
    }
  } else {
    console.log("Not enough candies");
  }
}

// Function to update candy quantity in the API
async function updateCandyQuantity(candyId, quantity) {
  try {
    await axios.post(`${API_BASE_URL}/buy/${candyId}/${quantity}`);
  } catch (err) {
    console.log(err);
  }
}

// Function to add candy
async function addCandy() {
  const candyName = candyNameInput.value;
  const description = descriptionInput.value;
  const price = parseFloat(priceInput.value);
  const quantity = parseInt(quantityInput.value);

  const candy = { candyName, description, price, quantity };
  addCandyToList(candy);

  candyNameInput.value = "";
  descriptionInput.value = "";
  priceInput.value = "";
  quantityInput.value = "";

  await addCandyAPI(candy);
}

// Function to add candy to the API
async function addCandyAPI(candy) {
  try {
    await axios.post(`${API_BASE_URL}/candy/add-candy`, candy);
  } catch (err) {
    console.log(err);
  }
}

// Add event listener for form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  addCandy();
});

// Initial loading of candies from the API
async function loadCandies() {
  try {
    const response = await axios.get(`${API_BASE_URL}/candy/get-candy`);
    candies.length = 0; // Clear the array
    candies.push(...response.data.allCandies); // Push new candies into the array
    displayCandies();
  } catch (err) {
    console.log(err);
  }
}

// Load existing candies from the API and display them
document.addEventListener("DOMContentLoaded", loadCandies);
