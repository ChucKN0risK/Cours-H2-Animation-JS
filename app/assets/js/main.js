// On s'assure que notre code s'éxécute une fois que notre
// DOM est bien chargé.
document.addEventListener('DOMContentLoaded', () => {
	console.info('main.js loaded 😎');

  // Les noms des constructeurs doivent commencer par une majuscule.
  // Cela permet de savoir rapidement que des méthodes et des propriétés
  // sont disponibles pour cet objet. Cela permet plus généralement de
  // les distinguer des functions "normales".
  // https://css-tricks.com/understanding-javascript-constructors/
  class Form {
    /**
     * Applique l'animation du formulaire sur les éléments
     * @param {string} selector
     */
    // Le méthodes statiques sont des méthodes qui ont pour vocations
    // à être appelées par la classe et non pas ses instances.
    // Ici cette méthode "bind" nous sert à associer le comportement
    // de notre class Form à un élément HTML passé en paramètre.
    static bind(selector) {
    	document.querySelectorAll(selector).forEach(element => new Form(element))
    }

    /**
     * @param {HTMLElement} element
     */
    constructor(element) {
      this._element      = element;
      this._startingText = this._element.querySelector('.js-starting-text');
      this._input        = this._element.querySelector('input');
      this._submitButton = this._element.querySelector('button[type="submit"]');
      this._endingText   = this._element.querySelector('.js-ending-text');
      this._isDisabled   = false;

      this._events();
    }


    // La méthode _events() comporte l'ensemble des évènements
    // que nous ajoutons sur notre Class ou sur ses éléments
    // enfants.
    _events() {
      this._element.addEventListener('click', () => {
        if (!this._isDisabled) {
          TweenMax.to(this._startingText, 0.2, {
            scale: 0,
            // autoAlpha: 0 = opacity: 0 + visibility: hidden;
            autoAlpha: 0,
            onComplete: () => {
              // On retire du flux notre élément
              // afin de permettre aux autres éléments
              // suivants de se placer correctement
              TweenMax.to(this._startingText, 0.2, {
                display: 'none',
                delay: 0.3
              });
              this._open();
            }
          });
        }
      })

      // Afin d'annuler le rechargement de la page lors
      // de la soumission du formulaire nous désactivons
      // ce comportement par défaut. 
      this._element.addEventListener('submit', (e) => {
        e.preventDefault();
        this._hideChildren();
      });

      // Afin d'annuler la propagation de l'event du bouton
      // à son parent qui est le formulaire, nous désactivons
      // le bubbling naturellement mis en place.
      // https://www.alsacreations.com/article/lire/578-La-gestion-des-evenements-en-JavaScript.html
      this._submitButton.addEventListener('click', (e) => {
        e.stopPropagation();        
      })
    }

    _open() {
      TweenMax.to(this._element, 0.2, {
        width: '20rem',
        onComplete: () => {
          this._showChildren();
        }
      });
    }

    _showChildren() {
      TweenMax.to(this._input, 0.3, {
        scale: 1,
        display: 'block'
      })
      TweenMax.to(this._submitButton, 0.1, {
        scale: 1,
        display: 'block'
      });
    }

    _hideChildren() {
      TweenMax.to(this._input, 0.3, {
        scale: 0,
        ease: Expo.easeOut,
        onComplete: () => {
            TweenMax.to(this._input, 0.2, {
              display: 'none',
              // clearProps nous permet de retirer le contenu
              // de l'attribut style contenant les styles
              // appliqués par TweenMax. Cela nous permet
              // de garder notre DOM "propre" une fois notre
              // animation terminée.
              clearProps: 'all'
            });
          }
      });
      TweenMax.to(this._submitButton, 0.2, {
        scale: 0,
        autoAlpha: 0,
        ease: Expo.easeOut,
        onComplete: () => {
          TweenMax.to(this._submitButton, 0.2, {
            display: 'none',
            clearProps: 'all'
          });
          this._close();
        }
      });
    }

    _close() {
      TweenMax.to(this._element, 0.2, {
        width: '8rem',
        ease: Expo.easeOut,
        onComplete: () => {
          this._showEndingText();
        }
      });
    }

    _showEndingText() {
      TweenMax.to(this._endingText, 0.2, {
        scale: 1,
        display: 'block',
        ease: Expo.easeOut,
        delay: 0.1,
        onComplete: () => {
          this._isDisabled = true;
        }
      })
    }
  }

  Form.bind('.js-form');






  class Modal {
  	/**
     * @param {HTMLElement} element
     */
    constructor(element) {
      this._element        = element;
      this._modalToggleBtn = this._element.querySelector('.js-toggle-btn');
      this._modal          = this._element.querySelector(`.js-${this._modalToggleBtn.dataset.content}`);
      this._isOpened       = false;

      this._events();
    }

    /**
     * Applique le système de modal sur les éléments
     * @param {string} selector
     */
    // Cette méthode est propre à notre classe Modal.
    // Elle permet d'instancier notre classe selon un sélecteur.
    // Une méthode statique s'éxécute directement sur sa classe et
    // non sur une de ses instances.
    // Pour en savoir plus : https://javascript.info/class#static-methods
    static bind(selector) {
    	document.querySelectorAll(selector).forEach(element => new Modal(element))
    }

    _events() {
      // On associe la méthode toggle au click sur 
      this._modalToggleBtn.addEventListener('click', () => this._toggle());

      // On ferme la modal si elle est affichée et qu'on 
      // appuie sur ESC
      document.addEventListener('keydown', (e) => {
        if (e.keyCode === 27 && this._isOpened) {
          this._toggle();
        }
      });
    }

    _open() {
      this._isOpened = true;

      TweenMax.to(this._modal, 0.3, {
        scale: 1,
        ease: Expo.easeOut,
        transformOrigin: 'left bottom'
      });
    }

    _close() {
      this._isOpened = false;

      TweenMax.to(this._modal, 0.3, {
        autoAlpha: 0,
        scale: 0,
        ease: Expo.easeOut,
        transformOrigin: 'left bottom',
        clearProps: 'all'
      });
    }

    _toggle() {
      if (this._isOpened) {
        this._close();
      } else {
        this._open();
      }
      // Version plus courte en ternaire : this._isOpened ? this._close(); : this._open();
    }
  }

  Modal.bind('.js-modal');
});

