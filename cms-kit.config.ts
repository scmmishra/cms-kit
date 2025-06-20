import { z } from 'zod/v4'
import { defineConfig } from '~/core/defineConfig'
import { defineCollection } from '~/core/defineCollection'
import { definePage } from '~/core/definePage'
import { seoFields } from '~/core/fields/seo'

export interface GlobalMeta {
  title?: string
  description?: string
  placeholder?: string
  fieldType?: 'markdown' | 'textarea' | 'image' | 'code'
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
      placeholder: 'Enter a slug',
      unique: true,
    }),
    content: z.string().min(100).meta({
      description: 'The main content of the blog post',
      fieldType: 'markdown',
    }),
    excerpt: z.string().max(200).optional().meta({
      description: 'A short summary of the blog post',
      fieldType: 'textarea',
    }),
    publishedAt: z.iso.date().meta({
      title: 'Published Date',
      description: 'When the post was published',
    }),
    featuredImage: z.string().url().optional().meta({
      description: 'Main image for the blog post',
      fieldType: 'image',
      accept: ['image/png', 'image/jpeg', 'image/webp'],
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
  description: 'FAQs to be listed in the pricing page',
  fields: {
    question: z.string(),
    answer: z.string().min(100).meta({
      description: 'The answer to the pricing FAQ',
      fieldType: 'markdown',
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
    heroTitle: z.string(),
    heroSubtitle: z.string().meta({ fieldType: 'textarea' }),
    featuresTitle: z.string().min(10).max(40),
    featuresBody: z.string().meta({ fieldType: 'markdown' }),
    closing: z.string().meta({ fieldType: 'markdown' }),
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
    howThisWorks: z.string().meta({ fieldType: 'markdown' }),
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
