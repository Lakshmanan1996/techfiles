pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "lakshmanan1996/portfolio"
        DOCKER_TAG = "latest"
        EC2_USER = "ubuntu"
        EC2_HOST = "20.2.219.98"
        SSH_CREDENTIALS_ID = "jenkins-ssh-key-id"
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/Lakshmanan1996/techfiles.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                """
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', 
                usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent([SSH_CREDENTIALS_ID]) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                        docker pull ${DOCKER_IMAGE}:${DOCKER_TAG}
                        docker stop portfolio || true
                        docker rm portfolio || true
                        docker run -d --name portfolio -p 80:80 ${DOCKER_IMAGE}:${DOCKER_TAG}
                    '
                    """
                }
            }
        }
    }
}
