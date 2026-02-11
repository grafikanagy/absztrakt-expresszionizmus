import { promises as fs } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const distDir = path.resolve("dist");
const pptxPath = path.join(distDir, "lesson-01.pptx");

function runLibreOffice(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("libreoffice", args, { stdio: "inherit" });

    child.on("error", (err) => reject(err));
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`LibreOffice kilépési kód: ${code}`));
      }
    });
  });
}

async function convert() {
  await fs.access(pptxPath);

  await runLibreOffice([
    "--headless",
    "--convert-to",
    "pdf",
    "--outdir",
    distDir,
    pptxPath
  ]);

  console.log(`PDF elkészült: ${path.join(distDir, "lesson-01.pdf")}`);
}

convert().catch((error) => {
  if (error.code === "ENOENT") {
    console.error("Hiányzik az input PPTX vagy a libreoffice nem érhető el.", error.message);
  } else {
    console.error("PDF konverziós hiba:", error.message);
  }
  process.exitCode = 1;
});
