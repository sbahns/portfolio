const grid = document.querySelector('.grid');
const card = document.querySelector('.card');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const modal_content = document.querySelector('.modal_content');

let logo = document.getElementById("srbweb_logo");

let nav = document.getElementById("navigation");
let menu_items = nav.getElementsByClassName("menu-item");

for (var i = 0; i < menu_items.length; i++) {
  menu_items[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");

    // If there's no active class
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }

    // Add the active class to the current/clicked button
    this.className += " active";
  });
}


logo.addEventListener("click", function() {
	for (var i = 0; i < menu_items.length; i++) {
	    var current = document.getElementsByClassName("active");
	    // If there's no active class
	    if (current.length > 0) {
	      current[0].className = current[0].className.replace(" active", "");
	    }
	    // remove the active
	    this.className += "";
	}
});




const json = 'projects.json'; // Get projects

let project = [];
let selectedProfile = 0;

function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
  return fetch(url)
           .then(res => res.json())
}

fetchData(json)
  .then(getProjects)
  .then(function(data) {
		project = data.projects;
	      let cell = document.querySelectorAll('.cell');
	        for (let i=0; i<cell.length; i++) {
	        cell[i].addEventListener('click', () => {
	          if (modal.className=='modal') {
	              selectedProfile = i;
	              document.querySelector('.modal_content').innerHTML = projectModal(project, i);
  	  		  }
			  toggleModal();
	       });
	    }
	});

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------


function projectModal(array, index) {

	return `
		<button title="Close" class="close_modal">
			X
		</button>
		<div class="card" data-id="${index}">
			<div class="project">
				<div class="thumbnail">
					<img src='${array[index].picture.large}' alt='Screenshot of ${array[index].name.title}' />
				</div>
				<div class='project-info'>
					<div class="name">
						<h3>${array[index].name.title}</h3>
					</div>
					<div class="url">
						<p><a href="${array[index].location.url}" target="_blank">${array[index].location.url}</a></p>
					</div>
					<div class="description">
						<p><strong>Project Type:</strong> ${array[index].type}</p>
						<p><strong>Project Description:</strong> ${array[index].info.description}</p>
						<p><strong>What I Did:</strong> ${array[index].info.role}</p>
						<p><strong>Keywords:</strong> ${array[index].info.keywords}</p>
					</div>
				</div>
			</div>
		</div>`;
}


function getProjects(data) {
	let projects = data.projects;
	projects.forEach((project, index) => {
		let cell = createNode('div');
		cell.className ="cell";
		const html = `
				<div class="card" data-id="${index}">
					<div class="thumbnail">
						<img src='${project.picture.medium}' alt='Screenshot of ${project.name.title}' />
					</div>
					<div class="project">
						<div class='project-info'>
							<div class="name">
							 <h3>${project.name.title}</h3>
							</div>
							<div class="url">
								<p>${project.location.url}</p>
							</div>
						</div>
					</div>

			</div>`;

		 cell.innerHTML = html;
		 append(grid, cell);
	});
	return data;
}





// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
function attachModalListeners(modalElm) {
  modalElm.querySelector('.close_modal').addEventListener('click', toggleModal);
  modalElm.querySelector('.overlay').addEventListener('click', toggleModal);
}

function detachModalListeners(modalElm) {
  modalElm.querySelector('.close_modal').removeEventListener('click', toggleModal);
  modalElm.querySelector('.overlay').removeEventListener('click', toggleModal);
}

function toggleModal() {
  var currentState = modal.style.display;
  // If modal is visible, hide it. Else, display it.
  if (currentState === 'none') {
    modal.style.display = 'block';
    attachModalListeners(modal);
  } else {
    modal.style.display = 'none';
    detachModalListeners(modal);
  }
}
