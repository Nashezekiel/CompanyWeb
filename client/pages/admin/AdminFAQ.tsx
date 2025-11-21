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
import { FAQ } from "@/data/faq";
import { faqs as initialFAQs } from "@/data/faq";

export default function AdminFAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<FAQ>>({});

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/faqs", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          return;
        }

        const data = (await res.json()) as FAQ[];

        if (!Array.isArray(data) || data.length === 0) {
          setFaqs(initialFAQs);
          await fetch("/api/admin/faqs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ faqs: initialFAQs }),
          });
        } else {
          setFaqs(data);
        }
      } catch {
        // Network error: keep initial FAQs only in memory
      }
    };

    load();
  }, []);

  const saveFAQs = (newFAQs: FAQ[]) => {
    setFaqs(newFAQs);
    fetch("/api/admin/faqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ faqs: newFAQs }),
    }).catch(() => {
      // Ignore network errors: UI list is still updated
    });
  };

  const handleAdd = () => {
    setEditingFAQ(null);
    setFormData({ order: faqs.length + 1 });
    setIsDialogOpen(true);
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFormData(faq);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const newFAQs = faqs.filter(f => f.id !== id);
    saveFAQs(newFAQs);
    toast.success("FAQ deleted successfully");
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newFAQs = [...faqs];
      [newFAQs[index], newFAQs[index - 1]] = [newFAQs[index - 1], newFAQs[index]];
      newFAQs.forEach((f, i) => f.order = i + 1);
      saveFAQs(newFAQs);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < faqs.length - 1) {
      const newFAQs = [...faqs];
      [newFAQs[index], newFAQs[index + 1]] = [newFAQs[index + 1], newFAQs[index]];
      newFAQs.forEach((f, i) => f.order = i + 1);
      saveFAQs(newFAQs);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.question || !formData.answer) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newFAQ: FAQ = {
      id: editingFAQ?.id || `faq-${Date.now()}`,
      question: formData.question!,
      answer: formData.answer!,
      order: formData.order || faqs.length + 1,
    };

    let newFAQs;
    if (editingFAQ) {
      newFAQs = faqs.map(f => f.id === editingFAQ.id ? newFAQ : f);
    } else {
      newFAQs = [...faqs, newFAQ];
    }

    saveFAQs(newFAQs);
    setIsDialogOpen(false);
    setFormData({});
    toast.success(editingFAQ ? "FAQ updated successfully" : "FAQ added successfully");
  };

  const sortedFAQs = [...faqs].sort((a, b) => a.order - b.order);

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
              <h1 className="text-3xl font-bold">Manage FAQ</h1>
              <p className="text-muted-foreground">Add, edit, and reorder frequently asked questions</p>
            </div>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add FAQ
          </Button>
        </div>

        <div className="space-y-4">
          {sortedFAQs.map((faq, index) => (
            <Card key={faq.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-muted-foreground">#{faq.order}</span>
                      <h3 className="font-semibold">{faq.question}</h3>
                    </div>
                    <p className="text-muted-foreground">{faq.answer}</p>
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
                      disabled={index === sortedFAQs.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(faq)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(faq.id)}
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
              <DialogTitle>{editingFAQ ? "Edit FAQ" : "Add New FAQ"}</DialogTitle>
              <DialogDescription>
                {editingFAQ ? "Update the FAQ information" : "Fill in the FAQ details"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Question *</Label>
                <Input
                  id="question"
                  value={formData.question || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                  placeholder="Enter the question"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="answer">Answer *</Label>
                <Textarea
                  id="answer"
                  value={formData.answer || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                  placeholder="Enter the answer"
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingFAQ ? "Update FAQ" : "Add FAQ"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
