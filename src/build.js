import { promises as fs } from "node:fs";
import path from "node:path";
import PptxGenJS from "pptxgenjs";
import { parseLesson } from "./schema.js";
import { resolveImageToLocal } from "./lib/image-cache.js";
import {
  renderBibliographySlide,
  renderFullbleedSlide,
  renderGallerySlide,
  renderTitleSlide
} from "./templates/slides.js";

const INPUT = path.resolve("content/lesson-01.json");
const DIST_DIR = path.resolve("dist");

async function loadLesson() {
  const text = await fs.readFile(INPUT, "utf8");
  const raw = JSON.parse(text);
  return parseLesson(raw);
}

function gatherCreditUrls(lesson) {
  const urls = new Set();

  for (const slide of lesson.slides) {
    if (slide.type === "title" && slide.image?.credit?.url) {
      urls.add(slide.image.credit.url);
    }

    if (slide.type === "fullbleed" && slide.image?.credit?.url) {
      urls.add(slide.image.credit.url);
    }

    if (slide.type === "gallery") {
      for (const image of slide.images) {
        if (image.credit?.url) urls.add(image.credit.url);
      }
    }
  }

  return [...urls];
}

async function build() {
  const lesson = await loadLesson();
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Tananyag pipeline";
  pptx.subject = lesson.title;
  pptx.title = lesson.title;

  const bibliographyUrls = gatherCreditUrls(lesson);

  for (const slide of lesson.slides) {
    if (slide.type === "title") {
      const imagePath = slide.image ? (await resolveImageToLocal(slide.image.url)).path : undefined;
      renderTitleSlide(pptx, slide, imagePath);
      continue;
    }

    if (slide.type === "fullbleed") {
      const imagePath = (await resolveImageToLocal(slide.image.url)).path;
      renderFullbleedSlide(pptx, slide, imagePath);
      continue;
    }

    if (slide.type === "gallery") {
      const paths = await Promise.all(slide.images.map((img) => resolveImageToLocal(img.url).then((res) => res.path)));
      renderGallerySlide(pptx, slide, paths);
      continue;
    }

    if (slide.type === "bibliography") {
      renderBibliographySlide(pptx, slide.title, bibliographyUrls);
      continue;
    }
  }

  const hasBibliography = lesson.slides.some((slide) => slide.type === "bibliography");
  if (!hasBibliography) {
    renderBibliographySlide(pptx, "Felhasznált források", bibliographyUrls);
  }

  await fs.mkdir(DIST_DIR, { recursive: true });
  const outPath = path.join(DIST_DIR, `${lesson.lessonId}.pptx`);
  await pptx.writeFile({ fileName: outPath });

  console.log(`PPTX elkészült: ${outPath}`);
}

build().catch((error) => {
  console.error("Build hiba:", error);
  process.exitCode = 1;
});
