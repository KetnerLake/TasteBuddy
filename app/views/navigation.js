customElements.define( 'tb-navigation', class extends HTMLElement {
  constructor() {
    super();

    this._data = [];

    this.$books = this.querySelector( 'ul' );
  }

  _upgrade( property ) {
    if( this.hasOwnProperty( property ) ) {
      const value = this[property];
      delete this[property];
      this[property] = value;
    }
  }      

  connectedCallback() {
    this._upgrade( 'data' );        
  }

  disconnectedCallback() {;}

  static get observedAttributes () {
    return [];
  }   
  
  attributeChangedCallback( name, oldValue, newValue ) {;}

  get data() {
    return this._data.length === 0 ? null : this._data;
  }

  set data( value ) {
    this._data = value === null ? [] : [... value];

    for( let d = 0; d < this._data.length; d++ ) {
      const element = document.createElement( 'li' );
      element.textContent = this._data[d].name;
      this.$books.appendChild( element );
    }
  }
} );
