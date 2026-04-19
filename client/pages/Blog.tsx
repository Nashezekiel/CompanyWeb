import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { blogPosts as initialBlogPosts, BlogPost } from "@/data/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BRAND_NAME, SITE_URL } from "@/lib/site";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/blog");
        if (!res.ok) return;
        const data = (await res.json()) as BlogPost[];
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
        }
      } catch {
        // Keep initialBlogPosts on network failure
      }
    };

    load();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    for (const p of posts) set.add(p.category);
    return Array.from(set);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, posts]);

  const featuredPost = useMemo(() => posts.find((p) => p.featured), [posts]);
  const regularPosts = useMemo(() => filteredPosts.filter((p) => !p.featured), [filteredPosts]);

  const isExpanded = (id: number) => expandedId === id;
  const toggleExpanded = (id: number) => setExpandedId((prev) => (prev === id ? null : id));

  const articleSchemas = useMemo(
    () =>
      posts.slice(0, 6).map((post) => ({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        datePublished: post.date,
        author: {
          "@type": "Person",
          name: post.author,
        },
        publisher: {
          "@type": "Organization",
          name: BRAND_NAME,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/starlinklogo.png`,
          },
        },
        mainEntityOfPage: `${SITE_URL}/blog/${post.id}`,
        url: `${SITE_URL}/blog/${post.id}`,
        inLanguage: "en-NG",
      })),
    [posts, SITE_URL]
  );

  const blogSchema = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "DataGram — Starlink guides & Nigeria connectivity tips",
        description:
          "Starlink services, installation guides, WISP business advice, and connectivity best practices for Nigeria and West Africa.",
        url: `${SITE_URL}/blog`,
        inLanguage: "en-NG",
      },
      ...articleSchemas,
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${SITE_URL}/blog`,
          },
        ],
      },
    ],
    [SITE_URL, articleSchemas]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Seo
        title="Starlink Nigeria Guides & Tips | DataGram Blog"
        description="Long-tail Starlink Nigeria guides: setup, WiFi extension, WISP tips, and power resilience—written by DataGram installers. Bookmark for updates."
        canonical="/blog"
        schema={blogSchema}
        keywords={["how to set up Starlink in Nigeria", "Starlink monthly subscription Nigeria", "Starlink installation Nigeria"]}
      />
      <section className="relative overflow-hidden py-20">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-background"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        />
        <motion.div
          className="pointer-events-none absolute -top-16 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.8, 1.05, 0.8] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container relative z-10">
          <ScrollReveal className="mx-auto max-w-3xl text-center" delay={0.1}>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Insights <span className="text-primary">&amp;</span> <span className="text-primary">Resources</span>
            </h1>
            <p className="mt-6 text-lg text-foreground/70 max-w-2xl mx-auto">
              Learn about Starlink in Africa, how to start a WISP business, and practical guides for extending WiFi across large properties.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <ScrollReveal className="flex flex-wrap justify-center gap-3" delay={0.1}>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategory(category);
                  setExpandedId(null);
                }}
                className="transition-all hover:scale-105"
              >
                {category}
              </Button>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {featuredPost && selectedCategory === "All" && expandedId === null && (
        <section className="py-8">
          <div className="container">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Featured Article</h2>
              <div className="w-20 h-1 bg-primary rounded-full" />
            </div>
            <ScrollReveal delay={0.1}>
              <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-64 md:h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                    </div>
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-3 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </CardTitle>
                  <CardDescription className="text-base mb-6">
                    {featuredPost.excerpt}
                  </CardDescription>
                  {isExpanded(featuredPost.id) && featuredPost.content && (
                    <div className="prose prose-sm max-w-none text-foreground/80 mb-6 whitespace-pre-line">
                      {featuredPost.content}
                    </div>
                  )}
                  <Button onClick={() => toggleExpanded(featuredPost.id)} className="w-fit transition-colors hover:bg-blue-600 hover:text-white">
                    {isExpanded(featuredPost.id) ? "Show Less" : "Read More"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  </CardContent>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </section>
      )}

      <section className="py-8">
        <div className="container">
          {expandedId === null ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post, index) => (
                <ScrollReveal key={post.id} delay={index * 0.08}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 card-hover">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-4 text-sm text-foreground/60 mb-2">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription>
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-foreground/60">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                        <Button onClick={() => toggleExpanded(post.id)} variant="ghost" size="sm" className="hover:bg-blue-600 hover:text-white">
                          {isExpanded(post.id) ? "Show Less" : "Read More"}
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
              <div>
                {(() => {
                  const allInScope = selectedCategory === "All" ? initialBlogPosts : initialBlogPosts.filter((p) => p.category === selectedCategory);
                  const post = allInScope.find((p) => p.id === expandedId) || initialBlogPosts.find((p) => p.id === expandedId!);
                  if (!post) return null;
                  return (
                    <ScrollReveal>
                      <Card className="overflow-hidden">
                        <div className="relative overflow-hidden">
                          <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
                          <div className="absolute top-4 left-4">
                            <Badge variant="secondary">{post.category}</Badge>
                          </div>
                        </div>
                        <CardHeader>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 mb-2">
                            <div className="flex items-center gap-1"><User className="h-4 w-4" />{post.author}</div>
                            <div className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(post.date).toLocaleDateString()}</div>
                            <div className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readTime}</div>
                          </div>
                          <CardTitle className="text-2xl">{post.title}</CardTitle>
                          <CardDescription className="mt-2">{post.excerpt}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {post.content && (
                            <div className="prose max-w-none text-foreground/80 whitespace-pre-line mb-6">
                              {post.content}
                            </div>
                          )}
                          {post.sections && post.sections.length > 0 && (
                            <div className="space-y-6">
                              {post.sections.map((s, i) => (
                                <div key={i}>
                                  <h3 className="text-xl font-semibold mb-2">{s.heading}</h3>
                                  {s.content && <p className="text-foreground/80 mb-2">{s.content}</p>}
                                  {s.points && s.points.length > 0 && (
                                    <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                                      {s.points.map((pt, idx) => (
                                        <li key={idx}>{pt}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="mt-6">
                            <Button onClick={() => setExpandedId(null)} className="hover:bg-blue-600 hover:text-white">Close</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  );
                })()}
              </div>

              <aside className="space-y-4">
                {(selectedCategory === "All" ? initialBlogPosts : initialBlogPosts.filter((p) => p.category === selectedCategory))
                  .filter((p) => p.id !== expandedId)
                  .map((p, index) => (
                    <ScrollReveal key={p.id} delay={index * 0.06}>
                      <Card className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex gap-3">
                          <img src={p.image} alt={p.title} className="w-24 h-24 object-cover" />
                          <div className="py-3 pr-3 flex-1">
                            <div className="text-xs text-foreground/60 mb-1">{p.category}</div>
                            <div className="font-medium line-clamp-2">{p.title}</div>
                            <div className="text-xs text-foreground/60 mt-1">{new Date(p.date).toLocaleDateString()}</div>
                            <div className="mt-2">
                              <Button onClick={() => toggleExpanded(p.id)} variant="ghost" size="sm" className="hover:bg-blue-600 hover:text-white">Read</Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </ScrollReveal>
                  ))}
              </aside>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
