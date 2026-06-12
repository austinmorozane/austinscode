const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const imageDir = path.join(__dirname, "build/fast_imgs"); // Ensure images are copied to build
const buildCssDir = path.join(__dirname, "build/static/css"); // React build CSS path
const outputFile = path.join(__dirname, "public/assets-to-cache.json");

function getFilesWithHash(directory, basePath) {
  return fs.existsSync(directory)
    ? fs.readdirSync(directory)
        .filter(file => /\.(css|css\.map|png|jpg|jpeg|svg|gif|webp)$/i.test(file)) // Include images & CSS
        .map((file) => {
          const filePath = path.join(directory, file);
          const hash = crypto.createHash("md5").update(fs.readFileSync(filePath)).digest("hex").slice(0, 8);
          return `/${basePath}/${file}?v=${hash}`;
        })
    : [];
}

// Get images and CSS (including .map files) from the React build
const images = getFilesWithHash(imageDir, "fast_imgs");
console.log("Checking Images Directory:", imageDir);
console.log("Files Found:", fs.existsSync(imageDir) ? fs.readdirSync(imageDir) : "Directory Not Found");
const cssFiles = getFilesWithHash(buildCssDir, "static/css");
const assetsToCache = [...images, ...cssFiles];

// Write the asset list to a JSON file
fs.writeFileSync(outputFile, JSON.stringify(assetsToCache, null, 2));

console.log("Assets to Cache:", assetsToCache);
