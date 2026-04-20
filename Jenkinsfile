pipeline {
    agent any

    options {
        timestamps()
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Clean Old Containers') {
            steps {
                bat 'docker rm -f task-manager-mysql || exit 0'
                bat 'docker rm -f task-manager-backend || exit 0'
                bat 'docker rm -f task-manager-frontend || exit 0'
            }
        }

        stage('Stop Previous Deployment') {
            steps {
                bat 'docker-compose down --remove-orphans'
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'docker-compose build'
            }
        }

        stage('Run Containers') {
            steps {
                bat 'docker-compose up -d'
            }
        }

        stage('Verify Running Containers') {
            steps {
                bat 'docker ps'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline executed successfully! Application deployed.'
        }
        failure {
            echo '❌ Pipeline failed! Check logs for errors.'
        }
        always {
            echo '📌 Pipeline execution finished.'
        }
    }
}