const fs = require("fs");
const path = require("path");

function updateReadme(projectDir, readmePath) {
  let folderLinks = [];
  let readmeSections = [];

  let readmeContent = fs.readFileSync(readmePath, "utf-8");
  const placeholder = "<!-- FOLDER LINKS -->";

  const insertPosition =
    readmeContent.indexOf(placeholder) + placeholder.length;

  if (insertPosition === -1) {
    throw new Error("Placeholder <!-- FOLDER LINKS --> not found in README.md");
  }

  const existingLinksRegex =
    /<a\s+href="\.\/([^"]+)\/"\s+style="font-weight:\s+bold;\s+margin-bottom:200px;">❉\s+([^<]+)<\/a><\/br>/g;
  let match;
  while ((match = existingLinksRegex.exec(readmeContent)) !== null) {
    const folderName = match[1];
    const folderTitle = match[2];
    const link = `<a href="./${folderName}/" style="font-weight: bold; margin-bottom:200px;">❉ ${folderTitle}</a></br>`;
    folderLinks.push(link);
  }

  const existingSectionsRegex = /###\s+([^#]+)\n---\n([\s\S]*?)(?=\n###|$)/g;
  while ((match = existingSectionsRegex.exec(readmeContent)) !== null) {
    const sectionTitle = match[1].trim();
    const sectionContent = match[2].trim();
    readmeSections.push(`### ${sectionTitle}\n---\n${sectionContent}`);
  }

  fs.readdirSync(projectDir, { withFileTypes: true }).forEach((dirent) => {
    if (dirent.isDirectory()) {
      const dirName = dirent.name;
      const folderPath = path.join(projectDir, dirName);
      const relativePath = path.relative(projectDir, folderPath);

      if (!folderLinks.some((link) => link.includes(`./${dirName}/`))) {
        const link = `<a href="./${relativePath}/" style="font-weight: bold; margin-bottom:200px;">❉ ${dirName}</a></br>`;
        folderLinks.push(link);
      }

      const folderReadmePath = path.join(folderPath, "README.md");
      if (fs.existsSync(folderReadmePath)) {
        const readmeContent = fs.readFileSync(folderReadmePath, "utf-8").trim();

        if (
          !readmeSections.some((section) =>
            section.includes(`### ${dirName}\n---\n${readmeContent}`)
          )
        ) {
          const readmeSection = `
### ${dirName}
---
${readmeContent}
                    `;
          readmeSections.push(readmeSection);
        }
      }
    }
  });

  const updatedFolderLinks = folderLinks.join("\n");
  const updatedReadmeSections = readmeSections.join("\n");
  const updatedContent =
    readmeContent.slice(0, insertPosition) +
    "\n" +
    updatedFolderLinks +
    "\n" +
    updatedReadmeSections;

  fs.writeFileSync(readmePath, updatedContent, "utf-8");
}

const projectDirectory = path.resolve(__dirname, "../");
const readmeFilePath = path.join(projectDirectory, "README.md");
updateReadme(projectDirectory, readmeFilePath);
