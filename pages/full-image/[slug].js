import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
      fontFamily: "'Inter', sans-serif", // Set font to Inter
    }}>
      <h1 style={{ marginBottom: '20px' }}>{item.title}</h1>
      <img
        src={item.fullImage}
        alt={item.title}
        style={{ maxWidth: '100%', height: 'auto' }} // Plain img tag for simplicity
      />
    </div>
  );
}