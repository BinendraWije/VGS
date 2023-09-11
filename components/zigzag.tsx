"use client";

import { useEffect, useState } from "react"


export default function Zigzag() {

  const [forumposts, setForumPosts] = useState([])
  
  useEffect(()=>{
  fetch('http://16.171.1.234:3306/forumposts')
  .then(res => res.json())
  .then(data => setForumPosts(data))
  .catch(err => console.log(err));
  
  },[])

  return (

    <section>
      <div className="max-w-full mx-auto px-4 sm:px-6 bg-gray-800">
        <div className=" max-w-6xl mx-auto py-12 md:py-20 flex flex-row-reverse gap-16">

        {/* Section header */}
        <div className="forumdescriptionsection mx-auto text-center pb-12 md:pb-20 mr-0 flex flex-col justify-start content-even p-2">
            <h2 className="h1 mb-4 text-left featuretitle2 ml-0 py-10">Forums</h2>
            <p className='ml-0  mb-4 text-left'>Join our forums and delve into our community to <span className='font-black text-texthighlightgreen-100' >win special skins, goodies, and even new games </span></p>
            <button className="py-10">
              <img src="/images/Gotoforums.png" alt="" />
            </button>
          </div>
         
        {/* Forum posts header */}
        <div className="forumpostsholder mx-auto text-center pb-12 md:pb-20 ml-0 grid-cols-auto">
          
         {forumposts.map((forumpost,i) => {
          console.log(forumpost); 
          if(forumpost.Forumpostimage != null){
            
            return <div className="forumpost" key={i}>
              <img className="object-cover min-w-full min-h-full" src={"/images/"+ forumpost.Forumpostimage +".png"} alt="" />
            </div>
          }else{
          return <div className="forumpost bg-yellow-100 p-2" key={i} >
            <h3 className="forumposttitle  text-gray-800 text-left p-2 text-black">{forumpost.Forumposttitle}</h3>
            <p className="forumpostdescription  text-gray-800 text-left p-2">{forumpost.Forumpostdescription}</p>
          </div>
          }
        })}
        </div>
      </div>
      </div>
    </section>
  )
}
