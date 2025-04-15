import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContextDefinition';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location])

    return showSearch && visible ? (
        <div className='border-y bg-gray-50 text-center border-gray-300'>
            <div className='inline-flex items-center justify-center border boder-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 border-gray-300'>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className='flex-1 outline-none bg-inherit text-sm' placeholder='Search' />
                <img className='w-4 cursor-pointer' src={assets.search_icon} alt="" />
            </div>
            <img onClick={() => setShowSearch(false)} className="inline w-3 cursor-pointer" src={assets.cross_icon} alt="" />
        </div>
    ) : null
}

export default SearchBar