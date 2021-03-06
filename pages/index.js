import fs from 'fs';
import path from 'path';
// fs is a library exclusive to Node, so you can't use it directly in the browser. But if you import it at the top of the file and use it in a function that only runs in the server, then Next will remove this import from the client bundle
import matter from 'gray-matter';

import Link from 'next/link';
import Layout from '../components/Layout';
import Post from '../components/Post';

export default function HomePage({ posts }) {
  console.log(posts);

  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-5 font-bold'>Latest Posts</h1>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
      <Link href='/blog'>
        <a className='block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full'>
          All Posts
        </a>
      </Link>
    </Layout>
  );
}

//server side
export async function getStaticProps() {
  // fetching data from our api
  // we CAN use fs here, as this is server, not browser
  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', ''); // remove extension

    // get the frontmatter markdown as string
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );
    // get as object
    const { data: frontmatter } = matter(markdownWithMeta);

    return { slug, frontmatter };
  });

  return {
    props: {
      posts,
    },
  };
}
