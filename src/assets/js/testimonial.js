const testimonialDataUrl = 'https://api.npoint.io/34a2dbcf2a795bd6965e';

async function fetchData(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function generateTestimonialHTML(item, additionalInfoCallback) {
  let html = `<div class="testimonial col-12 "style="width:30%; height:30%;" >
  <img src="${item.image}" class="profile-testimonial" />
  <p class="quote">"${item.content}"</p>
  <p class="author">- ${item.author}</p>
  <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>`;

  if (additionalInfoCallback) {
    html += additionalInfoCallback(item);
  }

  html += `</div>`;

  return html;
}

async function allTestimonials() {
  try {
    const testimonialData = await fetchData(testimonialDataUrl);
    let testimonialHTML = "";
    for (const key in testimonialData) {
      testimonialHTML += generateTestimonialHTML(testimonialData[key]);
    }

    document.getElementById("testimonials").innerHTML = testimonialHTML;
  } catch (error) {
    console.error("Error displaying testimonials:", error);
  }
}

async function filterTestimonials(rating, additionalInfoCallback) {
  try {
    const testimonialData = await fetchData(testimonialDataUrl);
    let testimonialHTML = '';
    for (const key in testimonialData) {
      if (testimonialData.hasOwnProperty(key) && testimonialData[key].rating === rating) {
        const item = testimonialData[key];
        testimonialHTML += generateTestimonialHTML(item, additionalInfoCallback);
      }
    }

    if (testimonialHTML === '') {
      testimonialHTML = `<h3>Data not found!</h3>`;
    }

    document.getElementById('testimonials').innerHTML = testimonialHTML;
  } catch (error) {
    console.error("Error filtering testimonials:", error);
  }
}

async function additionalInfo(item) {
  return `<p class="additional-info">High Rating Testimonial</p>`;
}


allTestimonials();