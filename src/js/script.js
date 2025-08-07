$(document).ready(function(){

    //clique sur l'entete
    $('li ').on('click',function(){
        let sectionName =$(this).find('a').attr('href');
        if (sectionName){
            showPanel(sectionName)

        }
    })

    //lors du clique sur l'icone de l'entete
    $('#iconColorMode').on('click',function(){
        changeBrightMode($(this));
    })

    // clique sur une box text
    $('.sub-division').on('click',function(){
        showPanel('#'+ $(this).attr('id'))
    })
    
})



//Gestion de l'affichage du panel avec le texte.
function showPanel(currentID){
 
    let grabText=$(currentID).find('.textPanel').text()
    const panel=$("<div class='overlay'> <div class='tempPanel'><button class='collapse-section'><img id='image-retour' src='../images/WhiteCross.svg'></button><p></p></div></div>");
    panel.find('p').text(grabText);
    
    $('body').append(panel)
    $('body').on('keydown', function(event) {
        //fermer le panel si la touche "Escape" est pressée
        if (event.key === "Escape") {
            $('.collapse-section').trigger('click'); 
        }
    });


    //on applique les styles css
    
    //background
    $('.overlay').css({
        "display":"none",
        "justify-content": "center",
        "align-items": "center",
        "position": "fixed",
        "top": 0,
        "left": 0,
        "width": "100%",
        "height": "100%",
        "background-color":"rgb(0,0,0,0.8)"
    });

    //style du panel
    $('.tempPanel').css({
        "display":"flex",
        "justify-content": "center",
        "align-items": "center",
        "position": "absolute",
        "top": "25%",
        "bottom": "25%",
        "margin": "0 5%",
        "overflow-y": "scroll",

        "color":"var(--text-inBoxfont)",
        "background-color": "var(--bgBox)",
        'border-radius':'15px',
        'animation-name': 'slideIn',  
        'animation-duration': '0.5s'  
    });

    $('.tempPanel').find('p').css({
        'margin':'5%',
        'font-size':'25px', 
    });
    
    //bouton fermer
    $('#image-retour').css({
        'width':'25%',
        'height':'25%'
    });
    //on bloque le scroll de la page
     $('body').css({
        'overflow':'hidden' 
     })
     

    //animation d'apparition du panel
    $('.overlay').fadeIn();   
    
    //on ajoute un event sur le bouton fermer pour supprimer le panel + overlay
    $('.collapse-section').on('click',function(){

        $('.tempPanel').css({
            'animation-name': 'slideOut',  
            'animation-duration': '0.5s' 
        });

        //animation de disparition du panel
       $('.overlay').fadeOut(function(){
            $('.overlay').remove();
       })
       $('body').css({
        'overflow':'auto' 
     })
       
    })
}

//Gestion du mode clair/sombre
function changeBrightMode(actualIcon){
    if (!isBrightTheme()){
        actualIcon.attr("isBright","true")
        actualIcon.attr("src","../images/sun.svg")
        //changement des couleurs définies dans root.
        $(':root').css({
            '--bg':'whitesmoke',
            '--text-inBoxfont':'white',
            '--text-inHeadFont':'white',
            '--simpleText':'black',
            '--bgBox':'black'
        })
    }else{
        actualIcon.attr("isBright","false")
        actualIcon.attr("src","../images/moon.svg")
        $(':root').css({
            '--bg':'black',
            '--text-inBoxfont':'whitesmoke',
            '--text-inHeadFont':'whitesmoke',
            '--simpleText':'white',
            '--bgBox':'#0E202E'
        })
    }
}

// Fonction pour obtenir le thème de couleur actuel
function isBrightTheme(){
    return $('#iconColorMode').attr('isBright') === "true";
}


