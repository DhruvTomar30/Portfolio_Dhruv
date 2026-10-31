.PHONY: dev build start lint typecheck pm2-start pm2-reload pm2-logs

dev:        ; pnpm dev
build:      ; pnpm build
start:      ; pnpm start
lint:       ; pnpm lint
typecheck:  ; pnpm exec tsc --noEmit

pm2-start:  ; pm2 start ecosystem.config.cjs --env production
pm2-reload: ; pm2 reload ecosystem.config.cjs --env production
pm2-logs:   ; pm2 logs portfolio-web
