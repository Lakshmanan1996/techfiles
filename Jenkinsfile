pipeline {
  agent any
  environment {
    DOCKER_IMAGE = 'lakshmanan/portfolio:latest'
    DOCKERHUB = 'dockerhub-creds'
    SSH_CREDENTIALS = 'ec2-ssh-key'
    EC2_HOST = 'EC2_PUBLIC_IP'
    EC2_USER = 'ubuntu'
  }

  stages {
    stage('Checkout') { steps { checkout scm } }

    stage('Build') {
      steps {
        sh 'docker build -t $DOCKER_IMAGE .'
      }
    }

    stage('Docker Login & Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: env.DOCKERHUB, usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          sh 'echo $PASS | docker login -u $USER --password-stdin'
          sh 'docker push $DOCKER_IMAGE'
        }
      }
    }

    stage('Deploy') {
      steps {
        sshagent (credentials: [env.SSH_CREDENTIALS]) {
          sh """
            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
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
