.PHONY: all
all: build

build_docker:
	@echo "$(GREEN_COLOR)Building a docker image $(END_COLOR)"
	docker build -t leftshifters/leftshiftio .

hyper_load:
	hyper load -l leftshifters/leftshiftio	

hyper_run:
	hyper run -d --name leftshiftio --size=S4 -p 80:3000 leftshifters/leftshiftio
	hyper fip attach 209.177.92.76 leftshiftio

hyper_stop:
	hyper stop leftshiftio
	hyper rm leftshiftio