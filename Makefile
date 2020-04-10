.PHONY: all
all: startup cleanup build rmi run start stop rm logs top

startup: build run

cleanup: stop rm rmi

build:
	@echo "$(GREEN_COLOR)Building a docker image $(END_COLOR)"
	docker build -t leftshifters/leftshift.io .

rmi:
	@echo "Remove the image"
	docker rmi leftshifters/leftshift.io

run:
	@echo "Run the container"
	docker run -p 8080:8080 -d --name leftshift.io leftshifters/leftshift.io 

start:
	@echo "Start the container"
	docker start leftshift.io

stop:
	@echo "Stop the container"
	docker stop leftshift.io

rm:
	@echo "Remove the container"
	docker rm leftshift.io

logs:
	@echo "Show logs from the container"
	docker logs leftshift.io

top:
	@echo "Show top for the container"
	docker top leftshift.io