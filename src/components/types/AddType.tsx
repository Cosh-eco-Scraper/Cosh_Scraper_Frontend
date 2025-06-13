import useTypes from "@/hooks/type/useTypes";
import {useState} from "react";


interface AddTypeProps{

}

export default function AddType() {
    const {isLoadingTypes, types} = useTypes();
    const [searchInput, setSearchInput] = useState<string>('');
    return (
        <div className="relative">
            <input
                type="text"
                className="w-full rounded-md border p-2 pr-10"
                placeholder="Search Types"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            {isLoadingTypes ? (
                <div className="absolute right-3 top-3">Loading...</div>
            ) : (
                <div className="absolute left-0 mt-1 w-full rounded-md border bg-white shadow-lg">
                    {types?.map((type) => (
                        <div
                            key={type.id}
                            className="cursor-pointer p-2 hover:bg-gray-100"
                            onClick={() => setSearchInput(type.name)}
                        >
                            {type.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}