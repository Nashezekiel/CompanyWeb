import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2, ArrowLeft, ArrowUp, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Testimonial } from "@/data/testimonials";
import { testimonials as initialTestimonials } from "@/data/testimonials";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Testimonial>>({});

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/testimonials", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          return;
        }

        const data = (await res.json()) as Testimonial[];

        if (!Array.isArray(data) || data.length === 0) {
          setTestimonials(initialTestimonials);
          await fetch("/api/admin/testimonials", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ testimonials: initialTestimonials }),
          });
        } else {
          setTestimonials(data);
        }
      } catch {
        // Network error: keep initial testimonials only in memory
      }
    };

    load();
  }, []);

  const saveTestimonials = (newTestimonials: Testimonial[]) => {
    setTestimonials(newTestimonials);
    fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ testimonials: newTestimonials }),
    }).catch(() => {
      // Ignore network errors: UI list is still updated
    });
  };

  const handleAdd = () => {
    setEditingTestimonial(null);
    setFormData({ order: testimonials.length + 1 });
    setIsDialogOpen(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData(testimonial);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const newTestimonials = testimonials.filter(t => t.id !== id);
    saveTestimonials(newTestimonials);
    toast.success("Testimonial deleted successfully");
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newTestimonials = [...testimonials];
      [newTestimonials[index], newTestimonials[index - 1]] = [newTestimonials[index - 1], newTestimonials[index]];
      newTestimonials.forEach((t, i) => t.order = i + 1);
      saveTestimonials(newTestimonials);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < testimonials.length - 1) {
      const newTestimonials = [...testimonials];
      [newTestimonials[index], newTestimonials[index + 1]] = [newTestimonials[index + 1], newTestimonials[index]];
      newTestimonials.forEach((t, i) => t.order = i + 1);
      saveTestimonials(newTestimonials);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.quote || !formData.name) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newTestimonial: Testimonial = {
      id: editingTestimonial?.id || `testimonial-${Date.now()}`,
      quote: formData.quote!,
      name: formData.name!,
      role: formData.role || "",
      company: formData.company || "",
      order: formData.order || testimonials.length + 1,
      rating: formData.rating ? Math.max(1, Math.min(5, formData.rating)) : 5,
    };

    let newTestimonials;
    if (editingTestimonial) {
      newTestimonials = testimonials.map(t => t.id === editingTestimonial.id ? newTestimonial : t);
    } else {
      newTestimonials = [...testimonials, newTestimonial];
    }

    saveTestimonials(newTestimonials);
    setIsDialogOpen(false);
    setFormData({});
    toast.success(editingTestimonial ? "Testimonial updated successfully" : "Testimonial added successfully");
  };

  const sortedTestimonials = [...testimonials].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm">
              <Link to="/admin/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Manage Testimonials</h1>
              <p className="text-muted-foreground">Add, edit, and reorder customer testimonials</p>
            </div>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Testimonial
          </Button>
        </div>

        <div className="space-y-4">
          {sortedTestimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-muted-foreground">#{testimonial.order}</span>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      {testimonial.role && (
                        <span className="text-sm text-muted-foreground">- {testimonial.role}</span>
                      )}
                    </div>
                    {testimonial.company && (
                      <p className="text-sm text-primary mb-2">{testimonial.company}</p>
                    )}
                    <div className="mb-2 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`h-4 w-4 ${i < (testimonial.rating || 5) ? 'fill-yellow-400' : 'fill-muted/30'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === sortedTestimonials.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(testimonial)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(testimonial.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
              <DialogDescription>
                {editingTestimonial ? "Update the testimonial information" : "Fill in the testimonial details"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quote">Quote *</Label>
                <Textarea
                  id="quote"
                  value={formData.quote || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, quote: e.target.value }))}
                  placeholder="Enter the testimonial quote"
                  rows={3}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Customer name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={formData.role || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    placeholder="Job title or role"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Company name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min={1}
                  max={5}
                  value={formData.rating ?? 5}
                  onChange={(e) => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
