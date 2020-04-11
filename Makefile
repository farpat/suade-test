.PHONY: install update clean help test stop-dev build
.DEFAULT_GOAL   = help

include .env

PRIMARY_COLOR   		= \033[0;34m
PRIMARY_COLOR_BOLD   	= \033[1;34m

SUCCESS_COLOR   		= \033[0;32m
SUCCESS_COLOR_BOLD   	= \033[1;32m

DANGER_COLOR    		= \033[0;31m
DANGER_COLOR_BOLD    	= \033[1;31m

WARNING_COLOR   		= \033[0;33m
WARNING_COLOR_BOLD   	= \033[1;33m

NO_COLOR      			= \033[m

npm := docker-compose run --rm node npm

node_modules: package.json
	@$(npm) install
	@echo "$(PRIMARY_COLOR)Installing cypress for e2e tests$(NO_COLOR)"
	npm install cypress

install: node_modules ## Install npm dependencies

update: ## Update npm dependencies
	@$(npm) run update
	@$(npm) install

clean: stop-dev ## Remove npm dependencies
	@echo "$(DANGER_COLOR_BOLD)Deleting npm files/directories$(NO_COLOR)"
	@rm -rf node_modules package-lock.json

help: ## Display this help
	@awk 'BEGIN {FS = ":.*##"; } /^[a-zA-Z_-]+:.*?##/ { printf "$(PRIMARY_COLOR_BOLD)%-10s$(NO_COLOR) %s\n", $$1, $$2 }' $(MAKEFILE_LIST) | sort

test: dev ## Run cypress tests (found in ./cypress/integration)
	@npm run test

dev: install ## Run development servers
	@docker-compose up -d nginx node
	@echo "Dev server launched on http://localhost:$(APP_PORT)"
	@echo "Webpack dev server launched on http://localhost:$(WEBPACK_DEV_SERVER_PORT)"

stop-dev: ## Stop development servers
	@docker-compose down
	@echo "Dev server stopped: http://localhost:$(APP_PORT)"
	@echo "Webpack dev server stopped: http://localhost:$(WEBPACK_DEV_SERVER_PORT)"

build: install ## Build assets projects for production
	@rm -rf ./public/assets/*
	@$(npm) run build
