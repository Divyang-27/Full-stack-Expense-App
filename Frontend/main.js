let listGroup = document.querySelector('.List-group');
let button = document.getElementById('btn');
button.addEventListener('click', addExpense);
function addExpense(e) {
  e.preventDefault();
  let amount = document.getElementById('amount').value;
  let description = document.getElementById('description').value;
  let category = document.getElementById('category').value;
  let myExpense = {
    amount: amount,
    description: description,
    category: category,
  };
  axios
    .post('http://localhost:4000/get-expense', myExpense)
    .then((response) => getExpense(response.data.newExpenseDetails));
}
function getExpense(myExpense) {
  let newListElement = document.createElement('li');
  newListElement.textContent = `${myExpense.amount}    ${myExpense.description}    ${myExpense.category}             `;
  let editbtn = document.createElement('button');
  // editbtn
  editbtn.textContent = '   Edit';
  editbtn.style.backgroundColor = 'blue';
  editbtn.style.color = 'white';
  //deletebtn
  let deletebtn = document.createElement('button');
  deletebtn.textContent = '   Delete';
  deletebtn.style.backgroundColor = 'red';
  deletebtn.style.color = 'white';
  newListElement.appendChild(editbtn);
  newListElement.appendChild(deletebtn);
  listGroup.appendChild(newListElement);

  editbtn.onclick = () => {
    document.getElementById('amount').value = myExpense.amount;
    document.getElementById('description').value = myExpense.category;
    document.getElementById('category').value = myExpense.description;
    listGroup.removeChild(newListElement);
    axios.delete(`http://localhost:4000/get-expense/${myExpense.id}`);
  };

  deletebtn.onclick = () => {
    listGroup.removeChild(newListElement);
    axios.delete(`http://localhost:4000/get-expense/${myExpense.id}`);
  };
}
window.onload = async () => {
  const expense = await axios.get('http://localhost:4000/get-expense');
  expense.data.allExpenseDetails.forEach((response) => {
    getExpense(response);
  });
};
