# Backend

## Deploy
- Create .env file with `API_KEY=<API-KEY>` as content
- `docker compose up --build -d`

To shutdown the backend
- `docker compose down --remove-orphans`

## Commands
Before running these commands, run `npm install`
- Run Application - ```npm run start```
- Fix linter issues - ```npm run lint```
- Run tests for checkpoint 0 - ```npm - run test:0```
- Run tests for checkpoint 1 - ```npm - run test:1```
- Run tests for checkpoint 2 - ```npm - run test:2```
- Run tests for subsequent checkpoints - ```npm - run test:extra```

## Prompt Engineering Lab
The codebase comes with a jupyter notebook that goes into some detail on prompt engineering. Click the button below to open the jupyter notebook on Google Colab.

<a target="_blank" href="https://colab.research.google.com/github/Tingweiftw/gt-engineering-bootcamp-2023/blob/main/backend/prompt-engineering.ipynb">
  <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
