import { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import products from '@/routes/products';

// Impor komponen UI dari shadcn
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
// Impor komponen Card untuk styling yang jauh lebih baik
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// Tipe data untuk form
interface ProductFormData {
    name: string;
    description: string;
    price: number;
    stock: number;
}

// Breadcrumbs untuk halaman Create
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        // Asumsi Anda punya route 'products.index'
        href: (products as any).index?.url() || '/products', 
    },
    {
        title: 'Create',
        href: products.create.url(), // Halaman ini sendiri
    },
];

export default function CreateProduct() {
    const { data, setData, post, processing, errors } = useForm<ProductFormData>({
        name: '',
        description: '',
        price: 0,
        stock: 0,
    });

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // Asumsi route 'products.store' ada
        post((products as any).store.url());
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create A Product" />

            {/* Gunakan 'm-4' agar konsisten dengan halaman Products.tsx Anda
            */}
            <div className="m-4"> 
                {/* Ganti div.bg-white dengan Card dari shadcn/ui.
                  Ini akan otomatis menangani styling light/dark mode.
                  Kita batasi lebarnya agar tidak terlalu lebar di layar besar.
                */}
                <Card className="max-w-3xl mx-auto"> 
                    
                    <CardHeader>
                        <CardTitle>Buat Produk Baru</CardTitle>
                        <CardDescription>
                            Isi detail formulir di bawah ini untuk menambahkan produk baru.
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* Nama Produk */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Produk</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    autoComplete="name"
                                    placeholder="Contoh: Laptop Gaming Pro"
                                />
                                {errors.name && (
                                    <p className="text-sm font-medium text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Deskripsi */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Tulis deskripsi produk di sini..."
                                />
                                {errors.description && (
                                    <p className="text-sm font-medium text-red-500">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Layout Grid untuk Harga dan Stok
                              Agar terlihat rapi berdampingan di layar besar (md)
                            */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Harga */}
                                <div className="space-y-2">
                                    <Label htmlFor="price">Harga</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData('price', parseInt(e.target.value, 10) || 0)}
                                        placeholder="0"
                                    />
                                    {errors.price && (
                                        <p className="text-sm font-medium text-red-500">
                                            {errors.price}
                                        </p>
                                    )}
                                </div>

                                {/* Stok */}
                                <div className="space-y-2">
                                    <Label htmlFor="stock">Stok</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', parseInt(e.target.value, 10) || 0)}
                                        placeholder="0"
                                    />
                                    {errors.stock && (
                                        <p className="text-sm font-medium text-red-500">
                                            {errors.stock}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Tombol Submit */}
                            <div className="flex items-center gap-4 pt-4">
                                <Button disabled={processing}>
                                    {processing ? 'Menyimpan...' : 'Simpan Produk'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}