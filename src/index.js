let addToy = false;
const url = "http://localhost:3000/toys"
document.addEventListener("DOMContentLoaded", () => {

  ////Dom nodes///

  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  

  ///////

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  /////////////// fetching///

  fetchAndyToys()

});

//////fetch Andy toys/////

async function fetchAndyToys() {
  const toyContainer = document.getElementById("toy-collection");
  
  try {  
    const res = await fetch(url);
    if(!res.ok) throw new Error("error fetching data :", err.status)
    const data = await res.json()
    data.forEach((toy) => {


      const fragment = document.createDocumentFragment();

      const toyName = document.createElement("h2");
      toyName.textContent = toy.name;
      fragment.appendChild(toyName)

      const toyImg = document.createElement("img");
      toyImg.classList.add("toy-avatar")
      toyImg.src = toy.image;
      toyImg.alt = toy.name;
      fragment.appendChild(toyImg)

      const toyLikes = document.createElement("p");
      toyLikes.textContent = `Likes : ${toy.likes}`;
      fragment.appendChild(toyLikes)
      

      const toyButton = document.createElement("button");
      toyButton.classList.add("like-btn");
      toyButton.textContent = "Like"
      toyButton.id = toy.id
      fragment.appendChild(toyButton)

      const toySpace = document.createElement("div");
      toySpace.classList.add("card");
      toySpace.appendChild(fragment)

      toyContainer.appendChild(toySpace) ;
    })
  }
  catch(err) {
    console.log("error occured", err.message)
  }

}