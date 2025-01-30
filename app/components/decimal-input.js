export default class TBDecimalInput extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: inline-block;
          position: relative;
        }

        :host( [hidden] ) {
          display: none;
        }

        :host( :not( [read-only] ) ) div:first-of-type {
          display: none;
        }

        :host( [read-only] ) div:last-of-type {
          display: none;
        }        
      </style>
      <div>
        <p></p>      
      </div>
      <div>
        <p></p>      
        <input type="text">
      </div>      
    `;
    
    // Properties
    this._data = [];

    // Events
    this.onComponentClick = this.onComponentClick.bind( this );

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$view_label = this.shadowRoot.querySelector( 'div:first-of-type p' );
    this.$edit_label = this.shadowRoot.querySelector( 'div:last-of-type p' );
  }
  
  onComponentClick( evt ) {
    this.dispatchEvent( new CustomEvent( 'krh-event', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {
        'abc': 123
      }
    } ) );
  }

   // When attributes change
  _render() {
    this.$view_label.textContent = this.label === null ? '' : this.label;
    this.$edit_label.textContent = this.label === null ? '' : this.label;
  }

  // Promote properties
  // Values may be set before module load
  _upgrade( property ) {
    if( this.hasOwnProperty( property ) ) {
      const value = this[property];
      delete this[property];
      this[property] = value;
    }
  }

  // Setup
  connectedCallback() {
    this._upgrade( 'hidden' );      
    this._upgrade( 'label' );          
    this._upgrade( 'name' );      
    this._upgrade( 'readOnly' );          
    this._upgrade( 'value' );
    
    this._render();
  }
  
  // Set down
  diconnectedCallback() {
    this.$component.removeEventListener( 'click', this.onComponentClick );
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'hidden',
      'label',
      'name',
      'read-only',
      'value'
    ];
  }

  // Observed attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  } 
  
  // Properties
  // Not reflected
  // Array, Date, Object, null
  get value() {
    return this._data;
  }
  
  set value( value ) {
    this._data = value;
  }

  // Attributes
  // Reflected
  // Boolean, Float, Integer, String, null  
  get hidden() {
    return this.hasAttribute( 'hidden' );
  }

  set hidden( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'hidden' );
      } else {
        this.setAttribute( 'hidden', '' );
      }
    } else {
      this.removeAttribute( 'hidden' );
    }
  }

  get label() {
    if( this.hasAttribute( 'label' ) ) {
      return this.getAttribute( 'label' );
    }

    return null;
  }

  set label( value ) {
    if( value !== null ) {
      this.setAttribute( 'label', value );
    } else {
      this.removeAttribute( 'label' );
    }
  }        

  get name() {
    if( this.hasAttribute( 'name' ) ) {
      return this.getAttribute( 'name' );
    }

    return null;
  }

  set name( value ) {
    if( value !== null ) {
      this.setAttribute( 'name', value );
    } else {
      this.removeAttribute( 'name' );
    }
  }        

  get readOnly() {
    return this.hasAttribute( 'read-only' );
  }

  set readOnly( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'read-only' );
      } else {
        this.setAttribute( 'read-only', '' );
      }
    } else {
      this.removeAttribute( 'read-only' );
    }
  }  

  get value() {
    if( this.hasAttribute( 'value' ) ) {
      return parseFloat( this.getAttribute( 'value' ) );
    }

    return null;
  }

  set value( price ) {
    if( price !== null ) {
      this.setAttribute( 'value', price );
    } else {
      this.removeAttribute( 'value' );
    }
  }  
}

window.customElements.define( 'tb-decimal-input', TBDecimalInput );
