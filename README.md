# Engineering Bootcamp 2023

A simple web application which implements a Todo list.

![Screenshot 2021-09-22 at 10 34 23 PM](https://user-images.githubusercontent.com/710625/134364024-524fa9f5-fddc-4110-a6fc-98ad32cb25b0.png)

## Prerequisites
There are a couple of things you need for this workshop if you want to run the webapp locally on your machine:
- An Integrated Development Environment (IDE) like [Visual Studio Code](https://code.visualstudio.com/download)
- Git (version control system) client, either:
  - GitHub Desktop for [Windows](https://desktop.github.com) | [macOS](https://desktop.github.com)
  - Git client (from your Linux distribution)
- Docker
  - Docker Desktop for [Windows](https://docs.docker.com/desktop/windows/install/) | [macOS](https://docs.docker.com/desktop/mac/install/)
  - Docker Engine and Docker Compose for [Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04) | [Arch Linux](https://wiki.archlinux.org/title/docker)

Another way is to start a dev environment via Codespaces:
1. Sign up / sign in to your Github Account
2. Go to `Code` in this repository and `Create codespace on main`
![image](https://github.com/Tingweiftw/gt-engineering-bootcamp-2023/assets/27615296/66ef16ea-55da-4d7e-9623-0e85a45fcab6)
3. You will have a working vscode on the browser, or you could open it up in your own personal vscode.


## Running the application locally
- Navigate to `backend` directory and perform the steps in the `README.md` within the directory
- Navigate to `frontend` directory and perform the steps in the `README.md` within the directory
- When the containers for both backend and frontend are ready, access the webpage from `localhost:3000` or through port 3000 in `Ports` in codespace

## Architecture

This web application consists of two parts:
- le frontend
- le backend

### Infrastructure
These environment variables control the API endpoints used to communicate between each component.
- API_URL (docker-compose)
- REACT_APP_API_ENDPOINT (production builds e.g. `https://my-backend-server-hostname/api`)

### Frontend
A React-based Single Page Application is the frontend for our application.

On the Home page, a clock polls the Application Programming Interface (API) for the current time, which also helps to determine if the backend server is running correctly.

The Todo application contains a simple user interface for users to create, view, and update the status of todo items.

### Backend
Express was used as the backend framework.

It exposes API endpoints which implement the Create, Read, Update, Delete, and List actions of Todo items.
