import { MetadataRoute } from 'next/server';
import { getAllPosts } from 'src/utils/api'; // Import getAllPosts
import slugify from 'src/utils/slugify';     // Import slugify

type Data = { // Re-define Data type
  slugs: (string | string[])[];
  tags: string[];
  categories: (string | string[])[];
};

const generateSiteMap = ({ slugs, categories, tags }: Data) => { // Keep generateSiteMap function
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${process.env.NEXT_PUBLIC_URL}</loc>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_URL}/blog</loc>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_URL}/blog/categories</loc>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_URL}/blog/tags</loc>
      </url>
      ${categories
        .map((category) => {
          return `
        <url>
        <loc><span class="math-inline">\{process\.env\.NEXT\_PUBLIC\_URL\}/blog/categories/</span>{category}</loc>
        </url>
      `;
        })
        .join("")}
      ${tags
        .map((tag) => {
          return `
        <url>
        <loc><span class="math-inline">\{process\.env\.NEXT\_PUBLIC\_URL\}/blog/tags/</span>{tag}</loc>
        </url>
      `;
        })
        .join("")}

      ${slugs
        .map((slug) => {
          return `
        <url>
        <loc><span class="math-inline">\{process\.env\.NEXT\_PUBLIC\_URL\}/blog/posts/</span>{slug}</loc>
        </url>
      `;
        })
        .join("")}
    </urlset>
  `;
};

export async function GET(): Promise<Response> { // Export async GET function
  // Retrieve slugs tags and category from contents folder
  const posts = await getAllPosts(["slug", "tags", "category"]); // Use getAllPosts

  // Generate unique categories and store it in array
  const categories = posts
    .map((post) => slugify(post.category as string))
    .filter((x, i, a) => a.indexOf(x) == i);

  // Generate unique tags and store it in array
  let tags: string[] = [];
  for (let post of posts) {
    if (post.tags) tags.push(...(post.tags as string[]));
  }
  tags = tags.filter((x, i, a) => a.indexOf(x) == i);

  // Generate encoded slugs and store it in array
  const slugs = posts.map((post) =>
    encodeURIComponent((post.slug as string).trim())
  );

  const data = { slugs, tags, categories }; // Create data object

  // Generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(data); // Generate sitemap XML

  return new Response(sitemap, { // Return Response object
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}