pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "lakshmanan1996"
        IMAGE_NAME = "portfolio-site"
    }

    stages {
        stage("Checkout Code") {
            steps {
                git branch: 'main',
                url: 'https://github.com/Lakshmanan1996/techfiles.git'
            }
        }

        stage("Build Docker Image") {
            steps {
                sh 'docker build -t $DOCKERHUB_USER/$IMAGE_NAME:latest .'
            }
        }

        stage("Login to DockerHub") {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-pass', variable: 'DOCKERHUB_PASS')]) {
                    sh 'echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin'
                }
            }
        }

        stage("Push Image to DockerHub") {
            steps {
                sh 'docker push $DOCKERHUB_USER/$IMAGE_NAME:latest'
            }
        }

        stage("Deploy to EC2") {
            steps {
                sh 'chmod +x deploy.sh'
                sh './deploy.sh'
            }
        }
    }
}
