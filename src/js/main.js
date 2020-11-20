import Swiper, { Navigation } from "swiper";
Swiper.use([Navigation]);
import IMask from "imask";

/* Modal */
const modalBtn = document.querySelector("#modalFile");
const modalText = document.querySelector("#modalFileText");
const modalClose = document.querySelector("#closeModal");
const modal = document.querySelector("#modal");
const modalShowHeader = document.querySelector("#showModalHeader");
const modalShowFooter = document.querySelector("#showModalFooter");

modalBtn.addEventListener("change", (e) => {
	if (e.target.value.trim().length > 0) {
		let x = e.target.value;
		let i = x.lastIndexOf("\\");
		let res = x.slice(i + 1);

		modalText.value = res;
	}
});

modalClose.addEventListener("click", function () {
	modal.classList.remove("active");
});

modalShowHeader.addEventListener("click", () => {
	modal.classList.add("active");
});

modalShowFooter.addEventListener("click", () => {
	modal.classList.add("active");
});

window.addEventListener("click", (e) => {
	if (e.target.id === "modal") {
		modal.classList.remove("active");
	}
});

/* Mask */
const phone = document.querySelector("#phone");
const mask = {
	mask: "+{7}(900)000-00-00",
};
IMask(phone, mask);

phone.addEventListener("focus", () => (phone.value = res.value));

/* Slider */
const mySwiper = new Swiper(".swiper-container", {
	// Optional parameters
	direction: "horizontal",

	// Navigation arrows
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
});

/* Card-porfolio redirect */
const cards = document.querySelectorAll(".card-portfolio__content");
console.log(cards);

for (let i = 0; i < cards.length; i++) {
	cards[i].addEventListener("click", function () {
		const link = this.querySelector(".card-portfolio__link").getAttribute(
			"href"
		);
		window.open(link, "_blank");
	});
}

/* Form Validation */
const form = document.querySelector("#modalForm");
const name = document.querySelector("#name");
const message = document.querySelector("#message");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let error = false;

	if (name.value.trim() && phone.value.trim() && message.value.trim()) {
		if (error) {
			name.classList.remove("error");
			phone.classList.remove("error");
			message.classList.remove("error");
		}

		modal.classList.remove("active");
	} else {
		error = true;
		name.classList.add("error");
		phone.classList.add("error");
		message.classList.add("error");
	}
});
