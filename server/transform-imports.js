import fs from 'fs/promises';  // Use fs.promises for async/await
import path from 'path';

// Path to the output folder where SWC compiles the code
const distDir = path.join(process.cwd(), 'dist');

// Function to recursively process all files in the dist directory
const processFiles = async (dir) => {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await processFiles(filePath); // Recurse into directories
    } else if (filePath.endsWith('.js')) {
      // Only modify JS files (transpiled from TypeScript)
      await modifyImports(filePath);
    }
  }
};

// Function to modify import paths in the JS file
const modifyImports = async (filePath) => {
  let fileContent = await fs.readFile(filePath, 'utf8');

  // Replace '.ts' with '.js' in import statements
  fileContent = fileContent.replace(/\.ts/g, '.js');

  // Write the modified content back to the file
  await fs.writeFile(filePath, fileContent, 'utf8');
};

// Start processing from the dist directory
await processFiles(distDir);

console.log('Import paths have been transformed.');
