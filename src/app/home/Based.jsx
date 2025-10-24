export default function Based(){
    return (
      <section className="bg-gray-100 pt-10 pb-50">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-4 text-center uppercase">
            Baseado em estruturas internacionais de gestão de risco a desastres
          </h2>

          
          <div className="flex flex-wrap justify-center items-center pt-10 gap-8">
            {/* Exemplo circular */}
        
            {/* Exemplo retangular */}
            <div className="w-32 h-20 flex items-center justify-center bg-white rounded-2xl shadow-md p-4">
              <img src="/protocolo/images/unccd_logo.jpeg" alt="Parceiro 2" className="object-contain w-full h-full" />
            </div>



            <div className="w-32 h-20 flex items-center justify-center bg-white rounded-2xl shadow-md p-4">
              <img src="/protocolo/images/ods_logo.png" alt="Parceiro 4" className="object-contain w-full h-full" />
            </div>


            <div className="w-32 h-20 flex items-center justify-center bg-white rounded-2xl shadow-md p-4">
              <img src="/protocolo/images/who_logo.png" alt="Parceiro 4" className="object-contain w-full h-full" />
            </div>


            <div className="w-32 h-20 flex items-center justify-center bg-white rounded-2xl shadow-md p-4">
              <img src="/protocolo/images/unddr_logo.jpg" alt="Parceiro 4" className="object-contain w-full h-full" />
            </div>
          </div>
        </div>
      </section>
    )
}