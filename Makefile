.PHONY: all
all: build

build:
	@echo "$(GREEN_COLOR)Building a docker image $(END_COLOR)"
	docker build -t leftshifters/leftshiftio .

run:
	@echo "Running the container"
	docker run -p 8080:8080 -d leftshifters/leftshiftio