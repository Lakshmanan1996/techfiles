pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials-id'
        DOCKER_IMAGE = 'lakshmanan/portfolio:latest'
        AZURE_VM = '20.2.219.98'
        SSH_CREDENTIALS = 'azure-ssh-credentials-id'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Lakshmanan1996/techfiles.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE)
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
                        docker.image(DOCKER_IMAGE).push()
                    }
                }
            }
        }

        stage('Deploy on Azure VM') {
            steps {
                sshagent([SSH_CREDENTIALS]) {
                    sh """
                    ssh -o StrictHostKeyChecking=no azureuser@${AZURE_VM} '
                        docker pull ${DOCKER_IMAGE} &&
                        docker stop portfolio || true &&
                        docker rm portfolio || true &&
                        docker run -d --name portfolio -p 80:80 ${DOCKER_IMAGE}
                    '
                    """
                }
            }
        }
    }
}
