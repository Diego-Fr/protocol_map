export default function Header(){
    return (
        <header id="header" className="header sticky-top">
            <section className="govsp-topo">
                <link rel="stylesheet" type="text/css" href="https://saopaulo.sp.gov.br/barra-govsp/css/topo-padrao-govsp.min.css"/>
                <link rel="stylesheet" type="text/css" href="https://saopaulo.sp.gov.br/barra-govsp/css/barra-contraste-govsp.min.css"/>
                <div id="govsp-topbarGlobal" className="blu-e">
                    <div id="topbarGlobal">
                        <div id="topbarLink" className="govsp-black">
                            <div className="govsp-portal">
                                <a href="https://www.saopaulo.sp.gov.br/" target="_blank">
                                    <img decoding="async" src="https://saopaulo.sp.gov.br/barra-govsp/img/logo-governo-do-estado-sp.png" alt="Governo do Estado de São Paulo" height="38" className="logo"/>
                                </a>
                            </div>
                        </div>
                        
                        <nav className="govsp-navbar govsp-navbar-expand-lg">

                            

                            <a className="govsp-social" href="https://www.flickr.com/governosp/" target="_blank"><img decoding="async" className="govsp-icon-social" src="https://saopaulo.sp.gov.br/barra-govsp/img/i-flickr.png" alt="Flickr Governo de São Paulo"/></a>

                            <a className="govsp-social" href="https://www.linkedin.com/company/governosp/" target="_blank"><img decoding="async" className="govsp-icon-social" src="https://saopaulo.sp.gov.br/barra-govsp/img/i-linkedin.png" alt="Linkedin Governo de São Paulo"/></a>
                            <a className="govsp-social" href="https://www.tiktok.com/@governosp" target="_blank"><img decoding="async" className="govsp-icon-social" src="https://saopaulo.sp.gov.br/barra-govsp/img/i-tiktok.png" alt="TikTok Governo de São Paulo"/></a>

                            <a className="govsp-social" href="https://www.youtube.com/governosp/" target="_blank"><img decoding="async" className="govsp-icon-social" src="https://saopaulo.sp.gov.br/barra-govsp/img/i-youtube.png" alt="Youtube Governo de São Paulo"/></a>

                            <a className="govsp-social" href="https://www.twitter.com/governosp/" target="_blank"><img decoding="async" className="govsp-icon-social" src="https://saopaulo.sp.gov.br/barra-govsp/img/i-twitter.png" alt="Facebook Governo de São Paulo"/></a>

                            <a className="govsp-social" href="https://www.instagram.com/governosp/" target="_blank"><img decoding="async" className="govsp-icon-social" src="https://saopaulo.sp.gov.br/barra-govsp/img/i-insta.png" alt="Instagram Governo de São Paulo"/></a>

                            <a className="govsp-social" href="https://www.facebook.com/governosp/" target="_blank"><img decoding="async" className="govsp-icon-social" src="https://saopaulo.sp.gov.br/barra-govsp/img/i-facebook.png" alt="Facebook Governo de São Paulo"/></a>

                            <p className="govsp-social">/governosp</p>
                            <div id="separador-nav"></div>
                            <a className="govsp-acessibilidade" href="javascript:mudaTamanho('body', 1);"><img decoding="async" className="govsp-acessibilidade" src="https://saopaulo.sp.gov.br/barra-govsp/img/i-big-font.png" alt="Aumentar Fonte"/></a>
                            <a className="govsp-acessibilidade" href="javascript:mudaTamanho('body', -1);"><img decoding="async" className="govsp-acessibilidade" src="https://saopaulo.sp.gov.br/barra-govsp/img/i-small-font.png" alt="Diminuir Fonte"/></a>
                            <a className="govsp-acessibilidade" href="#" id="altocontraste" ><img decoding="async" className="govsp-acessibilidade" src="https://saopaulo.sp.gov.br/barra-govsp/img/i-contrast.png" alt="Contraste"/></a>
                            <a className="govsp-acessibilidade" href="https://www.saopaulo.sp.gov.br/fale-conosco/comunicar-erros/" title="Comunicar Erros" target="_blank"><img decoding="async" className="govsp-acessibilidade" src="https://saopaulo.sp.gov.br/barra-govsp/img/i-error-report.png"/></a>

                        </nav>
                    </div>
                    <div className="govsp-kebab">
                        <figure></figure>
                        <figure className="govsp-middle"></figure>
                        <p className="govsp-cross"></p>
                        <figure></figure>
                        <ul className="govsp-dropdown" id="govsp-kebab">
                            <li>

                            </li>
                            <li><a className="govsp-social" href="https://www.flickr.com/governosp/" target="_blank"><img decoding="async" className="govsp-icon-social" src="https://saopaulo.sp.gov.br/barra-govsp/img/i-flickr.png" alt="Flickr Governo de São Paulo"/></a></li>

                            <li><a className="govsp-social" href="https://www.linkedin.com/company/governosp/" target="_blank"><img decoding="async" className="govsp-icon-social" src="https://saopaulo.sp.gov.br/barra-govsp/img/i-linkedin.png" alt="Linkedin Governo de São Paulo"/></a></li>

                            <li><a className="govsp-social" href="https://www.tiktok.com/@governosp" target="_blank"><img decoding="async" className="govsp-icon-social" src="https://saopaulo.sp.gov.br/barra-govsp/img/i-tiktok.png" alt="TikTok Governo de São Paulo"/></a></li>

                            <li><a className="govsp-social" href="https://www.twitter.com/governosp/" target="_blank"><img decoding="async" className="govsp-icon-social" src="https://saopaulo.sp.gov.br/barra-govsp/img/i-twitter.png" alt="Twitter Governo de São Paulo"/></a></li>

                            <li><a className="govsp-social" href="https://www.youtube.com/governosp/" target="_blank"><img decoding="async" className="govsp-icon-social" src="https://saopaulo.sp.gov.br/barra-govsp/img/i-youtube.png" alt="Youtube Governo de São Paulo"/></a></li>

                            <li><a className="govsp-social" href="https://www.instagram.com/governosp/" target="_blank"><img decoding="async" className="govsp-icon-social" src="https://saopaulo.sp.gov.br/barra-govsp/img/i-insta.png" alt="Instagram Governo de São Paulo"/></a></li>

                            <li><a className="govsp-social" href="https://www.facebook.com/governosp/" target="_blank"><img decoding="async" className="govsp-icon-social" src="https://saopaulo.sp.gov.br/barra-govsp/img/i-facebook.png" alt="Facebook Governo de São Paulo"/></a></li>

                            <li>
                                <p className="govsp-social">/governosp</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <script src="https://saopaulo.sp.gov.br/barra-govsp/js/script-topo.js"></script>
                <script src="https://saopaulo.sp.gov.br/barra-govsp/js/script-contrast.js"></script>
                <script src="https://saopaulo.sp.gov.br/barra-govsp/js/script-tamanho-fonte.js"></script>
                <script src="https://saopaulo.sp.gov.br/barra-govsp/js/script-scroll.js"></script>
            </section> 

        </header>
    )
}