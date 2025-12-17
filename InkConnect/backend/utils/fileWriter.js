// backend/utils/fileWriter.js
// Node.js core modules demo: writing files

import fs from "fs";
import path from "path";

export const writeFileContent = (filename, content) => {
  const filePath = path.join(process.cwd(), "logs", filename);
  fs.writeFileSync(filePath, content, "utf8");
};
