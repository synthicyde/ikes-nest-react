//variables for functions
const bookingsLink = document.getElementById("bookings_form");
const inputText = document.createElement("input");
const inputUrl = document.createElement("input");
const br = document.createElement("br");
const targetDiv = document.getElementById("link_container");
const plus = document.getElementById("plus_btn");
const minus = document.getElementById("minu_btn");
const linkForm = document.getElementById("care_links");

// important for calling into add and sub function
let formNum = 0;

// Function for building the data for HTML elements to be built
function setUpLinks(number) {
	inputText.id = "name_" + number;
	inputText.type = "text";
	inputUrl.id = "link_" + number;
	inputUrl.type = "url";
	br.setAttribute("class", "br_" + number);
};

// Function to push the HTML elements from setUpLinks() to the DOM
function postLinks() {
	targetDiv.appendChild(inputText.cloneNode(true));
	targetDiv.appendChild(br.cloneNode(true));
	targetDiv.appendChild(inputUrl.cloneNode(true));
	targetDiv.appendChild(br.cloneNode(true));
	targetDiv.appendChild(br.cloneNode(true));
};

// Plus button functionality
plus.addEventListener("click", () => {
	setUpLinks(formNum);
	inputText.value = "";
	inputUrl.value = "";
	postLinks();
	formNum++
});

// Minus button functionality
minus.addEventListener("click", () => {
	if (formNum > 0) {
		formNum--;
		let targetText = document.getElementById("name_" + formNum);
		let targetUrl = document.getElementById("link_" + formNum);
		let querybr = ".br_" + formNum;
		targetText.remove();
		targetUrl.remove();
		document.querySelectorAll(querybr).forEach(br => br.remove());
	}
});

// Functionality for Update button for Community LInks form
linkForm.addEventListener("submit", (submission) => {
	submission.preventDefault();
	let storeAray = [];
	for (let i = 0; i < formNum; i++) {
		let tempObj = {};
		let submitText = document.getElementById("name_" + i).value;
		let submitUrl = document.getElementById("link_" + i).value;
		tempObj["ArticleName"] = submitText;
		tempObj["ArticleURL"] = submitUrl;
		tempObj["target"] = "_blank";
		storeAray.push(tempObj);
	};
	chrome.storage.sync.set({"storedUserLinks": storeAray});
});

// Submit button for Bookings Link
bookingsLink.addEventListener("submit", (submission) => {
	submission.preventDefault();
	let saveLink = document.getElementById("bookings").value;
	let moveLink = {link: saveLink};
	chrome.storage.sync.set({"storedUserBookings": moveLink});
	alert("Bookings link saved.")
});

// Code to run when the Options Page is loaded
window.onload = () => {
	console.log("Page reload.");
	chrome.storage.sync.get(["storedUserBookings"], function(result) {
		let userBookings = result.storedUserBookings.link;
		document.getElementById("bookings").setAttribute("value", userBookings);
	});
	chrome.storage.sync.get(["storedUserLinks"], function(result) {
		let userLinks = result.storedUserLinks;
		formNum = userLinks.length;
		for (let i = 0; i < userLinks.length; i++) {
			setUpLinks(i);
			inputText.value = userLinks[i].ArticleName;
			inputUrl.value = userLinks[i].ArticleURL;
			postLinks();
		}
	});
};