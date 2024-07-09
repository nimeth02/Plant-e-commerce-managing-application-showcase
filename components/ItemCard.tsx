"use client";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ItemCard = ({
  setType,
  setItem,
  id,
  name,
  subName,
  category,
  quantity,
  categoryName,
  unitPrice,
  description,
  newReleased,
  bestSelling,
  imageUrl,
  setImageFile,
  mode,
}: any) => {
  const handleClick = () => {
    console.log("click", newReleased, bestSelling);
    if (mode) return;
    setItem({
      id,
      name,
      description,
      imageUrl,
      subName,
      category,
      quantity,
      categoryName,
      unitPrice,
      newReleased,
      bestSelling,
    });
    setType("edit");
    setImageFile([]);
  };

  return (
    <div
      className="flex flex-col p-4 h-[28rem]  items-center text-black-100 bg-primary-blue-100 hover:bg-white hover:shadow-md rounded-3xl "
      onClick={handleClick}
    >
      <div className=" text-2xl  flex justify-center font-extrabold">
        {name}
      </div>
      <div className=" text-md mb-4 flex text-justify font-semibold">{subName}</div>
      <Carousel className="h-40" autoPlay={true} infiniteLoop={true}>
        {imageUrl.map((img: any) => (
          <div key={img} className="flex h-40 justify-center gap-10 items-end">
            <Image
              src={img}
              width={180}
              height={180}
              alt="Plant"
              className="rounded"
            />
          </div>
        ))}
      </Carousel>
      <div className="w-full flex  justify-between mt-2 text-md">
        <div>{quantity > 0 ? "availabale" : "out of stock"}</div>
        <div className="font-bold">${unitPrice}</div>
      </div>
      <div className="flex mt-6  text-justify overflow-hidden">
        {description}
      </div>
      
    </div>
  );
};

export default ItemCard;
