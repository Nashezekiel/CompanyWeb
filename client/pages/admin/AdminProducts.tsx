import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { products as initialProducts } from "@/data/products";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/products", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          // If unauthorized or error, keep initialProducts as a fallback
          return;
        }

        const data = (await res.json()) as Product[];

        if (!Array.isArray(data) || data.length === 0) {
          // Seed server with initialProducts on first use
          setProducts(initialProducts);
          await fetch("/api/admin/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ products: initialProducts }),
          });
        } else {
          setProducts(data);
        }
      } catch {
        // Network error: keep initial products in memory only
      }
    };

    load();
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    // Persist to server JSON store
    fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ products: newProducts }),
    }).catch(() => {
      // Ignore network errors here; UI state is still updated
    });
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({});
    setIsDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const newProducts = products.filter(p => p.id !== id);
    saveProducts(newProducts);
    toast.success("Product deleted successfully");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.short || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    const images = (formData.images || []).filter((u) => !!u);
    const image = formData.image || images[0];

    const newProduct: Product = {
      id: editingProduct?.id || `product-${Date.now()}`,
      slug: editingProduct?.slug || formData.name?.toLowerCase().replace(/\s+/g, '-') || '',
      name: formData.name!,
      price: formData.price!,
      short: formData.short!,
      description: formData.description!,
      specs: formData.specs || {},
      whatsInBox: formData.whatsInBox || [],
      installationAvailable: formData.installationAvailable || '',
      ...(image ? { image } : {}),
      ...(images.length ? { images } : {}),
    };

    let newProducts;
    if (editingProduct) {
      newProducts = products.map(p => p.id === editingProduct.id ? newProduct : p);
    } else {
      newProducts = [...products, newProduct];
    }

    saveProducts(newProducts);
    setIsDialogOpen(false);
    setFormData({});
    toast.success(editingProduct ? "Product updated successfully" : "Product added successfully");
  };

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
              <h1 className="text-3xl font-bold">Manage Products</h1>
              <p className="text-muted-foreground">Add, edit, and delete products</p>
            </div>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="text-primary font-semibold">{product.price}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{product.short}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
              <DialogDescription>
                {editingProduct ? "Update the product information" : "Fill in the product details"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    value={formData.price || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="Enter price"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="short">Short Description *</Label>
                <Input
                  id="short"
                  value={formData.short || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, short: e.target.value }))}
                  placeholder="Brief product description"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Full Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed product description"
                  rows={4}
                  required
                />
              </div>

              {/* Images management */}
              <div className="space-y-2">
                <Label>Images</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Paste image URL and click Add"
                    value={(formData as any)._newImage || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, _newImage: e.target.value } as any))}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const url = (formData as any)._newImage?.trim();
                      if (!url) return;
                      setFormData(prev => ({
                        ...prev,
                        images: [...(prev.images || []), url],
                        _newImage: "",
                      } as any));
                    }}
                  >
                    Add
                  </Button>
                </div>
                {formData.images && formData.images.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">Click Set as cover to use as primary image.</div>
                    <div className="grid grid-cols-3 gap-3">
                      {formData.images.map((url, i) => (
                        <div key={i} className="rounded border p-2 flex flex-col items-center gap-2">
                          <img src={url} alt={`img-${i}`} className="h-20 w-full object-cover rounded" />
                          <div className="flex gap-2">
                            <Button type="button" size="sm" variant="outline" onClick={() => {
                              // Set as cover by moving to front
                              const imgs = [...(formData.images || [])];
                              imgs.splice(i, 1);
                              imgs.unshift(url);
                              setFormData(prev => ({ ...prev, images: imgs, image: url }));
                            }}>Set as cover</Button>
                            <Button type="button" size="sm" variant="outline" onClick={() => {
                              const imgs = (formData.images || []).filter((_, idx) => idx !== i);
                              setFormData(prev => ({ ...prev, images: imgs }));
                            }}>
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="Enter image URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="installationAvailable">Installation Available</Label>
                <Input
                  id="installationAvailable"
                  value={formData.installationAvailable || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, installationAvailable: e.target.value }))}
                  placeholder="Installation details"
                />
              </div>

              {/* Specs key/value editor */}
              <div className="space-y-2">
                <Label>Specifications</Label>
                <div className="grid gap-2">
                  {Object.entries(formData.specs || {}).map(([k, v], i) => (
                    <div key={i} className="grid grid-cols-2 gap-2">
                      <Input
                        value={k}
                        onChange={(e) => {
                          const entries = Object.entries(formData.specs || {});
                          entries[i][0] = e.target.value;
                          setFormData(prev => ({ ...prev, specs: Object.fromEntries(entries) }));
                        }}
                        placeholder="Key"
                      />
                      <div className="flex gap-2">
                        <Input
                          value={v}
                          onChange={(e) => {
                            const entries = Object.entries(formData.specs || {});
                            entries[i][1] = e.target.value;
                            setFormData(prev => ({ ...prev, specs: Object.fromEntries(entries) }));
                          }}
                          placeholder="Value"
                        />
                        <Button type="button" variant="outline" onClick={() => {
                          const entries = Object.entries(formData.specs || {});
                          entries.splice(i, 1);
                          setFormData(prev => ({ ...prev, specs: Object.fromEntries(entries) }));
                        }}>Remove</Button>
                      </div>
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={(formData as any)._specKey || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, _specKey: e.target.value } as any))}
                      placeholder="New key"
                    />
                    <div className="flex gap-2">
                      <Input
                        value={(formData as any)._specVal || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, _specVal: e.target.value } as any))}
                        placeholder="New value"
                      />
                      <Button type="button" variant="outline" onClick={() => {
                        const k = (formData as any)._specKey?.trim();
                        const v = (formData as any)._specVal?.trim();
                        if (!k || !v) return;
                        setFormData(prev => ({
                          ...prev,
                          specs: { ...(prev.specs || {}), [k]: v },
                          _specKey: "",
                          _specVal: "",
                        } as any));
                      }}>Add</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's in the box list */}
              <div className="space-y-2">
                <Label>What's in the box</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add item"
                    value={(formData as any)._boxItem || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, _boxItem: e.target.value } as any))}
                  />
                  <Button type="button" onClick={() => {
                    const item = (formData as any)._boxItem?.trim();
                    if (!item) return;
                    setFormData(prev => ({
                      ...prev,
                      whatsInBox: [ ...(prev.whatsInBox || []), item ],
                      _boxItem: "",
                    } as any));
                  }}>Add</Button>
                </div>
                {(formData.whatsInBox || []).length > 0 && (
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {(formData.whatsInBox || []).map((i, idx) => (
                      <li key={idx} className="flex items-center justify-between gap-2">
                        <span>{i}</span>
                        <Button type="button" size="sm" variant="outline" onClick={() => {
                          const arr = (formData.whatsInBox || []).filter((_, j) => j !== idx);
                          setFormData(prev => ({ ...prev, whatsInBox: arr }));
                        }}>Remove</Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProduct ? "Update Product" : "Add Product"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
