"use client"

import { FormEvent, useState } from "react"
import {FiSearch} from "react-icons/fi"
import { useRouter } from "next/navigation";

export function Input(){
const [input, setInput] = useState("");
const router = useRouter();

function handleSearch(event: FormEvent){
    event.preventDefault();
    if(input == "") return;
    router.push(`/game/search/${input}`) 

}

    return(

        <form 
            className="w-full bg-slate-200 my-5 flex gap-2 items-center justify-between rounded-lg p-2"
            onSubmit={handleSearch}>

            <input 
            className="bg-slate-200 outline-none w-11/12" // outline none serve justamente para tirar o contorno do inputbem    
            
            type="text" 
            placeholder="Procurando algum jogo?..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />

            <button type="submit">
                <FiSearch size={24} color="#ea580c" />
            </button>

        </form>
    )
}