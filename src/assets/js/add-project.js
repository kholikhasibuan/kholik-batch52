const data = [];

function submitData(event) {
    event.preventDefault();

    const title = document.getElementById("pName").value;
    const s_date = document.getElementById("s-date").value;
    const e_date = document.getElementById("e-date").value;
    const content = document.getElementById("description").value;
    const isUsingNodeJs = document.getElementById("tech1").checked;
    const isUsingReactJs = document.getElementById("tech2").checked;
    const isUsingNextJs = document.getElementById("tech3").checked;
    const isUsingTypescript = document.getElementById("tech4").checked;
    let image = document.getElementById("attachFile").files;
    const p_duration = durationInDays(s_date, e_date);

    if (title === "" || s_date === "" || e_date === "" || content === "" || image.length === 0 || p_duration <= 0) {
        alert("Mohon isi semua field dengan benar.");
        return;
    }

    image = URL.createObjectURL(image[0]);

    const duration = durationInMonth(p_duration);

    const obj = {
        title,
        s_date,
        e_date,
        duration,
        image,
        content,
        isUsingNodeJs,
        isUsingReactJs,
        isUsingNextJs,
        isUsingTypescript,
    };

    data.push(obj);
    renderProject();
}

function renderProject() {
    const projectList = document.getElementById("project-list");
  
    data.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.classList.add("card");
  
      projectCard.innerHTML = `
      <div class="row gap-5  " style=" margin:5px; margin-top: 10px; background-color:#f8f8f8;" id="project-list">
      <div class="row gap-5" id="project-li">
      <div class="card " style="width: 25rem;">
      <div class="card-body">
      <img src="${project.image}" class="card-img-top gap-2" alt="${project.title}">
      <h2 style="font-size: 20px;">${project.title}</h2>
      <h4 style="font-size: 10px;">${project.duration}</h4>
    <p class="card-text">${project.content}</p>
      <div class="m-2">
      ${renderTechImages(project)}
      </div>
      <div class="d-flex justify-content-center mt-5  m-2 gap-3">
         <button  style="width: 50%; border-radius: 10px; background-color: #111727; color: #e3e7eb;">Exit</button>
         <button style="width: 50%; border-radius: 10px; background-color: #111727; color: #e3e7eb;"> Delete</button>
      </div>
  </div>
  </div>
  </div>
  </div>
  `;
  
      projectList.appendChild(projectCard);
    });
}

function renderTechImages(project) {
    let renderImages = "";

    if (project.isUsingNodeJs) {
        renderImages += `<li><i class="fab fa-node-js"></i></li>`;
    }
    if (project.isUsingReactJs) {
        renderImages += `<li><i class="fab fa-react"></i></li>`;
    }
    if (project.isUsingNextJs) {
        renderImages += `<li><i class="fab fa-js"></i></li>`;
    }
    if (project.isUsingTypescript) {
        renderImages += `<li><i class="fab fa-js"></i>  </li>`;
    }

    return renderImages;
}

function durationInDays(s_date, e_date) {
    const oneDay = 1000 * 60 * 60 * 24;

    const s_dateMs = new Date(s_date).getTime();
    const e_dateMs = new Date(e_date).getTime();
    const durationMs = e_dateMs - s_dateMs;

    return Math.floor(durationMs / oneDay);
}

function durationInMonth(days) {
    monthDuration = Math.floor(days / 30);
    daysDuration = days % 30;

    if (monthDuration == 0) {
        return `${daysDuration} Hari`;
    }

    if (daysDuration > 20) {
        monthDuration++;
    } else if (daysDuration <= 20 && daysDuration > 10) {
        monthDuration += 0.5;
    }

    return `${monthDuration} Bulan`;
}