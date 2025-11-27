
document.addEventListener("DOMContentLoaded", () => {

    headerGestion();
    containerPresentation();
    programsCardsPresentation();
    PanelGestion();

})

//Gestion de l'entête
function headerGestion() {

    //Cliquer sur une section de l'entête
    $('li ').on('click', function () {

        let sectionName: string = $(this).find('a').attr('href') ?? "";

        if (sectionName) {
            showAndLogicPanel(sectionName);
        }

    })

    //Logique métier du changement de couleur de préférence.
    $('#iconColorMode').on('click', function () {
        changeBrightMode($(this));
    })
}

//Gestion du container d'accueil (dynamique du nom, de l'image..)
function containerPresentation() {


    $('#slogan_portefolio').on('mouseenter', function () {
        $(this).html('Un PorteFolio fait main de A à Z. <i><u class="textadded"onhover="color:blue">En savoir plus</u></i>');
        
        $('.textadded').on('click',function() {
            window.alert('Technologies : HTML5/CSS3/TypeScript/SCSS.\n\nCe portefolio a été réalisé avec Jquery comme unique bibliothèque pour simplifier la manipulation du DOM.\n\n "slideUp()" et "slideDown()"  de cette dernière sont les seules fonctions utilisées dans un but esthétique.')
        })
    
    })
    $('#slogan_portefolio').on('mouseleave', function () {

        $(this).text('Un PorteFolio fait main de A à Z.');
    })

    $('#container-louis-pic').on('mouseover', function () {
        $('#button-img').css('opacity', '1');

    })
    $('#container-louis-pic').on('mouseleave', function () {
        $('#button-img').css('opacity', '0');

    })
}

//Gestion des conteneurs des images avec les langages, les frameworks et outils.
function programsCardsPresentation() {

    $('.program_card').on('mouseenter', function () {
        let textToShow: string = $(this).find('img').attr('texttoshow') ?? "";
        let parent: JQuery = $(this).closest('.box-skills').find('p');

        $(this).closest('.box-skills').find('p').text(`${parent?.text()} = ${textToShow}`);

    })

    $('.program_card').on('mouseleave', function () {

        let parent: JQuery = $(this).closest('.box-skills').find('p');
        let text: string = parent.text() ?? "";
        let newtext: RegExpMatchArray | null = text.match(/^[^=]+/);

        if (newtext != null) {
            $(this).closest('.box-skills').find('p').text(newtext[0]);
        }

    })

}

//Logique métier du panel 
function PanelGestion() {
    $('.sub-division').on('click', function () {
        showAndLogicPanel('#' + $(this).attr('id'));
    })
}


//Gestion du mode clair/sombre
function changeBrightMode(actualIcon: JQuery<HTMLElement>) {
    if (!isBrightTheme()) {

        actualIcon.attr("isBright", "true");
        actualIcon.attr("src", "../images/icon_site/sun.svg");
        //changement des couleurs définies dans root.
        $(':root').css({
            '--bg': 'whitesmoke',
            '--text-inBoxfont': 'white',
            '--text-inHeadFont': 'white',
            '--simpleText': 'black',
            '--bgBox': 'black',
        });

    } else {

        actualIcon.attr("isBright", "false");
        actualIcon.attr("src", "../images/icon_site/moon.svg");
        $(':root').css({
            '--bg': 'black',
            '--text-inBoxfont': 'whitesmoke',
            '--text-inHeadFont': 'whitesmoke',
            '--simpleText': 'white',
            '--bgBox': '#0E202E',
        });
    }
};

// Fonction pour obtenir le thème de couleur actuel
function isBrightTheme() {
    return $('#iconColorMode').attr('isBright') === "true";
};


//Gestion de l'affichage du panel avec le texte dédié.
function showAndLogicPanel(currentID: string) {

    const body: JQuery = $('body');
    const content: JQuery = $(currentID).find('.section-to-show');
    const overlay: JQuery = $("<div class='overlay'> <div class='temp-panel'><img id='image-retour' src='../images/icon_site/whiteCross.svg'><div class='content-section'></p></div></div>");

    overlay.find(".content-section").append(content.html());

    //ajout du panel à la page et blocage du scoll du body
    body.append(overlay);
    body.css("overflow", "hidden");

    //Transition d'affichage du panel
    overlay.fadeIn();

    EventsListenersForPanel(body, overlay);
};



//Logique métier du panel
function EventsListenersForPanel(body: JQuery<HTMLElement>, overlay: JQuery<HTMLElement>) {

    //La flèche à côté d'un texte de section dans la présentation.
    arrowDiscoverOrHide(overlay)

    //Gérer la fermeture du panel
    collapsePanel(body, overlay)
}

//Gestion de la fermeture du panel
function collapsePanel(body: JQuery<HTMLElement>, overlay: JQuery<HTMLElement>) {

    //on ajoute un event sur le bouton fermer pour supprimer le panel + overlay
    $('#image-retour').on('click', function () {
        //animation de disparition du panel
        overlay.fadeOut(function () {
            body.off('keydown.panel');
            overlay.remove();
        })

        //Pour éviter que le texte du panel se décale un peu en disparaissant.
        setTimeout(()=>{
            body.css({
            'overflow': 'auto'
        })
        },350)
        

    })

    //On sort du panel si on clique sur échap
    body.on('keydown.panel', function (event) {

        if (event.key === "Escape") {
            $('#image-retour').trigger('click');
        }

    });

    //On sort du panel si le click est sur l'overlay exclusivement
    $(overlay).on('click', function (event) {

        if (event.target === this) {
            $('#image-retour').trigger('click');
        }

    });
};

function arrowDiscoverOrHide(overlay: JQuery<HTMLElement>) {



    overlay.find('.container-title-img').on("click", function () {

        let contentToShow = $(this).next(".text-section-to-show")

        if (contentToShow.css('display') === 'none') {

            //Je n'ai pas fait slideDown() et slideUp() à la main, c'est trop long et sans doute moins performant.
            contentToShow.slideDown()
            
            $(this).find('.animate').css('animation', 'arrowHoverTitleReverse 0.5s infinite');

        } else {
            $(this).children('img').css('transform', 'rotate(0deg)');
            contentToShow.slideUp()
            
            $(this).find('.animate').css('animation', 'arrowHoverTitle 0.5s infinite');
            
        }

    })

    overlay.find('.container-title-img').on("mouseenter", function () {

        $(this).children('img').addClass('animate');
        if ($(this).next(".text-section-to-show").css('display') !== 'none') {
            $(this).find('.animate').css('animation', 'arrowHoverTitleReverse 0.5s infinite');
        }else{
            $(this).find('.animate').css('animation', 'arrowHoverTitle 0.5s infinite');
        }


    })
    overlay.find('.container-title-img').on("mouseleave", function () {

        $(this).children('img').removeClass('animate');
        $(this).children('img').removeAttr('style');

        if ($(this).next(".text-section-to-show").css('display') !== 'none') {
            $(this).children('img').css('transform', 'rotate(180deg)');
        }
    })
}