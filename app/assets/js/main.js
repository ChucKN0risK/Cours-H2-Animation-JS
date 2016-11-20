/**
 * Global variables
 *
 * @author Jonathan Path
 */

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

console.info('main.js Loaded');

// conventions

var Modal = function(el) {
	this.$el             = el;
	this.$modalToggleBtn = this.$el.querySelector('.js-toggle-btn');
	this.$modal          = this.$el.querySelector('.js-' + this.$modalToggleBtn.dataset.content);
	this.isOpened        = false;

	this.init();
}

Modal.prototype = {
	init: function() {
		var self = this;

		this.$modalToggleBtn.addEventListener('click', function() {
			console.log('click')
			console.log(this)
			self.toggle();
		})
	},
	open: function() {
		this.isOpened = true
		console.log(this.$modal)
		TweenMax.to(this.$modal, 0.3, {
	        scale: 1,
	        ease: Expo.easeOut,
			transformOrigin:'left bottom'
	    });
	},
	close: function() {
		var self = this;

    	this.isOpened = false;
    	console.log('close')

    	TweenMax.to(this.$modal, 0.3, {
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
		var self = this;

		if ( self.isOpened ) {
			self.close();
		} else {
			self.open();
		}
	}
};

function instanciateModals() {
	var modals = document.querySelectorAll('.js-modal');
	modals.forEach(function(el) {
		var modal = new Modal(el);
		console.log(modal)
	});
}
instanciateModals();



var Form = function() {
	this.$el           = document.querySelector('.js-form');
	this.$startingText = this.$el.querySelector('.js-starting-text');
	this.$endingText   = this.$el.querySelector('.js-ending-text');
	this.$input        = this.$el.querySelector('input[type="email"]');
	this.$submit       = this.$el.querySelector('button[type="submit"]');

	this.init();
}

Form.prototype = {
	init: function() {
		var self = this;

		this.$el.addEventListener('click', function(e) {
			// e.stopPropagation();

			TweenMax.to(self.$startingText, 0.2, {
				scale: 0,
				autoAlpha: 0,
				onComplete: function() {
					TweenMax.to(self.$startingText, 0.2, {
						display: 'none'
					}, 0.5);
					self.open();
					console.log('click form')
				}
			});
		});

		this.$submit.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();

			self.hideChildren();
		})
	},
	open: function() {
		var self = this;

		TweenMax.to(self.$el, 0.3, {
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
		console.log('show input + submit')

		TweenMax.to(self.$input, 0.2, {
			scale: 1,
			ease: Expo.easeOut,
			display: 'initial'
		});
		TweenMax.to(self.$submit, 0.2, {
			scale: 1,
			ease: Expo.easeOut,
			display: 'initial'
		});
	},
	hideChildren: function() {
		var self = this;
		console.log('hide input + submit')
		TweenMax.to(self.$input, 0.3, {
			scale: 0,
			autoAlpha: 0,
			ease: Expo.easeOut,
			onComplete: function() {
				TweenMax.to(self.$input, 0.2, {
					display: 'none',
					clearProps: 'all'
				});
				self.close();
			}
		});
		TweenMax.to(self.$submit, 0.3, {
			scale: 0,
			autoAlpha: 0,
			ease: Expo.easeOut,
			onComplete: function() {
				TweenMax.to(self.$submit, 0.2, {
					display: 'none',
					clearProps: 'all'
				});
			}
		});
	},
	close: function() {
		var self = this;

		console.log('close')
		TweenMax.to(self.$el, 0.3, {
			width: '8rem',
			ease: Expo.easeOut,
			onComplete: function() {
				self.showEndingText();
			}
		});
	},
	showEndingText: function() {
		var self = this;
		// var _this = this;
		TweenMax.to(self.$endingText, 0.3, {
			scale: 1,
			ease: Expo.easeOut,
			display: 'initial',
			onComplete: function() {
				console.log('youpiiiiiiiii')
			}
		});
	}
}

var form = new Form();




























// var Modal = function() {
//     this.$el = document.querySelector('.js-toggle-btn');
//     this.$modal = document.querySelector('.js-' + this.$el.dataset.content);
//     this.isOpened = false;

//     this.init();
// };

// Modal.prototype = {
//     init: function() {
//     	var self = this;

//         this.$el.addEventListener('click', function() {
// 		    self.toggle();
//         });

//         // Close modal when user hits ESC
//         document.onkeydown = function(e) {
//         	e = e || window.event;
//         	console.log(e.keyCode)
//         	if ( e.keyCode === 27 && self.isOpened ) {
//         		self.close();
//         	}
//         };
//     },
//     toggle: function() {
//     	this.isOpened === false ? this.open() : this.close();
//     },
//     open: function() {
//     	this.isOpened = true;
//     	console.log('open')

//     	TweenMax.to(this.$modal, 0.3, {
// 	        scale: 1,
// 	        ease: Expo.easeOut,
// 			transformOrigin:'left bottom',
// 	        display: 'block'
// 	    });
//     },
//     close: function() {
//     	var self = this;

//     	this.isOpened = false;
//     	console.log('close')

//     	TweenMax.to(this.$modal, 0.3, {
// 	        autoAlpha: 0,
// 	        scale: 0,
// 	        ease: Expo.easeOut,
// 			transformOrigin:'left bottom',
// 	        onComplete: function() {
// 	        	TweenMax.to(self.$modal, 0.2, {
// 	        		display: 'none',
// 	        		clearProps: 'all'
// 	        	}, 0.2);
// 	        }
// 	    });
//     },
// };

// var modal = new Modal();


// We want to instaciate our ItemExpander Class
// for each HTML elements that have the class '.js-item-expander'
// $('.js-modal').each(function() {
//     var itemExpander = new ItemExpander($(this));
//     console.log(itemExpander)
// });
