jQuery(document).ready(function(){							 //Headers logo script
var secLogo = ['<img src="/templates/pozitiv-studio/images/logoPart.png" id="partnerLogo">', '<img src="http://pro.bretagne35.com/sites/cdt35pro/files/esperluette.png" id="amperand">',
    '<img src="/templates/pozitiv-studio/images/idea.png" id="idea">'
];
for (var i = 0; i < secLogo.length; i++) {
    jQuery("#logo").before(secLogo[i]);
    var id = secLogo[i].match(/id="(\w+)"/gmi).toString().replace(/id="(\w+)"/gmi, '$1');
    console.log(id);
    $("#" + id).hide();
}
var screenProp = [2021,1541,476,];
        console.log(screen.width);
        var moveProps = [
            ['-135px', '-261px', '-131px'],
            ['19px', '-26px', '15px'],
            ['60px', '9px', '62px']
        ];
        var toper;
        var move = [];
        var sec = jQuery("#partnerLogo");
        sec.css({position:"relative"});
        var amp = [
            ["amp1920", "amp1440", "amp425"],
            ["amp1920fixed", "amp1440fixed", "amp425fixed"]
        ];
        var part = [
            ["part1920", "part1440", "part425"],
            ["part1920fixed", "part1440fixed", "part425fixed"]
        ];
        var idea = [
            ["idea1920", "idea1440", "idea425"],
            ["idea1920fixed", "idea1440fixed", "idea425fixed"]
        ];
        var psLogo = [
            ["psLogo1920", "psLogo1440", "psLogo425"],
            ["psLogo1920fixed", "psLogo1440fixed", "psLogo425fixed"]
        ];
        var countJ;
                												//Change the Classes with props
            for (var j = 0; j < screenProp.length; j++) {
                if (screen.width < screenProp[j]) {
                    move = moveProps[j];
                    countJ = j;
                    console.log(j);
                }
            }
            if (jQuery(window).scrollTop() < 50) {
                jQuery("#amperand").addClass(amp[0][countJ]);
                jQuery("#partnerLogo").addClass(part[0][countJ]);
                jQuery("#idea").addClass(idea[0][countJ]);
                jQuery("#logo img").addClass(psLogo[0][countJ]);
            } else {
                jQuery("#amperand").addClass(amp[1][countJ]);
                jQuery("#partnerLogo").addClass(part[1][countJ]);
                jQuery("#idea").addClass(idea[1][countJ]);
                jQuery("#logo img").addClass(psLogo[1][countJ]);
            }

            jQuery(window).bind("scroll", function() {
                if (jQuery(window).scrollTop() > 50) {
                    jQuery("#amperand").removeClass(amp[0][countJ]);
                    jQuery("#partnerLogo").removeClass(part[0][countJ]);
                    jQuery("#idea").removeClass(idea[0][countJ]);
                    jQuery("#logo img").removeClass(psLogo[0][countJ]);

                    jQuery("#amperand").addClass(amp[1][countJ]);
                    jQuery("#partnerLogo").addClass(part[1][countJ]);
                    jQuery("#idea").addClass(idea[1][countJ]);
                    jQuery("#logo img").addClass(psLogo[1][countJ]);
                    
                    jQuery("#partnerLogo").removeAttr('style')
                } else {

                    jQuery("#amperand").addClass(amp[0][countJ]);
                    jQuery("#partnerLogo").addClass(part[0][countJ]);
                    jQuery("#idea").addClass(idea[0][countJ]);
                    jQuery("#logo img").addClass(psLogo[0][countJ]);

                    jQuery("#amperand").removeClass(amp[1][countJ]);
                    jQuery("#partnerLogo").removeClass(part[1][countJ]);
                    jQuery("#idea").removeClass(idea[1][countJ]);
                    jQuery("#logo img").removeClass(psLogo[1][countJ]);
                    
                    jQuery("#partnerLogo").removeAttr('style')
                }
            });
            
    setTimeout(function(){
        	if(jQuery("#partnerLogo").hasClass("part1920fixed")){
        		toper = "-16px";
        		console.log("not");
        		move=['-50px','-131px','-45px'];
        	}
        	if(jQuery("#partnerLogo").hasClass("part1920")){
        		toper = "41px";
        		console.log("not");
        	}
            if(jQuery("#partnerLogo").hasClass("part1440fixed")){
        		toper = "-13px";
        		console.log("not");
        	}
        	if(jQuery("#partnerLogo").hasClass("part1440")){
        		toper = "0px";
        		console.log("has");
        	}
        	if(jQuery("#partnerLogo").hasClass("part425fixed")){
        		toper = "-9px";
        		move = ['54px','12px','54px'];
        		console.log("not");
        	}
        	if(jQuery("#partnerLogo").hasClass("part425")){
        		toper = "57px";
        		console.log("has");
        	}
        	console.log(toper);
},200)

        $("#partnerLogo").show(1000);
function jumpinIdea() {
    setTimeout(function an() {sec.animate(
    	{ top: "-29px" }, 200, function() 
    	{sec.animate({ top: toper, },
    	{duration: 200,queue: false,complete: function() 
    	{jQuery("#idea").hide(200);
    	sec.animate({ left: move[2], }, 1000)}
            });
            jQuery("#amperand").show(1400);

            })
    	
    }, 4000);
}
var countAnimation = 1;
function animation120() {
    sec.animate({ left: move[0] }, 400)
    console.log("animated right");
}
function animation50() {
    sec.animate({ left: move[1] }, 300);
    console.log("animated left");
}
for (countAnimation; countAnimation < 4; countAnimation++) {
    setTimeout(animation120(), 200);
    setTimeout(animation50(), 200);
    if (countAnimation == 3) {
        jQuery("#idea").fadeIn(2500);
        jumpinIdea();
    }
}
	moveGallery();
})      //end of headersScript
