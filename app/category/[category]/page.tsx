"use client"
import CategoryCard from '@components/CategoryCard';
import ItemCard from '@components/ItemCard';
import { ICategory, IItem } from '@types';
import { axiosInstance } from '@utils';
import React, { useEffect, useState } from 'react'

const initialCategory = {
  name: "",
  description: "",
  imageUrl: "",
  id:""
};

function CategoryWiseItems({ params }:any) {
  console.log(params.category,'params');
  const [category, setCategory] = useState<ICategory>(initialCategory);
  const [itemList, setItemList] = useState<IItem[]>([]);

  const getCategorys=()=>{
    axiosInstance
    .get(`/category/${params.category}`)
    .then((response) => {
      console.log(response.data);
      setCategory(response.data);
    })
    .catch((error) => {
      console.error("There was an error making the GET request!", error);
    });
  }

  const getCategoryWiseItem=()=>{
    axiosInstance
    .get(`/item/categorywiseitem/${params.category}`)
    .then((response) => {
      console.log(response.data);
      setItemList(response.data);
    })
    .catch((error) => {
      console.error("There was an error making the GET request!", error);
    });
  }

useEffect(()=>{
 getCategorys()
 getCategoryWiseItem()
},[])
  return (
    <div className='grid grid-cols-12 w-full gap-5 my-10 '>
      <div className="flex flex-col items-center justify-center py-10 px-10 col-span-3">
      <CategoryCard
              id={category.id}
              name={category.name}
              mode={true}
              description={category.description}
              imageUrl={category.imageUrl && category.imageUrl}
            />
      </div>
      <div className=" col-span-1 w-[0.1rem] bg-slate-500 opacity-70 mr-10 rounded-full shadow-2xl shadow-slate-900"></div>
      <div className=" col-span-8 w-full ">
        <div className="hero__subtitle my-5">Items</div>
        <div className="grid grid-cols-5 gap-5 w-full">
        {itemList &&
            itemList.map((item) => (
              <ItemCard
              key={item.id}
              id={item.id}
              mode={true}
              name={item.name}
              subName={item.subName}
              description={item.description}
              categoryName={item.categoryName}
              unitPrice={item.unitPrice}
              category={item.category}
              quantity={item.quantity}
              bestSelling={item.bestSelling}
              newReleased={item.newReleased}
              imageUrl={item.imageUrl && item.imageUrl}
             
            />
            ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryWiseItems