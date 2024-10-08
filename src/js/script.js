
$(document).ready(function(){


    //sur les sections de textes à faire apparaître
    $('.textToHide').click(function (e){

        $('.textToShow').css('display','flex'); 
        $('.textToHide').css("display","none");

    })

    //ralentir la video
    $('#backgroundVideo')[0].playbackRate=0.8;
    


});