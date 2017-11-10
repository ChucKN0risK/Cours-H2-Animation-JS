// CREATE ELEMENT
// var newEl = document.createElement('div');

// GET ATTRIBUTE
// document.querySelector('.el').setAttribute('key', 'value');
// document.querySelector('.el').getAttribute('key');

// ADD/REMOVE/TOGGLE CLASS
// document.querySelector('.el').classList.add('class');
// document.querySelector('.el').classList.remove('class');
// document.querySelector('.el').classList.toggle('class');

// REMOVE
// remove('.el');

// function remove(el) {
//   var toRemove = document.querySelector(el);

//   toRemove.parentNode.removeChild(toRemove);
// }

// PARENT
// document.querySelector('.el').parentNode;

// PREV/NEXT ELEMENT
// document.querySelector('.el').previousElementSibling;
// document.querySelector('.el').nextElementSibling;

document.addEventListener('DOMContentLoaded', () => {
	console.info('main.js Loaded :)');

  // ---------------------------
  // Quelques conventions :
  // ---------------------------

  // 1) Les noms des constructeurs doivent commencer par une majuscule.
  // Cela permet de savoir rapidement que des méthodes et des propriétés
  // sont disponibles pour cet objet. Cela permet plus généralement de
  // les distinguer des functions "normales".
  // https://css-tricks.com/understanding-javascript-constructors/

  // 2) Les variables stockant un noeud du DOM doivent ressortir visuellement
  // du code. Quand jQuery est utilisé vous pourrez tomber sur '$'.
  // Ici on utilise un '_' pour indiquer que la propriété de notre objet
  // est privée. Elle est locale au constructeur Modal.
  // http://www.w3schools.com/js/js_object_prototypes.asp
  class Form {
    constructor() {
      this._element      = document.querySelector('.js-form');
      this._startingText = this._element.querySelector('.js-starting-text');
      this._input        = this._element.querySelector('input');
      this._submitButton = this._element.querySelector('button[type="submit"]');
      this._endingText   = this._element.querySelector('.js-ending-text');
      this._isDisabled   = false;

      this._events();
    }

    // La méthode _events() comorte l'ensemble des évènements
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
                display: 'none'
              }, 0.5);
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
        display:'block'
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
        onComplete: () => {
          this._isDisabled = true;
        }
      })
    }
  }

  const form = new Form;

  class Modal {
    constructor(el) {
      this._el             = el;
      this._modalToggleBtn = this._el.querySelector('.js-toggle-btn');
      this._modal          = this._el.querySelector('.js-' + this._modalToggleBtn.dataset.content);
      this._isOpened       = false;

      this._events();
    }

    _events() {
      this._modalToggleBtn.addEventListener('click', () => {
        this._toggle();
      })

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
        transformOrigin:'left bottom'
      });
    }

    _close() {
      this._isOpened = false;

      TweenMax.to(this._modal, 0.3, {
        autoAlpha: 0,
        scale: 0,
        ease: Expo.easeOut,
        transformOrigin:'left bottom',
        clearProps: 'all'
        // onComplete: function() {
        //  Faire apparaitre un autre élément 
        //  lors de la disparition du précédent
        // }
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

  // On boucle sur tous les noeuds du DOM ayant la classe
  // 'js-modal' et on crée une instance de notre constructeur
  // Modal sur chacun d'entre eux.
  const instanciateModals = () => {
    // On stock tous les noeuds du DOM souhaités dans une
    // variable qui sera un tableau.
    const modals = document.querySelectorAll('.js-modal');

    // Pour chaque élément de ce tableau on crée une instance
    // de la class Modal
    modals.forEach((el) => {
      const modal = new Modal(el);
    })
  }
  instanciateModals();
});

