(function ($) {
    $.fn.switchPopup = function (btn, time, overflow) {
        var $popup = this;
        $(document).on('click', btn, function () {
            var $scrollWidth = window.innerWidth - document.documentElement.clientWidth
            var $time = typeof time === 'number' ? time : 300;
			var $overflow = typeof overflow !== 'undefined' ? overflow : true;

			var $popupBody = $popup.find('.popup__body');


			function openPopup() {
				$popup.addClass('display');
				
				var defaultSettingsPopupBody = {
					width: $popupBody.css('width'),
					height: $popupBody.css('height'),
					top: $popupBody.offset().top - $(window).scrollTop(),
					left: $popupBody.offset().left
				};

				$popupBody.css({
					position: 'fixed',
					width: $(btn).css('width'),
					height: $(btn).css('height'),
					top: $(btn).offset().top - $(window).scrollTop(),
					left: $(btn).offset().left
				});

                setTimeout(function () {
					$popup.addClass('anim');
					
					$popupBody.css({
						position: 'fixed',
						width: defaultSettingsPopupBody.width,
						height: defaultSettingsPopupBody.height,
						top: defaultSettingsPopupBody.top,
						left: defaultSettingsPopupBody.left
					});
				}, 3);
				
                setTimeout(function () {
					$popup.addClass('visible');

					$popupBody.css({
						position: 'relative',
						width: 'auto',
						height: 'auto',
						top: 'auto',
						left: 'auto'
					});
				}, $time);
				
				if($overflow) {
					$('html').css({
						'padding-right': $scrollWidth,
						'overflow': 'hidden'
					});
				}
			}

            function closePopup() {
				$popup.removeClass('visible');
                setTimeout(function () {
					$popup.removeClass('anim');
					$popupBody.css({
						opacity: '0'
					});
                }, $time);
                setTimeout(function () {
                    $popup.removeClass('display');
					$popupBody.css({
						opacity: ''
					});
					if($overflow) {
						$('html').css({
							'padding-right': 0,
							'overflow': 'auto'
						});
					}
				}, $time * 2);
            }

            if ($popup.hasClass('display')) {
                closePopup();
            }

            if (!$popup.hasClass('display')) {
				openPopup();
            }

            setTimeout(function () {
                if ($('.popup.display.visible').length > 1) {
                    closePopup($('.popup').not($popup));
                }
            }, 2);
        });
    };
})(jQuery);

