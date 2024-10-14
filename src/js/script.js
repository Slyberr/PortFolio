
$(document).ready(function(){

    //ralentir la video
    $('#backgroundVideo')[0].playbackRate=0.8;


    //sur les sections de textes à faire apparaître
    $('.sub-division').click(function (){

       if( $('.textToHide').css('display')!='none' ){

        $(this).find('.textToHide').css("display","none");
        $(this).find('.textToShow').css("display","flex");

        $(this).css({
            'font-size':'20px',
            'background-color':'black',
            'color':'white'}
        )

       }; 
      
    })


    //Gérer  les entrées dans les divisions de textes:
    //si le texte est affiché, on ne veut pas de style lors du hover
    $('.sub-division').on('mouseenter',function (){
        
        if ($(this).find('.textToShow').css('display')=='none'){
        
            $(this).css({
                'font-size':'25px',
                'background-color':'rgb(26, 0, 39)',
                'color':'white'}
            )
        }
    })

    $('.sub-division').on('mouseleave',function (){
        
        if ($(this).find('.textToShow').css('display')=='none'){
            $(this).css({
                'font-size':'20px',
                'background-color':'black',
                'color':'white'}
            )
        }

    })

    $('.return-section').on('click',function(e){
        //la sub-division a déjà un onclick, le bouton cliqué, cela se propage aussi sur la box, ce n'est pas ce qu'on veut.
        e.stopPropagation()

        $('.textToShow').css('display','none'); 
        $('.textToHide').css("display","flex");
    })
})

//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
