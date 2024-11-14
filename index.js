var taskList = [];
function selectId(id) {
  return document.getElementById(id);
}

let title;
let startDate;
$(document).ready(function () {
  $("#start-date").val(new Date().toLocaleDateString("en-US", "dd/mm/yy"));
  let startDateCalender = $("#start-date").datepicker({
    minDate: new Date(),
  });

  let submitButton = document.querySelector("#submitBtn");

  displayList();
  submitButton.addEventListener("click", () => {
    title = selectId("taskTitle");
    startDate = selectId("start-date");
    if (title.value) {
      addItem({
        task: title.value,
        date: $(startDateCalender).datepicker("getDate"),
      });
      clearInput();
    } else {
      alert("invalid input");
    }
  });
});


// display list of task
function displayList() {
  if ($("#list li")) {
    $("#list").empty();
  }
  for (let data of taskList) {
    $("#list").append(createTask(data));
  }
}

// reset input filed
function clearInput() {
  title.value = "";
  $("#start-date").datepicker("setDate", new Date());
}

// add task
function addItem(data) {
  taskList.push(data);
  document.querySelector("#list").appendChild(createTask(data));
}


// create task html
function createTask(data) {

  let li = document.createElement("li");
  let taskContainer = document.createElement("div");

  // task title
  let titlePara = document.createElement("p");
  titlePara.textContent = data.task;
  $(taskContainer).append(titlePara);

  // delete button
  let deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("id", "delete-btn");
  deleteBtn.textContent = "Delete";

  // NOTE: this is example of closure
  // $(deleteBtn).click(() =>{
  //   $(li).remove();
  // });

  $(deleteBtn).click(() =>{
    taskList.forEach((item, index)=>{
      if(item.task===data.task){
        taskList.splice(index,1)
        displayList();
      }
    });
  });

  $(taskContainer).append(deleteBtn);

  li.append(taskContainer);

  return li;
}

