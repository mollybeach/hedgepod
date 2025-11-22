# HedgePod Makefile
# Common commands for development, testing, and deployment

.PHONY: help install clean test deploy verify frontend backend all

# Default target
help:
	@echo "📦 HedgePod - Available Commands:"
	@echo ""
	@echo "🔧 Development:"
	@echo "  make install          - Install all dependencies (root, frontend, backend)"
	@echo "  make clean            - Clean build artifacts and node_modules"
	@echo "  make compile          - Compile smart contracts"
	@echo ""
	@echo "🧪 Testing:"
	@echo "  make test             - Run all contract tests"
	@echo "  make test-coverage    - Run tests with coverage report"
	@echo "  make test-gas         - Run tests with gas reporting"
	@echo ""
	@echo "🚀 Deployment:"
	@echo "  make deploy           - Deploy to a specific network (interactive)"
	@echo "  make deploy-base      - Deploy to Base Sepolia testnet"
	@echo "  make deploy-world     - Deploy to World Chain"
	@echo "  make deploy-celo      - Deploy to Celo"
	@echo "  make deploy-polygon   - Deploy to Polygon"
	@echo "  make deploy-arbitrum  - Deploy to Arbitrum"
	@echo "  make deploy-optimism  - Deploy to Optimism"
	@echo "  make deploy-all       - Deploy to all networks sequentially"
	@echo ""
	@echo "🔍 Verification:"
	@echo "  make verify           - Verify contracts (interactive)"
	@echo "  make verify-base      - Verify contracts on Base Sepolia"
	@echo "  make verify-world     - Verify contracts on World Chain"
	@echo ""
	@echo "💻 Frontend:"
	@echo "  make frontend-dev     - Start frontend dev server"
	@echo "  make frontend-build   - Build frontend for production"
	@echo "  make frontend-install - Install frontend dependencies"
	@echo ""
	@echo "🤖 Backend:"
	@echo "  make backend-dev      - Start backend agent"
	@echo "  make backend-build    - Build backend"
	@echo "  make backend-install  - Install backend dependencies"
	@echo ""
	@echo "🛠️  Utilities:"
	@echo "  make lint             - Run linter on contracts"
	@echo "  make format           - Format code with Prettier"
	@echo "  make check-balance    - Check deployer balance"
	@echo "  make clean-abis       - Clean generated ABIs"
	@echo ""

# ==================== Installation ====================

install: install-root install-frontend install-backend
	@echo "✅ All dependencies installed!"

install-root:
	@echo "📦 Installing root dependencies..."
	npm install

install-frontend:
	@echo "📦 Installing frontend dependencies..."
	cd frontend && npm install

install-backend:
	@echo "📦 Installing backend dependencies..."
	cd backend && npm install

# ==================== Cleaning ====================

clean: clean-artifacts clean-cache clean-abis
	@echo "✅ Cleaned all build artifacts!"

clean-artifacts:
	@echo "🧹 Cleaning artifacts..."
	rm -rf artifacts/
	rm -rf typechain-types/

clean-cache:
	@echo "🧹 Cleaning cache..."
	rm -rf cache/
	rm -rf frontend/.next/
	rm -rf backend/dist/

clean-abis:
	@echo "🧹 Cleaning ABIs..."
	rm -rf deployments/abis/

clean-node-modules:
	@echo "🧹 Cleaning node_modules..."
	rm -rf node_modules/
	rm -rf frontend/node_modules/
	rm -rf backend/node_modules/

# ==================== Compilation ====================

compile:
	@echo "🔨 Compiling contracts..."
	npx hardhat compile

compile-force:
	@echo "🔨 Force recompiling contracts..."
	npx hardhat clean
	npx hardhat compile

# ==================== Testing ====================

test:
	@echo "🧪 Running tests..."
	npx hardhat test

test-coverage:
	@echo "📊 Running tests with coverage..."
	npx hardhat coverage

test-gas:
	@echo "⛽ Running tests with gas reporting..."
	REPORT_GAS=true npx hardhat test

test-specific:
	@echo "🧪 Running specific test..."
	@read -p "Enter test file path: " testfile; \
	npx hardhat test $$testfile

# ==================== Deployment ====================

deploy:
	@echo "🚀 Running HedgePod deployer..."
	@read -p "Enter network (baseSepolia, worldchain, base, celo, polygon): " network; \
	npx hardhat run scripts/deploy/deployer.ts --network $$network

deploy-base:
	@echo "🚀 Deploying to Base Sepolia..."
	npx hardhat run scripts/deploy/deployer.ts --network baseSepolia

deploy-world:
	@echo "🚀 Deploying to World Chain..."
	npx hardhat run scripts/deploy/deployer.ts --network worldchain

deploy-celo:
	@echo "🚀 Deploying to Celo..."
	npx hardhat run scripts/deploy/deployer.ts --network celo

