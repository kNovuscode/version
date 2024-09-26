Here’s a comprehensive Markdown documentation for setting up a pre-commit hook in your Angular project to automatically bump the version and expose it in your application. You can save this as `README.md` or any relevant documentation file in your project directory.

---

# Angular Versioning with Pre-Commit Hook

This documentation outlines how to automatically update the version of your Angular application in `package.json` whenever you make a commit. It also explains how to expose this version to your Angular application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup Pre-Commit Hook](#setup-pre-commit-hook)
3. [Update `package.json`](#update-packagejson)
4. [Expose the Version in Angular](#expose-the-version-in-angular)
   - [Option 1: Using the Environment File](#option-1-using-the-environment-file)
5. [Usage](#usage)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

- Ensure you have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed.
- An existing Angular project initialized with Git.

## Setup Pre-Commit Hook

To automatically bump the version of your Angular application before every commit, follow these steps:

### 1. Create a Pre-Commit Hook

1. Navigate to your project's `.git/hooks/` directory:

   ```bash
   cd .git/hooks/
   ```

2. Create a new file named `pre-commit`:

   ```bash
   touch pre-commit
   ```

### 2. Write the Hook Script

Add the following content to the `pre-commit` file to automatically bump the version:

```bash
#!/bin/sh
npm version patch --no-git-tag-version
git add package.json package-lock.json
```

- This command bumps the patch version without creating a Git tag.
- The updated `package.json` and `package-lock.json` are automatically staged for commit.

### 3. Make the Hook Executable

Ensure the hook is executable by running:

```bash
chmod +x pre-commit
```

## Update `package.json`

Ensure that your version number is stored in the `package.json` file. This is typically created when initializing a new Angular project.

Example `package.json`:

```json
{
  "name": "your-angular-app",
  "version": "1.0.0", // Version number
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test"
  },
  "dependencies": {
    "@angular/core": "^15.0.0",
    "@angular/common": "^15.0.0"
  },
  "devDependencies": {
    "@angular/cli": "^15.0.0",
    "typescript": "~4.8.0"
  }
}
```

## Expose the Version in Angular

You will need to fetch the version from the `package.json` file and expose it to your Angular application. This can be done using Angular's build process with the help of environment files.

### Option 1: Using the Environment File

#### 1. Update Angular's Build Process

You will need to add a script that copies the version number from `package.json` into your environment files.

1. **Install the built-in `fs` package** (if not already installed):

   ```bash
   npm install --save-dev fs
   ```

2. **Create a Script to Inject the Version**:

   Create a file named `inject-version.js` in the root of your project:

   ```bash
   touch inject-version.js
   ```

3. **Add the Following Code to `inject-version.js`**:

   ```javascript
   const fs = require("fs");
   const packageJson = require("./package.json");

   const versionFilePath = "./src/environments/version.ts";
   const versionFileContent = `export const version = '${packageJson.version}';\n`;

   fs.writeFile(versionFilePath, versionFileContent, (err) => {
     if (err) {
       return console.log(err);
     }
     console.log(`Version ${packageJson.version} written to version.ts`);
   });
   ```

#### 2. Add a Build Step to Your Scripts

Modify `package.json` to include the script in the build process:

```json
"scripts": {
  "postinstall": "node ./inject-version.js",
  "ng": "ng",
  "start": "npm run postinstall && ng serve",
  "build": "npm run postinstall && ng build",
  "test": "ng test"
}
```

## Usage

1. After setting up the above scripts and hooks, you can now commit your changes. Every time you commit, the patch version will automatically be bumped, and the new version will be reflected in the `src/environments/version.ts` file.

2. To display the version in your Angular application, import the version in your component:

   ```typescript
   // app.component.ts
   import { Component } from "@angular/core";
   import { version } from "../environments/version";

   @Component({
     selector: "app-root",
     templateUrl: "./app.component.html",
     styleUrls: ["./app.component.css"],
   })
   export class AppComponent {
     appVersion = version; // Assign the version to a class variable
   }
   ```

3. In your component template (`app.component.html`), display the version:

   ```html
   <div>
     <p>Application Version: {{ appVersion }}</p>
   </div>
   ```

## Troubleshooting

- **Version not updating**: Ensure the `pre-commit` hook is executable and the script is correctly written.
- **Check console for errors**: If the version does not appear in your Angular app, check the console for any errors during the build process.
- **Verify the generated `version.ts` file**: Ensure that `src/environments/version.ts` contains the correct version after a commit.
- **Restart the Angular server**: If changes do not reflect, try stopping and restarting the Angular development server.

---

This documentation provides a step-by-step guide to automate versioning in your Angular application using Git hooks and ensure the version is displayed correctly in your UI. Adjust any paths or configurations as needed for your specific project setup.
