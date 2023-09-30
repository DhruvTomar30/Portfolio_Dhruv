/*!
=========================================================
* Dhruv Tomar Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

$(document).ready(function(){
  $(".navbar .nav-link").on('click', function(event) {

      if (this.hash !== "") {

          event.preventDefault();

          var hash = this.hash;

          $('html, body').animate({
              scrollTop: $(hash).offset().top
          }, 700, function(){
              window.location.hash = hash;
          });
      } 
  });
});

// taskbar visibility
document.addEventListener('visibilitychange',
  function () {
      if (document.visibilityState === "visible") {
          document.title = "Portfolio | Dhruv Tomar";
          $("#favicon").attr("href", "./assets/imgs/Dhruv 12.jpg");
      }
      else {
          document.title = "Come Back To Portfolio";
          $("#favicon").attr("href", "./assets/imgs/favhand.png");
      }
});
    


// google maps
function initMap() {
// Styles a map in night mode.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 28.6352, lng: 77.2860},
        zoom: 16,
        scrollwheel:  false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });
}


async function fetchData(type = "skills") {
  let response
  type === "skills" ?
      response = await fetch("skills.json")
      :
      response = await fetch("./projects/projects.json")
  const data = await response.json();
  return data;
}

function showSkills(skills) {
  let skillsContainer = document.getElementById("skillsContainer");
  let skillHTML = "";
  skills.forEach(skill => {
      skillHTML += `
      <div class="bar">
            <div class="Infoo">
              <img src=${skill.icon} alt="skill" />
              <span>${skill.name}</span>
            </div>
          </div>`
  });
  skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
  let projectsContainer = document.querySelector("#work .box-container");
  let projectHTML = "";
  projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
      projectHTML += `
      <div class="box tilt">
    <img draggable="false" src="assets/imgs/projects/${project.image}.png" alt="project" />
    <div class="content">
      <div class="tag">
      <h3>${project.name}</h3>
      </div>
      <div class="desc">
        <p>${project.desc}</p>
        <div class="btns">
          <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
          <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
        </div>
      </div>
    </div>
  </div>`
  });
  projectsContainer.innerHTML = projectHTML;

  // <!-- tilt js effect starts -->
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
      max: 15,
  });
  // <!-- tilt js effect ends -->

  /* ===== SCROLL REVEAL ANIMATION ===== */
  const srtop = ScrollReveal({
      origin: 'top',
      distance: '80px',
      duration: 1000,
      reset: true
  });

  /* SCROLL PROJECTS */
  srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
  showSkills(data);
});

fetchData("projects").then(data => {
  showProjects(data);
});




/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
  origin: 'top',
  distance: '80px',

  duration: 1000,
  reset: true
});

/* SCROLL HOME */
srtop.reveal('.about-section .about-card h3', { delay:200 });
srtop.reveal('.about-section .about-card h5',{ delay: 200 });
srtop.reveal('.about-section .about-card p', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });