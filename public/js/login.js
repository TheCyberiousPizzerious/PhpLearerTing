const loginForm = document.getElementsByClassName("loginForm")[0];
loginForm.addEventListener('submit', register());

errorElement = document.getElementsByClassName("error-element")[0];

async function login() {
	const formName = document.getElementsByClassName("name-input")[0].value;
	const formPassword = document.getElementsByClassName("password-input")[0].value;

	if (name == '' || password == '') {
		errorElement = "You need to fill in all the fields";
	} else {
		const data = {
			name: formName,
			password: formPassword
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
		const req = await fetch('http://localhost:3000/api/login', configuration);
		console.log(req);
		const json = await req.json();
		console.log(json);
		if (response.status == 200) {
			console.log("user logged in");
			window.location.href = "/tickets.html";
		}
	}
};
