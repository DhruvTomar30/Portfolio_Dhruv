/** Base paths, mounted under /api by routes/index.js */
export const BASE_HEALTH_ROUTE = "/health";
export const BASE_AUTH_ROUTE = "/auth";
export const BASE_PROFILE_ROUTE = "/profile";
export const BASE_PROJECTS_ROUTE = "/projects";
export const BASE_SKILLS_ROUTE = "/skills";
export const BASE_EXPERIENCE_ROUTE = "/experience";
export const BASE_EDUCATION_ROUTE = "/education";
export const BASE_CERTIFICATES_ROUTE = "/certificates";
export const BASE_CONTACT_ROUTE = "/contact";

/** Sub-paths shared by the CRUD-style domains */
export const ROOT_ROUTE = "/";
export const BY_ID_ROUTE = "/:id";

/** auth */
export const LOGIN_ROUTE = "/login";
export const ME_ROUTE = "/me";

/** projects — literal paths must be registered before "/:slug" */
export const ADMIN_ALL_PROJECTS_ROUTE = "/admin/all";
export const PROJECT_BY_SLUG_ROUTE = "/:slug";
export const PROJECT_BY_ID_ROUTE = "/id/:id";

/** contact */
export const CONTACT_STATUS_ROUTE = "/:id/status";
