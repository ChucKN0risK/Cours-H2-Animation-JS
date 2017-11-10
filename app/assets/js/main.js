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

  class FormAnimation {
    constructor() {
      this._el = document.querySelector('.js-form');
      this._startingText = this._el.querySelector('.js-starting-text');
      this._input = this._el.querySelector('input');
      this._submitButton = this._el.querySelector('button[type="submit"]');
      this._endingText = this._el.querySelector('.js-ending-text');
      this._isDisabled = false;

      this._events();
    }

    _events() {
      this._el.addEventListener('click', () => {
        if (!this._isDisabled) {
          TweenMax.to(this._startingText, 0.2, {
            scale: 0,
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
      this._el.addEventListener('submit', (e) => {
        e.preventDefault();
        this._hideChildren();
      })
      this._submitButton.addEventListener('click', (e) => {
        e.stopPropagation();
      })
    }

    _open() {
      TweenMax.to(this._el, 0.3, {
        width: '20rem',
        ease: Expo.easeOut,
        display: 'flex',
        onComplete: () => {
          this._showChildren();
        }
      });
    }

    _showChildren() {
      TweenMax.to(this._input, 0.3, {
        scale: 1,
        ease: Expo.easeOut,
        display: 'block'
      });
      TweenMax.to(this._submitButton, 0.2, {
        scale: 1,
        ease: Expo.easeOut,
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
              clearProps: 'all'
            }, 0.5);
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
          }, 0.5);
          this._close();
        }
      });
    }

    _close() {
      TweenMax.to(this._el, 0.3, {
        width: '8rem',
        ease: Expo.easeOut,
        onComplete: () => {
          this._showEndingText();
        }
      });
    }

    _showEndingText() {
      TweenMax.to(this._endingText, 0.3, {
        scale: 1,
        ease: Expo.easeOut,
        display: 'initial',
        onComplete: () => {
          this._isDisabled = true;
        }
      });
    }
  }

  const formAnimation = new FormAnimation;
});








