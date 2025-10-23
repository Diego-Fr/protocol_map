import styles from './Hero.module.scss'
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] });

export default function Hero(){
    return (
        <section className={`flex relative flex-col items-center pt-30 min-h-[calc(100vh-80px)] bg-gradient-to-br bg-white  px-2 w-full ${inter.className}`}>
            <div className='w-3/4 text-center'>
                <h1 className="text-5xl font-bold mb-10 text-center">
                    SEGURANÇA HÍDRICA PARA O ESTADO DE SÃO PAULO
                </h1>
                <p className="text-lg mb-6  text-center">
                    Acesse o mapa do Protocolo de Escassez Hídrica de São Paulo, e acompanhe como esta o estágio da sua região.
                </p>
                <a
                    className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                    href='/protocolo'
                >
                    Acessar Mapa
                </a>
            </div>
            <div className={`shadow-lg ${styles.imagesContainer}`}>
                <div className={`${styles.mapImage}`}>
                    <img src='/protocolo/images/protocol_map.png' />
                </div>
                <div className={`${styles.mobileImage}`}>
                    <img src='/protocolo/images/mobileframe-portrait3.png' />
                </div>
            </div>
        </section> 
    )
}