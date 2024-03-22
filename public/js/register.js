const registerForm = document.getElementsByClassName("registerForm")[0];
registerForm.addEventListener('submit', register);

const errorElement = document.getElementsByClassName("error-element")[0];

fetch('http://localhost:3000/api/jeglever');

async function register() {
	let formName = document.getElementsByClassName("name-input")[0].value;
	let formPassword = document.getElementsByClassName("password-input")[0].value;
	let formEmail = document.getElementsByClassName("email-input")[0].value;
	console.log(formName, formPassword, formEmail);
	if (formName == '' || formPassword == '' || formEmail == '') {
		errorElement.innerHTML = "You need to fill out all the fields";
		return 1;
	} else {
		const data = {
			name: formName,
			password: formPassword,
			email: formEmail
		};
		console.log(data);
		const configuration = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		};
		console.log(configuration);
		const req = fetch('http://localhost:3000/api/register', configuration);
		console.log(req);
		const json = await req.json();
		console.log(json);
		if (response.status == 200) {
			console.log("user registered");
			window.location.href = '/login.html'; //kanskje sette local storage name og pwd og fylle inn for brukeren
		}
	}
};
