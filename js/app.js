const mglass = document.querySelector('.fa-search');

// Display Alert notice on load, clear on click
const main = document.querySelector('main');
const notice = document.querySelector('.notice');
const closebtn = document.querySelector('.closebtn');
let showAlert = true;

function displayAlert() {
	if (showAlert === true) {
	    main.classList.add('show-alert');
	}

	// Listen for click events
	closebtn.addEventListener('click', (e) => {
		showAlert = false;
		notice.classList.add('hide');
		main.classList.remove('show-alert');
	})
};
window.onload = displayAlert();

//Notification dropdown
const un = document.querySelector('.user-notifications');
const nl = document.querySelector('.notification-list');
const bell = document.querySelector('.bell');
const dot = document.querySelector('.notification-dot');

const clear = document.querySelector('.clear-notifications');
const nlist = document.querySelector('.nlist');
const emptylist = document.querySelector('.emptylist');

function displayNotifications() {
		nl.classList.toggle('show-notification');
		bell.classList.toggle('fill-bell');
	};

function clearNotifications() {
	let dn = displayNotifications();
	nlist.classList.toggle('clearlist');
	emptylist.classList.toggle('clearlist');
	clear.style.display = 'none';
	dot.style.display = 'none';
	//dn.preventDefault();
};


un.addEventListener('click', (e) => {
	displayNotifications();
});


clear.addEventListener('click', (e) => {
	clearNotifications();
});


//autocomplete
function autocomplete(inp, arr) {
/*the autocomplete function takes two arguments,
the text field element and an array of possible autocompleted values:*/
var currentFocus;
/*execute a function when someone writes in the text field:*/
inp.addEventListener("input", function(e) {
	var a, b, i, val = this.value;
	/*close any already open lists of autocompleted values*/
	closeAllLists();
	if (!val) { return false;}
	currentFocus = -1;
	/*create a DIV element that will contain the items (values):*/
	a = document.createElement("DIV");
	a.setAttribute("id", this.id + "autocomplete-list");
	a.setAttribute("class", "autocomplete-items");
	/*append the DIV element as a child of the autocomplete container:*/
	this.parentNode.appendChild(a);
	/*for each item in the array...*/
	for (i = 0; i < arr.length; i++) {
		/*check if the item starts with the same letters as the text field value:*/
		if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
			/*create a DIV element for each matching element:*/
			b = document.createElement("DIV");
			/*make the matching letters bold:*/
			b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
			b.innerHTML += arr[i].substr(val.length);
			/*insert a input field that will hold the current array item's value:*/
			b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
			/*execute a function when someone clicks on the item value (DIV element):*/
			b.addEventListener("click", function(e) {
					/*insert the value for the autocomplete text field:*/
					inp.value = this.getElementsByTagName("input")[0].value;
					/*close the list of autocompleted values,
					(or any other open lists of autocompleted values:*/
					closeAllLists();
			});
			a.appendChild(b);
		}
	}
});
/*execute a function presses a key on the keyboard:*/
inp.addEventListener("keydown", function(e) {
	var x = document.getElementById(this.id + "autocomplete-list");
	if (x) x = x.getElementsByTagName("div");
	if (e.keyCode == 40) {
		/*If the arrow DOWN key is pressed,
		increase the currentFocus variable:*/
		currentFocus++;
		/*and and make the current item more visible:*/
		addActive(x);
	} else if (e.keyCode == 38) { //up
		/*If the arrow UP key is pressed,
		decrease the currentFocus variable:*/
		currentFocus--;
		/*and and make the current item more visible:*/
		addActive(x);
	} else if (e.keyCode == 13) {
		/*If the ENTER key is pressed, prevent the form from being submitted,*/
		e.preventDefault();
		if (currentFocus > -1) {
			/*and simulate a click on the "active" item:*/
			if (x) x[currentFocus].click();
		}
	}
});
function addActive(x) {
/*a function to classify an item as "active":*/
if (!x) return false;
/*start by removing the "active" class on all items:*/
removeActive(x);
if (currentFocus >= x.length) currentFocus = 0;
if (currentFocus < 0) currentFocus = (x.length - 1);
/*add class "autocomplete-active":*/
x[currentFocus].classList.add("autocomplete-active");
}
function removeActive(x) {
/*a function to remove the "active" class from all autocomplete items:*/
for (var i = 0; i < x.length; i++) {
	x[i].classList.remove("autocomplete-active");
}
}
function closeAllLists(elmnt) {
/*close all autocomplete lists in the document,
except the one passed as an argument:*/
var x = document.getElementsByClassName("autocomplete-items");
for (var i = 0; i < x.length; i++) {
	if (elmnt != x[i] && elmnt != inp) {
		x[i].parentNode.removeChild(x[i]);
	}
}
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
	closeAllLists(e.target);
});
}

/*An array containing all the country names in the world:*/
var users = ['Victoria Chambers', 'Dale Byrd', 'Dawn Wood', 'Dan Oliver', 'Joe Schmoe', 'Amy Warner'];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), users);
var myInput = document.getElementById("myInput");
var textField = document.getElementById("textField");

var send = document.querySelector('.send');

send.addEventListener('click', (e) => {
    if ( myInput.value == "" || myInput.value == null  || textField.value == "" || textField.value == null) {
        alert('Please complete both fields.')
    } else {
        alert('Your message has been successfully sent!')
				document.getElementById('message-user').reset()
    }
});


//Local Storage

function save() {
    const toggle1 = document.getElementById('toggle1');
    localStorage.setItem('toggle1', toggle1.checked);

    const toggle2 = document.getElementById('toggle2');
    localStorage.setItem('toggle2', toggle2.checked);

///TODO: get this timezone to save
    const select = document.getElementById('member-timezone');
		localStorage.setItem('select', select.selectedIndex);



    alert('Your settings are saved');
}

function load() {
    const toggle1 = JSON.parse(localStorage.getItem('toggle1'));
    document.getElementById('toggle1').checked = toggle1;

    const toggle2 = JSON.parse(localStorage.getItem('toggle2'));
    document.getElementById('toggle2').checked = toggle2;

    const memberTimeZone = JSON.parse(localStorage.getItem('select'));
    document.getElementById('member-timezone').selectedIndex = memberTimeZone;
}

function cancel() {
    location.reload();
    localStorage.clear();
    document.getElementById('member-timezone').select = '';
}

load();
