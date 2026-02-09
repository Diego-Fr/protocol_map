
import { SquareArrowRight } from 'lucide-react';

export default function AboutModalBody(){
    return (
        <>
            <div>
                <div className='mb-2'>
                Este painel apresenta o enquadramento das subUGRHIs no Protocolo de Escassez Hídrica da SP-ÁGUAS, com base em indicadores hidrometeorológicos, como chuva, reservação e evapotranspiração, considerando o mês e o ano de referência exibidos no mapa.
                </div>
                <div>
                O objetivo é apoiar o monitoramento da condição hidrológica e a gestão dos recursos hídricos, indicando situações em que <b>podem ser necessárias medidas de contingência</b>.
                </div>
            </div>
            <div className="pt-6 mb-5">
                <div style={{fontWeight: 600}} className='mb-1'>Atenção</div>O enquadramento apresentado não é um aviso de desabastecimento imediato e não indica risco direto para municípios, bairros ou endereços específicos.
                Trata-se de um instrumento técnico, analisado na escala de bacia e sub-bacia hidrográfica.

            </div>
            <div className="pt-6 mb-5">
                <div style={{fontWeight: 600}} className='mb-1'>Escassez hídrica declarada</div>
                A condição de escassez hídrica declarada se aplica exclusivamente às áreas identificadas no painel como “<i>escassez hídrica declarada</i>”.
            </div>
            <div className="pt-6 mb-5">
                <div style={{fontWeight: 600}} className='mb-1'>Como consultar os indicadores</div>
                As informações detalhadas sobre os indicadores podem ser acessadas ao clicar na área de interesse diretamente no mapa.
            </div>
            <div className="pt-6 mb-5">
                <button style={{backgroundColor: '#299bb7', color: 'white', borderRadius: 3, padding: '5px 15px', display: 'flex', gap:5, cursor: 'pointer'}}><span>Entendido, ir para o mapa</span><SquareArrowRight/></button>
            </div>
        </>
    )
}

