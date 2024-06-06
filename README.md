# GovTech Geekout 2024

A simple web application which implements a Todo list.

## Prerequisites

There are a couple of things you need for this workshop if you want to run the webapp locally on your machine:

- An Integrated Development Environment (IDE) like [Visual Studio Code](https://code.visualstudio.com/download)
- Git (version control system) client, either:
  - GitHub Desktop for [Windows](https://desktop.github.com) | [macOS](https://desktop.github.com)
  - Git client (from your Linux distribution)

Another way is to start a dev environment via Codespaces

- Sign up / sign in to your Github Account
- Go to `Code` in this repository and `Create codespace on main`
  ![image](https://github.com/Tingweiftw/gt-engineering-bootcamp-2023/assets/27615296/66ef16ea-55da-4d7e-9623-0e85a45fcab6)
- You will have a working vscode on the browser, or you could open it up in your own personal vscode.

## Running the application locally

- Navigate to `backend` directory and perform the steps in the `README.md` within the directory
- Navigate to `frontend` directory and perform the steps in the `README.md` within the directory

## Architecture

This web application consists of two parts:

### Frontend

A React-based Single Page Application is the frontend for our application.

The Todo application contains a simple user interface for users to create, view, and update the status of todo items.

### Backend

Express was used as the backend framework.

It exposes API endpoints which implement the Create, Read, Update, Delete, and List actions of Todo items.