deploy-polygon:
	@echo "🚀 Deploying to Polygon..."
	npx hardhat run scripts/deploy/deployer.ts --network polygon

deploy-zircuit:
	@echo "🚀 Deploying to Zircuit..."
	npx hardhat run scripts/deploy/deployer.ts --network zircuit

deploy-arbitrum:
	@echo "🚀 Deploying to Arbitrum..."
	npx hardhat run scripts/deploy/deployer.ts --network arbitrum

deploy-optimism:
	@echo "🚀 Deploying to Optimism..."
	npx hardhat run scripts/deploy/deployer.ts --network optimism

deploy-all:
	@echo "🚀 Deploying to all networks..."
	@echo "⚠️  This will deploy to multiple networks sequentially"
	@read -p "Continue? (y/n): " confirm; \
	if [ "$$confirm" = "y" ]; then \
		node scripts/deploy/deploy-all.js; \
	fi

# ==================== Verification ====================

verify:
	@echo "🔍 Verifying contracts..."
	@read -p "Enter network: " network; \
	npx hardhat run scripts/verify/verify.ts --network $$network

verify-base:
	@echo "🔍 Verifying contracts on Base Sepolia..."
	npx hardhat run scripts/verify/verify.ts --network baseSepolia

verify-world:
	@echo "🔍 Verifying contracts on World Chain..."
	npx hardhat run scripts/verify/verify.ts --network worldchain

# ==================== Frontend ====================

frontend-dev:
	@echo "💻 Starting frontend dev server..."
	cd frontend && npm run dev

frontend-build:
	@echo "🏗️  Building frontend..."
	cd frontend && npm run build

frontend-start:
	@echo "▶️  Starting frontend production server..."
	cd frontend && npm start

frontend-install:
	@echo "📦 Installing frontend dependencies..."
	cd frontend && npm install

frontend-clean:
	@echo "🧹 Cleaning frontend..."
	cd frontend && rm -rf .next node_modules

# ==================== Backend ====================

backend-dev:
	@echo "🤖 Starting backend agent..."
	cd backend && npm run dev

backend-build:
	@echo "🏗️  Building backend..."
	cd backend && npm run build

backend-start:
	@echo "▶️  Starting backend..."
	cd backend && npm start

backend-install:
	@echo "📦 Installing backend dependencies..."
	cd backend && npm install

backend-clean:
	@echo "🧹 Cleaning backend..."
	cd backend && rm -rf dist node_modules

# ==================== Utilities ====================

lint:
	@echo "🔍 Linting contracts..."
	npx hardhat check

format:
	@echo "✨ Formatting code..."
	npx prettier --write 'contracts/**/*.sol'
	npx prettier --write 'scripts/**/*.ts'
	npx prettier --write 'test/**/*.ts'

check-balance:
	@echo "💰 Checking deployer balance..."
	@read -p "Enter network (base, worldchain, celo, polygon): " network; \
	npx hardhat run scripts/check/checkBalance.mjs --network $$network

mint-usdc:
	@echo "💵 Minting test USDC..."
	@read -p "Enter network: " network; \
	@read -p "Enter recipient address: " address; \
	@read -p "Enter amount: " amount; \
	npx hardhat run scripts/faucet/mintUSDC.mjs --network $$network

# ==================== Docker (Future) ====================

docker-build:
	@echo "🐳 Building Docker images..."
	docker-compose build

docker-up:
	@echo "🐳 Starting Docker containers..."
	docker-compose up -d

docker-down:
	@echo "🐳 Stopping Docker containers..."
	docker-compose down

# ==================== Git ====================

git-status:
	@echo "📊 Git status..."
	git status

git-commit:
	@echo "💾 Committing changes..."
	@read -p "Enter commit message: " msg; \
	git add . && git commit -m "$$msg"

git-push:
	@echo "⬆️  Pushing to remote..."
	git push origin master

# ==================== Full Workflow ====================

dev: compile frontend-dev

build-all: compile frontend-build backend-build

deploy-and-verify-base: deploy-base verify-base

# ==================== Local Node ====================

node-local:
	@echo "🏗️  Starting local Hardhat node..."
	npx hardhat node

deploy-local:
	@echo "🚀 Deploying to local network..."
	npx hardhat run scripts/deploy/deployer.ts --network localhost

# ==================== Documentation ====================

docs:
	@echo "📚 Generating documentation..."
	npx hardhat docgen

# ==================== Info ====================

info:
	@echo "ℹ️  Project Info:"
	@echo "  Name:     HedgePod Agent"
	@echo "  Version:  1.0.0"
	@echo "  Network:  Multi-chain (World Chain, Base, Celo, Polygon, etc.)"
	@echo "  Frontend: Next.js 14"
	@echo "  Backend:  Node.js + TypeScript"
	@echo "  Contracts: Solidity 0.8.24"

