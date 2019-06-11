    window.onload = function() {
        function changeSize() {
            var img = document.querySelectorAll('.gal-img');
            for (var i = 0; i < img.length; i++) {
                if (img[i].width > img[i].height) {
                    img[i].style.width = '149.5%';
                } else {
                    img[i].style.width = "100%";
                }
            }
        }
        changeSize();

        function date() {
            document.querySelector(".date").valueAsDate = new Date();
        }
        date();
        var slides = document.querySelectorAll('.slider-wrapp .slider-img');
        console.log(slides.length);
        var firstShow = true;
        var currentSlide = 0;
        var count = {
            counter: $('.slider-count'),
        }
        for (var s = 0; s < slides.length; s++) {
            count.counter.append(`<span>0${s+1}</span>`)
        }
        var slideInterval = setInterval(nextSlide, 2000);


        $('.slider-count>span').on('click', function() {
            currentSlide = $(this).index();
            clearInterval(slideInterval);
            for (rem = 0; rem < count.counter.children().length; rem++) {
                if (rem != $(this).index()) {
                    count.counter.children().eq(rem).removeClass('slider-active');
                    $('.slider-img').eq(rem).removeClass('slider-show');
                }
            }
            firstShow = true;
            nextSlide(true);
        })

        function nextSlide(arg) {
            slides[currentSlide].className = 'slider-img';
            if (firstShow == true) {
                $('.slider-img').eq(currentSlide).addClass('slider-show');
                count.counter.children().eq(currentSlide).addClass('slider-active');
                firstShow = false;
            } else {
                count.counter.children().eq(currentSlide).removeClass('slider-active');
                currentSlide = (currentSlide + 1) % slides.length;
                count.counter.children().eq(currentSlide).addClass('slider-active');
                slides[currentSlide].className = 'slider-img slider-show';
            }

        }


        var breakIt = false;
        var counterMenu = 1;

        function changeMenu(arg, arg2) {
            breakIt = true;
            if (arg2 == 'toLeft') {
                $('.new-menu-center').addClass('new-menu-left').removeClass('new-menu-center');
                $('.new-menu-right').eq(arg).addClass('new-menu-center').removeClass('new-menu-right');
                $('.new-menu-right').eq(arg).css({ 'z-index': counterMenu });
                counterMenu++;
            }
            if (arg2 == 'toRight') {
                counterMenu++;
                $('.new-menu-center').css({ 'z-index': counterMenu });
                $('.new-menu-center').addClass('new-menu-right').removeClass('new-menu-center');
                $('.new-menu-left').eq(arg).addClass('new-menu-center').removeClass('new-menu-left');


            }

        }
        $('.new-menu-right').eq(0).css({ zIndex: counterMenu });
        counterMenu++;
        $('.new-menu-cont').on('click', '.new-menu-right', function(e) {
            let arg = $('.new-menu-right').index(e.currentTarget);
            changeMenu(arg, 'toLeft');
        })

        $('.new-menu-cont').on('click', '.new-menu-left', function(e) {
            let arg = $('.new-menu-left').index(e.currentTarget);
            changeMenu(arg, 'toRight');
        })

        var counterMenuSlide = 0;

        $('.new-menu-btn-right').on('click', function() {
            if ($('.new-menu-right').length != 0) {
                counterMenuSlide++;
                changeMenu(0, 'toLeft');
            }
        })

        $('.new-menu-btn-left').on('click', function() {
            if ($('.new-menu-left').length != 0) {
                counterMenuSlide--;
                changeMenu(counterMenuSlide, 'toRight');
            }
        })

        function arrow() {
            $('.click-menu').animate({
                top: '14%'
            }, {
                duration: 1000,
                queue: false,
                complete: function() {
                    if (!breakIt) {
                        $('.click-menu').animate({ top: '15%' }, {
                            duration: 1000,
                            queue: false,
                            complete: function() {
                                if (!breakIt) {
                                    arrow();
                                } else {
                                    $('.click-menu').fadeOut('fast');
                                }
                            }
                        });
                    }
                }
            })
        }
        arrow()
        let t = 'tai';
        let co = 'con';
        let n = 'ner';
        let swd = false;
        let c = 0;
        let d = 4;
        let int = setInterval(function() {
            ird(co, t, n);
            c++;
        }, 20000);

        function ird(arg, arg2, arg3) {
            if (c >= d) {
                swd = !swd;
                clearInterval(int);
            }
            if (swd) {
                $('.' + arg + arg2 + arg3).remove();
            }

        }


        $('.show-more').on('click', function() {
            function fetcher() {
                return fetch('https://api.myjson.com/bins/1aoigj').then((rec) => {
                    return rec.json();
                }).then((res) => {
                    for (let i = 0; i < res.url.length; i++) {
                        console.log(res.url[i]);

                        $('.gal-img-wr').append(`
     <div class="gal-image-wrapper">
                         <div class="gal-text">
                             <h3 class="about-text">Вкусная еда</h3>
                         </div>
                         <img src="${res.url[i]}" alt="" class="gal-img">
                     </div>
                    `)
                    }
                    changeSize();
                })

            }
            fetcher();

        })

    }