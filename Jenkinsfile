pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t acciomates .'
            }
        }

        stage('Remove Old Container') {
            steps {
                sh 'docker rm -f acciomates || true'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker run -d \
                --name acciomates \
                -p 8085:8085 \
                --env-file /opt/acciomates/.env \
                acciomates
                '''
            }
        }
    }
}
