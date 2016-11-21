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

document.addEventListener('DOMContentLoaded', function() {

	console.info('main.js Loaded');

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

	// Ici Modal est notre constructeur. C'est à lui que l'on renseigne
	// les différentes propriétés avec lesquelles on va vouloir jouer.
	// Constructeur = "Ce dont j'ai besoin"
	var Modal = function(el) {
		this._el             = el;
		this._modalToggleBtn = this._el.querySelector('.js-toggle-btn');
		this._modal          = this._el.querySelector('.js-' + this._modalToggleBtn.dataset.content);
		this._isOpened       = false;

		this.init();
	}

	// Prototype = "Ce que j'ai besoin de faire avec mon constructeur"
	Modal.prototype = {
		init: function() {
			// La méthode init() est appelée dans notre constructeur
			// donc 'this' fait référence à notre constructeur.
			// console.log(this) nous renvoie notre constructeur Modal
			// On stocke donc notre constructeur Modal (this) dans une variable
			// au nom logique comme 'self' ou '_this'. C'est cette variable qu'on
			// pourra ensuite utiliser dans d'autres contextes.
			var self = this;

			this._modalToggleBtn.addEventListener('click', function() {
				// Ici on déclenche une fonction au click sur notre
				// bouton. On est ici dans le contexte du bouton.
				// Donc 'this' fait ici référence au bouton et non à
				// notre construteur Modal sur lequel on a envie d'éxécuter
				// notre méthode toggle().
				// console.log(this) --> notre bouton :(
				// console.log(self) --> notre constructeur Modal :)
				self.toggle();
			})

			// On ferme la modal si elle est affichée et qu'on 
			// appuie sur ESC
			document.addEventListener('keydown', function(e) {
				if ( e.keyCode === 27 && self._isOpened ) {
					self.toggle();
				}
			});
		},
		open: function() {
			this._isOpened = true;

			TweenMax.to(this._modal, 0.3, {
	      scale: 1,
	      ease: Expo.easeOut,
				transformOrigin:'left bottom'
	    });
		},
		close: function() {
			this._isOpened = false;
			console.log('close');

			TweenMax.to(this._modal, 0.3, {
				autoAlpha: 0,
				scale: 0,
				ease: Expo.easeOut,
				transformOrigin:'left bottom',
				clearProps: 'all'
				// onComplete: function() {
				// 	Faire apparaitre un autre élément 
				//	lors de la disparition du précédent
				// }
			});
		},
		toggle: function() {
			if (this._isOpened) {
				this.close();
			} else {
				this.open();
			}
			// Version plus courte en ternaire : this._isOpened ? this.close(); : this.open();
		}
	};

	// On boucle sur tous les noeuds du DOM ayant la classe
	// 'js-modal' et on crée une instance de notre constructeur
	// Modal sur chacun d'entre eux.
	function instanciateModals() {
		// On stock tous les noeuds du DOM souhaités dans une
		// variable qui sera un tableau.
		var modals = document.querySelectorAll('.js-modal');

		// Pour chaque élément de ce tableau on crée une instance
		// de la class Modal
		modals.forEach(function(el) {
			var modal = new Modal(el);
			console.log(el, modal);
		});
	}
	instanciateModals();



	var Form = {
		init: function(el) {
			this._el           = el;
			this._startingText = this._el.querySelector('.js-starting-text');
			this._endingText   = this._el.querySelector('.js-ending-text');
			this._input        = this._el.querySelector('input[type="email"]');
			this._submit       = this._el.querySelector('button[type="submit"]');

			this.events();
		},
		events: function() {
			var self = this;

			this._el.addEventListener('click', function() {
				TweenMax.to(self._startingText, 0.2, {
					scale: 0,
					autoAlpha: 0,
					onComplete: function() {
						TweenMax.to(self._startingText, 0.2, {
							display: 'none'
						}, 0.5);
						self.open();
						console.log('click form')
					}
				});
			});

			this._submit.addEventListener('click', function(e) {
				// Si on valide un formulaire le comportement par défaut du 
				// navigateur sera de soumettre les infos dans les champs
				// et de recharger la page. Pour finaliser notre animation
				// on doit empêcher (EN : 'to prevent') le comportement 
				// par défaut du browser.
				e.preventDefault();
				// En JS, il faut comprendre la délégation d'événement.
				// Si on intérragit avec un élément, comme un clique sur 
				// un bouton, alors le click se propage de notre cible, 
				// le bouton, à tous ses ancêtres (notamment le formulaire).
				// C'est ce qu'on apelle l'event bubbling.
				// Hors pour lancer notre animation on clique sur le formulaire.
				// Si on empêche pas le click de remonter au formulaire on créera
				// une boucle et le début de notre animation reviendra.
				// On dit donc à l'événement de stopper sa propagation.
				e.stopPropagation();

				self.hideChildren();
			})
		},
		open: function() {
			var self = this;

			TweenMax.to(self._el, 0.3, {
				width: '20rem',
				ease: Expo.easeOut,
				display: 'flex',
				onComplete: function() {
					self.showChildren();
				}
			});
		},
		showChildren: function() {
			var self = this;
			console.log('show input + submit');

			TweenMax.to(self._input, 0.2, {
				scale: 1,
				ease: Expo.easeOut,
				display: 'initial'
			});
			TweenMax.to(self._submit, 0.2, {
				scale: 1,
				ease: Expo.easeOut,
				display: 'initial'
			});
		},
		hideChildren: function() {
			var self = this;
			console.log('hide input + submit')

			TweenMax.to(self._input, 0.3, {
				scale: 0,
				autoAlpha: 0,
				ease: Expo.easeOut,
				onComplete: function() {
					TweenMax.to(self._input, 0.2, {
						display: 'none',
						clearProps: 'all'
					});
					self.close();
				}
			});
			TweenMax.to(self._submit, 0.3, {
				scale: 0,
				autoAlpha: 0,
				ease: Expo.easeOut,
				onComplete: function() {
					TweenMax.to(self._submit, 0.2, {
						display: 'none',
						clearProps: 'all'
					});
				}
			});
		},
		close: function() {
			var self = this;

			console.log('close');
			TweenMax.to(self._el, 0.3, {
				width: '8rem',
				ease: Expo.easeOut,
				onComplete: function() {
					self.showEndingText();
				}
			});
		},
		showEndingText: function() {
			var self = this;

			TweenMax.to(self._endingText, 0.3, {
				scale: 1,
				ease: Expo.easeOut,
				display: 'initial',
				onComplete: function() {
					console.log('youpiiiiiiiii');
				}
			});
		}
	}

	var form = Form;
	form.init(document.querySelector('.js-form'));

});