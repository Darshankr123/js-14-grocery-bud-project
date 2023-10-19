/* select elements */

const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

/* edit option */
let editElement;
let editFlag = false;
let editId = "";

/* event listner */

form.addEventListener("submit", addItem);

/* clearing the list */
clearBtn.addEventListener("click", claerItems);

/* functions */

function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value && !editFlag) {
    const element = document.createElement("article");
    element.classList.add("grocery-item");

    const attr = document.createAttribute("data-id");
    attr.value = id;

    element.setAttributeNode(attr);

    element.innerHTML = `
          <p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
      `;

    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");

    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);

    list.appendChild(element);
    /* display alert */
    displayAlert("item added to the list", "success");
    /* show container */
    container.classList.add("show-container");

    /* add to local storage */
    addToLocalStorage(id, value);
    /* set back to default */
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value changed", "sucess");

    /* edi local storage */
    editLocalStorage(editId, value);
    setBackToDefault();
  } else {
    displayAlert("please add the item", "danger");
  }
}

/* clear items */

function claerItems() {
  const items = document.querySelectorAll(".grocery-item");

  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty items", "danger");
  setBackToDefault();
  /*  localStorage.removeItem('list') */
}

/* delete item */

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setBackToDefault();

  // remove from the local storage

  removeFromLocalStotage(id);
}

/* edit item */

function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;

  /* set edit  */
  editElement = e.currentTarget.parentElement.previousElementSibling;

  grocery.value = editElement.innerHTML;
  submitBtn.innerHTML = "edit";

  editFlag = true;
  editId = element.dataset.id;
}

/* display alert */

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}

/* set back to default */

function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.innerHTML = "submit";
}

// ********* LOCAL STORAGE *****//

function addToLocalStorage(id, value) {
  const grocery = { id, value };

  let items = editLocalStorage();

  items.push(grocery);

  localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStotage(id) {
  let items = getLocalStorage();

  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {}

function getLocalStorage() {
  localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}

//*********** SETUP ITEMS *****

/* localStorage.setItem("orange", JSON.stringify(["item", "item2"]));

const oranges = JSON.parse(localStorage.getItem("orange"));

console.log(oranges);

localStorage.removeItem("orange"); */
