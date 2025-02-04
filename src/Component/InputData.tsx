"use client";
import Image from "next/image";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { updatePublic,postData,getData,deleteByID } from "@/app/actionHandle";


type ImgType = {
  name: string;
  age: string;
};

const InputData = () => {
  const [imgData, setImgData] = useState<ImgType>({ name: "", age: "" });
  const [preImg, setPreImg] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  const [allData,setAllData]=useState<any>([]);
  const [page,setPage]=useState({pageNo:0,next:0});
  
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgData((prevImgData) => ({
      ...prevImgData,
      [e.target.name]: e.target.value,
    }));
  };

  const setImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreImg(file);
      setImgPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!preImg) {
      console.log("No image selected");
      return;
    }
    const formData= new FormData();
    formData.append("file",preImg);
    
    try{

      const fileData=await updatePublic(formData);

      const response=await postData({...imgData,url:fileData.url})
      // if(response)
      //   {
      //     const all=await getData();
      //     setAllData(all);
          
      //   }
      if(response)
      {
        confirm("done");
      }
      
    }
    catch(error)
    {
      console.log("bhut braa h")
    }

  };

  const deletePost=async(e: any,a:any)=>{
      const res:Boolean=await deleteByID(a.id);
      if(res)
      {
        setAllData((pre:any)=>{
            if(pre.length==1)
              return null;
          return pre.filter((eachElement:any)=>a.id!==eachElement.id)})
      }
      
      
  }
  var remainingPage:number | null =1;
  useEffect(()=>{
    if(page.pageNo===0)
      return;
      const okk=async()=>{
        
         const fiveData=await getData(page.pageNo);
         setAllData((pre:any)=>[...pre,...fiveData.data]);
         setPage((pre)=>({...pre,next:fiveData.next}));
       }
       okk();
  },[page.pageNo])
  const get5Data=async(e:any)=>{

    let element=e.target;
    if(element.scrollHeight-element.scrollTop<=5+element.clientHeight && page.next!=null)
    {
      console.log(remainingPage)
      setPage((pre)=>({...pre,pageNo:pre.pageNo+1}));

    }

    
  }

  return (
    <>
    <form onSubmit={(e)=>{handleSubmit(e)}} className="p-2 bg-white shadow-md rounded-md flex w-1/2 flex-wrap justify-around gap-3 ">
      <div className="m-4 p-1 w-1/2">
        <input
          type="text"
          name="name"
          onChange={handleInput}
          placeholder="Enter Name"
          className="w-full p-2 border rounded m-2 my-5"
        />
        <input
          type="date"
          name="age"
          onChange={handleInput}
          className="w-full p-2 border rounded m-2 my-5"
        />
      </div>

      <div className="m-4 w-44 relative rounded-full bg-gray-300">
      
    

      {imgPreview && (
        
          <Image src={imgPreview} alt="Selected" fill className="rounded-full border object-cover " />
        
      )}
       <input hidden id="image" type="file" name="file" onChange={setImage} />
        
      </div>

      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-1/4 self-center">
        Submit
      </button>
      <label htmlFor="image" className="cursor-pointer bg-blue-500 text-white py-2 px-4 w-1/4 text-center rounded hover:bg-blue-600">
          Browse
        </label>
    </form>
    <button  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-1/4 self-center" onClick={()=>{setPage((pre)=>({...pre,pageNo:pre.pageNo+1}))}}>get Data</button>
    <div className="flex flex-col gap-4 p-4 max-h-96 overflow-y-auto mt-4" onScroll={(e)=>{get5Data(e)}}>
      {
        allData?allData.map((a:any ,key:any)=>
        <div key={key} className="flex p-2 gap-6 rounded-l-full rounded-r-xl bg-gray-200 items-center">
          <div className="w-24 h-24 rounded-full relative">
          <Image src={a.url} alt="aa rha" fill className="object-cover rounded-full"/>

          </div>
          <div className=" text-lg w-56">
            <p className="w-full my-2 px-2 py-1 bg-gray-300 rounded-lg text-white-100" >{a.name}</p>
            <p className="w-full my-2 px-2 p-1 bg-gray-300 rounded-lg text-white-100">{a.age}</p>
          </div>
          <div className="h-full">
            <button className="px-4 py-2 rounded-md bg-gray-300" onClick={(e)=>{deletePost(e,a)}}>x</button>
          </div>
        </div>
        ):<h1> please add birthday</h1>
      }
    </div>
    </>
  );
};

export default InputData;
