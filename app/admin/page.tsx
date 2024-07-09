"use client";
import Category from "@components/Category";
import Item from "@components/Item";
import { RadioChangeEvent, Radio, ConfigProvider } from "antd";
import React, { useState } from "react";
import { redirect, useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

function page() {
  const [type, setType] = useState("category");

  const onChange = (e: RadioChangeEvent) => {
    setType(e.target.value);
  };


    const token = localStorage.getItem('token');
    const isAuth = token;
    if(!isAuth){
      redirect("/")
    }

  return (
    <div className="my-10 ">
      <ConfigProvider
          theme={{
            components: {
              Radio: {
                buttonSolidCheckedBg: "rgb(21,128,61)",
                buttonSolidCheckedHoverBg: "rgba(21,128,61,0.6)",
                buttonSolidCheckedActiveBg: "rgba(21,128,61,0.6)",
                colorPrimaryHover: "rgba(21,128,61,0.6)",
                colorPrimaryBorder: "rgba(21,128,61,0.6)",
                colorPrimaryActive: "rgba(21,128,61,0.6)",
              },
              Select: {
                selectorBg:"rgb(240 253 244 / var(--tw-bg-opacity))",
                optionSelectedBg:"rgb(240 253 244 / var(--tw-bg-opacity))"
              },
              Checkbox: {
                colorPrimary:"rgb(21,128,61)",
                colorPrimaryHover:"rgb(21,128,61)",
                colorPrimaryBorder:"rgb(21,128,61)"
              },
            },
          }}
        >
      <div className="flex justify-center">
        
          <Radio.Group
            size={"large"}
            className=" bg-green-100"
            value={type}
            buttonStyle="solid"
            onChange={onChange}
            style={{ marginBottom: 16 }}
          >
            <Radio.Button
              value="category"
              className=" text-black hover:text-black bg-green-100"
            >
              Category
            </Radio.Button>
            <Radio.Button
              value="item"
              className="text-black hover:text-black bg-green-100 "
            >
              Item
            </Radio.Button>
          </Radio.Group>
        
      </div>
      {type == "category" ? <Category /> : <Item />}
      </ConfigProvider>
    </div>
  );
}

export default page;
