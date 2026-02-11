import { z } from "zod";

const CreditSchema = z
  .object({
    text: z.string().min(1).optional(),
    url: z.string().url().optional()
  })
  .optional();

const ImageSchema = z.object({
  url: z.string().url(),
  caption: z.string().min(1),
  credit: CreditSchema
});

const BaseSlideSchema = z.object({
  type: z.enum(["title", "fullbleed", "gallery", "bibliography"]),
  notes: z.string().optional()
});

const TitleSlideSchema = BaseSlideSchema.extend({
  type: z.literal("title"),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  image: ImageSchema.optional()
});

const FullbleedSlideSchema = BaseSlideSchema.extend({
  type: z.literal("fullbleed"),
  title: z.string().optional(),
  body: z.string().optional(),
  image: ImageSchema
});

const GallerySlideSchema = BaseSlideSchema.extend({
  type: z.literal("gallery"),
  title: z.string().min(1),
  images: z.array(ImageSchema).min(3).max(6)
});

const BibliographySlideSchema = BaseSlideSchema.extend({
  type: z.literal("bibliography"),
  title: z.string().default("Felhasznált források")
});

export const LessonSchema = z.object({
  lessonId: z.string().min(1),
  title: z.string().min(1),
  slides: z
    .array(
      z.discriminatedUnion("type", [
        TitleSlideSchema,
        FullbleedSlideSchema,
        GallerySlideSchema,
        BibliographySlideSchema
      ])
    )
    .min(1)
});

export function parseLesson(raw) {
  return LessonSchema.parse(raw);
}
