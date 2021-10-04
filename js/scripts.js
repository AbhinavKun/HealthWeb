window.onscroll = function () {
	scrollFunction();
	scrollFunctionBTT(); // back to top button
};

window.onload = function () {
	scrollFunction();
};

function scrollFunction() {
	if (document.documentElement.scrollTop > 30) {
		document.getElementById("navbar").classList.add("top-nav-collapse");
	} else if (document.documentElement.scrollTop < 30) {
		document.getElementById("navbar").classList.remove("top-nav-collapse");
	}
}

// Navbar on mobile
let elements = document.querySelectorAll(".nav-link:not(.dropdown-toggle)");

for (let i = 0; i < elements.length; i++) {
	elements[i].addEventListener("click", () => {
		document.querySelector(".offcanvas-collapse").classList.toggle("open");
	});
}

document.querySelector(".navbar-toggler").addEventListener("click", () => {
	document.querySelector(".offcanvas-collapse").classList.toggle("open");
});

// Hover on desktop
function toggleDropdown(e) {
	const _d = e.target.closest(".dropdown");
	let _m = document.querySelector(".dropdown-menu", _d);

	setTimeout(
		function () {
			const shouldOpen = _d.matches(":hover");
			_m.classList.toggle("show", shouldOpen);
			_d.classList.toggle("show", shouldOpen);

			_d.setAttribute("aria-expanded", shouldOpen);
		},
		e.type === "mouseleave" ? 300 : 0
	);
}

// On hover
const dropdownCheck = document.querySelector('.dropdown');

if (dropdownCheck !== null) {
	document.querySelector(".dropdown").addEventListener("mouseleave", toggleDropdown);
	document.querySelector(".dropdown").addEventListener("mouseover", toggleDropdown);

	// On click
	document.querySelector(".dropdown").addEventListener("click", (e) => {
		const _d = e.target.closest(".dropdown");
		let _m = document.querySelector(".dropdown-menu", _d);
		if (_d.classList.contains("show")) {
			_m.classList.remove("show");
			_d.classList.remove("show");
		} else {
			_m.classList.add("show");
			_d.classList.add("show");
		}
	});
}


/* Card Slider - Swiper */
var cardSlider = new Swiper('.card-slider', {
	autoplay: {
		delay: 4000,
		disableOnInteraction: false
	},
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}
});


/* Back To Top Button */
// Get the button
myButton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
function scrollFunctionBTT() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		myButton.style.display = "block";
	} else {
		myButton.style.display = "none";
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0; // for Safari
	document.documentElement.scrollTop = 0; // for Chrome, Firefox, IE and Opera
}


function calcBMI() {
	var weight = document.bmiform.pounds.value,
		height = document.bmiform.inches.value;
	document.bmiform.bmi.value = parseInt((weight * 10000) / (height * height));
}



const recalculateNumbers = e => {
	const inputs = document.querySelectorAll('.nutritionInput');
	let inputData = {
		totalCalories: 0
	};

	inputs.forEach(function (elm) {
		const id = elm.id;
		const val = elm.value;
		inputData[id] = val > 0 ? val : 0;
		let calories = 0;
		if (id === 'fat') {
			calories = val * 9;
		} else {
			calories = val * 4;
		}
		inputData.totalCalories += calories;
	});

	const percentOf = (val, total) => {
		if (val === 0) {
			return 0;
		}
		return Math.round(val / total * 100);
	}
	const updateOutput = (elm, val) => {
		document.getElementById(elm).innerHTML = val;
	}

	const fatPercent = percentOf(inputData.fat * 9, inputData.totalCalories);
	const proteinPercent = percentOf(inputData.protein * 4, inputData.totalCalories);
	const carbsPercent = percentOf(inputData.carbs * 4, inputData.totalCalories);

	updateOutput('calorieOutput', inputData.totalCalories);
	updateOutput('fatOutput', fatPercent);
	updateOutput('proteinOutput', proteinPercent);
	updateOutput('carbsOutput', carbsPercent);
}

document.querySelectorAll('.nutritionInput').forEach(function (elm) {
	elm.addEventListener("change", recalculateNumbers);
});





document.getElementById('UI-form').addEventListener('submit', function (e) {
	//Hide results 
	document.getElementById('results').style.display = 'none';
	//Show loader
	setTimeout(result, 1500);


	e.preventDefault();
});


function result() {
	const age = document.getElementById('age').value;
	const weight = document.getElementById('weight').value;
	const height = document.getElementById('height').value;
	const gender = document.getElementById('gender').value;
	const activity = document.getElementById('activity').value;
	const outputBMR = document.getElementById('BMR');


	//hide loader

	//Show results 
	document.getElementById('results').style.display = 'block';
	//Calculate BMR

	if (gender === 'male') {
		let BMR = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)
		outputBMR.value = BMR.toFixed(2);;
		calculateTDEE(activity, BMR)

	} else if (gender === 'female') {
		let BMR = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age)
		outputBMR.value = BMR.toFixed(2);;
		calculateTDEE(activity, BMR)
	}

}

function calculateTDEE(activity, BMR) {
	const outputTDEE = document.getElementById('TDEE');

	if (activity == 'Sedentary') {
		let TDEE = BMR * 1.2
		outputTDEE.value = TDEE.toFixed(2);
	} else if (activity == 'Lightly Active') {
		let TDEE = BMR * 1.375
		outputTDEE.value = TDEE.toFixed(2);
	} else if (activity == 'Moderately Active') {
		let TDEE = BMR * 1.55
		outputTDEE.value = TDEE.toFixed(2);
	} else if (activity == 'Very Active') {
		let TDEE = BMR * 1.725
		outputTDEE.value = TDEE.toFixed(2);
	} else {
		let TDEE = BMR * 1.9
		outputTDEE.value = TDEE.toFixed(2);
	}

}