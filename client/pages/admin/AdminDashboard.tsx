import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, MessageSquare, HelpCircle, FileText, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: 0,
    testimonials: 0,
    faqs: 0,
    blog: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  const handleLogout = () => {
    fetch("/api/admin/logout", { method: "POST", credentials: "include" }).finally(() => {
      navigate("/admin/login");
    });
  };

  const adminCards = [
    {
      title: "Products",
      description: "Manage product catalog, pricing, and specifications",
      icon: Package,
      href: "/admin/products",
      color: "bg-blue-500",
    },
    {
      title: "Testimonials",
      description: "Add, edit, and organize customer testimonials",
      icon: MessageSquare,
      href: "/admin/testimonials",
      color: "bg-green-500",
    },
    {
      title: "FAQ",
      description: "Manage frequently asked questions and answers",
      icon: HelpCircle,
      href: "/admin/faq",
      color: "bg-purple-500",
    },
    {
      title: "Blog Posts",
      description: "Create and manage blog content and articles",
      icon: FileText,
      href: "/admin/blog",
      color: "bg-orange-500",
    },
  ];

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [productsRes, testimonialsRes, faqsRes, blogRes] = await Promise.all([
          fetch("/api/admin/products", { credentials: "include" }),
          fetch("/api/admin/testimonials", { credentials: "include" }),
          fetch("/api/admin/faqs", { credentials: "include" }),
          fetch("/api/admin/blog", { credentials: "include" }),
        ]);

        const [products, testimonials, faqs, blog] = await Promise.all([
          productsRes.ok ? productsRes.json() : [],
          testimonialsRes.ok ? testimonialsRes.json() : [],
          faqsRes.ok ? faqsRes.json() : [],
          blogRes.ok ? blogRes.json() : [],
        ]);

        setStats({
          products: Array.isArray(products) ? products.length : 0,
          testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
          faqs: Array.isArray(faqs) ? faqs.length : 0,
          blog: Array.isArray(blog) ? blog.length : 0,
        });
      } catch {
        setStats({ products: 0, testimonials: 0, faqs: 0, blog: 0 });
      } finally {
        setLoadingStats(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your website content</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {adminCards.map((card) => (
            <Card key={card.title} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${card.color} text-white mb-4`}>
                  <card.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full group-hover:bg-primary/90">
                  <Link to={card.href}>Manage</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{loadingStats ? "-" : stats.products}</div>
                  <div className="text-sm text-muted-foreground">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{loadingStats ? "-" : stats.testimonials}</div>
                  <div className="text-sm text-muted-foreground">Testimonials</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{loadingStats ? "-" : stats.faqs}</div>
                  <div className="text-sm text-muted-foreground">FAQ Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{loadingStats ? "-" : stats.blog}</div>
                  <div className="text-sm text-muted-foreground">Blog Posts</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
