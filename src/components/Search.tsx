import { useMemo, useState } from "react";

interface SearchItem {
  title: string;
  description: string;
  category: string;
  href: string;
  tags?: string[];
}

export function Search({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");

  const uniqueItems = useMemo(() => {
    const seen = new Set<string>();
    return items.filter((item) => {
      const key = item.href.trim() || `${item.title}|${item.category}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [items]);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return [];
    return uniqueItems.filter((item) => {
      const tagMatch =
        item.tags?.some((tag) => tag.toLowerCase().includes(value)) ?? false;
      return (
        item.title.toLowerCase().includes(value) ||
        item.description.toLowerCase().includes(value) ||
        item.category.toLowerCase().includes(value) ||
        tagMatch
      );
    });
  }, [uniqueItems, query]);

  return (
    <div>
      <label className="sr-only" htmlFor="article-search">
        Search posts
      </label>
      <div className="search-box">
        <span aria-hidden="true">⌕</span>
        <input
          id="article-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search posts"
        />
      </div>
      {query && filtered.length === 0 ? (
        <p className="muted-text">No posts match this search.</p>
      ) : null}
      {filtered.length > 0 ? (
        <div className="related-list">
          {filtered.slice(0, 6).map((item) => (
            <a key={item.href} href={item.href} className="category-card">
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
