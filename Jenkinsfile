

pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage('Checkout') {
            steps {
                echo '🔄 Cloning repository...'
                git branch: 'master', url: 'https://github.com/Gopi-Kumar18/Devops-Pipeline-CI-CD.git'
            }
        }

        stage('Docker Compose Down') {
            steps {
                echo '🧹 Stopping existing containers (if any)...'
                bat '''
                    docker-compose -f "%COMPOSE_FILE%" down --remove-orphans || echo "No containers to stop"
                '''
            }
        }

        stage('Docker Compose Up') {
            steps {
                echo '🐳 Starting services using docker-compose...'
                bat '''
                    docker-compose -f "%COMPOSE_FILE%" pull
                    docker-compose -f "%COMPOSE_FILE%" up -d --build
                '''
            }
        }

        stage('Verify Containers') {
            steps {
                echo '🔍 Verifying running containers...'
                bat '''
                    docker ps
                    echo "Checking container health..."
                    docker-compose -f "%COMPOSE_FILE%" ps
                '''
                // You could add health checks here
            }
        }
    }

    post {
        success {
            echo '🎉 All services are up and running!'
            bat 'docker-compose -f "%COMPOSE_FILE%" ps'
        }
        failure {
            echo '❌ Deployment failed. Collecting logs...'
            bat '''
                docker-compose -f "%COMPOSE_FILE%" logs || echo "Failed to get logs"
                docker ps -a || echo "Failed to list containers"
            '''
        }
        always {
            echo '📦 Pipeline execution complete.'

        }
    }
}