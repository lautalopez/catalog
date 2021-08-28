#Run docker mongo

To run the mongo database with docker run the following command (with password)
- docker run -d --rm --name mongo -p 27017:27017 -v mongodbdata:/data/db -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=Pass#word1 mongo

#Deployment 

> Build app `docker build -t catalog:v1 .` 
> 
> Create network `docker network create net5`
> 
> Run mongo in docker network `docker run -d --rm --name mongo -p 27017:27017 -v mongodbdata:/data/db -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=Pass#word1 --network=net5 mongo`


##Health checks package,
for health endpoints

Github package [https://github.com/Xabaril/AspNetCore.Diagnostics.HealthChecks]
