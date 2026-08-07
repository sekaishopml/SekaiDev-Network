package httpapi

import (
	"sync"
	"time"
)

const maxTrackedIPs = 10_000

type rateLimiter struct {
	mu      sync.Mutex
	hits    map[string][]time.Time
	window  time.Duration
	maxHits int
	maxIPs  int
}

func newRateLimiter(window time.Duration, maxHits, maxIPs int) *rateLimiter {
	return &rateLimiter{
		hits:    make(map[string][]time.Time),
		window:  window,
		maxHits: maxHits,
		maxIPs:  maxIPs,
	}
}

func (limiter *rateLimiter) allow(ip string) bool {
	limiter.mu.Lock()
	defer limiter.mu.Unlock()

	now := time.Now()
	cutoff := now.Add(-limiter.window)
	kept := keepAfter(limiter.hits[ip], cutoff)

	if len(kept) >= limiter.maxHits {
		limiter.hits[ip] = kept
		return false
	}

	if _, exists := limiter.hits[ip]; !exists && len(limiter.hits) >= limiter.maxIPs {
		limiter.evictOne(cutoff)
	}

	limiter.hits[ip] = append(kept, now)
	return true
}

func (limiter *rateLimiter) evictOne(cutoff time.Time) {
	var oldestIP string
	var oldestHit time.Time

	for ip, hits := range limiter.hits {
		kept := keepAfter(hits, cutoff)
		if len(kept) == 0 {
			delete(limiter.hits, ip)
			return
		}
		limiter.hits[ip] = kept

		lastHit := kept[len(kept)-1]
		if oldestIP == "" || lastHit.Before(oldestHit) {
			oldestIP = ip
			oldestHit = lastHit
		}
	}

	if oldestIP != "" {
		delete(limiter.hits, oldestIP)
	}
}

func keepAfter(hits []time.Time, cutoff time.Time) []time.Time {
	kept := hits[:0]
	for _, hit := range hits {
		if hit.After(cutoff) {
			kept = append(kept, hit)
		}
	}
	return kept
}
