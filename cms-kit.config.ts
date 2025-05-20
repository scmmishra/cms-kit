import { z } from 'zod/v4'
import { defineConfig } from '~/core/defineConfig'
import { defineCollection } from '~/core/defineCollection'
import { definePage } from '~/core/definePage'
import { seoFields } from '~/core/fields/seo'

export interface GlobalMeta {
  title?: string
  description?: string
  placeholder?: string
  fieldtype?: 'markdown' | 'textarea' | 'image' | 'code'
  language?: string
  unqiue?: boolean
  relation?: string
}

const authorCollection = defineCollection({
  title: 'Authors',
  description: 'Authors on the website',
  fields: {
    fullName: z.string(),
    avatar: z.url().meta({
      fieldType: 'image',
    }),
    bio: z.string().meta({
      fieldType: 'textarea',
    }),
    slug: z.string().meta({
      unqiue: true,
    }),
  },
  layout: {
    list: ['fullName'],
  },
})

const blogCollection = defineCollection({
  title: 'Blog',
  description: 'A collection for blog posts',
  fields: {
    title: z.string().min(5).max(100).meta({
      description: 'The title of the blog post',
    }),
    slug: z.string().min(5).max(100).meta({
      description: 'URL-friendly version of the title',
      unique: true,
    }),
    content: z.string().min(100).meta({
      description: 'The main content of the blog post',
      fieldtype: 'markdown',
    }),
    excerpt: z.string().max(200).optional().meta({
      description: 'A short summary of the blog post',
      fieldtype: 'textarea',
    }),
    publishedAt: z.date().meta({
      title: 'Published Date',
      description: 'When the post was published',
    }),
    featuredImage: z.string().url().optional().meta({
      description: 'Main image for the blog post',
      fieldtype: 'image',
    }),
    authors: z.array(z.string().meta({
      relation: 'author',
    })),
    ...seoFields,
  },
  layout: {
    list: [
      'title', 'publishedAt',
    ],
    sidebar: [
      'slug',
      'authors',
      'excerpt',
      'publishedAt',
      'featuredImage',
      ...Object.keys(seoFields) as (keyof typeof seoFields)[],
    ],
  },
})

const pricingFaqsCollection = defineCollection({
  title: 'Pricing FAQs',
  fields: {
    question: z.string(),
    answer: z.string().min(100).meta({
      description: 'The answer to the pricing FAQ',
      fieldtype: 'markdown',
    }),
  },
  layout: {
    list: [
      'question',
    ],
  },
})

const homepage = definePage({
  title: 'Homepage',
  fields: {
    hero_title: z.string(),
    hero_subtitle: z.string(),
    features: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().meta({ fieldType: 'code', language: 'svg' }),
    })),
    ...seoFields,
  },
  layout: {
    sidebar: [
      ...Object.keys(seoFields) as (keyof typeof seoFields)[],
    ],
  },
})

const pricing = definePage({
  title: 'Pricing',
  fields: {
    title: z.string(),
    description: z.string(),
    features: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().meta({ fieldType: 'code', language: 'svg' }),
    })),
    ...seoFields,
  },
  layout: {
    sidebar: [
      ...Object.keys(seoFields) as (keyof typeof seoFields)[],
    ],
  },
})

const about = definePage({
  title: 'About',
  fields: {
    title: z.string(),
    body: z.string().meta({ fieldType: 'markdown' }),
    ...seoFields,
  },
  layout: {
    sidebar: [
      ...Object.keys(seoFields) as (keyof typeof seoFields)[],
    ],
  },
})

export default defineConfig({
  appName: 'CMS Kit',
  collections: {
    authors: authorCollection,
    blogs: blogCollection,
    pricingFaqs: pricingFaqsCollection,
  },
  pages: {
    homepage,
    pricing,
    about,
  },
})
