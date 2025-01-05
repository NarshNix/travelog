const dataDisplay = document.getElementById("data-display");
const search = document.getElementById("search");
const submit = document.getElementById("submit");
const subitForm = document.getElementById("submit-form");
const message = document.getElementById("message");
const email = document.getElementById("email");
const user = document.getElementById("user");

let arrData = [];
let formData = [];

async function getData() {
  arrData = [];
  const searchInput = search.value.trim();
  try {
    const res = await axios.get("travel_recommendation_api.json");
    const data = res.data;

    // Find the country or fallback to `data[count]`
    let dispData = data.countries.find(
      (country) => country.name.toLowerCase() == searchInput.toLowerCase()
    );
    if (!dispData) {
      dispData = data[searchInput];
    }

    arrData.push(dispData);

    displayData(arrData);
    search.value = "";

    // console.log(dispData);s
  } catch (err) {
    console.log(err);
  }
}

function displayData(data) {
  console.log(data);

  const toDisplay = data
    .map((item) => {
      if (item.cities) {
        // Process cities and join their HTML
        return item.cities
          .map((city) => {
            return `<div class="data-heading">
              <h1>${city.name}</h1>
            </div>
            <div class="data-img">
              <img src="${city.imageUrl}" alt="${city.name}" />
            </div>
            <div class="data-text">
              <p>${city.description}</p>
            </div>`;
          })
          .join(""); // Join HTML for all cities in this item
      } else {
        // Fallback for items without cities
        return item
          .map((nature) => {
            return `<div class="data-heading">
              <h1>${nature.name}</h1>
            </div>
            <div class="data-img">
              <img src="${nature.imageUrl}" alt="${nature.name}" />
            </div>
            <div class="data-text">
              <p>${nature.description}</p>
            </div>`;
          })
          .join("");
      }
    })
    .join(""); // Join HTML for all items

  dataDisplay.innerHTML = toDisplay;
}

function getQuery(e) {
  e.preventDefault();
  let name = user.value;
  let useremail = email.value;
  let usermessage = message.value;

  const data = {
    name,
    email: useremail,
    usermessage,
  };

  console.log(data);
  alert(
    `Message: ${data.usermessage} for user ${data.name} with email: ${data.email} is submitted`
  );
  user.value = "";
  email.value = "";
  message.value = "";
}

submit.addEventListener("click", getData);
subitForm.addEventListener("click", getQuery);
