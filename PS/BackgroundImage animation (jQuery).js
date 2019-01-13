function moveGallery(){
																	//Moving Gallery pictures				
    var bGposition = $("ul.sigProClassic li.sigProThumb a.sigProLink img.sigProImg");
    function posDown() {
        bGposition.animate({
            backgroundPositionX: '100%',
            backgroundPositionY: '100%',
        }, {
            duration: 6000,
            queue: true,
            complete: function() {
                bGposition.animate({
                    backgroundPositionX: '0%',
                    backgroundPositionY: '0%',
                }, {
                    duration: 1500,
                    queue: true,
                    complete: posDown()
                })
            }
        })
    }
    posDown();
    														//End of the script
}
