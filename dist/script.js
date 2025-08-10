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
    //lors du clique sur l'icone de l'entete
    $('#iconColorMode').on('click', function () {
        changeBrightMode($(this));
    });
    // clique sur une box text
    $('.sub-division').on('click', function () {
        showPanel('#' + $(this).attr('id'));
    });
});
//Gestion de l'affichage du panel avec le texte.
function showPanel(currentID) {
    var content = $(currentID).find('.section-to-show');
    var panel = $("<div class='overlay'> <div class='temp-panel'><button class='collapse-section'><img id='image-retour' src='../images/WhiteCross.svg'></button><div class='content-section'></p></div></div>");
    panel.find(".content-section").append(content.html());
    $('body').append(panel);
    //on bloque le scroll de la page
    $('body').css({
        'overflow': 'hidden'
    });
    //animation d'apparition du panel
    $('.overlay').fadeIn();
    $('body').on('keydown', function (event) {
        //fermer le panel si la touche "Escape" est pressée
        if (event.key === "Escape") {
            $('.collapse-section').trigger('click');
        }
    });
    //on ajoute un event sur le bouton fermer pour supprimer le panel + overlay
    $('.collapse-section').on('click', function () {
        $('.temp-panel').css({
            'animation-name': 'slideOut',
            'animation-duration': '0.5s'
        });
        //animation de disparition du panel
        $('.overlay').fadeOut(function () {
            $('.overlay').remove();
        });
        $('body').css({
            'overflow': 'auto'
        });
    });
}
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
            '--bgBox': 'black'
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
            '--bgBox': '#0E202E'
        });
    }
}
// Fonction pour obtenir le thème de couleur actuel
function isBrightTheme() {
    return $('#iconColorMode').attr('isBright') === "true";
}
