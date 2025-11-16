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

const mmYyyyToDate = (val: string) => {
  const [mm, yyyy] = val.split("/");
  const newDate = new Date(`${yyyy}-${mm}-02`);
  const newDateMm = newDate.getMonth() + 1;
  const newDateYyyy = newDate.getFullYear();
  if (newDateMm !== Number(mm) || newDateYyyy !== Number(yyyy)) {
    throw new Error(`Error parsing date: ${val}`);
  }
  return newDate;
};

const work = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z
      .string()
      .regex(/^\d{2}\/\d{4}$/, "Date must be in MM/YYYY format")
      .transform(mmYyyyToDate),
    dateEnd: z
      .string()
      .refine(
        (val) => val === "Current" || /^\d{2}\/\d{4}$/.test(val),
        "Date must be in MM/YYYY format or 'Current'"
      )
      .transform((val) => (val === "Current" ? "Current" : mmYyyyToDate(val))),
  }),
});

export const collections = { blog, work };
