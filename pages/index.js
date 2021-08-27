import fs from 'fs';
import path from 'path';
// fs is a library exclusive to Node, so you can't use it directly in the browser. But if you import it at the top of the file and use it in a function that only runs in the server, then Next will remove this import from the client bundle
import matter from 'gray-matter';

import Layout from '../components/Layout';

export default function HomePage({ posts }) {
  console.log(posts);

  return (
    <Layout>
      <h1>Hello World</h1>
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
