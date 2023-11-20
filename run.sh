docker stop duit
docker remove duit
docker rmi
docker build . --tag duit
docker run -d -p 3100:3100 --name duit duit
