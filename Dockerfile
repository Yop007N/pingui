FROM node:14

# Crea el directorio de la app
WORKDIR /usr/src/app

# Instala las dependencias de la app
COPY package*.json ./
RUN npm install

# Copia los archivos de la app
COPY . .

EXPOSE 3000

CMD [ "node", "src/app.js" ]
