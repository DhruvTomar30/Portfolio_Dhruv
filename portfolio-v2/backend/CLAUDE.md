# portfolio-backend

Express 5 (ESM) + Zod 4 + Mongoose 9. Mirrors the layout of `crm-backend-js`, with Zod in place of Joi.

## Request flow
`routes/<domain>` → `ValidationMiddleware.validateBody/Params/Query(zodSchema)` → `Utils.wrapController(fn)` → controller `({ reqBody, reqParams, reqQuery, reqUser }) => { status, message, data }` → `services/<domain>` (business logic + models) → `dtos/<domain>` `XResponseDTO.create(doc)`.

## Rules
- Import with `#aliases` (package.json `imports`) and include the `.js` extension.
- Controllers never touch req/res. Throw business errors with `throwCustomError(msg, status)`.
- Never return raw Mongoose docs. Always go through a DTO.
- Update schemas: build them with `toUpdateSchema(createSchema)` (validators/common.js). Zod 4 applies `.default()` inside `.partial()`, which would reset fields the client didn't send.
- Express 5's `req.query` is read-only. Parsed query values are on `req.validatedQuery` and reach controllers as `reqQuery`.
- Register literal routes before param routes (e.g. `/admin/all` before `/:slug`).
- Admin routes use `AuthMiddleware.authorize([ROLES.ADMIN])`. There is a single admin, configured in env.
- Content lives in `scripts/seed-data.js`. After editing it, run `pnpm seed` and `pnpm sync-fallback`.
- Use `LoggerService` instead of `console`. Prettier: tabs, double quotes, width 100.
