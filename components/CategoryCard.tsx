"use client";

import { useState } from "react";
import Image from "next/image";
import {  DeleteOutlined, EditOutlined } from "@ant-design/icons";

const CategoryCard = ({name,description,imageUrl,setCategory,setImageFile,setType,id,mode}:any) => {

// const handleEdit=()=>{
//   console.log('id:',id);
  
//   setCategory({name,description,imageUrl,id})
//   setType("edit")
//   setImageFile(null)
// }

// const handleDelete=()=>{
//   setCategory({name,description,imageUrl,id})
//   setType("delete")
//   setImageFile(null)
// }
const handleClick=()=>{
  if(mode)return
  setCategory({name,description,imageUrl,id})
  setType("edit")
  setImageFile(null)
  
  
 }
  return (
    <div onClick={handleClick} className="flex flex-col p-4 h-96  items-center text-black-100 bg-primary-blue-100 hover:bg-white hover:shadow-md rounded-3xl ">
      <div className=" text-2xl my-4 flex justify-center font-extrabold">
        {name || "Blooming Flowers"}
      </div>
      <div className="flex h-40">
        <Image
          src={imageUrl && imageUrl}
          width={180}
          height={180}
          alt="Plant"
          className="rounded"
        />
      </div>
      <div className="flex mt-6 text-md text-justify overflow-hidden">
      {description || "Blooming Flowers Green bush plants that are blooming with flowers when at specific time or all over days. Green bush plants that are blooming with flowers whenat specific time or all over days"}
      </div>

    </div>
  );
};

export default CategoryCard;
