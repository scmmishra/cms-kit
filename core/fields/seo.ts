import { z } from 'zod/v4'

export const seoFields = {
  metaTitle: z
    .string()
    .min(10, 'Meta title must be at least 10 characters')
    .max(80, 'Meta title should not exceed 80 characters')
    .optional()
    .meta({
      title: 'Meta Title',
      description: 'SEO title for search engines (usually 50-60 characters).',
    }),
  metaDescription: z
    .string()
    .min(20, 'Meta description must be at least 20 characters')
    .max(200, 'Meta description should not exceed 200 characters')
    .optional()
    .meta({
      title: 'Meta Description',
      description:
        'SEO description for search engines (usually 150-160 characters).',
    }),
  metaKeywords: z.string().optional().meta({
    title: 'Meta Keywords',
    description: 'Comma-separated keywords (less important for modern SEO)',
  }),
  canonicalUrl: z.string().url('Must be a valid URL').optional().meta({
    title: 'Canonical URL',
    description: 'Preferred URL version of this content',
  }),
  ogImage: z.string().url('Must be a valid URL').optional().meta({
    title: 'Open Graph Image',
    description: 'Social media preview image. Recommended 1200x630px.',
    fieldType: 'image',
    accept: ['image/png', 'image/jpeg', 'image/webp'],
  }),
  noIndex: z.boolean().default(false).meta({
    title: 'No Index',
    description: 'Prevent search engines from indexing this page',
  }),
  noFollow: z.boolean().default(false).meta({
    title: 'No Follow',
    description: 'Prevent search engines from following links on this page',
  }),
}

export type SeoFields = z.ZodObject<typeof seoFields>
