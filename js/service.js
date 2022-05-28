function getProjectsSidebar(url) {
  let container2 = document.querySelector(".sidebar-projects");
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
          container2.innerHTML += sidebarTemplate2;
        }
      });
    });
}

getProjectsSidebar("/models/projects-model.json");
