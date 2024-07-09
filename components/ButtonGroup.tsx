import { CustomButton } from '@components';
import React from 'react'

function ButtonGroup({
    type,
    handleClear,
    handleAdd,
    setType,
    handleEdit,
    handleDelete,
  }:any) {
  return (
    <div className="flex flex-col gap-5">
      {type == "add" ? (
        <div className="flex flex-col gap-5">
          {" "}
          <CustomButton
            title="Clear"
            containerStyles="text-green-700 bg-slate-100 rounded-full  w-full"
            handleClick={handleClear}
          />
          <CustomButton
            title="Add "
            containerStyles="bg-green-700 text-white rounded-full w-full "
            handleClick={handleAdd}
          />
        </div>
      ) : (
        ""
      )}
      {type == "edit" ? (
        <div className="flex flex-col gap-5">
          {" "}
          <CustomButton
            title="Add New One"
            containerStyles="bg-green-600 opacity-60 text-slate-100 rounded-full  w-full"
            handleClick={()=>{setType("add");handleClear()}}
          />
          <CustomButton
            title="Edit "
            containerStyles="bg-yellow-400 text-white rounded-full w-full "
            handleClick={handleEdit}
          />
          <CustomButton
            title="Delete"
            containerStyles="bg-red-400 text-white rounded-full w-full "
            handleClick={handleDelete}
          />
        </div>
      ) : (
        ""
      )}
      {type == "delete" ? (
        <div className="flex flex-col gap-5">
          {" "}
          <CustomButton
            title="Add New One"
            containerStyles="bg-green-600 opacity-60 text-slate-100 rounded-full  w-full"
            handleClick={()=>setType("add")}
          />
          <CustomButton
            title="Delete"
            containerStyles="bg-red-400 text-white rounded-full w-full "
            handleClick={handleDelete}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ButtonGroup

