/**
 * Thin wrapper around GitHub's public REST API. Both functions return `null` on any
 * failure (network error, rate limit, 404, org/repo not found) rather than throwing —
 * callers should treat `null` as "no live data available" and fall back to static copy,
 * never show a broken UI because GitHub's API had a bad moment.
 *
 * Unauthenticated requests are rate-limited to 60/hour per IP by GitHub. If you hit that
 * in production, set GITHUB_TOKEN (a classic PAT with no scopes needed for public data) to
 * raise the limit to 5,000/hour — see docs/CONTENT_GUIDE.md.
 */

const GITHUB_API = 'https://api.github.com';

function authHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: 'application/vnd.github+json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export type GitHubOrgStats = {
  login: string;
  name: string | null;
  htmlUrl: string;
  publicRepos: number;
  followers: number;
};

export async function getGitHubOrgStats(org: string): Promise<GitHubOrgStats | null> {
  try {
    const res = await fetch(`${GITHUB_API}/orgs/${org}`, {
      headers: authHeaders(),
      // Revalidate hourly — org-level stats don't need to be second-fresh, and this keeps
      // us well within the unauthenticated rate limit.
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;

    const data = await res.json();
    return {
      login: data.login,
      name: data.name ?? null,
      htmlUrl: data.html_url,
      publicRepos: data.public_repos ?? 0,
      followers: data.followers ?? 0
    };
  } catch {
    return null;
  }
}

export type GitHubRepoStats = {
  name: string;
  htmlUrl: string;
  description: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  language: string | null;
};

/**
 * Not currently called anywhere — src/data/projects.ts uses illustrative sample projects,
 * and we couldn't confirm any specific public repo names under the DAF org to point this
 * at honestly. Once real repos exist, call this per-project (owner = 'devallianceforge',
 * repo = the actual repo name) and merge the result into ProjectCard instead of the static
 * `contributors` field. See docs/CONTENT_GUIDE.md.
 */
export async function getGitHubRepoStats(owner: string, repo: string): Promise<GitHubRepoStats | null> {
  try {
    const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, {
      headers: authHeaders(),
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;

    const data = await res.json();
    return {
      name: data.name,
      htmlUrl: data.html_url,
      description: data.description ?? null,
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      openIssues: data.open_issues_count ?? 0,
      language: data.language ?? null
    };
  } catch {
    return null;
  }
}
