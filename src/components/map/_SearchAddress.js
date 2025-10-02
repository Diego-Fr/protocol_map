

const SearchAddressControl = L.Control.extend({
  options: {
    position: 'topright',
    input: 'aa'
  },

  onAdd: function (map) {
    console.log(this.options.input);
    
    const div = L.DomUtil.create('div')

    div.style.background = "white";
    div.style.padding = "8px";
    div.style.borderRadius = "8px";
    div.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";

    // conteúdo HTML do control
    div.appendChild(this.options.input);

    // prevenir que clique no botão arraste o mapa
    L.DomEvent.disableClickPropagation(div);

    return div;
  }
});

module.exports = {SearchAddressControl}