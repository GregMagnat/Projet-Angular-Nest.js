# Utilisez une image de base avec Node.js
FROM node:20.12-alpine3.18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY ./package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposez le port sur lequel l'application Nest.js écoute
EXPOSE 4321

# Commande de démarrage de l'application
CMD ["npm", "run", "start:dev"]