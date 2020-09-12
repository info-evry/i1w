# i1w
Info Evry Website - NodeJS Edition

### Mise en place d'un environnement de travail en local (à l'attention des <s>noobs</s> débutants).

Information : procédure testée sur Ubuntu 20.04, à adapter suivant l'OS...


#### Installation de node.js 

* Note : version actuelle de node.js sur le server : 10.22.0.

    Nous pourrions nous contenter de la v10.19.0 (version des dépôts officiels d'Ubuntu 20.04)par exemple, mais tant qu'à faire autant prendre la même version.

* Installer le gestionnaire de paquet de nodejs

    `sudo apt install npm`

* Installer le gestionnaire de version de node.js
    
    `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`
    
    (url donnée à titre indicatif, à vérifier sur [le dépôt de nvm](https://github.com/nvm-sh/nvm))

* Installer node v10.22.0
    
    `nvm install 10.22.0`

    (vous pouvez vérifier la version avec un petit `node -v`)

#### Syncronisation des dépôts git en local

* Cloner le dépôt (faites le dans un dossier adéquat, hein !)

    `git clone --branch dev https://github.com/info-evry/i1w`

* Se déplacer le dossier du projet

    `cd i1w`

* Mettre à jour le dépôt local
    
    `git fetch`


* Installer les paquets et dépendances

    `npm install`

#### Utilisation

* Lancement de nodejs

    `npm start`

    Il suffit maintenant de lancer le navigateur sur le port 3000 de la machine locale (choix de port arbitraire...) :
    
    [http://localhost:3000/](http://localhost:3000/)


#### Liens utiles : 
* [ressources sur git et github](https://drive.google.com/drive/folders/1_rNCJo7CVhF24G4-dElnr_7u4Rsmc7xR)
