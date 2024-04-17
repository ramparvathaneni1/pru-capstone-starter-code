# Go Home
cd ~/mef/pru-capstone-starter-code/

# Stop the POSTGRESQL Service
sudo service postgresql stop

# Kill any Frontend and Backend Server Processes
sudo kill -9 $(sudo lsof -t -i:3000)
sudo kill -9 $(sudo lsof -t -i:3001)

# Stop all Docker Contianers
sudo docker stop $(sudo docker ps -a -q)

# Remove all Docker Containers
sudo docker rm $(sudo docker ps -a -q)

####### Create Docker Network #######
sudo docker network create pru-app

####### Build DB Image #######
cd ./backend/db
sudo docker build . -t pru-app-db
# Start the DB Container
sudo docker run -d --name pru-app-db-container -p 5432:5432 --network pru-app pru-app-db
# Check if DB Container is running and schema is loaded sucessfully
sudo docker exec -it pru-app-db-container psql customer_db -U postgres


####### Build Backend Image #######
cd ../
sudo docker build . -t pru-app-backend
# Start the Backend Container
sudo docker run -d --name pru-app-backend-container -p 3001:3001 --network pru-app pru-app-backend



