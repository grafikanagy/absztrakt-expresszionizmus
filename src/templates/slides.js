import { GRID, THEME, TYPO } from "./layout.js";

function addCaption(slide, caption, x, y, w) {
  slide.addText(caption, {
    x,
    y,
    w,
    h: 0.38,
    fontFace: THEME.fontFace,
    fontSize: TYPO.captionSize,
    color: THEME.captionColor,
    bold: false,
    valign: "mid",
    align: "left"
  });
}

function attachNotes(slide, noteLines) {
  const lines = noteLines.filter(Boolean);
  if (lines.length > 0) {
    slide.addNotes(lines.join("\n"));
  }
}

function creditLine(image) {
  if (image.credit?.url) {
    return `Credit: ${image.credit.url}`;
  }
  if (image.credit?.text) {
    return `Credit: ${image.credit.text}`;
  }
  return null;
}

export function renderTitleSlide(pptx, data, imagePath) {
  const slide = pptx.addSlide();
  slide.background = { color: THEME.backgroundColor };

  if (imagePath) {
    slide.addImage({ path: imagePath, x: 0, y: 0, w: GRID.slideW, h: GRID.slideH, sizing: { type: "cover", x: 0, y: 0, w: GRID.slideW, h: GRID.slideH } });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: GRID.slideW,
      h: GRID.slideH,
      fill: { color: "000000", transparency: 38 },
      line: { color: "000000", transparency: 100 }
    });
  }

  slide.addText(data.title, {
    x: GRID.marginX,
    y: 2.3,
    w: GRID.slideW - GRID.marginX * 2,
    h: 1,
    fontFace: THEME.fontFace,
    fontSize: TYPO.titleSize,
    bold: true,
    color: imagePath ? "FFFFFF" : THEME.titleColor,
    align: "center"
  });

  if (data.subtitle) {
    slide.addText(data.subtitle, {
      x: GRID.marginX,
      y: 3.45,
      w: GRID.slideW - GRID.marginX * 2,
      h: 0.7,
      fontFace: THEME.fontFace,
      fontSize: TYPO.subtitleSize,
      color: imagePath ? "F3F4F6" : THEME.textColor,
      align: "center"
    });
  }

  const notes = [data.notes, data.image ? creditLine(data.image) : null];
  attachNotes(slide, notes);
}

export function renderFullbleedSlide(pptx, data, imagePath) {
  const slide = pptx.addSlide();
  slide.addImage({ path: imagePath, x: 0, y: 0, w: GRID.slideW, h: GRID.slideH, sizing: { type: "cover", x: 0, y: 0, w: GRID.slideW, h: GRID.slideH } });

  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 5.5,
    w: GRID.slideW,
    h: 2,
    fill: { color: "000000", transparency: 36 },
    line: { color: "000000", transparency: 100 }
  });

  if (data.title) {
    slide.addText(data.title, {
      x: GRID.marginX,
      y: 5.7,
      w: GRID.slideW - GRID.marginX * 2,
      h: 0.6,
      fontFace: THEME.fontFace,
      fontSize: 24,
      bold: true,
      color: "FFFFFF"
    });
  }

  if (data.body) {
    slide.addText(data.body, {
      x: GRID.marginX,
      y: 6.3,
      w: GRID.slideW - GRID.marginX * 2,
      h: 0.7,
      fontFace: THEME.fontFace,
      fontSize: TYPO.bodySize,
      color: "F9FAFB"
    });
  }

  addCaption(slide, data.image.caption, GRID.marginX, 7.02, GRID.slideW - GRID.marginX * 2);
  const notes = [data.notes, creditLine(data.image)];
  attachNotes(slide, notes);
}

function galleryGrid(count) {
  if (count <= 4) {
    return { cols: 2, rows: 2 };
  }
  return { cols: 3, rows: 2 };
}

export function renderGallerySlide(pptx, data, imagePaths) {
  const slide = pptx.addSlide();
  slide.background = { color: "FFFFFF" };
  slide.addText(data.title, {
    x: GRID.marginX,
    y: GRID.marginY,
    w: GRID.slideW - GRID.marginX * 2,
    h: 0.6,
    fontFace: THEME.fontFace,
    fontSize: 24,
    bold: true,
    color: THEME.titleColor
  });

  const { cols, rows } = galleryGrid(data.images.length);
  const top = 1.15;
  const gridH = GRID.slideH - top - GRID.marginY;
  const cellW = (GRID.slideW - GRID.marginX * 2 - GRID.gutter * (cols - 1)) / cols;
  const cellH = (gridH - GRID.gutter * (rows - 1)) / rows;

  data.images.forEach((image, index) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    const x = GRID.marginX + col * (cellW + GRID.gutter);
    const y = top + row * (cellH + GRID.gutter);

    const imgH = cellH - 0.42;
    slide.addImage({
      path: imagePaths[index],
      x,
      y,
      w: cellW,
      h: imgH,
      sizing: { type: "cover", x, y, w: cellW, h: imgH }
    });
    addCaption(slide, image.caption, x, y + imgH + 0.04, cellW);
  });

  const credits = [...new Set(data.images.map((img) => img.credit?.url).filter(Boolean))].map((url) => `Credit: ${url}`);
  attachNotes(slide, [data.notes, ...credits]);
}

export function renderBibliographySlide(pptx, title, urls) {
  const slide = pptx.addSlide();
  slide.background = { color: "FFFFFF" };

  slide.addText(title, {
    x: GRID.marginX,
    y: GRID.marginY,
    w: GRID.slideW - GRID.marginX * 2,
    h: 0.7,
    fontFace: THEME.fontFace,
    fontSize: 26,
    bold: true,
    color: THEME.titleColor
  });

  const bullets = urls.length > 0 ? urls : ["Nincs megadott URL forrás."];
  slide.addText(
    bullets.map((url) => ({
      text: url,
      options: { bullet: { indent: 14 } }
    })),
    {
      x: GRID.marginX,
      y: 1.35,
      w: GRID.slideW - GRID.marginX * 2,
      h: GRID.slideH - 1.7,
      fontFace: THEME.fontFace,
      fontSize: TYPO.bibliographySize,
      color: THEME.textColor,
      breakLine: true
    }
  );

  attachNotes(slide, [`Bibliography entries: ${bullets.length}`]);
}
