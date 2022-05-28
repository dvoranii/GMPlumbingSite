function getServicesSidebar(url) {
  let container = document.querySelector(".sidebar-services");
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

getServicesSidebar("/models/services-model.json");
