export default function Footer(){
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Coluna 1 – Logo e descrição */}
                <div>
                    <img src="/protocolo/images/spaguas_logo_branco.png" alt="Parceiro 1" className="object-contain" />
                    <h3 className="text-white text-xl font-semibold mb-3">Agência Águas do Estado de São Paulo</h3>
                
                </div>

                {/* Coluna 2 – Links rápidos */}
                <div>
                <h4 className="text-white font-semibold mb-3">Links úteis</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href="mapa" className="hover:text-white transition-colors">Mapa do Protocolo</a></li>
                    <li><a href="https://salasituacaosp.spaguas.sp.gov.br/sssp" className="hover:text-white transition-colors">Sala de Situação SP</a></li>
                    <li><a href="https://hidroapp.spaguas.sp.gov.br" className="hover:text-white transition-colors">HIDROAPP</a></li>
                    <li><a href="https://apps.spaguas.sp.gov.br/sibh/" className="hover:text-white transition-colors">SIBH</a></li>
                    <li><a href="https://apps.spaguas.sp.gov.br/sibh/chuva_agora" className="hover:text-white transition-colors">Chuva Agora</a></li>
                </ul>
                </div>

                {/* Coluna 3 – Contato */}
                <div>
                <h4 className="text-white font-semibold mb-3">Contato</h4>
                <ul className="space-y-2 text-sm">
                    <li>Rua Boa Vista, nº 170</li>
                    <li>São Paulo CEP: 01410-001</li>
                    <li>Telefone: (11) 3293-8461</li>
                    <li>E-mail: salasituacaosp@spaguas.sp.gov.br</li>
                </ul>
                </div>
            </div>

            {/* Linha divisória e copyright */}
            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} SP ÁGUAS. Todos os direitos reservados.
            </div>
            </footer>
    )
}