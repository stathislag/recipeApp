let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let catInput = document.getElementById("catInput");
let ingredientInput = document.getElementById("ingredientInput");
let instructionsInput = document.getElementById("instructionsInput");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (
    textInput.value === "" ||
    catInput.value === "" ||
    ingredientInput.value === "" ||
    instructionsInput.value === ""
  ) {
    msg.innerText = "Please fill in the Gaps from the recipes";
  } else {
    msg.innerText = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    title: textInput.value,
    category: catInput.value,
    ingredients: ingredientInput.value,
    instructions: instructionsInput.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
  <div id=${y}>
  <span class="fw-bold">${x.title}</span>
  <span class="small text-secondary">${x.category}</span>
  <p>${x.ingredients}</p>
  <p>${x.instructions}</p>
  <span class="options">
    <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
    <i onClick="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
  </span>
</div>
  `);
  });

  resetForm();
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  textInput.value = selectedTask.children[0].innerHTML;
  catInput.value = selectedTask.children[1].innerHTML;
  ingredientInput.value = selectedTask.children[2].innerHTML;
  instructionsInput.value = selectedTask.children[3].innerHTML;
  deleteTask(e);
};
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};

let resetForm = () => {
  textInput.value = "";
  catInput.value = "";
  ingredientInput.value = "";
  instructionsInput.value = "";
};
(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTasks();
})();
