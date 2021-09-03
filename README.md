# i1w
Info Evry Website - NodeJS Edition

### Mise en place d'un environnement de travail en local (à l'attention des <s>noobs</s> débutants).

#### Installation de Node.js 

Information : procédure testée sur Ubuntu 20.04, à adapter suivant l'OS...

* Note : version actuelle de Node.js sur le serveur : <s>10.22.0</s> ⚠️ Cette information est très régulièrement obsolète, au fur et à mesure des changement des mises à jour de NodeJS sur le serveur, si vous voulez installé la version utilisé en ce moment, veuillez contacter les adminsys / dev du site *i1w*.

    Nous pourrions nous contenter de la v10.19.0 (version des dépôts officiels d'Ubuntu 20.04) par exemple, mais tant qu'à faire autant prendre la même version.

* Installer le gestionnaire de paquet de nodejs

    `sudo apt install npm`

* Installer le gestionnaire de version de node.js
    
    `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash`
    
    (url donnée à titre indicatif, à vérifier sur [le dépôt de nvm](https://github.com/nvm-sh/nvm))

* Installer node v10.22.0
    
    `nvm install 10.22.0`

    (vous pouvez vérifier la version avec un petit `node -v`)

* Pour les autres OS:

	https://nodejs.org/en/download/

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

* Lancement du serveur Node.js

    `npm start`

    Il suffit maintenant de lancer le navigateur sur le port 3000 de la machine locale (choix de port arbitraire...) :
    
    [http://localhost:3000/](http://localhost:3000/)

#### Environement de dev pour VSCode

* Configuration

	* Créer un dossier `.vscode` à la racine du projet
	* Puis créer un fichier `settings.json` dededans:
	```
	{
    "javascript.autoClosingTags": true,    
    "javascript.format.placeOpenBraceOnNewLineForControlBlocks": false,
    "javascript.format.semicolons": "insert",
    "javascript.suggest.autoImports": true,
    "javascript.preferences.quoteStyle": "single",
    "javascript.format.insertSpaceAfterConstructor": true,
    "javascript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis": true,
    "javascript.format.insertSpaceAfterCommaDelimiter": true,
    "javascript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions": true,
    "javascript.format.insertSpaceAfterKeywordsInControlFlowStatements": true,    
    "javascript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets": false,
    "javascript.format.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces": false,
    "javascript.format.insertSpaceAfterSemicolonInForStatements": true,
    "javascript.format.insertSpaceBeforeAndAfterBinaryOperators": true,
    "javascript.format.insertSpaceBeforeFunctionParenthesis": false,
    "javascript.preferences.importModuleSpecifierEnding": "auto",
    "javascript.referencesCodeLens.showOnAllFunctions": false,
    "javascript.referencesCodeLens.enabled": false,
    "javascript.validate.enable": true,
    "javascript.suggest.completeJSDocs": true,
    "javascript.format.enable": true,
    "javascript.format.placeOpenBraceOnNewLineForFunctions": false,
    "javascript.preferences.importModuleSpecifier": "auto",
    "[javascript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "editor.tabSize": 4,
    "editor.insertSpaces": false,
	"editor.detectIndentation": false,
	"files.eol": "\n",
	}	
	```

* Installer l'extention ESLint

#### Liens utiles : 
* [Ressources sur Git et GitHub](https://drive.google.com/drive/folders/1_rNCJo7CVhF24G4-dElnr_7u4Rsmc7xR)
