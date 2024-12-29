//affiche le panel
function showPanel(currentID){
 
    
    let grabText=$(currentID).find('.textPanel').text()
    const panel=$("<div class='overlay'> <div class='tempPanel'><button class='collapse-section'><img id='image-retour' src='../images/WhiteCross.svg'></button><p></p></div></div>");
    panel.find('p').text(grabText);
   
    $('body').append(panel)
   

    //regles css des elements ajoutés


    $('.overlay').css({
        "display":"none",
        "justify-content": "center",
        "align-items": "center",
        "position": "fixed",
        "top": 0,
        "left": 0,
        "width": "100%",
        "height": "100%",
        "background-color":"rgb(0,0,0,0.2)"
       
    });

    $('.tempPanel').css({
        "display":"flex",
        "justify-content": "center",
        "align-items": "center",
        "color":"var(--text-inBoxfont)",
        "background-color": "var(--bgBox)",
        "width": "50%",
        "position": "absolute",
        "inset":"25%",  
        'border-radius':'15px'  
    
    });
    $('.tempPanel').find('p').css({
        'margin':'5%',
        'font-size':'25px',
        
    }
    )
  
    
    $('#image-retour').css({
        'width':'25%',
        'height':'25%'
       
    })


    //animations

    $('.overlay').fadeIn();   

    //on ajoute un event sur le bouton fermer pour supprimer le panel + overlay
    $('.collapse-section').on('click',function(){
       $('.overlay').fadeOut(function(){
        $('.overlay').remove();
       })
       
    })

    
       

    

  
}


function changeBrightMode(actualIcon){
    if (actualIcon.attr("isBright")=="false"){
        actualIcon.attr("isBright","true")
        actualIcon.attr("src","../images/sun.svg")
        //changement des couleurs définies dans root.
        $(':root').css({
            '--bg':'whitesmoke',
            '--text-inBoxfont':'white',
            '--text-inHeadFont':'white',
            '--simpleText':'black',
            '--bgBox':'black'})
    }else{
        actualIcon.attr("isBright","false")
        actualIcon.attr("src","../images/moon.svg")
        $(':root').css({
            '--bg':'black',
            '--text-inBoxfont':'whitesmoke',
            '--text-inHeadFont':'whitesmoke',
            '--simpleText':'white',
            '--bgBox':'#0E202E'})
    }
}

function getActualcolorTheme(){
    return $('#iconBright').attr('isBright')
}

$(document).ready(function(){

   

    //quand on click sur l'entete
    $('.entete').on('click',function(){
        let sectionName =$(this).attr('href')
        showPanel(sectionName)

    })

    //lors du click sur l'icone de l'entete
    $('#iconBright').on('click',function(){
        changeBrightMode($(this));
    })

    //quand on click sur une box text
    $('.sub-division').on('click',function(){
        showPanel('#'+ $(this).attr('id'))

    })
    
    $('.sub-division').on('hover',function(){
        $(this).css({})
    })

    
    
   

    
})

//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
