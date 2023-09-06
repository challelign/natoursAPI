const swaggerJSDoc = require("swagger-jsdoc");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Your API",
			version: "1.0.0",
			description: "API documentation using Swagger",
		},
		servers: [
			{
				url: "http://localhost:3008/api/v1", // Replace with your actual server URL
				description: "Development server",
			},
		],
	},
	apis: ["./routes/*.js"], // Path to your API routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
