"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Imagetabs(){
    const [activeTab,setActivetab]=useState("board");
    return <section>
       <div className="flex mt-9 justify-center gap-8">
      <Button onClick={()=>setActivetab("board")} className={`rounded-lg transition-colors ${activeTab==="board"?"bg-primary text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Board</Button>
      <Button onClick={()=>setActivetab("second")} className={`rounded-lg transition-colors ${activeTab==="second"?"bg-primary text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>second</Button>
      <Button onClick={()=>setActivetab("third")} className={`rounded-lg transition-colors ${activeTab==="third"?"bg-primary text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>third</Button>
    </div>
<div>
    {activeTab==="board"&& <Image src="/hero-images/hero1.png" alt="" width={1200} height={800}/>}
    {activeTab==="second"&& <Image src="/hero-images/hero2.png" alt="" width={1200} height={800}/>}
    {activeTab==="third"&& <Image src="/hero-images/hero3.png" alt="" width={1200} height={800}/>}
    </div>
    </section>
}