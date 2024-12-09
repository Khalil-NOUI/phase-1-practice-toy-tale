let addToy = false;
const url = "http://localhost:3000/toys"
const toyContainer = document.getElementById("toy-collection");

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
      const form = document.querySelector(".add-toy-form")
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputs = {
          "name": e.target.name.value,
          "image": e.target.image.value,
          "likes": 0,
        }
        newToy(inputs)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });

//// UPDATE lIKES/////

  toyContainer.addEventListener("click", (e) => {
     if (e.target.classList.value === "like-btn") {
      const id = e.target.id
      const oldCount = e.target.parentNode.children[2].textContent.split(":")[1].trim()
      console.log(oldCount)
        updateToy(id, oldCount)
     } else {null}
  })

  /////////////// fetching///

  fetchAndyToys()
});


//////fetch Andy toys/////

async function fetchAndyToys() {

  try {
    const res = await fetch(url);
    if(!res.ok) throw new Error("error fetching data :", err.status)
    const data = await res.json()
    toyContainer.innerHTML = "";
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

      toyContainer.appendChild(toySpace);
      
    })
  }
  catch(err) {
    console.log("error occured", err.message)
  }

}

//////Add New Toy ////////

async function newToy(data) {

  try {
  const resp = await fetch(url, {
    method : "POST",
    headers : {
      "Content-Type" : "application/json",
    },
    body : JSON.stringify(data)
    })
  if(!resp.ok) throw new Error("")
  }
  catch(err) {
    console.log("error sending Data", err.message)
  }
  finally {
    location.reload()
  }

}

/////////updateToy/////

async function updateToy(id, oldLikes) {


  try {
  const patchUpdate = {
    method : "PATCH",
    headers :
    {
      "Content-Type" : "application/json",
      Accept : "application/json"
    },
    body: JSON.stringify({
      "likes" : ++oldLikes,
    })
  }
  
  const data = await fetch(`${url}/${id}`, patchUpdate)
  const res = await data.json()
  if (!res.ok) {throw new Error(`failed to update`, res.status)}
  console.log(res)
  }
  catch (error) {
    console.log("error Detected :", error.message)
  }
  finally {
    location.reload()
  }
}
