
'use client'

import { SquareArrowRight, CircleAlert, ClipboardCheck, Search } from 'lucide-react';

export default function AboutModalBody({closeModal}){
    
    return (
        <>
            <div>
                <div className='mb-2'>
                Este painel apresenta o enquadramento das subUGRHIs no Protocolo de Escassez Hídrica da SP-ÁGUAS, com base em indicadores hidrometeorológicos, como chuva, volume útil dos reservatórios, duração da seca e evapotranspiração, considerando o mês e o ano de referência exibidos no mapa.
                </div>
                <div className='mb-2'>
                Vale ressaltar que este Protocolo é um experimento regulatório com duração de dois anos que está em constante aprimoramento.
                </div>
                <div>
                O objetivo é apoiar na gestão dos recursos hídricos, indicando situações em que podem ser necessárias medidas de contingência para mitigar os efeitos dos impactos da seca.
                </div>
            </div>
            <div className="pt-6 mb-2">
                <div style={{fontWeight: 600}} className='flex  gap-2 mb-2 text-orange-700'><CircleAlert/> Atenção</div>O enquadramento apresentado não é um aviso de desabastecimento imediato e não indica risco direto para municípios, bairros ou endereços específicos. Trata-se de um instrumento técnico, analisado na escala de bacia e sub-bacia hidrográfica que, para além dos indicadores, passa por uma análise mais aprofundada antes da declaração. Este mapa aponta o risco de escassez, não necessariamente que a bacia hidrográfica esta com falta de água para os usos múltiplos. 
            </div>
            <div className="pt-6 mb-2">
                <div style={{fontWeight: 600}} className='flex gap-2 mb-2 text-pink-700'><ClipboardCheck/> Escassez hídrica declarada</div>
                A condição de escassez hídrica declarada se aplica exclusivamente às áreas identificadas no painel como “<i>escassez hídrica declarada</i>”.
            </div>
            <div className="pt-6 mb-2">
                <div style={{fontWeight: 600}} className='flex gap-2 items-center mb-2 text-blue-600'><Search/> Como consultar os indicadores</div>
                As informações detalhadas sobre os indicadores podem ser acessadas ao clicar na área de interesse diretamente no mapa. Mais informações sobre os indicadores podem ser acessadas no <a target='_blank' href='https://hidroapp.spaguas.sp.gov.br' style={{color: 'blue'}}>HIDROAPP</a>
            </div>
            <div className="pt-6">
                <button onClick={closeModal} style={{backgroundColor: '#299bb7', color: 'white', borderRadius: 3, padding: '5px 15px', display: 'flex', gap:5, cursor: 'pointer'}}><span>Entendido, ir para o mapa</span><SquareArrowRight/></button>
            </div>
        </>
    )
}

