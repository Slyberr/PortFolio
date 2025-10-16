"use strict";
document.addEventListener("DOMContentLoaded", function () {
    console.log($);
    //clique sur l'entete
    $('li ').on('click', function () {
        var sectionName = $(this).find('a').attr('href');
        if (sectionName) {
            showPanel(sectionName);
        }
    });
    //lors du clique sur l'icone pour changer le thème
    $('#iconColorMode').on('click', function () {
        changeBrightMode($(this));
    });
    //lors du clique sur une division à découvrir text
    $('.sub-division').on('click', function () {
        showPanel('#' + $(this).attr('id'));
    });
    $('#container-louis-pic').on('mouseover', function () {
        $('#button-img').css('opacity', '1');
    });
    $('#container-louis-pic').on('mouseout', function () {
        $('#button-img').css('opacity', '0');
    });
});
//Gestion de l'affichage du panel avec le texte.
function showPanel(currentID) {
    var body = $('body');
    var content = $(currentID).find('.section-to-show');
    var overlay = $("<div class='overlay'> <div class='temp-panel'><img id='image-retour' src='../images/whiteCross.svg'><div class='content-section'></p></div></div>");
    overlay.find(".content-section").append(content.html());
    body.append(overlay);
    //apparition du panel
    overlay.fadeIn();
    collapsePanel(body, overlay);
}
;
//Gestion du mode clair/sombre
function changeBrightMode(actualIcon) {
    if (!isBrightTheme()) {
        actualIcon.attr("isBright", "true");
        actualIcon.attr("src", "../images/sun.svg");
        //changement des couleurs définies dans root.
        $(':root').css({
            '--bg': 'whitesmoke',
            '--text-inBoxfont': 'white',
            '--text-inHeadFont': 'white',
            '--simpleText': 'black',
            '--bgBox': 'black',
        });
    }
    else {
        actualIcon.attr("isBright", "false");
        actualIcon.attr("src", "../images/moon.svg");
        $(':root').css({
            '--bg': 'black',
            '--text-inBoxfont': 'whitesmoke',
            '--text-inHeadFont': 'whitesmoke',
            '--simpleText': 'white',
            '--bgBox': '#0E202E',
        });
    }
}
;
// Fonction pour obtenir le thème de couleur actuel
function isBrightTheme() {
    return $('#iconColorMode').attr('isBright') === "true";
}
;
//Gestion de la fermeture du panel
function collapsePanel(body, overlay) {
    //on ajoute un event sur le bouton fermer pour supprimer le panel + overlay
    $('#image-retour').on('click', function () {
        //animation de disparition du panel
        overlay.fadeOut(function () {
            body.off('keydown.panel');
            overlay.remove();
        });
        body.css({
            'overflow': 'auto'
        });
    });
    body.on('keydown.panel', function (event) {
        if (event.key === "Escape") {
            $('#image-retour').trigger('click');
        }
    });
    //fermer le panel si le click est sur l'overlay exclusivement
    $(overlay).on('click', function (event) {
        if (event.target === this) {
            $('#image-retour').trigger('click');
        }
    });
}
;
