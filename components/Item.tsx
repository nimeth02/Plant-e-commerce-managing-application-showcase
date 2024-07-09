"use client";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { Checkbox, ConfigProvider, Select, UploadProps } from "antd";
import { ICategory, IItem } from "@types";
import ItemCard from "./ItemCard";
import ButtonGroup from "./ButtonGroup";
import { axiosInstance } from "@utils";
import Image from "next/image";
const initialItem = {
  id: "",
  name: "",
  subName: "",
  description: "",
  category: "",
  categoryName: "",
  quantity: "",
  unitPrice: "",
  newReleased:false,
  bestSelling:false,
  imageUrl: [],

};
function Item() {
  const [item, setItem] = useState<IItem>(initialItem);
  const [itemList, setItemList] = useState<IItem[]>();
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [categoryList, setCategoryList] = useState<ICategory[]>();
  const [type, setType] = useState<string>("add");
  const [refresh, setRefresh] = useState<Boolean>(false);
  const { name, description, subName, category, quantity, unitPrice,newReleased,bestSelling } = item;

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: (file) => {
      console.log("file action on", file);
      setImageFile([...imageFile, file]);
      return file.name;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        // message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
      setImageFile([...imageFile, e.dataTransfer.files[0]]);
    },
  };

  const handleAdd = () => {
    const formData = new FormData();
    formData.append("name", item.name);
    formData.append("description", item.description);
    formData.append("subName", item.subName);
    formData.append("category", item.category);
    formData.append("unitPrice", item.unitPrice);
    formData.append("quantity", item.quantity); 
    formData.append("newReleased", item.newReleased.toString());
    formData.append("bestSelling", item.bestSelling.toString());
    for (let i = 0; i < imageFile.length; i++) {
      formData.append("imageFile", imageFile[i]);
    }

    // Debugging: Log form data entries
    for (const entry of formData.entries()) {
      const [key, value] = entry;
      console.log(key, value);
    }

    console.log("form submit", formData, imageFile);

    axiosInstance
      .post("/item", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setRefresh((prev) => !prev);
        setType("add");
        handleClear();
      })
      .catch((error) => {
        console.error("There was an error making the POST request!", error);
      });
  };

  const handleClear = () => {
    //console.log(category,"form submit", id, imageFile,category.id);
    setItem(initialItem);
    setImageFile([])
  };

  const handleEdit = () => {
    const formData = new FormData();
    formData.append("name", item.name);
    formData.append("description", item.description);
    formData.append("subName", item.subName);
    formData.append("category", item.category);
    formData.append("unitPrice", item.unitPrice);
    formData.append("quantity", item.quantity);
    formData.append("newReleased", item.newReleased.toString());
    formData.append("bestSelling", item.bestSelling.toString());
    item.imageUrl.forEach(imageUrl => {
      formData.append("imageUrl", imageUrl);
    });
    for (let i = 0; i < imageFile.length; i++) {
      formData.append("imageFile", imageFile[i]);
    }

    // Debugging: Log form data entries
    for (const entry of formData.entries()) {
      const [key, value] = entry;
      console.log(key, value);
    }
    axiosInstance
      .put(`/item/${item.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setRefresh((prev) => !prev);
        setType("add");
        handleClear();
      })
      .catch((error) => {
        console.error("There was an error making the POST request!", error);
      });
  };

  const handleDelete = () => {
    axiosInstance
      .delete(`/item/${item.id}`)
      .then((response) => {
        console.log(response.data);
        setRefresh((prev) => !prev);
        setType("add");
        handleClear();
      })
      .catch((error) => {
        console.error("There was an error making the POST request!", error);
      });
  };

  const handleDeletIcon = (img:string) => {
    console.log("img",img)
    setItem((prev)=>{
      return {...prev,imageUrl:prev.imageUrl.filter((i)=> i != img)}
    })
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
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/item/getAll")
      .then((response) => {
        console.log(response.data);
        const items = response.data.map((item: any) => ({
          ...item,
          newReleased: item.newReleased === "true",
          bestSelling: item.bestSelling === "true",
        }));
        setItemList(items);
      })
      .catch((error) => {
        console.error("There was an error making the POST request!", error);
      });
  }, [refresh]);

  return (
    <div className="grid grid-cols-12 w-full gap-5  ">
      <div className=" px-10 col-span-3">
        <div className="hero__subtitle my-5">Add Item</div>
        <div className="flex flex-col gap-10 mt-10 justify-center ">
          <div>
            <label className="font-light text-black-100 text-md">
              Item Name
            </label>
            <input
              placeholder="Category Name"
              type="text"
              className="search-manufacturer__input "
              value={name}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
            />
          </div>
          <div>
            <label className="font-light text-black-100 text-md ">
              Item SubName
            </label>
            <input
              placeholder="Category Name"
              type="text"
              className="search-manufacturer__input "
              value={subName}
              onChange={(e) => setItem({ ...item, subName: e.target.value })}
            />
          </div>
          <div>
            <label className="font-light text-black-100 text-md mb-2">
              Category
            </label>

            <Select
              className="w-full rounded-lg bg-green-50"
              style={{
                width: "full",
                color: "green",
                backgroundColor: "rgb(240 253 244 / var(--tw-bg-opacity))",
              }}
              onChange={(value) => setItem({ ...item, category: value })}
              value={category}
              options={
                categoryList
                  ? categoryList.map((c) => ({ value: c.id, label: c.name }))
                  : []
              }
            />
          </div>
          <div className="flex justify-between">
            <div>
              <Checkbox className="bg-green-50"
              onChange={(e) => setItem({ ...item, newReleased:e.target.checked})}
              checked={newReleased}
              >
                New released
              </Checkbox>
            </div>
            <div>
              <Checkbox className="bg-green-50"
              onChange={(e) => setItem({ ...item, bestSelling:e.target.checked })}
              checked={bestSelling}
              >
                 Best selling
              </Checkbox>
            </div>
          </div>
          <div>
            <label className="font-light text-black-100 text-md">
              Item quantity
            </label>
            <input
              placeholder="Category Name"
              type="text"
              className="search-manufacturer__input "
              value={quantity}
              onChange={(e) => setItem({ ...item, quantity: e.target.value })}
            />
          </div>
          <div>
            <label className="font-light text-black-100 text-md">
              Item unitPrice
            </label>
            <input
              placeholder="Category Name"
              type="text"
              className="search-manufacturer__input "
              value={unitPrice}
              onChange={(e) => setItem({ ...item, unitPrice: e.target.value })}
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
                setItem({ ...item, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-center gap-8">
            {item.imageUrl.map((img) => (
              <div key={img} className="flex justify-center gap-10 items-end">
                <Image
                  src={img}
                  width={180}
                  height={180}
                  alt="Plant"
                  className="rounded"
                />
                <div>
                  <DeleteOutlined
                    onClick={()=>handleDeletIcon(img)}
                    className="bg-red-400 p-2 w-12 h-12 text-3xl rounded"
                  />
                </div>
              </div>
            ))}
          </div>
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
      <div className="col-span-1 w-[0.1rem] bg-slate-500 opacity-70 mr-10 rounded-full shadow-2xl shadow-slate-900"></div>
      <div className=" col-span-8 w-full ">
        <div className="hero__subtitle my-5">Items</div>
        <div className="grid grid-cols-4 gap-5 w-full">
          {itemList &&
            itemList.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                setImageFile={setImageFile}
                setItem={setItem}
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
                setType={setType}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Item;
