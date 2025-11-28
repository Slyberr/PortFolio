#!/bin/bash
#Un script qui permet de se mettre dans un envirionnement de développement directement, à exécuter dans le dossier !

#Visual studio code

code
npm update
gnome-terminal -- bash -c "cd /home/presti-louis/Documents/Git_Projects/PortFolio; exec bash"
sass --watch  src/css/style.scss src/css/style.css

