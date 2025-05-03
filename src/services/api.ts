import { EssayWithEvaluation, EssaySubmission } from '../types/essay';

const API_BASE = 'https://ielts-eval-api.onrender.com/api/essays';
const MAX_LIMIT = 100;

export async function fetchEssays(skip = 0, limit = MAX_LIMIT): Promise<EssayWithEvaluation[]> {
  const res = await fetch(`${API_BASE}?skip=${skip}&limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch essays');
  return res.json();
}

export async function fetchEssay(id: string): Promise<EssayWithEvaluation> {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch essay');
  return res.json();
}

export async function submitEssay(essay: EssaySubmission): Promise<EssayWithEvaluation> {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(essay),
  });
  if (!res.ok) throw new Error('Failed to submit essay');
  return res.json();
}

export async function fetchStats(): Promise<any> {
  const res = await fetch(`${API_BASE}/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
} 