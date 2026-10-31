/**
 * Offline copy of the portfolio content, used when the API is unreachable so the site never renders empty.
 * Generated from backend/scripts/seed-data.js — do not edit fallback.json by hand; run `pnpm sync-fallback` in backend/.
 */
import type { Certificate, Education, Experience, Profile, Project, Skill } from "@/types/portfolio";
import data from "./fallback.json";

export const fallbackProfile = data.profile as Profile;
export const fallbackExperience = data.experience as Experience[];
export const fallbackEducation = data.education as Education[];
export const fallbackSkills = data.skills as Skill[];
export const fallbackProjects = data.projects as Project[];
export const fallbackCertificates = data.certificates as Certificate[];
