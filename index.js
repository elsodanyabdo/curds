//project steps

// 1- get total
//------------------ Call all element in input ---------------------
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let delAll = document.querySelector(".del-all");
let mood = "create";
let temp;
// console.log(title, price, taxes, ads, discount, total, count, category, submit);
//------------------ create function make total  ---------------------
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "blue";
  }
}
//------------------------------------------------------------------
//------------------ to save and restore date for local storage ---------------------
let datePro;
if (localStorage.product != null) {
  datePro = JSON.parse(localStorage.getItem("product"));
} else {
  datePro = [];
}
//------------------------------------------------------------------
//------------------ create product ---------------------
submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  //------------------------------------------------------------------
  //------------------make mode and counter for element---------------------
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newPro.count <= 100
  ) {
    if (mood === "create") {
      // 6- count
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          datePro.push(newPro);
        }
      } else {
        datePro.push(newPro);
      }
    } else {
      datePro[temp] = newPro;
      count.style.display = "block";
      mood = "clear";
      count.style.display = "block";
      submit.innerHTML = "create";
    }
    clear();
  }
  //------------------------------------------------------------------
  //------------------save to local storage ---------------------
  localStorage.setItem("product", JSON.stringify(datePro));
  console.log(datePro);

  addToTable();
};
//------------------------------------------------------------------
//------------------clear input---------------------
function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
//------------------------------------------------------------------
//------------------read or append it to page---------------------
function addToTable() {
  getTotal();
  let table = "";
  for (let i = 0; i < datePro.length; i++) {
    table += `<tr>
                <td>${i + 1}</td>
                <td>${datePro[i].title}</td>
                <td>${datePro[i].price}</td>
                <td>${datePro[i].taxes}</td>
                <td>${datePro[i].ads}</td>
                <td>${datePro[i].discount}</td>
                <td>${datePro[i].total}</td>
                <td>${datePro[i].category}</td>
                <td><button onclick = "updateOne(${i})" id="update">update</button></td>
                <td><button onclick = "deleteOneLine(${i}) " id="del">delete</button></td>
            </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  if (datePro.length > 0) {
    delAll.innerHTML = `
    <button class= "delAll" onclick = "deleteAllFun()">delete all (${datePro.length})</button>`;
  } else {
    delAll.innerHTML = "";
  }
}
addToTable();
//------------------------------------------------------------------
//------------------delete one element---------------------
function deleteOneLine(i) {
  datePro.splice(i, 1);
  localStorage.product = JSON.stringify(datePro);
  addToTable();
}
//------------------------------------------------------------------
//------------------delete all element---------------------
function deleteAllFun() {
  localStorage.clear();
  datePro.splice(0);
  addToTable();
}
//------------------------------------------------------------------
//------------------update element---------------------
function updateOne(i) {
  title.value = datePro[i].title;
  price.value = datePro[i].price;
  taxes.value = datePro[i].taxes;
  ads.value = datePro[i].ads;
  discount.value = datePro[i].discount;
  total.value = datePro[i].total;
  category.value = datePro[i].category;
  count.style.display = "none";
  submit.innerHTML = "update";
  mood = "update";
  temp = i;
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
  getTotal();
  addToTable();
}

//------------------------------------------------------------------
//------------------search---------------------
let searchMode = "title";
let search = document.getElementById("search");
function getSearchWithId(id) {
  if (id == "search-title") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  search.placeholder = "search by " + searchMode;
  search.focus();
  search.value = "";
  addToTable();
  console.log(searchMode);
}

function searchDate(value) {
  let table = "";

  for (let i = 0; i < datePro.length; i++) {
    if (searchMode == "title") {
      if (datePro[i].title.includes(value.toLowerCase())) {
        table += `<tr>
                <td>${i + 1}</td>
                <td>${datePro[i].title}</td>
                <td>${datePro[i].price}</td>
                <td>${datePro[i].taxes}</td>
                <td>${datePro[i].ads}</td>
                <td>${datePro[i].discount}</td>
                <td>${datePro[i].total}</td>
                <td>${datePro[i].category}</td>
                <td><button onclick = "updateOne(${i})" id="update">update</button></td>
                <td><button onclick = "deleteOneLine(${i}) " id="del">delete</button></td>
            </tr>`;
      }
    } else {
      if (datePro[i].category.includes(value.toLowerCase())) {
        table += `<tr>
                <td>${i + 1}</td>
                <td>${datePro[i].title}</td>
                <td>${datePro[i].price}</td>
                <td>${datePro[i].taxes}</td>
                <td>${datePro[i].ads}</td>
                <td>${datePro[i].discount}</td>
                <td>${datePro[i].total}</td>
                <td>${datePro[i].category}</td>
                <td><button onclick = "updateOne(${i})" id="update">update</button></td>
                <td><button onclick = "deleteOneLine(${i}) " id="del">delete</button></td>
            </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
