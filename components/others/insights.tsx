import React, { useMemo, useState } from "react";
import Image from "next/image";

type Insight = {
  id: string;
  authorName: string;
  authorRole: string; // e.g., "Retired Senior Engineer"
  avatar?: string;
  department?: string;
  retiredSince?: string; // e.g., "2024-06"
  title: string;
  body: string;
  tags?: string[];
  postedAt: string; // ISO or display string
  commentsCount?: number;
  likes?: number;
};

const DUMMY_INSIGHTS: Insight[] = [
  {
    id: "ins-001",
    authorName: "A. K. Menon",
    authorRole: "Retired Train Maintenance Lead",
    avatar: "/images/avatars/menon.jpg",
    department: "Operations",
    retiredSince: "2023-11",
    title: "Lessons from 25 years maintaining rolling stock",
    body:
      "Preventive checks saved us more than reactive fixes. Simple routine checks on bogies and couplers reduced downtime by 18% during peak seasons. Document procedures with photos.",
    tags: ["maintenance", "operations", "checklists"],
    postedAt: "2025-09-22 09:15",
    commentsCount: 4,
    likes: 28,
  },
  {
    id: "ins-002",
    authorName: "Latha R",
    authorRole: "Retired Systems Architect",
    avatar: "/images/avatars/latha.jpg",
    department: "Engineering",
    retiredSince: "2022-05",
    title: "On building resilient microservices",
    body:
      "Design your APIs so the critical path has predictable latency. Circuit breakers and proper retries are small changes that prevent cascading failures.",
    tags: ["architecture", "backend", "best-practice"],
    postedAt: "2025-09-18 14:30",
    commentsCount: 12,
    likes: 73,
  },
  {
    id: "ins-003",
    authorName: "Pradeep N",
    authorRole: "Retired Safety Officer",
    avatar: "/images/avatars/pradeep.jpg",
    department: "Safety",
    retiredSince: "2024-02",
    title: "Low-cost safety drills that actually work",
    body:
      "Run quarterly tabletop drills with cross-department actors. Keep the scenario small and measurable — a 45-minute run with a 10-point scorecard works wonders.",
    tags: ["safety", "training"],
    postedAt: "2025-08-30 11:05",
    commentsCount: 2,
    likes: 19,
  },
];

const ALL_DEPARTMENTS = ["All", "Operations", "Engineering", "Safety", "Design", "Finance"];

const Insights: React.FC = () => {
  const [query, setQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState<string>("All");
  const [sortNewest, setSortNewest] = useState(true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DUMMY_INSIGHTS.filter((ins) => {
      if (deptFilter !== "All" && ins.department !== deptFilter) return false;
      if (!q) return true;
      return (
        ins.title.toLowerCase().includes(q) ||
        ins.body.toLowerCase().includes(q) ||
        ins.authorName.toLowerCase().includes(q) ||
        (ins.tags && ins.tags.join(" ").toLowerCase().includes(q))
      );
    }).sort((a, b) => {
      if (sortNewest) return +new Date(b.postedAt) - +new Date(a.postedAt);
      return +new Date(a.postedAt) - +new Date(b.postedAt);
    });
  }, [query, deptFilter, sortNewest]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Insights by Retired Personnel</h1>
          <p className="text-sm text-gray-600 mt-1">
            Practical knowledge and lessons learned from those who walked the path.
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <input
            aria-label="Search insights"
            placeholder="Search title, body, author or tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-2 border rounded-lg w-64 focus:outline-none focus:ring"
          />
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none"
          >
            {ALL_DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <button
            onClick={() => setSortNewest((s) => !s)}
            className="px-3 py-2 border rounded-lg bg-white shadow-sm"
            title="Toggle sort"
          >
            {sortNewest ? "Newest" : "Oldest"}
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column: post list */}
        <section className="md:col-span-2 space-y-4">
          {filtered.length === 0 ? (
            <div className="p-6 bg-gray-50 rounded border text-center text-gray-500">
              No insights match your search.
            </div>
          ) : (
            filtered.map((ins) => (
              <article
                key={ins.id}
                className="p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
                role="article"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 relative rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={ins.avatar ?? "/images/avatars/default.jpg"}
                      alt={ins.authorName}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">{ins.title}</h2>
                        <div className="text-sm text-gray-600">
                          By <strong>{ins.authorName}</strong>{" "}
                          <span className="text-xs px-2 py-0.5 ml-2 rounded bg-gray-100 text-gray-700">
                            {ins.authorRole}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {ins.department} • Retired since {ins.retiredSince} •{" "}
                          <time dateTime={ins.postedAt}>{ins.postedAt}</time>
                        </div>
                      </div>

                      <div className="text-right text-sm">
                        <div className="text-gray-500">{ins.likes} ♥</div>
                        <div className="text-gray-400 text-xs">{ins.commentsCount} comments</div>
                      </div>
                    </div>

                    <p className="mt-3 text-gray-800 leading-relaxed">{ins.body}</p>

                    <div className="mt-3 flex flex-wrap gap-2 items-center">
                      {ins.tags?.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full border"
                        >
                          #{t}
                        </span>
                      ))}

                      <div className="ml-auto flex gap-2">
                        <button className="text-sm px-3 py-1 border rounded bg-white">Like</button>
                        <button className="text-sm px-3 py-1 border rounded bg-white">Comment</button>
                        <button className="text-sm px-3 py-1 border rounded bg-white">Share</button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>

        {/* Right column: sidebar */}
        <aside className="space-y-4">
          <div className="p-4 bg-white rounded-lg border shadow-sm">
            <h3 className="font-semibold mb-2">Top Contributors</h3>
            <ul className="space-y-2">
              {DUMMY_INSIGHTS.slice(0, 3).map((u) => (
                <li key={u.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 relative rounded-full overflow-hidden bg-gray-100">
                    <Image src={u.avatar ?? "/images/avatars/default.jpg"} alt={u.authorName} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{u.authorName}</div>
                    <div className="text-xs text-gray-500">{u.authorRole}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-white rounded-lg border shadow-sm">
            <h3 className="font-semibold mb-2">Quick Post (UI Only)</h3>
            <p className="text-sm text-gray-600 mb-2">Retirees can share short notes here (no backend).</p>
            <textarea className="w-full border rounded p-2 text-sm" rows={4} placeholder="Share a short tip or memory..." disabled />
            <div className="mt-2 flex justify-end">
              <button className="px-3 py-1 rounded bg-gray-200 text-sm" disabled>
                Post (demo)
              </button>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border shadow-sm text-sm text-gray-600">
            <strong>Guidelines</strong>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Be respectful and constructive.</li>
              <li>Prefer practical, actionable advice.</li>
              <li>Share photos or diagrams where helpful.</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Insights;
