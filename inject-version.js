const fs = require("fs");
const packageJson = require("./package.json");

// Path where the version will be written
const versionFilePath = "./src/environments/version.ts";
const versionFileContent = `export const version = '${packageJson.version}';\n`;

fs.writeFile(versionFilePath, versionFileContent, (err) => {
    if (err) {
        console.error("Error writing version file:", err);
        return;
    }
    console.log(`Version ${packageJson.version} written to version.ts`);
});
