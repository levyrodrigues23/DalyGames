import { Container } from "@/components/container";
import { GameProps } from "@/utils/types/game";
import Link from "next/link";
import Image from "next/image";

async function getDalyGame(){
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`)
    return res.json();


  } catch (error) {
    throw new Error("Error fetching Daly Game");
  }
}

export default async function Home() {
const dalyGame: GameProps = await getDalyGame();




  return (
    <div className="w-full"> 
    <Container>
      <h1 className="text-center font-bold text-xl mt-8 mb-5">Separamos um jogo exclusivo para voce!!!</h1>
    <Link href={`/game/${dalyGame.id}`} className="flex flex-col items-center">
      <section className="w-full bg-black rounded-lg ">
        <Image src={dalyGame.image_url} 
        alt={dalyGame.title} 
        priority={true} 
        quality={100} 
        fill={true}
        />
      </section>
    </Link>
    </Container>

    </div>
  );
}
