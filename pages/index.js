import Head from 'next/head';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ posts }) {
  return (
    <div className={inter.className} style={{ maxWidth: '1200px', margin: 'auto', padding: '20px', fontFamily: 'Inter, sans-serif' }}>
      <Head>
        <title>GCG - Clothing Examples</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 style={{ textAlign: 'center', fontWeight: '600' }}>GCG - Clothing Examples</h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '30px', 
        justifyItems: 'center' 
      }}>
        {posts.map((post, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <a href={post.link} target="_blank" rel="noopener noreferrer" 
               style={{ display: 'block', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.transform = 'scale(1.05)';
                 e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.transform = 'scale(1)';
                 e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.05)';
               }}>
              <Image 
                src={post.thumbnail} 
                alt={post.title} 
                width={250} 
                height={180} 
                style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }} 
              />
            </a>
            <a href={post.link} target="_blank" rel="noopener noreferrer" 
               style={{ display: 'block', marginTop: '10px', fontSize: '18px', textDecoration: 'none', color: 'black', transition: 'color 0.3s ease, transform 0.3s ease' }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.color = '#555';
                 e.currentTarget.style.transform = 'translateY(-2px)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.color = 'black';
                 e.currentTarget.style.transform = 'translateY(0)';
               }}>
              {post.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
      title: data.title,
      thumbnail: data.thumbnail,
      link: data.link,
      date: new Date(data.date).getTime(),
    };
  });

  // Sort posts in reverse chronological order (newest first)
  posts.sort((a, b) => b.date - a.date);

  return {
    props: { posts },
  };
}
