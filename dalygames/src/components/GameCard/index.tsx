import Link from "next/link"
import Image from "next/image"
import { BiRightArrowCircle } from "react-icons/bi"

import { GameProps } from "../../utils/types/game"

interface GameCardProps{
data: GameProps
}

export function GameCard({data}: GameCardProps){
    return(
        <Link href={`/game/${data.id}`}>
                <section className="w-full bg-slate-200 rounded-lg p-4 mb-5 ">
                <div className="relative w-full h-56 hover:scale-105 transition-all duration-300">
                    <Image
                    className="rounded-lg object-cover"
                    src={data.image_url}
                    alt={data.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                    
                    
                    fill={true} // isso aqui faz preencher totalmente o componente pai
                    quality={100}
                    
                    />
                </div>
                <div className="flex items-center mt-4 justify-between">
                    {/* elipse se mantem muito interessante aqui, porque ele meio que aplica reticencias no final do texto, o que torna tudo bem interessante, o now rap pra não poder quebrar e o hidden pra justamente ele nn aparecer na tela, a documentação do taiwind acaba explicando tudo melhor */}
                    <p className="text-sm font-bold px-2 text-black text-ellipsis truncate whitespace-nowrap overflow-hidden">{data.title}</p> 
                    <BiRightArrowCircle size={24} color="#000"/>
                </div>
        </section>
        </Link>
    )
}