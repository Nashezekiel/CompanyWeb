import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { blogPosts as initialBlogPosts } from "@/data/blog";
import { getStored } from "@/lib/storage";

export default function BlogTeaser() {
  const [posts, setPosts] = useState(initialBlogPosts);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const stored = getStored("adminBlogPosts", initialBlogPosts);
    setPosts(stored);
  }, []);

  const topPosts = useMemo(() => {
    const copy = [...posts];
    copy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return copy.slice(0, 3);
  }, [posts]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const first = el.querySelector('[data-slide]') as HTMLElement | null;
      const cardW = first?.offsetWidth ?? el.clientWidth;
      const gap = 16;
      const idx = Math.round(el.scrollLeft / (cardW + gap));
      setActive(Math.max(0, Math.min(topPosts.length - 1, idx)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [topPosts.length]);

  const goTo = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector('[data-slide]') as HTMLElement | null;
    const cardW = first?.offsetWidth ?? el.clientWidth;
    const gap = 16;
    el.scrollTo({ left: idx * (cardW + gap), behavior: 'smooth' });
    setActive(idx);
  };
  const prev = () => goTo(Math.max(0, active - 1));
  const next = () => goTo(Math.min(topPosts.length - 1, active + 1));

  return (
    <section className="py-16">
      <div className="container">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold">From the Blog</h2>
          <p className="mt-2 text-foreground/70">Insights on Starlink deployments, long-range WiFi, and connectivity best practices.</p>
        </div>

        <div ref={scrollerRef} className="relative mx-auto max-w-[1100px] flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:gap-6 xl:gap-8 md:overflow-visible">
          {topPosts.map((post) => (
            <div key={post.id} data-slide className="min-w-full snap-center md:min-w-0 md:w-auto">
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={`${post.title} - Starlink Installation Nigeria Blog`}
                    className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    width="400"
                    height="176"
                  />
                  <div className="absolute top-3 left-3">
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
                    <Button asChild variant="ghost" size="sm" className="hover:bg-blue-600 hover:text-white">
                      <Link to="/blog">Read More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Mobile dots */}
        <div className="mt-3 flex items-center justify-center gap-2 md:hidden" aria-label="Blog pagination">
          {topPosts.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 w-2 min-h-0 min-w-0 p-0 rounded-full transition-all ${i === active ? 'bg-primary' : 'bg-foreground/30'}`}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link to="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
