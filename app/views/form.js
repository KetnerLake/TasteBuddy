customElements.define( 'tb-form', class extends HTMLElement {
  constructor() {
    super();
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
    this._upgrade( 'value' );                
  }

  disconnectedCallback() {;}

  static get observedAttributes () {
    return [
      'read-only'
    ];
  }   
  
  attributeChangedCallback( name, oldValue, newValue ) {
    if( name === 'read-only' ) {
      for( let c = 0; c < this.children.length; c++ ) {
        this.children[c].readOnly = newValue;
      }
    }
  }

  get data() {
    return this._data.length === 0 ? null : this._data;
  }

  set data( value ) {
    this._data = value === null ? [] : [... value];

    for( let d = 0; d < this._data.length; d++ ) {      
      const element = document.createElement( 'tb-' + this._data[d].kind );

      const keys = Object.keys( this._data[d] );
      for( let k = 0; k < keys.length; k++ ) {
        element[keys[k]] = this._data[d][keys[k]];
      }

      this.appendChild( element );
    }
  }

  get value() {
    const content = {};

    for( let c = 0; c < this.children.length; c++ ) {
      content[this.children[c].name] = this.children[c].value;
    }

    return content;
  }
  
  set value( content ) {
    for( let c = 0; c < this.children.length; c++ ) {
      this.children[c].value = content[this.children[c].name];
    }    
  }      
} );