# Wolverines Capstone Project

## Description

This is the capstone project for the Wolverines team. In this repository are the following directories:

- frontend: The frontend web application of the project
  - Running the frontend server:
    - `cd frontend`
    - create a .env file in the frontend directory and add the following line:
      - `NEXT_PUBLIC_BACKEND_SERVER='http://127.0.0.1:5000/'`
    - `yarn install`
    - `yarn dev`
  - The frontend server should be running on http://localhost:3000
- backend: The backend web server of the project
  - Running the backend server:
    - `cd backend`
    - `python3 -m venv env`
    - `pip install -r requirements.txt`
    - `soure env/bin/activate`
    - `flask --app app.py --debug run`
- Data: Original Datasets used in the project
- Initial Data Exploration: Initial data exploration done on the datasets
- classifiers: The classifiers used in the project
