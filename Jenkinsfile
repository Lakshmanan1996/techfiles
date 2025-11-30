pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "portfolio-website"
        DOCKER_TAG = "latest"
        SONAR_PROJECT = "portfolio-website"
        EC2_USER = "ubuntu"
        EC2_HOST = "20.255.50.114"  // Replace with your EC2 IP
        SSH_CREDENTIALS_ID = "Laksh50@" // Jenkins SSH key credential for EC2
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Lakshmanan1996/techfiles.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube-Server') {
                    sh "sonar-scanner -Dsonar.projectKey=${SONAR_PROJECT} -Dsonar.sources=."
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    // Stop existing container on EC2
                    sshagent([SSH_CREDENTIALS_ID]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} \\
                        'docker ps -q --filter name=${DOCKER_IMAGE} | grep -q . && docker stop ${DOCKER_IMAGE} && docker rm ${DOCKER_IMAGE} || echo "No existing container"'
                        """

                        // Copy Docker image to EC2
                        sh """
                        docker save ${DOCKER_IMAGE}:${DOCKER_TAG} | bzip2 | pv | ssh ${EC2_USER}@${EC2_HOST} 'bunzip2 | docker load'
                        """

                        // Run new container on EC2
                        sh """
                        ssh ${EC2_USER}@${EC2_HOST} 'docker run -d -p 80:80 --name ${DOCKER_IMAGE} ${DOCKER_IMAGE}:${DOCKER_TAG}'
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Portfolio deployed successfully!"
        }
        failure {
            echo "Pipeline failed. Check Jenkins logs."
        }
    }
}
