import React from 'react';
import {Brand} from '@/domain/Brand';
import EditBrandChip from './EditBrandChip';
import AddBrand from "@/components/brands/AddBrand";

interface BrandListProps {
    brands: Brand[];
    onRemoveBrand: (brandId: number) => void;
    onAddBrand: (brand: Brand) => void;
}

export default function EditBrandList({onRemoveBrand, onAddBrand, brands}: BrandListProps) {
    return (
        <div>
            <h2 className="mb-4 text-xl font-semibold text-black">Brands</h2>


            <div className="relative mb-4">
                <AddBrand onClick={onAddBrand} selectedBrands={brands}/>
            </div>


            <div className="mb-6">
                <h3 className="m-1 mb-2 text-sm font-medium text-black">Your brands</h3>
                <div className="flex flex-wrap gap-3">
                    {brands.map(brand => (
                        <EditBrandChip key={brand.id} name={brand.name} label={brand.label} onRemove={onRemoveBrand}
                                       id={brand.id}/>))
                    }
                </div>
            </div>
        </div>
    );
}
