FROM node:alpine
ARG user="node"
ARG appdir="/home/node/app"

# Install python & related libraries (no package mgmt for simplicity)
RUN apk add --no-cache python3 py-pip
RUN pip install openai==0.27.9


# Create the application dir
RUN mkdir -p ${appdir} && chown -R ${user} ${appdir}
WORKDIR ${appdir}
USER ${user}

# Install node libraries
COPY --chown=${user} package.json package-lock.json ./
RUN npm install

# Copy src files etc into dir
COPY --chown=${user} . .

CMD [ "npm", "run", "dist" ]
