import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Inter } from "next/font/google";

// Load the Inter font
const inter = Inter({ subsets: ["latin"] });

// This tells Next.js which pages to generate (e.g., /full-image/dark-grey-v-zip-top)
export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: { id: filename.replace(/\..+$/, "") },
  }));

  return {
    paths,
    fallback: false,
  };
}

// This loads the data for the page (e.g., title, fullImage)
export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "posts", `${params.id}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContents);

  return {
    props: {
      post: {
        title: data.title,
        fullImage: data.fullImage,
      },
    },
  };
}

// This is the actual page that displays the full-sized image
export default function FullImagePage({ post }) {
  return (
    <div
      className={inter.className}
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>{post.title}</h1>
      <img
        src={post.fullImage}
        alt={post.title}
        style={{ maxWidth: "100%", height: "auto", display: "block", margin: "0 auto" }}
      />
    </div>
  );
}