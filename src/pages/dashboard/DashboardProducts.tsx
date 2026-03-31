import * as React from "react";
import { getProducts, deleteProduct, CATEGORIES, BRANDS, addProduct, updateProduct, deleteAllProducts, resetToSeed } from "@/data/storeService";
import type { Product } from "@/data/storeService";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, X, Search, Package } from "lucide-react";

export function DashboardProducts() {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [search, setSearch] = React.useState("");
    const [showForm, setShowForm] = React.useState(false);
    const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
    const [confirmAction, setConfirmAction] = React.useState<{ type: 'delete' | 'edit' | 'reset' | 'deleteAll', id?: string, product?: Product } | null>(null);

    const reload = () => setProducts(getProducts());
    React.useEffect(() => { reload(); }, []);

    const proceedAction = () => {
        if (!confirmAction) return;

        if (confirmAction.type === 'delete' && confirmAction.id) {
            deleteProduct(confirmAction.id);
            reload();
        } else if (confirmAction.type === 'edit' && confirmAction.product) {
            setEditingProduct(confirmAction.product);
            setShowForm(true);
        } else if (confirmAction.type === 'reset') {
            resetToSeed();
            reload();
        } else if (confirmAction.type === 'deleteAll') {
            deleteAllProducts();
            reload();
        }
        setConfirmAction(null);
    };

    const filtered = products.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.brand.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id: string) => {
        setConfirmAction({ type: 'delete', id });
    };

    const handleEdit = (product: Product) => {
        setConfirmAction({ type: 'edit', product });
    };

    const handleAdd = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingProduct(null);
        reload();
    };

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("en-RW").format(price) + " FRW";

    return (
        <div className="space-y-6 max-w-6xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-black text-[#ffffff] tracking-tight" style={{ fontFamily: 'var(--font-brand-origin)' }}>
                        Products
                    </h1>
                    <p className="text-sm text-[#ffffff]/40 brand-tagline mt-1">
                        {products.length} products in your store
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        onClick={() => setConfirmAction({ type: 'reset' })}
                        variant="outline"
                        className="border-[#ffffff]/10 text-[#ffffff]/60 hover:bg-[#ffffff]/5 font-bold brand-tagline rounded-xl"
                    >
                        Reset Store
                    </Button>
                    <Button
                        onClick={() => setConfirmAction({ type: 'deleteAll' })}
                        variant="destructive"
                        className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border-red-500/20 font-bold brand-tagline rounded-xl"
                    >
                        Delete All
                    </Button>
                    <Button
                        onClick={handleAdd}
                        className="bg-[#f2d975] text-[#1a1a1b] hover:bg-[#caa149] font-bold brand-tagline gap-2 rounded-xl"
                    >
                        <Plus className="size-4" /> Add Product
                    </Button>
                </div>
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#ffffff]/30" />
                <Input
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff] placeholder:text-[#ffffff]/25 rounded-xl brand-tagline"
                />
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-[#ffffff]/5 bg-[#ffffff]/[0.02] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-xs text-[#ffffff]/30 border-b border-[#ffffff]/5 brand-tagline">
                                <th className="text-left px-6 py-3 font-medium">Product</th>
                                <th className="text-left px-6 py-3 font-medium">Brand</th>
                                <th className="text-left px-6 py-3 font-medium">Category</th>
                                <th className="text-left px-6 py-3 font-medium">Price</th>
                                <th className="text-left px-6 py-3 font-medium">Stock</th>
                                <th className="text-right px-6 py-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((product) => (
                                <tr key={product.id} className="border-b border-[#ffffff]/5 last:border-0 hover:bg-[#ffffff]/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg overflow-hidden bg-[#ffffff]/5 shrink-0">
                                                <img src={product.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-sm font-bold text-[#ffffff]/80 brand-tagline truncate max-w-[200px]">
                                                {product.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#ffffff]/50 brand-tagline">{product.brand}</td>
                                    <td className="px-6 py-4 text-sm text-[#ffffff]/50 brand-tagline">{product.categoryName}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-[#ffffff]/80">{formatPrice(product.price)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-sm font-bold ${product.stockQuantity > 10 ? 'text-emerald-400' : product.stockQuantity > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                                            {product.stockQuantity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="h-8 w-8 rounded-lg flex items-center justify-center text-[#ffffff]/30 hover:text-[#f2d975] hover:bg-[#f2d975]/10 transition-colors"
                                            >
                                                <Pencil className="size-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="h-8 w-8 rounded-lg flex items-center justify-center text-[#ffffff]/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                            >
                                                <Trash2 className="size-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <div className="p-10 text-center">
                        <Package className="size-8 text-[#ffffff]/10 mx-auto mb-3" />
                        <p className="text-[#ffffff]/30 text-sm brand-tagline">No products found</p>
                    </div>
                )}
            </div>

            {/* Product Form Modal */}
            {showForm && (
                <ProductFormModal product={editingProduct} onClose={handleFormClose} />
            )}

            {/* Global Confirmation Modal */}
            {confirmAction && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setConfirmAction(null)} />
                    <div className="relative bg-[#0f0f10] border border-[#ffffff]/10 rounded-2xl w-full max-w-sm p-6 text-center space-y-4">
                        <div className="flex flex-col items-center gap-3">
                            <div className={cn(
                                "size-12 rounded-full flex items-center justify-center",
                                confirmAction.type === 'delete' || confirmAction.type === 'deleteAll' ? "bg-red-500/10 text-red-500" : "bg-[#f2d975]/10 text-[#f2d975]"
                            )}>
                                {confirmAction.type === 'delete' || confirmAction.type === 'deleteAll' ? <Trash2 className="size-6" /> : <Pencil className="size-6" />}
                            </div>
                            <h3 className="text-lg font-black text-[#ffffff]" style={{ fontFamily: 'var(--font-brand-origin)' }}>
                                {confirmAction.type === 'delete' ? "Delete Product?" :
                                    confirmAction.type === 'edit' ? "Edit Product?" :
                                        confirmAction.type === 'reset' ? "Reset Everything?" : "Delete ALL Products?"}
                            </h3>
                            <p className="text-sm text-[#ffffff]/40 brand-tagline">
                                {confirmAction.type === 'delete' ? "Are you sure? This product will be permanently removed." :
                                    confirmAction.type === 'edit' ? "Are you sure you want to modify this product?" :
                                        confirmAction.type === 'reset' ? "This will restore original mock data and wipe your changes." : "DANGER: This will delete every single product in your store."}
                            </p>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button variant="ghost" onClick={() => setConfirmAction(null)} className="flex-1 text-[#ffffff]/50 brand-tagline rounded-xl border border-white/5">
                                Cancel
                            </Button>
                            <Button
                                onClick={proceedAction}
                                variant={confirmAction.type === 'delete' || confirmAction.type === 'deleteAll' ? "destructive" : "default"}
                                className={cn(
                                    "flex-1 font-bold brand-tagline rounded-xl",
                                    confirmAction.type === 'delete' || confirmAction.type === 'deleteAll' ? "" : "bg-[#f2d975] text-[#1a1a1b] hover:bg-[#caa149]"
                                )}
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ─── Product Form Modal ─── */
function ProductFormModal({
    product,
    onClose,
}: {
    product: Product | null;
    onClose: () => void;
}) {
    const isEditing = !!product;

    const [form, setForm] = React.useState({
        name: product?.name || "",
        description: product?.description || "",
        price: product?.price?.toString() || "",
        oldPrice: product?.oldPrice?.toString() || "",
        discountPercentage: product?.discountPercentage?.toString() || "",
        brand: product?.brand || BRANDS[0],
        categorySlug: product?.categorySlug || CATEGORIES[0].slug,
        image: product?.image || "",
        stockQuantity: product?.stockQuantity?.toString() || "0",
        isNew: product?.isNew ?? true,
        storePhone: product?.storePhone || "+250788123456",
    });

    const [specs, setSpecs] = React.useState<{ key: string; value: string }[]>(
        product?.specs || [{ key: "", value: "" }]
    );

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check file size (limit to 2MB for Base64 efficiency in localStorage)
        if (file.size > 2 * 1024 * 1024) {
            alert("Image too large. Please select an image under 2MB.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setForm(prev => ({ ...prev, image: reader.result as string }));
        };
        reader.readAsDataURL(file);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSpecChange = (idx: number, field: "key" | "value", val: string) => {
        setSpecs((prev) => prev.map((s, i) => (i === idx ? { ...s, [field]: val } : s)));
    };

    const addSpec = () => setSpecs((prev) => [...prev, { key: "", value: "" }]);
    const removeSpec = (idx: number) => setSpecs((prev) => prev.filter((_, i) => i !== idx));

    const selectedCategory = CATEGORIES.find((c) => c.slug === form.categorySlug);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            name: form.name,
            description: form.description,
            price: parseInt(form.price) || 0,
            oldPrice: form.oldPrice ? parseInt(form.oldPrice) : undefined,
            discountPercentage: form.discountPercentage ? parseInt(form.discountPercentage) : undefined,
            brand: form.brand,
            categorySlug: form.categorySlug,
            categoryName: selectedCategory?.name || "",
            image: form.image,
            galleryImages: form.image ? [form.image] : [],
            specs: specs.filter((s) => s.key && s.value),
            stockQuantity: parseInt(form.stockQuantity) || 0,
            isNew: form.isNew,
            storePhone: form.storePhone,
        };

        if (isEditing && product) {
            updateProduct(product.id, data);
        } else {
            addProduct(data);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70" onClick={onClose} />
            <div className="relative bg-[#0f0f10] border border-[#ffffff]/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-[#0f0f10] px-6 py-4 flex items-center justify-between border-b border-[#ffffff]/5 z-10">
                    <h2 className="text-lg font-black text-[#ffffff]" style={{ fontFamily: 'var(--font-brand-origin)' }}>
                        {isEditing ? "Edit Product" : "Add Product"}
                    </h2>
                    <button onClick={onClose} className="text-[#ffffff]/30 hover:text-[#ffffff]">
                        <X className="size-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#ffffff]/40 brand-tagline">Product Name *</label>
                        <Input
                            name="name" value={form.name} onChange={handleChange} required
                            className="bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff] rounded-xl brand-tagline"
                            placeholder="e.g. iPhone 16 Pro Max"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#ffffff]/40 brand-tagline">Description</label>
                        <textarea
                            name="description" value={form.description} onChange={handleChange}
                            className="w-full min-h-[80px] px-3 py-2 bg-[#ffffff]/5 border border-[#ffffff]/10 text-[#ffffff] rounded-xl text-sm brand-tagline resize-none focus:outline-none focus:border-[#f2d975]/50"
                            placeholder="Product description..."
                        />
                    </div>

                    {/* Price + Old Price + Discount */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#ffffff]/40 brand-tagline">Price (FRW) *</label>
                            <Input
                                name="price" type="number" value={form.price} onChange={handleChange} required
                                className="bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff] rounded-xl brand-tagline"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#ffffff]/40 brand-tagline">Old Price</label>
                            <Input
                                name="oldPrice" type="number" value={form.oldPrice} onChange={handleChange}
                                className="bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff] rounded-xl brand-tagline"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#ffffff]/40 brand-tagline">Discount %</label>
                            <Input
                                name="discountPercentage" type="number" value={form.discountPercentage} onChange={handleChange}
                                className="bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff] rounded-xl brand-tagline"
                            />
                        </div>
                    </div>

                    {/* Brand + Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#ffffff]/40 brand-tagline">Brand *</label>
                            <Input
                                name="brand" value={form.brand} onChange={handleChange} required
                                className="bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff] rounded-xl brand-tagline"
                                placeholder="e.g. Apple, Samsung, Google"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#ffffff]/40 brand-tagline">Category *</label>
                            <select
                                name="categorySlug" value={form.categorySlug} onChange={handleChange}
                                className="w-full h-10 px-3 bg-[#ffffff]/5 border border-[#ffffff]/10 text-[#ffffff] rounded-xl text-sm brand-tagline focus:outline-none"
                            >
                                {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Image + Stock */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#ffffff]/40 brand-tagline">Product Hub (URL or Upload) *</label>
                            <div className="flex gap-2">
                                <Input
                                    name="image" value={form.image} onChange={handleChange} required
                                    className="bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff] rounded-xl brand-tagline flex-1 text-xs truncate"
                                    placeholder="https://..."
                                />
                                <Button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-[#ffffff]/5 border border-[#ffffff]/10 text-[#ffffff]/70 hover:bg-[#ffffff]/10 font-bold brand-tagline rounded-xl px-3 whitespace-nowrap"
                                >
                                    Upload
                                </Button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                            {form.image && (
                                <div className="mt-2 h-20 w-20 rounded-xl overflow-hidden border border-[#ffffff]/10 bg-[#ffffff]/5">
                                    <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                        <div className="space-y-1.5 flex flex-col justify-end">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#ffffff]/40 brand-tagline">Stock *</label>
                            <Input
                                name="stockQuantity" type="number" value={form.stockQuantity} onChange={handleChange}
                                className="bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff] rounded-xl brand-tagline"
                            />
                        </div>
                    </div>

                    {/* Is New toggle */}
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={form.isNew}
                            onChange={(e) => setForm((prev) => ({ ...prev, isNew: e.target.checked }))}
                            className="h-4 w-4 rounded accent-[#f2d975]"
                        />
                        <span className="text-sm text-[#ffffff]/60 brand-tagline">Mark as NEW</span>
                    </label>

                    {/* Specs */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#ffffff]/40 brand-tagline">Specifications</label>
                            <button type="button" onClick={addSpec} className="text-xs text-[#f2d975] hover:underline brand-tagline">
                                + Add Spec
                            </button>
                        </div>
                        {specs.map((spec, idx) => (
                            <div key={idx} className="flex gap-2">
                                <Input
                                    placeholder="Key (e.g. Storage)"
                                    value={spec.key}
                                    onChange={(e) => handleSpecChange(idx, "key", e.target.value)}
                                    className="bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff] rounded-xl brand-tagline"
                                />
                                <Input
                                    placeholder="Value (e.g. 256GB)"
                                    value={spec.value}
                                    onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
                                    className="bg-[#ffffff]/5 border-[#ffffff]/10 text-[#ffffff] rounded-xl brand-tagline"
                                />
                                <button type="button" onClick={() => removeSpec(idx)} className="text-[#ffffff]/20 hover:text-red-400 shrink-0">
                                    <X className="size-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-[#ffffff]/5">
                        <Button type="button" variant="ghost" onClick={onClose} className="flex-1 text-[#ffffff]/50 brand-tagline rounded-xl">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-[#f2d975] text-[#1a1a1b] hover:bg-[#caa149] font-bold brand-tagline rounded-xl"
                        >
                            {isEditing ? "Update Product" : "Add Product"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
