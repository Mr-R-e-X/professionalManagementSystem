let empForm = document.querySelector("#employe-form");
let userDtls = document.querySelectorAll(".user-dtls");
let addedEmp = document.querySelector("#added-emp");
let empList = document.querySelector(".emp-list");
let empFormDiv = document.querySelector("#employe-form-div");
let pTag = document.createElement("p");
let epmCount = document.createElement("p");
let userObj = [];
epmCount.innerText = "You have 0 employee !";
epmCount.setAttribute("class", "zero-emp");
empForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let isEmpty = false;
  let obj = {};
  userDtls.forEach((input) => {
    let key = input.getAttribute("name");
    if (input.value.trim() === "") {
      isEmpty = true;
      return;
    }
    let val = input.value;
    obj[key] = val;
  });
  if (isEmpty) {
    renderErrorMessage(isEmpty);
  } else {
    obj["flag"] = false;
    userObj.push(obj);
    renderSuccessMessage(isEmpty);
    renderEmp(userObj);
    checkUser(userObj);
  }
});

function renderEmp(users) {
  empList.innerHTML = "";
  users.map((user, index) => {
    empList.innerHTML += `
              <div>
              <p>${index + 1}. </p>
              <div class=user-list>
                <div class=user>
                  <p>Name: ${user.name} </p>
                  <p>Profession: ${user.profession} </p>
                  <p>Age: ${user.age} </p>
                </div>
                <div class=delDiv>
                <button class=delBtn id=${index}> Delete User </button>
                </div>
              </div>
              </div>
          `;
  });
}
function renderErrorMessage(isEmpty) {
  if (isEmpty) {
    pTag.setAttribute("class", "err-msg");
  }
  pTag.innerText = `Error: Please make sure all the fields are filled before adding an employee!`;
  empFormDiv.appendChild(pTag);
}
function renderSuccessMessage(isEmpty) {
  if (!isEmpty) {
    pTag.setAttribute("class", "success-msg");
  }
  pTag.innerText = `Success: Employee added!`;
  empFormDiv.appendChild(pTag);
}
function deleteUser(index) {
  console.log(index);
  userObj = userObj.filter((item, i) => i !== parseInt(index));
  // renderSuccessMessage(isEmpty);
  console.log(userObj);
  renderEmp(userObj);
  checkUser(userObj);
}
function checkUser(userObj) {
  if (userObj.length === 0) {
    epmCount.style.display = "block";
    addedEmp.appendChild(epmCount);
  } else {
    epmCount.style.display = "none";
  }
}
checkUser(userObj);
document.addEventListener("click", (e) => {
  let btn;
  e.target.getAttribute("class") === "delBtn"
    ? (btn = e.target)
    : (btn = undefined);
  if (btn !== undefined) {
    let idx = btn.getAttribute("id");
    deleteUser(idx);
  }
});
