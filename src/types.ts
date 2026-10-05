/**
 * @system rate-limit
 * @status handwritten
 */

export interface RateLimitOptions {
	windowMs: number;
	maxEvents: number;
}

export interface RateLimiter {
	/** Non-blocking: "may I?" — the INBOUND form, where refusing is the right answer. */
	tryAcquire(): boolean;
	/** Blocking: waits for a slot until the oldest event in the window expires, so throughput converges on the declared ceiling rather than bursting into it — the OUTBOUND form, where we are the caller, so the only useful response to the ceiling is to slow down. Without it, integrations reach for after-the-fact retry, which reacts to a 429 instead of preventing one. */
	acquire(signal?: AbortSignal): Promise<void>;
	readonly remaining: number;
	readonly isExhausted: boolean;
	reset(): void;
	readonly name: string;
}

export interface RateLimiterStats {
	name: string;
	windowMs: number;
	maxEvents: number;
	remaining: number;
	isExhausted: boolean;
	enabled: boolean;
}

export interface KeyedRateLimitOptions {
	windowMs: number;
	maxRequests: number;
	maxKeys?: number;
}

export interface KeyedRateLimiter {
	tryAcquire(key: string): boolean;
	remaining(key: string): number;
	isExhausted(key: string): boolean;
	reset(key?: string): void;
	readonly name: string;
	readonly keyCount: number;
}

export interface KeyedRateLimiterStats {
	name: string;
	windowMs: number;
	maxRequests: number;
	maxKeys: number;
	keyCount: number;
	enabled: boolean;
}

export interface RateLimitConfig {
	overrides?: Record<
		string,
		{
			enabled?: boolean;
			windowMs?: number;
			maxEvents?: number;
			maxRequests?: number;
		}
	>;
}
