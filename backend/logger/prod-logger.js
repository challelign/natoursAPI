const { format, createLogger, transports } = require("winston");
const { timestamp, combine, errors, json } = format;
const fs = require("fs");
const path = require("path");

const logPath = "logsError"; // Folder name for logs

// Create the logs folder if it doesn't exist
if (!fs.existsSync(logPath)) {
	fs.mkdirSync(logPath);
}

// Set up log file paths
const errorLogPath = path.join(logPath, "error.log");
const combinedLogPath = path.join(logPath, "combined.log");
const customLogPath = path.join(logPath, "custom.log");

function buildProdLogger() {
	return createLogger({
		format: combine(timestamp(), errors({ stack: true }), json()),
		defaultMeta: { service: "user-service" },

		transports: [
			// new transports.Console(),
			// new transports.File({ filename: "error.log", level: "error" }),
			// new transports.File({ filename: "combined.log" }),
			new transports.Console(),
			new transports.File({ filename: errorLogPath, level: "error" }),
			new transports.File({ filename: combinedLogPath }),
			new transports.File({ filename: customLogPath, level: "debug" }),
		],
	});
}

module.exports = buildProdLogger;
