const generateJWTToken = (user) => {
	const payload = {
		id: user.id,
		username: user.username,
		branch_code: user.branch_code,
		branch: user.branch,
		position: user.position,
	};
	const secret = process.env.JWT_SECRET;
	const token = jwt.sign(payload, secret);
	return token;
};
exports.login = (req, resp) => {
	const { username, password } = req.body;

	axios
		.post("http://10.1.85.11/AbayERP/Webservices/wslogin", {
			username: username,
			password: password,
		})
		.then((res) => {
			if (res.data.message == "SUCCESS") {
				const user = {
					id: res.data.id,
					username: res.data.username,
					branch_code: res.data.branch_code,
					branch: res.data.branch,
					position: res.data.position,
				};

				// Generate a JWT token
				const token = generateJWTToken(user);

				// Set the JWT token in the response
				resp.json({
					success: true,
					token: token,
				});
			} else {
				resp.json({ success: false, msg: "Incorrect username or password" });
			}
		})
		.catch((error) => {
			resp.json({
				success: false,
				msg: "Connection to the ERP database failed",
			});
		});
};

const token = localStorage.getItem("token");

// Set the Authorization header
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// Make a request to the protected API
axios.get("/api/protected").then((res) => {
	// Success!
});
