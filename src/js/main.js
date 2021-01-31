import Swiper, { Navigation } from "swiper";
Swiper.use([Navigation]);
import IMask from "imask";

(function () {
	/* Modal */
	const modalBtn = document.querySelector("#modalFile");
	const modalText = document.querySelector("#modalFileText");
	const modalClose = document.querySelector("#closeModal");
	const modal = document.querySelector("#modal");
	const modalShowHeader = document.querySelector("#showModalHeader");
	const modalShowFooter = document.querySelector("#showModalFooter");

	modalClose.addEventListener("click", function () {
		modal.classList.remove("active");
	});

	modalShowHeader.addEventListener("click", () => {
		if (form.classList.contains("hidden")) {
			form.classList.remove("hidden");
		}
		modal.classList.add("active");
	});

	modalShowFooter.addEventListener("click", () => {
		if (form.classList.contains("hidden")) {
			form.classList.remove("hidden");
		}
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

	/* Slider */
	const mySwiper = new Swiper(".swiper-container", {
		// Optional parameters
		direction: "horizontal",
		spaceBetween: 20,

		// Navigation arrows
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	/* Card-porfolio redirect */
	const cards = document.querySelectorAll(".card-portfolio__content");
	const links = document.querySelectorAll(".card-portfolio__link");

	for (let i = 0; i < cards.length; i++) {
		cards[i].addEventListener("click", function (e) {
			e.stopPropagation();
			const link = this.querySelector(".card-portfolio__link").getAttribute(
				"href"
			);
			window.open(link, "_blank");
		});
	}

	for (let i = 0; i < links.length; i++) {
		links[i].addEventListener("click", (e) => e.stopPropagation());
	}

	/* Form Validation */
	const form = document.querySelector("#modalForm");
	const name = document.querySelector("#name");
	const message = document.querySelector("#message");
	const email = document.querySelector("#email");
	const company = document.querySelector("#company");
	const fileInp = document.querySelector("#modalFile");
	const loading = document.querySelector(".send-loading");
	let error = false;

	modalBtn.addEventListener("change", (e) => {
		let sizeFile = +(modalBtn.files[0].size / 1024 / 1024).toFixed(2);

		if (e.target.value.trim().length > 0) {
			if (sizeFile > 20) {
				error = true;
				modalText.classList.add("error");
				modalText.value = "Файл должен быть меньше 20МБ";
				modalText.style = "color: tomato";

				// labelBtn.style = "border-color: tomato";
			} else {
				error = false;
				modalText.classList.remove("error");
				modalText.style = "color: #a6acb6";
				let x = e.target.value;
				let i = x.lastIndexOf("\\");
				let res = x.slice(i + 1);

				modalText.value = res;
			}
		}
	});

	form.addEventListener("submit", function (e) {
		e.preventDefault();

		if (name.value.trim() && phone.value.trim() && message.value.trim()) {
			if (error) {
				name.classList.remove("error");
				phone.classList.remove("error");
				message.classList.remove("error");

				error = false;
			}

			name.classList.remove("error");
			phone.classList.remove("error");
			message.classList.remove("error");

			// let boundary = String(Math.random()).slice(2);
			// let boundaryMiddle = "--" + boundary + "\r\n";
			// let boundaryLast = "--" + boundary + "--\r\n";

			// let body = ["\r\n"];

			// Object.keys(data).forEach((key) => {
			// 	body.push(
			// 		'Content-Disposition: form-data; name="' +
			// 			key +
			// 			'"\r\n\r\n' +
			// 			data[key] +
			// 			"\r\n"
			// 	);
			// });

			// body = body.join(boundaryMiddle) + boundaryLast;

			// Request + Captcha
			let data = {
				name: name.value,
				message: message.value,
				phone: phone.value,
				email: email.value,
				company: company.value,
			};

			let mailUrl = WPJS.ajaxUrl + "?action=send_mail";
			const popup = document.querySelector(".popup-success");
			const captchaError = document.querySelector(".form__captcha-error");

			grecaptcha.ready(function () {
				grecaptcha
					.execute("6LdO_PgZAAAAAEJduEPOiWjE3GuqB4EWc56uuiRF", {
						action: "homepage",
					})
					.then(function (token) {
						document.getElementById("token").value = token;

						let dataForm = new FormData();

						Object.keys(data).forEach((key) => {
							dataForm.append(key, data[key]);
						});

						dataForm.append("upload_file", modalBtn.files[0]);
						dataForm.append("token", token);
						loading.classList.add("active");
						fetch(mailUrl, {
							method: "POST",
							body: dataForm,
						})
							.then((res) => res.json())
							.then(({ send_mess, success, om_score }) => {
								let isError = captchaError.classList.contains("error");

								if (
									send_mess === "true" &&
									success === "true" &&
									om_score >= 0.5
								) {
									if (isError) {
										captchaError.classList.remove("error");
									}
									loading.classList.remove("active");
									popup.classList.add("active");
									form.classList.add("hidden");

									setTimeout(() => {
										popup.classList.remove("active");
										modal.classList.remove("active");
										form.reset();
									}, 2000);
								} else {
									loading.classList.remove("active");
									captchaError.classList.add("error");
								}
							})
							.catch((e) => console.log(e));
					});
			});
		} else {
			error = true;
			name.classList.add("error");
			phone.classList.add("error");
			message.classList.add("error");
		}
	});
})(Navigation, IMask);
