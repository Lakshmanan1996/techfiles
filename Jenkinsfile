pipeline {
    agent any

    environment {
        IMAGE = "lakshmanan1996/techfiles"
        TAG = "latest"
        VM_USER = "azureuser"
        VM_HOST = "YOUR_AZURE_PUBLIC_IP"
        SSH_CRED = "azure-vm-ssh"
        DOCKER_CRED = "dockerhub"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Lakshmanan1996/techfiles.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE:$TAG .'
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKER_CRED,
                    usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                        sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Image') {
            steps {
                sh 'docker push $IMAGE:$TAG'
            }
        }

        stage('Deploy to Azure VM') {
            steps {
                sshagent([SSH_CRED]) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no $VM_USER@$VM_HOST "
                            docker pull $IMAGE:$TAG &&
                            docker stop portfolio || true &&
                            docker rm portfolio || true &&
                            docker run -d --name portfolio -p 80:80 $IMAGE:$TAG
                        "
                    '''
                }
            }
        }
    }
}
