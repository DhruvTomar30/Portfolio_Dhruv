.PHONY: dev start seed seed-reset sync-fallback lint pm2-start pm2-reload pm2-logs pm2-status

dev:            ; pnpm dev
start:          ; pnpm start
seed:           ; pnpm seed
seed-reset:     ; pnpm seed --reset
sync-fallback:  ; pnpm sync-fallback
lint:           ; pnpm lint

pm2-start:      ; pm2 start ecosystem.config.cjs --env production
pm2-reload:     ; pm2 reload ecosystem.config.cjs --env production
pm2-logs:       ; pm2 logs portfolio-api
pm2-status:     ; pm2 status
