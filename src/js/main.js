// const {
//     on
// } = require("gulp-notify/lib/notify");

$(function ($) {
    //menu
    // $('.gamburger').on('click', () => {
    //     $('.menu').toggleClass('opened');
    //     $('.gamburger').toggleClass('close-menu');
    //     $('.close').toggleClass('open');
    // });
    // $('.close').on('click', () => {
    //     $('.menu').toggleClass('opened');
    //     $('.gamburger').toggleClass('close-menu');
    //     $('.close').toggleClass('open');
    // });
    $('.gamburger').on('click', () => {
        $('.header__menu').slideDown(500);
        $('.close1').fadeIn(300);
    });
    $('.close1').on('click', () => {
        $('.header__menu').slideUp(500);
        $('.close1').fadeOut(300);
    });
    // Menu Scroll to section

    $('a[href^="#"').on('click', function () {
        let target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 1500);

        return false;
    });

    // scroll up

    $(window).on('scroll', () => {
        if ($(this).scrollTop() > 250) {
            $('.toTop').fadeIn();
        } else {
            $('.toTop').fadeOut();
        }
    });


    //Modal form
    $('.button, .header__btn').on('click', () => {
        $('#overlay').fadeIn(300);
        $('.modal').fadeIn(700);
    });
    //modal close 
    $('.close-button').on('click', () => {
        $('#overlay').fadeOut(300);
        $('.modal').fadeOut(300);
    });

    $('#overlay').on('click', function () {
        $(this).fadeOut(300);
        $('.modal').fadeOut(300);
    });

    
    // form validation

    $(document).ready(function () {
        $('[data-submit]').on('click', function (e) {
            e.preventDefault();
            $(this).parent('form').submit();
        })
        $.validator.addMethod(
            "regex",
            function (value, element, regexp) {
                var re = new RegExp(regexp);
                return this.optional(element) || re.test(value);
            },
            "Please check your input."
        );



        // Функция валидации и вывода сообщений
        function valEl(el) {

            el.validate({
                rules: {
                    tel: {
                        required: true,
                        regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                    },
                    name: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    checkbox: {
                        required: true
                    }
                },
                messages: {
                    tel: {
                        required: 'Введите телефон',
                        regex: 'Телефон может содержать символы + - ()'
                    },
                    name: {
                        required: 'Введите имя',
                    },
                    email: {
                        required: 'Введите E-mail',
                        email: 'Неверный формат E-mail'
                    },
                    checkbox: {
                        required: 'Этот пункт обязателен для заполнения'
                    }
                },

                // Начинаем проверку id="" формы
                submitHandler: function (form) {
                    $('#loader').fadeIn();
                    let $form = $(form);
                    let $formId = $(form).attr('id');
                    switch ($formId) {
                        // Если у формы id="goToNewPage" - делаем:
                        case 'goToNewPage':
                            $.ajax({
                                    type: 'POST',
                                    url: $form.attr('action'),
                                    data: $form.serialize(),
                                })
                                .always(function (response) {
                                    //ссылка на страницу "спасибо" - редирект
                                    location.href = '';
                                });
                            break;
                            // Если у формы id="popupResult" - делаем:
                        case 'popupResult':
                            $.ajax({
                                    type: 'POST',
                                    url: $form.attr('action'),
                                    data: $form.serialize(),
                                })
                                .always(function (response) {
                                    setTimeout(function () {
                                        $('#loader').fadeOut();
                                    }, 800);
                                    setTimeout(function () {
                                        $('#overlay').fadeIn();
                                        $form.trigger('reset');
                                        //строки для остлеживания целей в Я.Метрике и Google Analytics
                                    }, 1100);
                                    $('#overlay').on('click', function (e) {
                                        $(this).fadeOut();
                                    });
                                    $('#exampleModal').arcticmodal('close');

                                });
                            break;
                    }
                    return false;
                }
            })
        }

        // Запускаем механизм валидации форм, если у них есть класс .js-form
        $('.js-form').each(function () {
            valEl($(this));
        });

    });

});

//slider main
let mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    slidesPerView: 3,
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 'auto',
            spaceBetween: 20,
            centeredSlides: true,
        },
        768: {
            slidesPerView: 'auto',
            spaceBetween: 40,
            centeredSlides: true,
        },
        1100: {
            slidesPerView: 3,
            spaceBetween: 50,
            centeredSlides: false,
        },
      }

});
//slider ownProduct
let mySwiper2 = new Swiper('.swiper-container, .swiper-container2', {
    // Optional parameters
    slidesPerView: 3,
    loop: true,


    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 'auto',
            spaceBetween: 10,
            centeredSlides: true,
        },
        768: {
            slidesPerView: 'auto',
            spaceBetween: 30,
            centeredSlides: true,
        },
        1100: {
            slidesPerView: 3,
            spaceBetween: 20,
            centeredSlides: false,
        },
      }

});