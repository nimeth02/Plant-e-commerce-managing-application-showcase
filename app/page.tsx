"use client";
import { HomeProps, ICategory, IItem } from "@types";
import { Hero } from "@components";
import CategoryCard from "@components/CategoryCard";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import { axiosInstance } from "@utils";
import ItemCard from "@components/ItemCard";
import { useRouter } from "next/navigation";
// import { Carousel } from "react-responsive-carousel";

export default function Home() {
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [newitemList, setNewItemList] = useState<IItem[]>([]);
  const [bestitemList, setBestItemList] = useState<IItem[]>([]);  // Initialize as an empty array

  const router = useRouter();

  const getCategorys=()=>{
    axiosInstance
    .get("/category/getAll")
    .then((response) => {
      console.log(response.data);
      setCategoryList(response.data);
    })
    .catch((error) => {
      console.error("There was an error making the GET request!", error);
    });
  }

  const getNewReleased=()=>{
    axiosInstance
    .get("/item/getNewRelease")
    .then((response) => {
      console.log(response.data);
      setNewItemList(response.data);
    })
    .catch((error) => {
      console.error("There was an error making the GET request!", error);
    });
  }

  const getBestselling=()=>{
    axiosInstance
    .get("/item/getBestSelling")
    .then((response) => {
      console.log(response.data);
      setBestItemList(response.data);
    })
    .catch((error) => {
      console.error("There was an error making the GET request!", error);
    });
  }
  useEffect(() => {
    getCategorys()
    getNewReleased()
    getBestselling()
  }, []);

const handleCategroyItem=(id:any)=>{
  router.push(`/category/${id}`);
}

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 px-8 padding-y max-width" id="discover">
        <div className="my-4 flex flex-col gap-5">
          <div className="hero__subtitle">New released</div>
          <div className="grid grid-cols-5  gap-5">
          {newitemList &&
            newitemList.map((item) => (
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

        <div className="my-4 flex flex-col gap-5">
          <div className="hero__subtitle">Best selling</div>
          <div className="grid grid-cols-5  gap-5">
          {bestitemList &&
            bestitemList.map((item) => (
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

        <div id="catelog" className="my-4 flex flex-col gap-5">
          <div className="hero__subtitle">Categories</div>
          <div className="grid grid-cols-5 gap-5">
          {categoryList?.map((cat,id) => (
            <div onClick={()=>handleCategroyItem(cat.id)}>
            <CategoryCard
              key={cat.id}
              id={cat.id}
              name={cat.name}
              mode={true}
              description={cat.description}
              imageUrl={cat.imageUrl && cat.imageUrl}
            />
            </div>
          ))}
            {/* Example for using react-multi-carousel */}
            {/* <Carousel>
                <div>
                    <img src="assets/1.jpeg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="assets/2.jpeg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel> */}
          </div>
        </div>
      </div>
    </main>
  );
}
