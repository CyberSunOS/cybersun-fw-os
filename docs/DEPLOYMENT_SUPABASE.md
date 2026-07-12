# Supabase Deployment Guide

**Purpose**: Configuration for Supabase with IPv4-only environments (Coolify, Oracle VPS)  
**Version**: 1.0.0

---

## ⚠️ CRITICAL: IPv4/IPv6 Compatibility

### The Problem

- **Supabase direct connections use IPv6**
- Many VPS providers (Oracle Cloud, some Coolify hosts) are **IPv4-only**
- Direct connections will fail with timeout errors

### The Solution: Use Supavisor Pooler

| Connection Type | Hostname | Port | IPv4 Support |
|-----------------|----------|------|--------------|
| ❌ Direct | `db.[PROJECT_REF].supabase.co` | 5432 | **NO** |
| ✅ Session Pooler | `[REGION].pooler.supabase.com` | 5432 | **YES** |
| ✅ Transaction Pooler | `[REGION].pooler.supabase.com` | 6543 | **YES** |

**Always use the pooler hostname for IPv4 compatibility!**

---

## 📋 DATABASE_URL Configuration

### Correct Format (IPv4 Compatible)

```bash
DATABASE_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@[REGION].pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1&pool_timeout=10
```

### Required Parameters

| Parameter | Value | Purpose |
|-----------|-------|---------|
| `pgbouncer=true` | **Required** | Disables prepared statements for PgBouncer |
| `connection_limit=1` | Recommended | Prevents pool exhaustion in serverless |
| `pool_timeout=10` | Recommended | Connection timeout in seconds |

### Environment Variables

```bash
# Pooled connection - for queries (IPv4 compatible)
DATABASE_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@[REGION].pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1&pool_timeout=10

# Direct connection - for migrations only (may need IPv6)
DIRECT_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@[REGION].pooler.supabase.com:5432/postgres
```

---

## 🔧 Prisma Configuration

### schema.prisma

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")   // Pooled - for queries
  directUrl = env("DIRECT_URL")     // Direct - for migrations
}
```

---

## 🐳 Dockerfile Fix

Add this to your Dockerfile to force IPv4 DNS resolution:

```dockerfile
ENV NODE_OPTIONS="--dns-result-order=ipv4first"
```

### Full Example

```dockerfile
FROM node:20-alpine AS base

# Force IPv4 for DNS resolution (Supabase compatibility)
ENV NODE_OPTIONS="--dns-result-order=ipv4first"

# ... rest of Dockerfile
```

---

## 🔄 Pooler Mode Comparison

| Mode | Port | Best For |
|------|------|----------|
| **Session** | 5432 | General use, Prisma, long-lived connections |
| **Transaction** | 6543 | Serverless, high concurrency, short queries |

**Recommendation**: Use Session mode (port 5432) for most applications.

---

## 🧪 Debug Commands

```bash
# Test pooler connectivity
nc -zv [REGION].pooler.supabase.com 5432

# Check your IP version
curl -4 https://ifconfig.co/ip   # IPv4
curl -6 https://ifconfig.co/ip   # IPv6

# DNS lookup
nslookup [REGION].pooler.supabase.com

# Test database connection
psql "postgresql://postgres.[PROJECT_REF]:[PASSWORD]@[REGION].pooler.supabase.com:5432/postgres"
```

---

## ✅ Pre-Deployment Checklist

Before deploying to Coolify/Oracle VPS:

- [ ] Using pooler hostname (`[REGION].pooler.supabase.com`), NOT direct (`db.xxx.supabase.co`)
- [ ] `DATABASE_URL` includes `?pgbouncer=true`
- [ ] Dockerfile has `NODE_OPTIONS="--dns-result-order=ipv4first"`
- [ ] Tested connection from deployment environment

---

## �� Common Errors

### Error: Connection timeout
**Cause**: Using direct connection on IPv4-only host  
**Fix**: Switch to pooler hostname

### Error: Prepared statement already exists
**Cause**: Missing `pgbouncer=true` parameter  
**Fix**: Add `?pgbouncer=true` to DATABASE_URL

### Error: Too many connections
**Cause**: Missing connection limit  
**Fix**: Add `&connection_limit=1` to DATABASE_URL

---

## 📚 References

- [Supabase IPv4/IPv6 Docs](https://supabase.com/docs/guides/troubleshooting/supabase--your-network-ipv4-and-ipv6-compatibility-cHe3BP)
- [Prisma + Supabase](https://supabase.com/docs/guides/database/connecting-to-postgres#prisma)
- [PgBouncer + Prisma](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#pgbouncer)
