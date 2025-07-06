import { Container } from "@/components/container";
import { GameProps } from "@/utils/types/game";
import Link from "next/link";
import Image from "next/image";
import { BsArrowRightSquare } from "react-icons/bs";
import { Input } from "@/components/input"; 

async function getDalyGame(){
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, {next:{revalidate: 320}}) // faz um cache da chamada por 320 segundos (~5 minutos)
    return res.json();


  } catch (error) {
    throw new Error("Error fetching Daly Game");
  }
}

export default async function Home() {
const dalyGame: GameProps = await getDalyGame();




  return (
    <main className="w-full"> 
    <Container>
      <h1 className="text-center font-bold text-xl mt-8 mb-5">Separamos um jogo exclusivo para voce!!!</h1>
    <Link href={`/game/${dalyGame.id}`} className="flex flex-col items-center">
      <section className="w-full bg-black rounded-lg ">
        <div className="w-full max-h-96 h-96 relative rounded-lg">
          <div className="absolute z-20 bottom-0 p-3 flex justify-center items-center gap-2 " 
          // o z-20 faz com que o texto fique acima da imagem
          > 
            <p className="font-bold text-xl text-white">{dalyGame.title}</p>
            <BsArrowRightSquare size={24} color="#fff"/>
          </div>

          <Image src={dalyGame.image_url} 
        alt={dalyGame.title} 
        priority={true} 
        quality={100} 
        fill={true} // preenchimento
        className=" max-h-96 object-cover rounded-lg opacity-50 hover:opacity-100 transition-all duration-300" // o cover faz com a imagem nn fique retorcida
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw" //
        />
        </div>
      </section>
    </Link>
    <Input/>
    </Container>

    </main>
  );
}
