"use strict";
document.addEventListener('DOMContentLoaded', function () {
    headerGestion();
    containerPresentation();
    programsCardsPresentation();
    PanelGestion();
});
//Gestion de l'entête
function headerGestion() {
    //Cliquer sur une section de l'entête
    $('li ').on('click', function () {
        var _a;
        var sectionName = (_a = $(this).find('a').attr('href')) !== null && _a !== void 0 ? _a : "";
        if (sectionName) {
            showAndLogicPanel(sectionName);
        }
    });
    //Logique métier du changement de couleur de préférence.
    $('#icon-color-mode').on('click', function () {
        changeBrightMode($(this));
    });
}
//Gestion du container d'accueil (dynamique du nom, de l'image..)
function containerPresentation() {
    $('#slogan-portfolio').on('mouseenter', function () {
        $(this).html('Un portfolio fait main de A à Z. <i><u class="textadded"onhover="color:blue">En savoir plus</u></i>');
        $('.textadded').on('click', function () {
            window.alert('Technologies : HTML5/CSS3/TypeScript/SCSS et node.js pour gérer TS et SCSS.\n\nCe portfolio a été réalisé avec Jquery comme unique bibliothèque pour simplifier la manipulation du DOM.\n\n "slideUp()" et "slideDown()"  de cette dernière sont les seules fonctions utilisées dans un but esthétique.');
        });
    });
    $('#slogan-portfolio').on('mouseleave', function () {
        $(this).text('Un portfolio fait main de A à Z.');
    });
    $('#container-louis-pic').on('mouseover', function () {
        $('#button-img').css('opacity', '1');
    });
    $('#container-louis-pic').on('mouseleave', function () {
        $('#button-img').css('opacity', '0');
    });
}
//Gestion des conteneurs des images avec les langages, les frameworks et outils.
function programsCardsPresentation() {
    $('.program-card').on('mouseenter', function () {
        var _a;
        var textToShow = (_a = $(this).find('img').attr('texttoshow')) !== null && _a !== void 0 ? _a : "";
        var parent = $(this).closest('.box-skills').find('p');
        $(this).closest('.box-skills').find('p').text("".concat(parent === null || parent === void 0 ? void 0 : parent.text(), " = ").concat(textToShow));
    });
    $('.program-card').on('mouseleave', function () {
        var _a;
        var parent = $(this).closest('.box-skills').find('p');
        var text = (_a = parent.text()) !== null && _a !== void 0 ? _a : '';
        var newtext = text.match(/^[^=]+/);
        if (newtext != null) {
            $(this).closest('.box-skills').find('p').text(newtext[0]);
        }
    });
}
//Logique métier du panel 
function PanelGestion() {
    $('.sub-division').on('click', function () {
        showAndLogicPanel('#' + $(this).attr('id'));
    });
}
//Gestion du mode clair/sombre
function changeBrightMode(actualIcon) {
    if (!isBrightTheme()) {
        actualIcon.attr('isBright', 'true');
        actualIcon.attr('src', 'src/assets/icon_site/sun.svg');
        //changement des couleurs définies dans root.
        $(':root').css({
            '--bg': 'whitesmoke',
            '--text-in-box': 'white',
            '--text-in-header': 'white',
            '--simple-text': 'black',
            '--bg-box': 'black',
        });
    }
    else {
        actualIcon.attr('isBright', 'false');
        actualIcon.attr('src', 'src/assets/icon_site/moon.svg');
        $(':root').css({
            '--bg': 'black',
            '--text-in-box': 'whitesmoke',
            '--text-in-header': 'whitesmoke',
            '--simple-text': 'white',
            '--bg-box': '#0E202E',
        });
    }
}
;
// Fonction pour obtenir le thème de couleur actuel
function isBrightTheme() {
    return $('#icon-color-mode').attr('isBright') === "true";
}
;
//Gestion de l'affichage du panel avec le texte dédié.
function showAndLogicPanel(currentID) {
    var body = $('body');
    var content = $(currentID).find('.section-to-show');
    var overlay = $("<div class='overlay'> <div class='temp-panel'><img id='image-retour' src='src/assets/icon_site/whiteCross.svg'><div class='content-section'></p></div></div>");
    overlay.find('.content-section').append(content.html());
    //ajout du panel à la page et blocage du scoll du body
    body.append(overlay);
    body.css('overflow', 'hidden');
    //Transition d'affichage du panel
    overlay.fadeIn();
    EventsListenersForPanel(body, overlay);
}
;
//Logique métier du panel
function EventsListenersForPanel(body, overlay) {
    //La flèche à côté d'un texte de section dans la présentation.
    arrowDiscoverOrHide(overlay);
    buttonSectionClose(overlay);
    //Gérer la fermeture du panel
    collapsePanel(body, overlay);
}
//Gestion de la fermeture du panel
function collapsePanel(body, overlay) {
    //on ajoute un event sur le bouton fermer pour supprimer le panel + overlay
    $('#image-retour').on('click', function () {
        //animation de disparition du panel
        overlay.fadeOut(function () {
            body.off('keydown.panel');
            overlay.remove();
        });
        //Pour éviter que le texte du panel se décale un peu en disparaissant.
        setTimeout(function () {
            body.css({
                'overflow': 'auto'
            });
        }, 350);
    });
    //On sort du panel si on clique sur échap
    body.on('keydown.panel', function (event) {
        if (event.key === 'Escape') {
            $('#image-retour').trigger('click');
        }
    });
    //On sort du panel si le click est sur l'overlay exclusivement
    $(overlay).on('click', function (event) {
        if (event.target === this) {
            $('#image-retour').trigger('click');
        }
    });
}
;
//Pas forcément convaincu du résultat de l'animation, à voir si je garde.
function arrowDiscoverOrHide(overlay) {
    overlay.find('.container-title-img').on('click', function () {
        var contentToShow = $(this).next('.text-section-to-show');
        if (contentToShow.css('display') === 'none') {
            //Je n'ai pas fait slideDown() et slideUp() à la main, c'est trop long et sans doute moins performant.
            contentToShow.slideDown(600);
            $(this).find('.animate').css('animation', 'arrowHoverTitleReverse 0.5s infinite');
        }
        else {
            $(this).children('img').css('transform', 'rotate(0deg)');
            contentToShow.slideUp(600);
            $(this).find('.animate').css('animation', 'arrowHoverTitle 0.5s infinite');
        }
    });
    overlay.find('.container-title-img').on('mouseenter', function () {
        $(this).children('img').addClass('animate');
        if ($(this).next(".text-section-to-show").css('display') !== 'none') {
            $(this).find('.animate').css('animation', 'arrowHoverTitleReverse 0.5s infinite');
        }
        else {
            $(this).find('.animate').css('animation', 'arrowHoverTitle 0.5s infinite');
        }
    });
    overlay.find('.container-title-img').on('mouseleave', function () {
        $(this).children('img').removeClass('animate');
        $(this).children('img').removeAttr('style');
        if ($(this).next('.text-section-to-show').css('display') !== 'none') {
            $(this).children('img').css('transform', 'rotate(180deg)');
        }
    });
}
function buttonSectionClose(overlay) {
    overlay.find('.close-section').on('click', function () {
        var contentToShow = $(this).parent();
        contentToShow.slideUp(600);
    });
}
