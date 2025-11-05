import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import products from '@/routes/products';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

export default function Products() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="products" />
            <div className="m-4">
                <Link href={products.create.url()}><Button>Create Product</Button></Link>
            </div>
        </AppLayout>
    );
}
