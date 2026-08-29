import type { MetadataRoute } from 'next';
import { SITE } from '@/data/site';
import { EVENTS } from '@/data/events';
import { WORKSHOPS } from '@/data/workshops';
import { PROJECTS } from '@/data/projects';
import { BUILDERS } from '@/data/builders';
import { BLOG_POSTS } from '@/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/events',
    '/workshops',
    '/projects',
    '/blog',
    '/community',
    '/join',
    '/contact',
    '/team',
    '/partners',
    '/faq',
    '/legal/privacy',
    '/legal/terms'
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8
  }));

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...EVENTS.map((item) => `/events/${item.slug}`),
    ...WORKSHOPS.map((item) => `/workshops/${item.slug}`),
    ...PROJECTS.map((item) => `/projects/${item.slug}`),
    ...BUILDERS.map((item) => `/community/${item.username}`),
    ...BLOG_POSTS.map((item) => `/blog/${item.slug}`)
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...dynamicRoutes];
}