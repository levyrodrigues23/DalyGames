import { GameProps } from "@/utils/types/game";
import { redirect } from "next/navigation";
import Image from "next/image";
import {Container} from '@/components/container'
import {Label} from './components/label'
import { GameCard } from "@/components/GameCard";
import { Metadata } from "next";

interface PropsParams{
    params:{
        id: string;

    }
}

export async function generateMetadata({params}: PropsParams): Promise<Metadata>{
 try {
        const response: GameProps = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`,{next:{revalidate:60}} )
        .then((res)=> res.json())
        .catch(() => {
            return {
                title: "DalyGames - Descubra jogos incriveis para se divertir",
            }
        })
        
        return{
            title: response.title,
            description: `${response.description.slice(0, 100)}...`,
            openGraph:{
                title: response.title,
                images: [response.image_url],
                
            }, 
            robots:{
                index: true,
                follow: true,
                nocache: true,
                googleBot:{
                    index: true,
                    follow: true,
                    noimageindex: true,
                }
            }
        }
    

    } catch (error) {
    return {
        title: "DalyGames - Descubra jogos incriveis para se divertir",
    }
    }
}

async function getData(id: string){
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
            {next:{revalidate:60}}
        )
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
       
        
        return data;
    } catch (error) {
        console.error('Error fetching game data:', error);
        throw new Error("Failed to fetch game data");
    }
}

async function getGameSorted(){
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, {cache: 'no-store'})
        return res.json()
    } catch (error) {
        throw new Error("Error fetching sorted games")
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
    const sortedGame: GameProps = await getGameSorted();
   
    if (!data){
        redirect('/');
    }


    // Garantir que os arrays existam
    const platforms = data.platforms || [];
    const categories = data.categories || [];

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

            <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
            <div className="flex gap-2 flex-wrap">
                {platforms.length > 0 ? platforms.map((game)=>(
                    <Label name={game} key={game}/>
                )) : <p>Nenhuma plataforma disponível</p>}
            </div>

            <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
            <div className="flex gap-2 flex-wrap">
                {categories.length > 0 ? categories.map((game)=>(
                    <Label name={game} key={game}/>
                )) : <p>Nenhuma categoria disponível</p>}
            </div>

            <p className="mt-7 mb-2"><strong>Data de lançamento:</strong> {data.release}</p>

            <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado: </h2>
            <div className="flex ">
                <div className="flex-grow"> {/* cresce o tamanho maximo que ele puder */}
                    <GameCard data={sortedGame}/>
                </div>
            </div>
        </Container>

        </main>
    )
}