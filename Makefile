# =============================================================================
# VELURE — Makefile de Gestion & Automatisation
# =============================================================================

.DEFAULT_GOAL := help
SHELL := /bin/bash

# Couleurs pour le terminal
CYAN := \033[36m
GREEN := \033[32m
YELLOW := \033[33m
RED := \033[31m
BOLD := \033[1m
RESET := \033[0m

##@ Aide & Informations
.PHONY: help
help: ## Affiche l'ensemble des commandes disponibles du projet
	@echo -e "$(CYAN)====================================================================================================$(RESET)"
	@echo -e "$(GREEN)$(BOLD)                        VELURE E-COMMERCE — GUIDE DES COMMANDES MAKEFILE $(RESET)"
	@echo -e "$(CYAN)====================================================================================================$(RESET)"
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_-]+:.*?##/ { printf "  $(YELLOW)%-16s$(RESET) : Cette commande [ $(GREEN)make %-16s$(RESET) ] : %s\n", $$1, $$1, $$2 } /^##@/ { printf "\n$(CYAN)%s$(RESET)\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
	@echo ""

##@ Développement & Dépendances
.PHONY: install
install: ## Installe les dépendances avec pnpm
	@echo -e "$(CYAN)--> Commande : pnpm install$(RESET)"
	pnpm install

.PHONY: dev
dev: ## Lance le serveur de développement Next.js (port 3000)
	@echo -e "$(GREEN)--> Commande : pnpm dev$(RESET)"
	pnpm dev

.PHONY: build
build: ## Compile le projet et génère le client Prisma
	@echo -e "$(CYAN)--> Commande : pnpm build$(RESET)"
	pnpm build

.PHONY: start
start: ## Démarre l'application Next.js en mode production
	@echo -e "$(GREEN)--> Commande : pnpm start$(RESET)"
	pnpm start

.PHONY: lint
lint: ## Exécute ESLint pour vérifier la qualité du code
	@echo -e "$(CYAN)--> Commande : pnpm lint$(RESET)"
	pnpm lint

.PHONY: test
test: ## Exécute la suite complète de tests unitaires (Vitest - mode détaillé)
	@echo -e "$(CYAN)--> Commande : pnpm test (Vitest verbose)$(RESET)"
	pnpm test

.PHONY: test-watch
test-watch: ## Lance les tests en mode surveillance (hot-reload)
	@echo -e "$(GREEN)--> Commande : pnpm test:watch$(RESET)"
	pnpm test:watch

##@ Base de Données (Prisma)
.PHONY: db-generate
db-generate: ## Génère le client Prisma JavaScript / TypeScript
	@echo -e "$(CYAN)--> Commande : npx prisma generate$(RESET)"
	npx prisma generate

.PHONY: db-push
db-push: ## Synchronise le schéma Prisma directement avec la base de données
	@echo -e "$(CYAN)--> Commande : npx prisma db push$(RESET)"
	npx prisma db push

.PHONY: db-migrate
db-migrate: ## Crée et applique les migrations Prisma en environnement de dev
	@echo -e "$(CYAN)--> Commande : npx prisma migrate dev$(RESET)"
	npx prisma migrate dev

.PHONY: db-seed
db-seed: ## Exécute le script de peuplement (seed) de la base de données
	@echo -e "$(GREEN)--> Commande : npx tsx prisma/seed.ts$(RESET)"
	npx tsx prisma/seed.ts

.PHONY: db-studio
db-studio: ## Ouvre l'interface Prisma Studio dans le navigateur
	@echo -e "$(GREEN)--> Commande : npx prisma studio$(RESET)"
	npx prisma studio

##@ Docker & Conteneurisation
.PHONY: docker-build
docker-build: ## Construit l'image Docker de production
	@echo -e "$(CYAN)--> Commande : docker compose build$(RESET)"
	docker compose build

.PHONY: docker-up
docker-up: ## Démarre tous les conteneurs en arrière-plan (mode production)
	@echo -e "$(GREEN)--> Commande : docker compose up -d$(RESET)"
	docker compose up -d

.PHONY: docker-down
docker-down: ## Arrête et supprime les conteneurs Docker
	@echo -e "$(YELLOW)--> Commande : docker compose down$(RESET)"
	docker compose down

.PHONY: docker-logs
docker-logs: ## Affiche les logs des conteneurs Docker en direct
	@echo -e "$(CYAN)--> Commande : docker compose logs -f$(RESET)"
	docker compose logs -f

.PHONY: docker-restart
docker-restart: ## Redémarre l'ensemble des conteneurs Docker
	@echo -e "$(YELLOW)--> Commande : docker compose restart$(RESET)"
	docker compose restart

.PHONY: docker-dev
docker-dev: ## Lance l'environnement de développement sous Docker avec live reload
	@echo -e "$(GREEN)--> Commande : docker compose -f docker-compose.dev.yml up --build$(RESET)"
	docker compose -f docker-compose.dev.yml up --build

.PHONY: docker-dev-down
docker-dev-down: ## Arrête l'environnement de développement Docker
	@echo -e "$(YELLOW)--> Commande : docker compose -f docker-compose.dev.yml down$(RESET)"
	docker compose -f docker-compose.dev.yml down

.PHONY: docker-clean
docker-clean: ## Supprime les conteneurs, volumes et images orphelines
	@echo -e "$(RED)--> Commande : docker compose down -v --remove-orphans$(RESET)"
	docker compose down -v --remove-orphans

##@ Nettoyage & Maintenance
.PHONY: clean
clean: ## Nettoie le cache Next.js, les logs et les artefacts de build
	@echo -e "$(YELLOW)--> Commande : rm -rf .next out dist coverage *.tsbuildinfo$(RESET)"
	rm -rf .next out dist coverage *.tsbuildinfo
