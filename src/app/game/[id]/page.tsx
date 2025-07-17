import { GameProps } from "@/utils/types/game";
import { redirect } from "next/navigation";
import Image from "next/image";
import {Container} from '@/components/container'

async function getData(id: string){
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`)
        return res.json();
    } catch (error) {
        throw new Error("Failed to fetch game data");
    }
}

export default async function Game({
    params: {id}
}: {
    params: {
        id: string
    }
}){
    const data: GameProps =  await getData(id)
    
    if (!data){
        redirect('/');
    }

    return(
        <main className="w-full text-black">
        <div className="bg-black h-80 sm:h-96 w-full relative">
        <Image
        className="object-cover w-full h-80 sm:h-96 opacity-80" // ele se encaixa no tamanho da imagem sem precisar quebrar, equivale ao object-fit cover do css
        src={data.image_url}
        alt={data.title}
        priority={true}
        fill={true}
        quality={100}
        sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 33vw"}
        />
        </div>
        <Container>
            <h1 className="font-bold text-xl my-4">{data.title}</h1>
            <p>{data.description}</p>
        </Container>

        </main>
    )
}