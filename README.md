# Прогноз востребованности специальностей в вузе
Веб-приложение для анализа и прогнозирования востребованности направлений подготовки (специальностей) в высших учебных заведениях.
Система позволяет вузам анализировать исторические данные, прогнозировать востребованность специальностей, оптимизировать приёмные кампании и эффективнее распределять образовательные ресурсы.

# 🛠️ Технологический стек
## Backend
- Python 3.12
- FastAPI
- PostgreSQL 16
- SQLAlchemy (Async)
- Pydantic
- Docker
## Frontend
- React
- TypeScript
- Vite

# 📋 Требования
Перед запуском необходимо установить:
- Docker Desktop  
  https://www.docker.com/products/docker-desktop/
- Node.js 22+  
  https://nodejs.org/
- npm (устанавливается вместе с Node.js)

# 🚀 Запуск проекта
Проект состоит из двух частей:
- Backend + PostgreSQL запускаются через Docker Compose
- Frontend запускается отдельно через Node.js
# 🐳 Запуск Backend
Перейдите в папку backend:

cd backend

Запустите контейнеры:

docker compose up --build

После успешного запуска будут доступны:

Backend API:
http://localhost:8000
Swagger документация:
http://localhost:8000/docs
ReDoc:
http://localhost:8000/redoc
Остановка backend:
docker compose down
💻 Запуск Frontend
Откройте новый терминал.
Перейдите в папку frontend:
cd frontend
Установите зависимости:
npm install
Запустите приложение:
npm run dev
После запуска приложение будет доступно:
http://localhost:5173

Сервис	Адрес
Frontend	http://localhost:5173
Backend API	http://localhost:8000
Swagger	http://localhost:8000/docs
ReDoc	http://localhost:8000/redoc
