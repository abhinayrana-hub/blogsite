export const categoryLabels: Record<string, string> = {
  projects: "Projects",
  tech: "Tech",
  travel: "Travel",
  reflections: "Reflections",
  dsa: "Dsa",
};

export function getPostSlug(id: string) {
  return (
    id
      .split("/")
      .pop()
      ?.replace(/\.[^/.]+$/, "") ?? ""
  );
}

export function getPostPath(category: string, id: string) {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/$/, "")}/${category}/${getPostSlug(id)}`.replace(/\/\/{2,}/g, "/");
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function estimateReadingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}
