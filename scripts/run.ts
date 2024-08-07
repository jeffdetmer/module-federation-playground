import { spawn } from "node:child_process";

// Function to execute the npm script with the specified filter and command
function executeNpmScript(filter: string, scriptName: string) {
	const command = "pnpm";
	const args = ["--filter", `${filter}-*`, "--parallel", scriptName];

	// Spawn the command
	const child = spawn(command, args, { stdio: "inherit", shell: true });

	// Handle errors
	child.on("error", (error) => {
		console.error(`Error: ${error.message}`);
	});

	// Handle exit
	child.on("exit", (code) => {
		if (code !== 0) {
			console.error(`Command exited with code: ${code}`);
		}
	});
}

// Get the filter and script name from command-line arguments and environment variable
const args = process.argv.slice(2);
if (args.length < 1) {
	console.error("Usage: pnpm run <script-name> <filter>");
	process.exit(1);
}

const filter = args[0];
const scriptName = process.env.npm_lifecycle_event || "build"; // Get the script name from the environment variable

// Execute the script with the provided arguments
executeNpmScript(filter, scriptName);
