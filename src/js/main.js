$(document).ready(function ($) {
    //menu
    $('.gamburger').on('click', () => {
        $('.menu').toggleClass('opened');
        $('.gamburger').toggleClass('close-menu');
        $('.close').toggleClass('open');
    });
    $('.close').on('click', () => {
        $('.menu').toggleClass('opened');
        $('.gamburger').toggleClass('close-menu');
        $('.close').toggleClass('open');
    });

    // Menu Scroll to section

    $('a[href^="#"').click(function () {
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
        }else {
            $('.toTop').fadeOut();
        }
    });


    //Modal form
    $('.button').click(function (e) {
        e.preventDefault();
        
    });

    //slider
    let mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'vertical',
        loop: true,
      
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      
      });

    // form validation

    $(document).ready(function() {
        $('[data-submit]').on('click', function(e) {
            e.preventDefault();
            $(this).parent('form').submit();
        })
        $.validator.addMethod(
            "regex",
            function(value, element, regexp) {
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
                submitHandler: function(form) {
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
                                .always(function(response) {
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
                                .always(function(response) {
                                    setTimeout(function() {
                                        $('#loader').fadeOut();
                                    }, 800);
                                    setTimeout(function() {
                                        $('#overlay').fadeIn();
                                        $form.trigger('reset');
                                        //строки для остлеживания целей в Я.Метрике и Google Analytics
                                    }, 1100);
                                    $('#overlay').on('click', function(e) {
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
        $('.js-form').each(function() {
            valEl($(this));
        });

    });

});