
document.addEventListener("DOMContentLoaded", () => {
    //clique sur l'entete
    $('li ').on('click', function () {
        let sectionName: string = $(this).find('a').attr('href') ?? "";
        if (sectionName) {
            showPanel(sectionName)
        }
    })

    //lors du clique sur l'icone pour changer le thème
    $('#iconColorMode').on('click', function () {
        changeBrightMode($(this));
    })

    $('#slogan_portefolio').on('mouseenter',function() {
        $(this).text('Seule la librarie Jquery à été utilisée.')
    })
    $('#slogan_portefolio').on('mouseleave',function() {
        $(this).text('Un PorteFolio fait main de A à Z.')
    })

    //lors du clique sur une division à découvrir text
    $('.sub-division').on('click', function () {
        showPanel('#' + $(this).attr('id'))
    })

    $('#container-louis-pic').on('mouseover', function () {
        $('#button-img').css('opacity', '1')

    })
    $('#container-louis-pic').on('mouseleave', function () {
        $('#button-img').css('opacity', '0')

    })
    $('.program_card').on('mouseenter', function () {
        let textToShow: string = $(this).find('img').attr('texttoshow') ?? "";
        let parent : JQuery = $(this).closest('.box-skills').find('p');


        $(this).closest('.box-skills').find('p').text(`${parent?.text()} = ${textToShow}`)
        
    })

    $('.program_card').on('mouseleave', function () {
        let parent : JQuery = $(this).closest('.box-skills').find('p');
        let text : string = parent.text() ?? "";
        let newtext : RegExpMatchArray|null = text.match(/^[^=]+/);
        if(newtext != null){
            $(this).closest('.box-skills').find('p').text(newtext[0]);
        }
    })

})



//Gestion de l'affichage du panel avec le texte.
function showPanel(currentID: string) {
    const body: JQuery = $('body');
    const content: JQuery = $(currentID).find('.section-to-show');
    const overlay: JQuery = $("<div class='overlay'> <div class='temp-panel'><img id='image-retour' src='../images/icon_site/whiteCross.svg'><div class='content-section'></p></div></div>");
    overlay.find(".content-section").append(content.html());

    body.append(overlay)

    //apparition du panel
    overlay.fadeIn();
    collapsePanel(body, overlay)
};

//Gestion du mode clair/sombre
function changeBrightMode(actualIcon: JQuery<HTMLElement>) {
    if (!isBrightTheme()) {
        actualIcon.attr("isBright", "true")
        actualIcon.attr("src", "../images/icon_site/sun.svg")
        //changement des couleurs définies dans root.
        $(':root').css({
            '--bg': 'whitesmoke',
            '--text-inBoxfont': 'white',
            '--text-inHeadFont': 'white',
            '--simpleText': 'black',
            '--bgBox': 'black',
        })
    } else {
        actualIcon.attr("isBright", "false")
        actualIcon.attr("src", "../images/icon_site/moon.svg")
        $(':root').css({
            '--bg': 'black',
            '--text-inBoxfont': 'whitesmoke',
            '--text-inHeadFont': 'whitesmoke',
            '--simpleText': 'white',
            '--bgBox': '#0E202E',
        })
    }
};

// Fonction pour obtenir le thème de couleur actuel
function isBrightTheme() {
    return $('#iconColorMode').attr('isBright') === "true";
};

//Gestion de la fermeture du panel
function collapsePanel(body: JQuery<HTMLElement>, overlay: JQuery<HTMLElement>) {

    //on ajoute un event sur le bouton fermer pour supprimer le panel + overlay
    $('#image-retour').on('click', function () {
        //animation de disparition du panel
        overlay.fadeOut(function () {
            body.off('keydown.panel');
            overlay.remove();
        })
        body.css({
            'overflow': 'auto'
        })

    })

    body.on('keydown.panel', function (event) {

        if (event.key === "Escape") {
            $('#image-retour').trigger('click');
        }

    });

    //fermer le panel si le click est sur l'overlay exclusivement
    $(overlay).on('click', function (event) {

        if (event.target === this) {
            $('#image-retour').trigger('click')
        }

    });
};

