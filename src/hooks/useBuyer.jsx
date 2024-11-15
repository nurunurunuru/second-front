import React, { useEffect, useState } from 'react'

const useBuyer = email => {
 const [isBuyer,setIsBuyer] = useState(false);
 const [isBuyerLoading,setIsBuyerLoading]=useState(true);

 useEffect(()=>{
    if(email){
        fetch(`http://localhost:7000/users/buyer/${email}`)
        .then(res=>res.json())
        .then(data =>{
            console.log(data);
            setIsBuyer(data.isBuyer);
            setIsBuyerLoading(false);   
        });   
    }

 },[email]);
 return [isBuyer,isBuyerLoading];
};

export default useBuyer

// useBuyer(sajid@gmail.com)