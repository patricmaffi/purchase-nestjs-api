pipeline {
    agent any

    stages {
        stage ("Build Image") {
            steps {
                echo 'Build Image Docker Refrisol API NestJS'
                script {
                    sh "cp /var/files/refrisol-api-prd.env ${env.WORKSPACE}/environments/prd.env"
                    sh '/usr/local/bin/docker-compose -f docker-compose-prd.yml build'
                }                
            }
        }
        stage ("Push Image") {
            steps {
                echo 'Push Image Docker Refrisol API NestJS'
                script {                    
                    sh "/usr/local/bin/docker login -u ${DOCKER_USER} -p ${DOCKER_PW}"
                    sh '/usr/local/bin/docker-compose -f docker-compose-prd.yml push'
                }                
            }
        }
    }
}