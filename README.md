# Portfolio – CI/CD Automated Deployment

This repository contains my portfolio website with a complete CI/CD pipeline using:

- GitHub  
- Jenkins  
- Docker  
- DockerHub  
- AWS EC2  

---

## 🚀 CI/CD Pipeline Flow

1. Developer pushes code to GitHub  
2. Jenkins triggers pipeline  
3. Builds Docker image  
4. Pushes image to DockerHub  
5. Connects to AWS EC2  
6. Pulls latest image and deploys container  
7. Website automatically updates  

---

## 🐳 Docker Setup

The portfolio is deployed inside an NGINX Docker container using:

