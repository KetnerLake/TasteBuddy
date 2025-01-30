customElements.define( 'tb-stack', class extends HTMLElement {
  constructor() {
    super();
    this._render();
  }

  _render() {
    const index = this.hasAttribute( 'selected-index' ) ? parseInt( this.getAttribute( 'selected-index' ) ) : 0;
    for( let c = 0; c < this.children.length; c++ ) {
      if( c === index ) {
        this.children[c].removeAttribute( 'hidden' );
      } else {
        this.children[c].setAttribute( 'hidden', '' );          
      }
    }    
  }

  static get observedAttributes () {
    return [
      'selected-index'
    ];
  }   
  
  attributeChangedCallback( name, oldValue, newValue ) {
    if( name === 'selected-index' ) this._render();
  }
} );