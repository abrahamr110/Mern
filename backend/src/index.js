require("dotenv").config();
const app = require("./app");

function main() {
    app.listen(app.get("port"));
    console.log(`Server is running on port ${app.get("port")}`);
}

main();
