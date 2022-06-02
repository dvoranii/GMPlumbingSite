// Service class
// Array of objects
// create template and update info
// Javascript course Bankist App

let html;
let list_items = [];

let sidebarTemplate2;

function getServices(url) {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let arrLength = data.Services.length;
      for (let i = 0; i < arrLength; i++) {
        html = `
      <div class="service-container">
      <a href="${data.Services[1].url}"><img class="service-img" src="/img/${data.Services[i].img}" alt="" /></a>
      <div class="service-text">
      <p class="heading-tertiary service-title">${data.Services[i].name}</p>
      <p class="service-description">
      ${data.Services[i].description}
      </p>
      </div>
      </div>
      `;

        list_items.push(html);
      }
      paginate(list_items, "pagination");
    });
}

function paginate(listItems, container) {
  // PAGINATION
  const list_element = document.querySelector(".services-grid");
  let pagination_element = document.getElementById(container);

  let current_page = 1;
  let rows = 6;

  function DisplayServices(items, wrapper, rows_per_page, page) {
    if (!wrapper) return;
    wrapper.innerHTML = "";
    page--;

    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = items.slice(start, end);

    for (let i = 0; i < paginatedItems.length; i++) {
      // access individual objects here
      let item = paginatedItems[i];

      let item_element = document.createElement("div");
      item_element.innerHTML = item;
      wrapper.appendChild(item_element);
    }
  }

  function SetupPagination(items, wrapper, rows_per_page) {
    if (!wrapper) return;
    wrapper.innerHTML = "";

    let page_count = Math.ceil(items.length / rows_per_page);
    for (let i = 1; i < page_count + 1; i++) {
      let btn = PaginationButton(i, items);
      wrapper.appendChild(btn);
    }
  }

  function PaginationButton(page, items) {
    let button = document.createElement("button");
    button.innerText = page;

    if (current_page == page) button.classList.add("active");

    button.addEventListener("click", function () {
      current_page = page;
      DisplayServices(items, list_element, rows, current_page);

      let current_btn = document.querySelector(".page_numbers button.active");
      current_btn.classList.remove("active");

      this.classList.add("active");
    });

    return button;
  }

  DisplayServices(listItems, list_element, rows, current_page);
  SetupPagination(listItems, pagination_element, rows);
}

getServices("/models/services-model.json");

// SERVICE PAGE
let container2 = document.querySelector(".sidebar-projects");

function getProjectsSidebar(url, container) {
  if (!container) return;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let arr = Object.entries(data.Projects);

      let count = 0;

      arr.forEach((project) => {
        count++;
        sidebarTemplate2 = `
          <h3 class='heading-tertiary'>${project[1].name}</h3>
         <a href='${project[1].url}'><img class='service-img' src='/img/${project[1].img}' alt=""/></a>
          <p class="bold">${project[1].location.city}</p>
          <p>
          ${project[1].description}
          </p>
          <p class="bold">${project[1].date}</p>
          <br/>
          `;
        if (count <= 3) {
          container.innerHTML += sidebarTemplate2;
        }
      });
    });
}

getProjectsSidebar("/models/projects-model.json", container2);
