"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ICategory } from "@types";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { UploadProps } from "antd";
import { axiosInstance } from "@utils";
import CategoryCard from "./CategoryCard";
import ButtonGroup from "./ButtonGroup";
import TextArea from "antd/es/input/TextArea";

const initialCategory = {
  name: "",
  description: "",
  imageUrl: "",
  id:""
};

function Category() {
  const [category, setCategory] = useState<ICategory>(initialCategory);
  const [categoryList, setCategoryList] = useState<ICategory[]>();
  const [imageFile, setImageFile] = useState<File | null>();
  const [type, setType] = useState<string>("add");
  const [refresh, setRefresh] = useState<Boolean>(false);
  const { name, description, imageUrl,id } = category;

 
  

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: (file) => {
      console.log("file action on", file);
      setImageFile(file);
      return file.name;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file.error, info.fileList);
      }
      if (status === "done") {
        console.log("done");
      } else if (status === "error") {
        console.log("error", info);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
      setImageFile(e.dataTransfer.files[0]);
    },
  };

  const handleAdd = () => {
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    // Debugging: Log form data entries
    for (const entry of formData.entries()) {
      const [key, value] = entry;
      console.log(key, value);
    }

    console.log("form submit", formData, imageFile);

    axiosInstance
      .post("/category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error making the POST request!", error);
      });
  
  };
  // const handleFilechange = (e: any) => {
  //   if (e.target.files) {
  //     setImageFile(e.target.files[0]);
  //   }
  // };
  const handleClear = () => {
    console.log(category,"form submit", id, imageFile,category.id);
    setCategory(initialCategory);
    setImageFile(null)
  };

  const handleEdit = () => {
    const formData = new FormData();
    console.log(category,"form submit", id, imageFile,category.id);
    formData.append("name", category.name);
    formData.append("description", category.description);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    // Debugging: Log form data entries
    for (const entry of formData.entries()) {
      const [key, value] = entry;
      console.log(key, value);
    }

    
    

    axiosInstance
      .put(`/category/${category.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setRefresh((prev)=>!prev)
        setType("add")
        handleClear()
      })
      .catch((error) => {
        console.error("There was an error making the POST request!", error);
      });
  };

  const handleDelete = () => {
    axiosInstance
      .delete(`/category/${category.id}`)
      .then((response) => {
        console.log(response.data);
        setRefresh((prev)=>!prev)
        setType("add")
        handleClear()
      })
      .catch((error) => {
        console.error("There was an error making the POST request!", error);
      });
  };

  const handleDeletIcon = () => {
    setCategory((prev)=>{return {...prev,imageUrl:""}})
  };

  useEffect(() => {
    axiosInstance
      .get("/category/getAll")
      .then((response) => {
        console.log(response.data);
        setCategoryList(response.data);
      })
      .catch((error) => {
        console.error("There was an error making the POST request!", error);
      });
  }, [refresh]);
  return (
    <div className="grid grid-cols-12 w-full gap-5  ">
      <div className=" px-10 col-span-3">
        <div className="hero__subtitle my-5">Add Category</div>
        <div className="flex flex-col gap-10 mt-10 justify-center ">
          <div>
            <label className="font-light text-black-100 text-md">
              Category Name
            </label>
            <input
              placeholder="Category Name"
              type="text"
              className="search-manufacturer__input "
              value={name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="font-light text-black-100 text-md">
              Description
            </label>
            <textarea
              placeholder="Description"
              // type="text"
              className="h-32 search-manufacturer__textarea "
              value={description}
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
            />
          </div>
          {imageUrl ? (
            <div className="flex justify-center gap-5 items-end">
              <Image
                src={imageUrl}
                width={160}
                height={160}
                alt="Plant"
                className="rounded"
              />
              <div>
                <DeleteOutlined
                  onClick={handleDeletIcon}
                  className="bg-red-400 p-2 w-8 h-8 text-3xl rounded"
                />
              </div>
            </div>
          ) : (
            " "
          )}
          <div>
          <Dragger {...props} className="bg-green-100">
              <p className="ant-upload-drag-icon">
                <InboxOutlined
                  style={{ color: "green" }}
                  className=" text-green-100"
                />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </div>
          <ButtonGroup
            setType={setType}
            type={type}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleClear={handleClear}
          />
        </div>
      </div>
      <div className=" col-span-1 w-[0.1rem] bg-slate-500 opacity-70 mr-10 rounded-full shadow-2xl shadow-slate-900"></div>
      <div className=" col-span-8 w-full ">
        <div className="hero__subtitle my-5">Categories</div>
        <div className="grid grid-cols-3 gap-5 w-full">
          {categoryList?.map((cat,id) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              setImageFile={setImageFile}
              setCategory={setCategory}
              name={cat.name}
              description={cat.description}
              imageUrl={cat.imageUrl && cat.imageUrl}
              setType={setType}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
