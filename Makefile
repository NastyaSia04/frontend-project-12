lint-frontend:
		make -C frontend lint
install:
		npm ci
start-frontend:
		make -C frontend start
start-backend:
		npx start-server -s ./frontend/dist
start:
		make start-backend
build:
		rm -rf frontend/dist
		npm run build
deploy:
		git push render main
develop:
		start cmd /k "make start-backend"
		start cmd /k "make start-frontend"