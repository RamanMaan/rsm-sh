import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
  }),
});

const work = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z
      .string()
      .regex(/^\d{2}\/\d{4}$/, "Date must be in MM/YYYY format")
      .transform((val) => new Date(`01/${val}`)),
    dateEnd: z
      .string()
      .refine(
        (val) => val === "Current" || /^\d{2}\/\d{4}$/.test(val),
        "Date must be in MM/YYYY format or 'Current'"
      )
      .transform((val) =>
        val === "Current" ? "Current" : new Date(`01/${val}`)
      ),
  }),
});

export const collections = { blog, work };
