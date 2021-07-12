
document
  .querySelector("#destination_details_form")
  .addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {

  event.preventDefault(); 

  const destinationName = event.target.elements["name"].value;
  const destinationLocation = event.target.elements["location"].value;
  const destinationPhoto = event.target.elements["photo"].value;
  const destinationDesc = event.target.elements["description"].value;

  resetFormValues(event.target);

  var destinationCard = createDestinationCard(
    destinationName,
    destinationLocation,
    destinationPhoto,
    destinationDesc
  );

  const wishListContainer = document.querySelector("#destinations_container");

  if (wishListContainer.children.length === 0) {
    document.querySelector("#title").innerHTML = "My WishList";
  }

  document
    .querySelector("#destinations_container")
    .appendChild(destinationCard);
}

function resetFormValues(form) {

  for (var i = 0; i < form.length; i++) {
    form.elements[i].value = "";
  }
}

function createDestinationCard(name, location, photoUrl, description) {
  
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.style.width = "15rem";
  card.style.height = "fit-content";
  card.style.margin = "20px;";

  
  const img = document.createElement("img");
  img.setAttribute("class", "card-img-top");
  img.setAttribute("alt", name);

  var constantPhotoUrl =
      "https://www.amny.com/wp-content/uploads/2020/03/GettyImages-1181858711.jpg"
  if (photoUrl.length === 0) {
    img.setAttribute("src", constantPhotoUrl);
  } else {
    img.setAttribute("src", photoUrl);
  }

  card.appendChild(img);

  var cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  const cardTitle = document.createElement("h5");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerText = name;
  cardBody.appendChild(cardTitle);

  const cardSubtitle = document.createElement("h6");
  cardSubtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
  cardSubtitle.innerText = location;
  cardBody.appendChild(cardSubtitle);

  if (description.length !== 0) {
    var cardText = document.createElement("p");
    cardText.setAttribute("class", "card-text");
    cardText.innerText = description;
    cardBody.appendChild(cardText);
  }

  const buttonsContainer = document.createElement("div");
  buttonsContainer.setAttribute("class", "buttons_container");

  const cardEditBtn = document.createElement("button");
  cardEditBtn.setAttribute("class", "btn btn-warning");
  cardEditBtn.innerText = "Edit";
  cardEditBtn.addEventListener("click", editDestination);

  const cardDeleteBtn = document.createElement("button");
  cardDeleteBtn.setAttribute("class", "btn btn-danger");
  cardDeleteBtn.innerText = "Remove";
  cardDeleteBtn.addEventListener("click", removeDestination);

  buttonsContainer.appendChild(cardEditBtn);
  buttonsContainer.appendChild(cardDeleteBtn);

  cardBody.appendChild(buttonsContainer);

  card.appendChild(cardBody);

  return card;
}

function editDestination(event) {
  const cardBody = event.target.parentElement.parentElement;
  const title = cardBody.children[0];
  const subTitle = cardBody.children[1];

  const card = cardBody.parentElement;
  const photoUrl = card.children[0];

  const newTitle = window.prompt("Enter new name");
  const newSubtitle = window.prompt("Enter new location");
  const newPhotoUrl = window.prompt("Enter new photo url");

  if (newTitle.length > 0) {
    title.innerText = newTitle;
  }

  if (newSubtitle.length > 0) {
    subTitle.innerText = newSubtitle;
  }

  if (newPhotoUrl.length > 0) {
    photoUrl.setAttribute("src", newPhotoUrl);
  }
}

function removeDestination(event) {
  const cardBody = event.target.parentElement.parentElement;
  const card = cardBody.parentElement;
  card.remove();
}
