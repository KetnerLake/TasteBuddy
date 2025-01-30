export default class TBTemperature extends HTMLElement {
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
        <p>Temperature View</p>      
      </div>
      <div>
        <p>Temperature Editor</p>      
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
    // this.$component = this.shadowRoot.querySelector( 'hoyt-component' );
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
    // this.$component.aBoolean = this.aInteger === null ? false : true;
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
    // this.$component.addEventListener( 'click', this.onComponentClick );

    this._upgrade( 'hidden' );      
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
      'name',
      'read-only'
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
    return this._data.length === 0 ? null : this._data;
  }
  
  set value( value ) {
    this._data = value === null ? [] : [... value];
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
}

window.customElements.define( 'tb-temperature', TBTemperature );
