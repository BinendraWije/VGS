"use client";

import { useEffect, useState } from "react"

export default function Features() {
  
  const [maxslidervalue, setMaxslidervalue] = useState([2]); 


function leftbutton(){
  const postslider = document.getElementsByClassName("postslider")[0];
  const sliderIndex = parseInt(getComputedStyle(postslider).getPropertyValue("--slider_index"));
  if(sliderIndex > 0){ 
  postslider.style.setProperty("--slider_index", sliderIndex - 1)  
  }
}

function rightbutton(){
  const postslider = document.getElementsByClassName("postslider")[0];
  const sliderIndex = parseInt(getComputedStyle(postslider).getPropertyValue("--slider_index"));
  if(sliderIndex < maxslidervalue){ 
  postslider.style.setProperty("--slider_index", sliderIndex + 1)  
  }
  
}
  
  const [posts, setPosts] = useState([])
 useEffect(()=>{
fetch('http://13.49.145.29:3306/posts')
.then(res => res.json())
.then(data => setPosts(data))
.catch(err => console.log(err));

 },[])

 
 window.addEventListener("resize",(e) =>{
//total number of posts divided by the number of posts shown per page
const postslider = document.getElementsByClassName("postslider")[0];
const numberofposts = posts.length;
const postsperscreen = parseInt(getComputedStyle(postslider).getPropertyValue("--items_per_screen"));
const maxslidervalue = Math.floor((numberofposts/postsperscreen));
console.log(maxslidervalue);
setMaxslidervalue(maxslidervalue);

 })
 
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 flex-col">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20 ml-0">
            <h2 className="h1 mb-4 text-left featuretitle ml-0">Scroll through featured vgs posts</h2>           
          </div>

          {/* Items */}
          
          <div className="postslider bg-yellow-100 pb-12 position: relative flex justify-even"> 
          {posts.map((d,i) => (
            
            <div className="postholder pb-10 w-80	m-1" key={i}>
            <div className="postitemimage object-cover ">
              <img className="object-cover max-h-48 min-h-postimageheight" src={"/images/"+ d.Post_image_url +".png"} alt="" />
            </div>
          <div className="postdetailsholder flex flex-col justify-between">
            <div className="posttitleholder">
            <div className="posttitle uppercase font-black">{d.Post_title}</div>
            </div>
            <div className="postdescriptionholder">
            <div className="postdescription">{"- " + d.Post_description}</div>
            </div>
            </div>
          </div>

          ))}
          
          
        

         
          </div>
           {/* Buttons */}
          <div className="carouselbuttonholder flex w-full justify-end">
            <button className="leftbuttonholder m-2" onClick={leftbutton}>
            <img className="leftbutton" src="/images/left.png" alt="" />
            <img className="leftbuttonactive" src="/images/leftactive.png" alt="" />
            </button>
            <button className="rightbuttonholder m-2" onClick={rightbutton}>
            <img className= "rightbutton" src="/images/right.png" alt="" />
            <img className= "rightbuttonactive" src="/images/rightactive.png" alt="" />
            </button>
          </div>
        

        </div>
      </div>
    </section>
  )
}
