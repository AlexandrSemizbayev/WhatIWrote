$(document).ready(function() {

function checkWidth(){
    var WindowWidth = window.innerWidth;
    if(WindowWidth<376){
        $(".content").width(375);
        console.log(WindowWidth)
    }else if(WindowWidth>376&& WindowWidth<1000){
        $('.content').width(600);
        console.log(WindowWidth)
    }    
}

checkWidth()






    var check = false;
    // $('.video').on("mousemove", () => {
    //     $('.video-text').css({
    //         display: "block"
    //     });
    // })
    // $('.video').on("mousestop", () => {
    //     $('.video-text').css({
    //         display: "none"
    //     });
    // })
    $('.play-btn').on("click", function() {
        if (check == false) {
            check = true;
            document.getElementById("video").play();
        } else {
            check = false;
            document.getElementById("video").pause();
        }
    });



    var arr = ["bg", "Unbenannt-1", "Unbenannt-2"];
    var count = 0;
    var sliderImg = $(".change_slider_img");

    function checker() {
        if (sliderImg.length < arr.length) {
            console.log("<");
            for (var j = sliderImg.length; j <= arr.length; j++) {
                $('.slider_list').append(`<a><img src="images/01.png" class="change_slider_img" value="${j}"></a>`);
                console.log('aaaa');
            }
        } if(sliderImg.length>arr.length) {
            for(var k=sliderImg.length; k>arr.length-1;k--){
                sliderImg.eq(k).remove();
            }
        }
    }

    function changeSlide(val) {
        for (var i = 0; i < sliderImg.length; i++) {
            sliderImg[i].setAttribute('src', 'images/01.png');
        }
        sliderImg[count].setAttribute('src', 'images/02.png');
        console.log(count);


        if (count < arr.length && count != 0) {
            $('.slider_img').css({
                backgroundImage: 'url(images/slides/' + arr[count] + '.jpg)',
                transition: "background-image 1s",
            });
            if (val == "prev") {
                count--;
            } else { count++ }
        } else {
            count = 0;
            sliderImg[count].setAttribute('src', 'images/02.png');
            $('.slider_img').css({
                backgroundImage: 'url(images/slides/' + arr[count] + '.jpg)',
                transition: "background-image 1s"
            });
            if (val == "prev") {
                count = arr.length-1;
            } else { count++ }
        }
    }


    checker();
    $("#left").on('click', function() {
        changeSlide('prev');

    });
    $("#right").on('click', function() {
        changeSlide('next');

    });
    $(".change_slider_img").on('click', function(event) {
        count = event.target.getAttribute('value') - 1;
        changeSlide();

    });

});