// PROJECTS PAGE

let html2;
let list_items2 = [];

let sidebarTemplate;
// let sidebar_list = [];

// fetch project data and injecting template into DOM
function getProjects(url) {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let arrLength = data.Projects;
      arrLength.forEach((project) => {
        html2 = `
        <div class="service-container">
       <a href='${project.url}'><img class="service-img" src="/img/${project.img}" alt="" /></a> 
        <div class="service-text">
        <p class="heading-tertiary service-title">${project.name}</p>
        <p class="service-description">
        ${project.description}
        </p>
        <hr>
          <address class="testimonial__author">
            <img src="${project.location.thumbnail}" alt="" class="testimonial__photo" />
            <p class="testimonial__name bold">${project.location.city}</p>
            <p class="testimonial__location">📅 ${project.date}</p>
            </p>
          </address>
        <hr>
        </div>
        `;
        list_items2.push(html2);
      });

      paginate(list_items2, "pagination");
    });
}

// Pagination
function paginate(listItem, container) {
  // PAGINATION
  const list_element = document.querySelector(".services-grid");
  const pagination_element = document.getElementById(container);

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

  DisplayServices(listItem, list_element, rows, current_page);
  SetupPagination(listItem, pagination_element, rows);
}

// Get services
// Should be showing associated services, might need to do this in php

getProjects("/models/projects-model.json");

let container = document.querySelector(".sidebar-services");

function getServicesSidebar(url, container) {
  if (!container) return;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let arr = Object.entries(data.Services);

      let count = 0;
      arr.forEach((service) => {
        count++;
        sidebarTemplate = `
          <h3 class="heading-tertiary">${service[1].name}</h3>
          <a href='${service[1].url}'><img class="service-img" src="/img/${service[1].img}" alt="" /></a>
          <p>
           ${service[1].description}
          </p>
          <br />
        `;
        //   Only show first 3
        if (count <= 3) {
          container.innerHTML += sidebarTemplate;
        }
      });
    });
}

getServicesSidebar("/models/services-model.json", container);
