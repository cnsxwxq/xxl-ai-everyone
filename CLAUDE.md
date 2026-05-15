# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-powered code generation platform (AI 零代码应用生成平台). Users describe a website/app they want, and the AI generates it via LangChain4j + LangGraph4j workflows, with streaming output, visual editing, one-click deploy, and screenshot previews. This is a teaching/tutorial project by 程序员鱼皮 (codefather.cn).

## Build & Run

### Monolith (root)

The default working project. Java 21 + Spring Boot 3.5.4 + Maven Wrapper.

```bash
# Backend (starts on :8123, context-path: /api)
./mvnw spring-boot:run
# or: mvn spring-boot:run -Dspring-boot.run.profiles=local

# Tests
./mvnw test
# Single test
./mvnw test -Dtest=XxxTest
```

### Microservices (root `backend/`)

Still under development. Spring Boot 3.5.3 + Dubbo 3.3.0 + Spring Cloud Alibaba + Nacos.

```bash
cd backend
# Build all modules
mvn clean install
# Run individual services from their directories
mvn spring-boot:run -f yu-ai-code-user/pom.xml
```

### Frontend (root `frontend/`)

Vue 3 + Vite 7 + TypeScript + Ant Design Vue 4 + Pinia.

```bash
cd frontend
npm install
npm run dev        # dev server, proxies /api → localhost:8123
npm run build      # type-check + production build
npm run lint       # ESLint with --fix
npm run format     # Prettier
npm run openapi2ts # generate TS types from backend OpenAPI schema
```

API documentation (Knife4j): http://localhost:8123/api/doc.html

## Architecture

The repo has **two versions** of the backend:

1. **Monolith** at `src/` — the primary, working codebase. All logic in one Spring Boot app.
2. **Microservices** at `backend/` — splits the monolith into 7 Maven modules:
   - `yu-ai-code-app` — app CRUD, code generation facade, chat history, static resource serving
   - `yu-ai-code-ai` — AI generators, tool definitions, guardrails, LangChain4j config
   - `yu-ai-code-user` — user registration/login, auth
   - `yu-ai-code-screenshot` — Selenium-based web screenshot
   - `yu-ai-code-model` — shared entities, DTOs, enums (User, App, ChatHistory)
   - `yu-ai-code-common` — shared utils (BaseResponse, AuthCheck, CosManager, GlobalExceptionHandler)
   - `yu-ai-code-client` — Dubbo RPC interfaces (InnerUserService, InnerScreenshotService)

Microservices communicate via Dubbo + Nacos. Some monolith code was affected during migration — do not use commits tagged as "中间态" (intermediate state) in isolation.

## Core Code Generation Pipeline

The AI code generation follows a **LangGraph4j workflow** (`src/main/java/com/yupi/yuaicodemother/langgraph4j/`):

1. **RouterNode** — routes by generation type (HTML, multi-file, Vue project) using `AiCodeGenTypeRoutingService`
2. **PromptEnhancerNode** — enriches the user's prompt
3. **CodeGeneratorNode** — calls DeepSeek via LangChain4j with tool-calling. Tools live in `langgraph4j/tools/` (file ops, image search, logo gen, mermaid diagrams)
4. **CodeQualityCheckNode** — validates generated code
5. **ImageCollectorNode** — fetches complementary images
6. **ProjectBuilderNode** — assembles final output files

Key AI services:
- `AiCodeGeneratorService` — the main generator interface, uses `@AiService` from LangChain4j
- `AiCodeGenTypeRoutingService` — determines which generation strategy to apply (routes to either DeepSeek or Qwen-Turbo via DashScope)
- `AiCodeGeneratorFacade` — orchestrates code parsing, file saving, and project building

## Key Configuration

- **application.yml** — all main config (MySQL, Redis, AI models, COS, DashScope, Pexels)
- **application-local.yml** / **application-prod.yml** — gitignored, contains secrets
- **application-prod-sample.yml** — template for production config
- **prometheus.yml** — Prometheus scrape config for Spring Actuator metrics
- **grafana/ai_model_grafana_config.json** — Grafana dashboard for AI model monitoring
- **frontend/.env.development** / **.env.production** — frontend env vars

### AI Models in Use
- **deepseek-chat** — primary streaming chat model for code generation
- **deepseek-reasoner** — complex reasoning tasks (~32768 max tokens)
- **qwen-turbo** (via DashScope) — lightweight routing/classification
- **wan2.2-t2i-flash** (via DashScope) — AI image generation

## Database

Single MySQL database `yu_ai_code_mother`. Tables: `user`, `app`, `chat_history`. Init SQL at `sql/create_table.sql`. ORM is MyBatis-Flex (Spring Boot 3 compatible), mappers in `src/main/resources/mapper/`.

## Key Patterns

- **Auth**: `@AuthCheck` annotation + `AuthInterceptor` AOP — checks user role from session
- **Caching**: Redis + Caffeine two-level cache (RedisCacheManagerConfig, Caffeine dependency)
- **SSE streaming**: Two approaches for streaming AI output — Spring `SseEmitter` and Reactor `Flux<ServerSentEvent>`
- **Rate limiting**: Custom `@ratelimiter` package
- **Monitoring**: Micrometer → Prometheus + Grafana; custom `AiModelMonitorListener` / `AiModelMetricsCollector`
- **File storage**: Tencent Cloud COS via `CosManager`

## Frontend Routing

- `/` — Home page (app creation, featured apps list)
- `/app/chat/:id` — AI chat + live website preview (SSE streaming)
- `/app/edit/:id` — Edit app metadata
- `/admin/appManage` — Admin app management (CRUD + set featured)
- `/user/login`, `/user/register` — Auth pages
