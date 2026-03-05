import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";

const renderMarkdown = (md: string) => {
  // Simple markdown to HTML
  return md
    .split("\n\n")
    .map((block) => {
      if (block.startsWith("### ")) return `<h3 class="text-lg font-semibold text-foreground mt-6 mb-2">${block.slice(4)}</h3>`;
      if (block.startsWith("## ")) return `<h2 class="text-xl font-bold text-foreground mt-8 mb-3">${block.slice(3)}</h2>`;
      if (block.startsWith("- ")) {
        const items = block.split("\n").map((l) => `<li class="ml-4">${l.replace(/^- /, "")}</li>`).join("");
        return `<ul class="list-disc space-y-1 text-muted-foreground">${items}</ul>`;
      }
      return `<p class="text-muted-foreground leading-relaxed">${block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')}</p>`;
    })
    .join("");
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
          <button onClick={() => navigate("/blog")} className="text-primary hover:underline">← Back to Blog</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <button onClick={() => navigate("/blog")} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </button>

        <img src={post.cover} alt={post.title} className="w-full h-64 sm:h-80 object-cover rounded-xl mb-8" />

        <time className="text-sm text-muted-foreground">
          {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </time>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-8">{post.title}</h1>

        <div className="prose-custom space-y-4" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
      </article>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
