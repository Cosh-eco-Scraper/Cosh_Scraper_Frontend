import { Brand } from "@/domain/Brand";
import BrandChip from "@/components/brands/BrandChip";

interface BrandListProps {
    brands: Brand[];
}

export default function BrandList({brands}: BrandListProps) {
    return (
        <div>
            <h2 className="mb-4 text-xl font-semibold text-black">Brands</h2>

            <div className="mb-6">
                <h3 className="m-1 mb-2 text-sm font-medium text-black">Your brands</h3>
                <div className="flex flex-wrap gap-3">
                    {brands.map(brand => (
                        <BrandChip key={brand.id} name={brand.name} label={brand.label} id={brand.id}/>
                    ))}
                </div>
            </div>
        </div>
    );
}