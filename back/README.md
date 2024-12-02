## Dépôt Back-End

### Configuration

1. Créez un fichier `.env` à la racine du projet et ajoutez-y les variables suivantes :
    ```env
    MONGODB_USER='bastien'
    MONGODB_PWD='hNOJUFTNPv8gRqqO'
    MONGODB_CLUSTER='cluster0.87ozbqt.mongodb.net'
    MONGODB_DATABASE='Cluster0'
    ```

### Démarrage

1. Ouvrez un terminal et connectez-vous à Atlas pour la base de données avec la commande suivante :
    ```bash
    mongosh "mongodb+srv://cluster0.87ozbqt.mongodb.net/" --apiVersion 1 --username bastien
    ```
    puis tapez le mot de passe
   ```
   hNOJUFTNPv8gRqqO
   ```

3. Dans un autre terminal, démarrez le serveur back-end :
    ```bash
    npm install
    npm run dev
    ```

## Liens Utiles

- **Dépôt Back-End** : [Lien vers le dépôt back-end](https://github.com/Sairkko/ChallengeStack2)
- **Dépôt Front-End** : [Lien vers le dépôt front-end](https://github.com/Michael89100/ChallengeStack2_Front)
- **Suivi du Projet** : [Lien vers le Notion avec le suivi du projet](https://jeremyrossi123.notion.site/Taches-992f91ae99834a889be9db2ed5c766dd?pvs=4)

