import HomePage from './home-page';

async function getPosts() {
  // 替换为你的实际 API 端点
  const res = await fetch('https://your-api.com/posts');
  if (!res.ok) {
    // 建议添加错误处理，例如抛出错误或返回空数组
    console.error("Failed to fetch posts:", res.status, res.statusText);
    return []; // 或者 throw new Error('Failed to fetch posts');
  }
  const posts = await res.json();
  return posts;
}

export default async function Page() {
  const blogPosts = await getPosts();

  return (
    <>
      <h1>Homepage (Server Component)</h1>
      <HomePage blogPosts={blogPosts} />
    </>
  );
}