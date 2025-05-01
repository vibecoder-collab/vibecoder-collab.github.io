jQuery(document).ready(function ($) {
	AOS.init({
		duration: 800,
		easing: 'slide',
		once: true,
	});

	setTimeout(() => {
		document.querySelectorAll('.fade-up').forEach(el => {
			el.classList.add('loaded');
		});
	}, 400)


	const currentUrl = window.location.pathname.split('/').pop() || '';
	const navLinks = document.querySelectorAll('.site-menu a.nav-link');

	navLinks.forEach(link => {
		const linkUrl = link.getAttribute('href').split('/').pop();

		if (currentUrl === linkUrl || (currentUrl === '' && linkUrl === 'index.html')) {
			link.parentElement.classList.add('active');
		}
	});

	$('#copyright-year').text(new Date().getFullYear());


	var siteMenuClone = function () {
		$('.js-clone-nav').each(function () {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function () {
			var counter = 0;
			$('.site-mobile-menu .has-children').each(function () {
				var $this = $(this);

				$this.prepend('<i class="ri-arrow-down-s-line arrow-collapse collapsed"></i>');

				$this.find('.arrow-collapse').attr({
					'data-toggle': 'collapse',
					'data-target': '#collapseItem' + counter,
				});

				$this.find('> ul').attr({
					'class': 'collapse',
					'id': 'collapseItem' + counter,
				});

				counter++;

			});

		}, 1000);

		$('body').on('click', '.arrow-collapse', function (e) {
			var $this = $(this);
			if ($this.closest('li').find('.collapse').hasClass('show')) {
				$this.removeClass('active');
			} else {
				$this.addClass('active');
			}
			e.preventDefault();

		});

		$(window).resize(function () {
			var $this = $(this),
				w = $this.width();

			if (w > 768) {
				if ($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function (e) {
			var $this = $(this);
			e.preventDefault();

			if ($('body').hasClass('offcanvas-menu')) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		})

		// click outisde offcanvas
		$(document).mouseup(function (e) {
			var container = $(".site-mobile-menu");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		});
	};
	siteMenuClone();


	var siteMagnificPopup = function () {
		$('.image-popup').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: false,
			fixedContentPos: true,
			mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				verticalFit: true
			},
			zoom: {
				enabled: true,
				duration: 300 // don't foget to change the duration also in CSS
			}
		});

		$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
		});
	};
	siteMagnificPopup();


	var siteCarousel = function () {
		if ($('.nonloop-block-13').length > 0) {
			$('.nonloop-block-13').owlCarousel({
				center: false,
				items: 1,
				loop: true,
				stagePadding: 0,
				margin: 0,
				autoplay: true,
				nav: true,
				navText: ['<i class="ri-arrow-left-line"></i>', '<i class="ri-arrow-right-line"></i>'],
				responsive: {
					600: {
						margin: 0,
						nav: true,
						items: 2
					},
					1000: {
						margin: 0,
						stagePadding: 0,
						nav: true,
						items: 3
					},
					1200: {
						margin: 0,
						stagePadding: 0,
						nav: true,
						items: 4
					}
				}
			});
		}

		$('.slide-one-item').owlCarousel({
			center: false,
			items: 1,
			loop: true,
			stagePadding: 0,
			margin: 0,
			autoplay: true,
			pauseOnHover: false,
			nav: true,
			navText: ['<i class="ri-arrow-left-s-line"></i>', '<i class="ri-arrow-right-s-line"></i>']
		});
	};
	siteCarousel();

	var scrollWindow = function () {
		$(window).scroll(function () {
			var $w = $(this);
			var st = $w.scrollTop();
			var navbar = $('.js-site-navbar');
			var sd = $('.js-scroll-wrap');

			if (st > 150) navbar.addClass('scrolled');
			else navbar.removeClass('scrolled sleep');

			if (st > 350) {
				navbar.addClass('awake');
				sd.addClass('sleep');
			} else {
				navbar.removeClass('awake').addClass('sleep');
				sd.removeClass('sleep');
			}
		});
	};
	scrollWindow();

	function animateNumber($element, targetNumber, duration) {
		$({ count: 0 }).animate({ count: targetNumber }, {
			duration: duration,
			easing: 'swing',
			step: function () {
				$element.text(Math.floor(this.count));
			},
			complete: function () {
				$element.text(targetNumber);
			}
		});
	}

	function startAnimationIfVisible() {
		$('.counter-box [data-number]').each(function () {
			const $this = $(this);
			const targetNumber = parseInt($this.data('number'));
			const isVisible = $this.is(':visible') && $this.parents().filter(function () {
				return $(this).css('opacity') === '0' || $(this).css('visibility') === 'hidden';
			}).length === 0;

			if (isVisible && !$this.hasClass('animated')) {
				$this.addClass('animated');
				animateNumber($this, targetNumber, 2000);
			}
		});
	}

	startAnimationIfVisible();
	$(window).on('scroll resize', startAnimationIfVisible);
});