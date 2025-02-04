

export const updatePublic=async(formData:FormData)=>{

    try{
        console.log(formData.get("file"))
        const res=await fetch("/api/upload",{method:"POST",body:formData})

        if(!res.ok)
        {
            const error=await res.text();
            
            throw new Error(error);
        }

        const result=await res.json();
        return result;
    }
        
    catch(error)
    {
        console.log(error)
    }
}
type allData={
    name:string,
    age:string,
    url:string
}
export const postData=async(obj:allData)=>{
     
    try{
        const res=await fetch("http://localhost:4001/birthday",{method:"POST", headers:{"content-type":"application/json"},body:JSON.stringify(obj)})
        if(!res.ok)
        {
            console.log("data Not Uploaded")
        }
        return true;
    }
    catch(error)
    {
        console.log("error "+error)
        return false
    }
}

export const getData=async(page:any)=>{

    try{
        console.log(page+"ok");
        const res=await fetch(`http://localhost:4001/birthday?_page=${page}&_per_page=5`,{method:"GET",headers:{'content-type':'application/json'}})
        const jsonData=await res.json();
        console.log(jsonData);
        return jsonData;
    }
    catch(error)
    {
        console.log("error to get data");
    }
}
export const deleteByID=async(id:string)=>{
    let url=`http://localhost:4001/birthday/${id}`
    try{
        const res=await fetch(url,{method:"DELETE"})
        return true;
    }
    catch(error)

    {
        console.log(error)
        return false
    }
}