type Bucket = {
  count: number
  resetAtMs: number
}

const BUCKETS = new Map<string, Bucket>()

export const rateLimit = (key: string, opts: { limit: number; windowMs: number }) => {
  const now = Date.now()
  const existing = BUCKETS.get(key)

  if (!existing || existing.resetAtMs <= now) {
    BUCKETS.set(key, { count: 1, resetAtMs: now + opts.windowMs })
    return { ok: true, remaining: opts.limit - 1 }
  }

  if (existing.count >= opts.limit) {
    return { ok: false, remaining: 0, resetAtMs: existing.resetAtMs }
  }

  existing.count += 1
  BUCKETS.set(key, existing)
  return { ok: true, remaining: opts.limit - existing.count }
}
