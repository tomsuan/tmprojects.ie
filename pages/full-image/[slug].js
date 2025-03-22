import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Image from 'next/image';

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'posts', `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '20px',
    }}>
      <h1 style={{ marginBottom: '20px', fontSize: '2rem', fontWeight: '600' }}>{item.title}</h1>
      <Image
        src={item.fullImage}
        alt={item.title}
        width={800}
        height={600}
        style={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
        }}
      />
    </div>
  );
}