export default class TBTextInput extends HTMLElement {
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

        button {
          background: none;
          box-sizing: border-box;
          height: 28px;
          margin: 0;
          padding: 0;
          width: 28px;
        }

        input {
          background: none;
          border: none;
          box-sizing: border-box;
          color: var( --book-color, var( --slate-12 ) );
          flex-basis: 0;
          flex-grow: 1;
          font-size: 16px;
          height: 28px;
          line-height: 28px;
          margin: 0 0 8px 0;
          outline: none;
          padding: 0;
          text-rendering: optimizeLegibility;
        }

        input::placeholder {
          color: var( --slate-8 );
          opacity: 1.0;
        }

        label {
          background-color: var( --book-background-color );
          border-bottom-color: var( --book-background-color-focus );
          border-bottom-style: solid;
          border-bottom-width: 1px;
          box-sizing: border-box;
          cursor: text;
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 15px 16px 0 16px;
          transition: background-color 0.25s linear;
        }

        label:focus-within {
          background-color: var( --book-background-color-focus );
        }

        label > div {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
        }

        label > div:first-of-type p {
          box-sizing: border-box;
          color: var( --book-color-label );
          font-size: 12px;
          line-height: 12px;
          margin: 0;
          padding: 0;
          text-rendering: optimizeLegibility;          
        }

        label > div:first-of-type p:first-of-type {        
          flex-basis: 0;
          flex-grow: 1;          
        }

        label > div:last-of-type {
          align-items: center;
          border-top-color: var( --slate-4 );          
          border-top-style: solid;
          border-top-width: 1px;
          display: flex;
          flex-direction: row;
        }

        label > div:last-of-type p {
          box-sizing: border-box;
          color: red;
          flex-basis: 0;
          flex-grow: 1;
          font-size: 12px;
          line-height: 31px;
          margin: 0;
          padding: 0;
          text-rendering: optimizeLegibility;
        }

        label > div input ~ p {
          box-sizing: border-box;
          color: #ad7f58;
          font-size: 16px;
          line-height: 28px;
          margin: 0 0 8px 0;
          padding: 0;
          text-rendering: optimizeLegibility;          
        }

        :host( :not( [error] ) ) div:last-of-type {
          display: none;
        }
      </style>
      <label>
        <div>
          <p>Label</p>
          <p>Count</p>
        </div>
        <div>
          <input placeholder="Placeholder" type="text">
          <p>units</p>
          <button type="button">P</button>
          <button type="button">X</button>
        </div>
        <div>
          <p>Error</p>
          <button type="button"></button>
        </div>               
      </label>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$input = this.shadowRoot.querySelector( 'input' );
    this.$input.addEventListener( 'keyup', () => this.value = this.$input.value.trim().length === 0 ? null : this.$input.value );
    this.$label = this.shadowRoot.querySelector( 'label > div:first-of-type p' );
    this.$error = this.shadowRoot.querySelector( 'label > div:last-of-type p' );
    this.$units = this.shadowRoot.querySelector( 'label > div input ~ p' );
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
    const theme = this.theme === null ? 'gray' : this.theme;
    this.style.setProperty( '--book-background-color', `var( --${theme}-2 )` );
    this.style.setProperty( '--book-background-color-focus', `var( --${theme}-4 )` );    
    this.style.setProperty( '--book-color-label', `var( --${theme}-11 )` );        
    
    this.$label.textContent = this.label === null ? '' : this.label;    
    this.$input.placeholder = this.placeholder === null ? '' : this.placeholder;
    this.$input.value = this.value === null ? '' : this.value;
    this.$units.textContent = this.units === null ? '' : this.units;
    // this.$error.textContent = this.helper === null ? '' : this.helper;
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
    this._upgrade( 'error' );              
    this._upgrade( 'helper' );          
    this._upgrade( 'hidden' );      
    this._upgrade( 'label' );          
    this._upgrade( 'name' );      
    this._upgrade( 'placeholder' );          
    this._upgrade( 'readOnly' );          
    this._upgrade( 'theme' );
    this._upgrade( 'units' );              
    this._upgrade( 'value' );
    this._render();
  }
  
  // Set down
  diconnectedCallback() {;}

  // Watched attributes
  static get observedAttributes() {
    return [
      'error',
      'helper',
      'hidden',
      'label',
      'name',
      'placeholder',
      'read-only',
      'theme',
      'units',
      'value'
    ];
  }

  // Observed attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  } 
  
  // Attributes
  // Reflected
  // Boolean, Float, Integer, String, null  
  get error() {
    if( this.hasAttribute( 'error' ) ) {
      return this.getAttribute( 'error' );
    }

    return null;
  }

  set error( value ) {
    if( value !== null ) {
      this.setAttribute( 'error', value );
    } else {
      this.removeAttribute( 'error' );
    }
  }

  get helper() {
    if( this.hasAttribute( 'helper' ) ) {
      return this.getAttribute( 'helper' );
    }

    return null;
  }

  set helper( value ) {
    if( value !== null ) {
      this.setAttribute( 'helper', value );
    } else {
      this.removeAttribute( 'helper' );
    }
  }

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

  get placeholder() {
    if( this.hasAttribute( 'placeholder' ) ) {
      return this.getAttribute( 'placeholder' );
    }

    return null;
  }

  set placeholder( value ) {
    if( value !== null ) {
      this.setAttribute( 'placeholder', value );
    } else {
      this.removeAttribute( 'placeholder' );
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

  get theme() {
    if( this.hasAttribute( 'theme' ) ) {
      return this.getAttribute( 'theme' );
    }

    return null;
  }

  set theme( content ) {
    if( content !== null ) {
      this.setAttribute( 'theme', content );
    } else {
      this.removeAttribute( 'theme' );
    }
  }         

  get units() {
    if( this.hasAttribute( 'units' ) ) {
      return this.getAttribute( 'units' );
    }

    return null;
  }

  set units( value ) {
    if( value !== null ) {
      this.setAttribute( 'units', value );
    } else {
      this.removeAttribute( 'units' );
    }
  }  

  get value() {
    if( this.hasAttribute( 'value' ) ) {
      return this.getAttribute( 'value' );
    }

    return null;
  }

  set value( content ) {
    if( content !== null ) {
      this.setAttribute( 'value', content );
    } else {
      this.removeAttribute( 'value' );
    }
  }        
}

window.customElements.define( 'tb-text-input', TBTextInput );