$(function() {
	/* ИМГ В СВГ */
	function imgSvg() {
		$('img.img-svg').each(function(){
			var $img = $(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');

			$.get(imgURL, function(data) {
				var $svg = $(data).find('svg');

				if(typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
				}

				if(typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass+' replaced-svg');
				}

				$svg = $svg.removeAttr('xmlns:a');

				if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
					$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
				}

				$img.replaceWith($svg);

			}, 'xml');
		});
	}
	imgSvg();

	
	//  Пример создания попапа
	$('.popup-lamp').switchPopup('.js-tgl-popup-lamp', 250);
	$('.popup-temp').switchPopup('.js-tgl-popup-temp', 250);
	$('.popup-term').switchPopup('.js-tgl-popup-term', 250);

	/* Настройки адаптивности */
	var breakpoints = {
		'xs': 0,
		'sm': 768,
		'md': 1024,
		'lg': 1396
	};
	
	/* Слайдер устройств из инфо блока */
	var $infoDevicesSlider = $('.info-devices-slider__items');
	var $infoDevicesSliderArrow = $('.info-devices-slider__arrow');
	
	// Инициализация слайдера
	$infoDevicesSlider.slick({
		dots: false, // Не показываем навигацию по слайдам
		arrows: false, // Не показываем стрелки
		infinite: true, // Бесконечная прокрутка
		speed: 300, // Скорость прокрутки
		slidesToShow: 2, // Количество видимых слайдов
		vertical: true, // Вертикальное позиционирование слайдов
		adaptiveHeight: true, // Своя высота элементов слайдов
		responsive: [
			{
				breakpoint: breakpoints.sm,
				settings: {
					vertical: false, // Возврат к горизонтальному позиционированию слайдов
					variableWidth: true, // Слайды любой ширины
					focusOnSelect: true, // Переход к слайду при клике
					swipeToSlide: true, // Перетаскивание любого количества слайдов
					slidesToShow: 3, // Количество видимых слайдов
				}
			}
		]
	});
	
	// Переключение слайдов
	$infoDevicesSliderArrow.on('click', function() {
		$infoDevicesSlider.slick('slickNext');
		$(this).addClass('info-devices-slider__arrow_hidden'); // Временно скрываем стрелку пока слайды двигаются вверх (для красоты)
	});
	
	// После того как слайдер передвинулся показываем стрелку
	$infoDevicesSlider.on('afterChange', function(event, slick, currentSlide) {
		if($infoDevicesSliderArrow.hasClass('info-devices-slider__arrow_hidden')) {
			$infoDevicesSliderArrow.removeClass('info-devices-slider__arrow_hidden');
		}
	});
	
	/* Слайдер избранных сценариев */
	var $favoritesScriptsSlider = $('.favorites-scripts-slider');
	var $favoritesScriptsSliderPrev = $('.favorites-scripts-slider__prev');
	var $favoritesScriptsSliderNext = $('.favorites-scripts-slider__next');
	
	// Инициализация слайдера
	$favoritesScriptsSlider.slick({
		dots: false, // Не показываем навигацию по слайдам
		arrows: false, // Не показываем стрелки
		infinite: true, // Бесконечная прокрутка
		speed: 300, // Скорость прокрутки
		rows: 3, // Количество строк со слайдами
		slidesPerRow: 3, // Количество слайдов в строке
		responsive: [
			{
				breakpoint: breakpoints.lg,
				settings: {
					rows: 3, // Количество строк со слайдами
					slidesPerRow: 2, // Количество слайдов в строке
				}
			},
			{
				breakpoint: breakpoints.md,
				settings: {
					rows: 1, // Количество строк со слайдами
					slidesPerRow: 1, // Количество слайдов в строке
					slidesToShow: 4, // Количество видимых слайдов
					variableWidth: true, // Слайды любой ширины
					swipeToSlide: true // Перетаскивание любого количества слайдов
				}
			},
			{
				breakpoint: breakpoints.sm,
				settings: {
					rows: 1, // Количество строк со слайдами
					slidesPerRow: 1, // Количество слайдов в строке
					slidesToShow: 3, // Количество видимых слайдов
					variableWidth: true, // Слайды любой ширины
					focusOnSelect: true // Переход к слайду при клике
				}
			}
		]
	});
	
	// Переключение слайдов назад
	$favoritesScriptsSliderPrev.on('click', function() {
		$favoritesScriptsSlider.slick('slickPrev');
	});
	
	// Переключение слайдов вперед
	$favoritesScriptsSliderNext.on('click', function() {
		$favoritesScriptsSlider.slick('slickNext');
	});
	
	/* Слайдер избранных устройств */
	var $favoritesDevicesSlider = $('.favorites-devices-slider');
	var $favoritesDevicesSliderPrev = $('.favorites-devices-slider__prev');
	var $favoritesDevicesSliderNext = $('.favorites-devices-slider__next');
	
	// Инициализация слайдера
	$favoritesDevicesSlider.slick({
		dots: false, // Не показываем навигацию по слайдам
		arrows: false, // Не показываем стрелки
		infinite: true, // Бесконечная прокрутка
		speed: 300, // Скорость прокрутки
		slidesToShow: 2, // Количество видимых слайдов
		variableWidth: true, // Своя ширина элементов слайдов 
		adaptiveHeight: true, // Своя высота элементов слайдов 
		swipeToSlide: true // Перетаскивание любого количества слайдов
	});
	
	// Переключение слайдов назад
	$favoritesDevicesSliderPrev.on('click', function() {
		$favoritesDevicesSlider.slick('slickPrev');
	});
	
	// Переключение слайдов вперед
	$favoritesDevicesSliderNext.on('click', function() {
		$favoritesDevicesSlider.slick('slickNext');
	});

	/* Сортировка слайдеров */
	$('.slider-sort').each(function(id, el) {
		var $parent = $(el); // Родительский блок сортировки
		var sliderClass = $parent.data('slider'); // Класс слайдера который фильтруем (из дата атрибута)
		var $slider = $('.'+sliderClass); // Слайдер который фильтруем
		var $button = $parent.children('.slider-sort__btn-xs'); // Кнопка на мобильном которая открывает меню фильтрации

		$button.on('click', function() {
			$(this).parent('.slider-sort').toggleClass('slider-sort_open');
		});

		$parent.find('.slider-sort__list button').on('click', function() {
			var filter = $(this).data('filter'); // Выбранный фильтр (из дата атрибута)

			$parent.find('.slider-sort__list button').removeClass('active');
			$(this).addClass('active');

			if (filter !== 'all') {
				$slider.slick('slickUnfilter');
				$slider.slick('slickFilter', function() {
					return $(this).find('.'+sliderClass+'__item').hasClass(filter);
				});
				$button.children('span').text($(this).text());
			} else { // Сброс фильтрации
				$slider.slick('slickUnfilter');
				$button.children('span').text('Все');
			}
		});
	});

	/* Range Slider */
	$("#slider-lamp").slider({
		min: 0,
		max: 100,
		value: 60,
	});

	$("#slider-temp").slider({
		min: -10,
		max: 30,
		value: 18,
		change: function( event, ui ) {
			var $parent = $(ui.handle).parents('.popup__body');
			var $tempBlock = $parent.find('.popup-right-info__temp span');
			var value = ui.value;
			$tempBlock.text( value > 0 ? '+'+value : value );
		}
	});

	rangeSliderOrientation();

	$(window).resize(function() {
		rangeSliderOrientation();
	});

	function rangeSliderOrientation() {
		if( $(window).width() < breakpoints.sm ) {
			$("#slider-lamp").slider( "option", "orientation", "vertical" );
			$("#slider-temp").slider( "option", "orientation", "vertical" );
			$('.slider-range').each(function(id, el) {
				$(el).removeClass('slider-range_horizontal');
				$(el).addClass('slider-range_vertical');
			});
		} else {
			$("#slider-lamp").slider( "option", "orientation", "horizontal" );
			$("#slider-temp").slider( "option", "orientation", "horizontal" );
			$('.slider-range').each(function(id, el) {
				$(el).removeClass('slider-range_vertical');
				$(el).addClass('slider-range_horizontal');
			});
		}
	}

	/* Round Slider */
	$("#term-slider").roundSlider({
		radius: 110, // Радиус круга
		width: 21, // Ширина полосы с полосками....
		//circleShape: "pie", // Тип окружности
		sliderType: "min-range", // Тип слайдера
		min: 1, // Минимальное значение
		max: 30, // Максимальное значение
		value: 23, // Значение по умолчанию
		startAngle: 300, // Начало окружности тут
		endAngle: 240,
		handleSize: 0,
		handleShape: "square",
		editableTooltip: false, // Значение нельзя ввести вручную (по нажатию на цыфры в центре они не превращаются в инпут)
		tooltipFormat: function(arg) {
			return "+" + arg.value;
		},
		change: function(arg) {
			var $parent = $(arg.control).parents('.popup__body');
			var $tempBlock = $parent.find('.popup-right-info__temp span');
			var value = arg.value;
			$tempBlock.text( value > 0 ? '+'+value : value );
		}
	});
	
});

