# ManualScheduler

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Usage

Either:
- Build the Project using npm and angular.
- Build/Use the Docker Image

> docker build -t gcr.io/spark-on-kubernetes-316714/manual-scheduler-fe:latest .

> docker run -p 4200:80 gcr.io/spark-on-kubernetes-316714/manual-scheduler-fe:latest


The Manual-Scheduler is running on port 4200 and expects the External-Scheduler-Interface to be accessible at 
http://localhost:8082 
