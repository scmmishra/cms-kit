import { z } from 'zod/v4'

export interface GlobalMeta {
  title?: string
  description?: string
  placeholder?: string
  fieldtype?: 'markdown' | 'textarea' | 'image'
  unqiue?: boolean
  relation?: string
}

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
    fieldtype: 'image',
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

export const authorCollection = {
  title: "Authors",
  description: "Authors on the website",
  fields: {
    fullName: z.string(),
    avatar: z.url().meta({
      fieldType: 'image'
    }),
    bio: z.string().meta({
      fieldType: 'textarea'
    }),
    slug: z.string().meta({
      unqiue: true
    }),
  },
  layout: {
    list: ['fullName']
  }
}


export const blogCollection = {
  title: "Blog",
  description: "A collection for blog posts",
  fields: {
    title: z.string().min(5).max(100).meta({
      description: 'The title of the blog post'
    }),
    slug: z.string().min(5).max(100).meta({
      description: 'URL-friendly version of the title',
      unique: true,
    }),
    content: z.string().min(100).meta({
      description: 'The main content of the blog post',
      fieldtype: 'markdown'
    }),
    excerpt: z.string().max(200).optional().meta({
      description: 'A short summary of the blog post',
      fieldtype: 'textarea'
    }),
    publishedAt: z.date().meta({
      title: 'Published Date',
      description: 'When the post was published'
    }),
    featuredImage: z.string().url().optional().meta({
      description: 'Main image for the blog post',
      fieldtype: 'image'
    }),
    authors: z.array(z.string().meta({
      relation: 'author'
    })),
    ...seoFields,
  },
  layout: {
    list: [
      'title', 'publishedAt'
    ],
    sidebar: [
      'slug',
      'author',
      'excerpt',
      'publishedAt',
      'featuredImage',
      ...Object.keys(seoFields)
    ]
  }
}

export default {
  collections: {
    blog: blogCollection
  }
}
