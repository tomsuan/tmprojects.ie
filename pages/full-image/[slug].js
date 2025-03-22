import { useRouter } from 'next/router';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'posts', `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents); // Extract frontmatter (title, fullImage, etc.)
  return {
    props: { item: data },
  };
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), 'posts'));
  const paths = files.map((file) => ({
    params: { slug: file.replace('.md', '') },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default function FullImagePage({ item }) {
  if (!item) {
    return <p>Image not found</p>;
  }
  return (
    <div>
      <h1>{item.title}</h1>
      <Image src={item.fullImage} alt={item.title} width={800} height={600} />
    </div>
  );
}