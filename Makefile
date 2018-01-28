.PHONY: all
all: build

build_docker:
	@echo "$(GREEN_COLOR)Building a docker image $(END_COLOR)"
	docker build -t leftshifters/leftshift.io .