---
title: 'Using Next.js the Right Way: Beyond React with Routing'
date: '2025-08-28'
image: 'next-correct-usage.png'
excerpt: 'Learn how to leverage Next.js properly by embracing server-first architecture and avoiding common pitfalls that turn your app into an overengineered SPA.'
isFeatured: true
---

# Using Next.js the Right Way: Beyond React with Routing

Many projects claim to use Next.js but end up being React SPAs (Single Page Applications) with a light touch of routing. When code is filled with "use client" directives, the architecture loses its purpose — and the benefits of React Server Components (RSC) disappear completely.

The golden rule is simple: **Server-first. Client only when necessary.**

## The Server-First Mindset

Next.js isn't just about routing — it's about architecture designed for the server. If you don't understand render cycles, RSC, and streaming, you'll end up writing a more complex SPA than you need.

Here are the key principles that make the difference:

## 1. Prefer Native Fetch

Next.js's "fetch()" is optimized to run on the server with automatic caching and awareness:

```javascript
// ✅ Good - Server-side fetch with automatic caching
async function getData() {
    const res = await fetch('https://api.example.com/data', {
        next: { revalidate: 3600 }, // Cache for 1 hour
    })
    return res.json()
}

// ❌ Avoid - Client-side data fetching
function Component() {
    const [data, setData] = useState(null)
    useEffect(() => {
        fetch('/api/data')
            .then((res) => res.json())
            .then(setData)
    }, [])
}
```

## 2. Use Forms Like Backend Development

Form actions combined with server-side schema validation (Zod, Yup, Joi) solve 90% of use cases:

```javascript
// ✅ Server Action with validation
import { z } from 'zod'

const schema = z.object({
    email: z.string().email(),
    name: z.string().min(2),
})

async function createUser(formData: FormData) {
    'use server'

    const validatedFields = schema.safeParse({
        email: formData.get('email'),
        name: formData.get('name'),
    })

    if (!validatedFields.success) {
        return { error: 'Invalid fields' }
    }

    // Process the data...
}
```

## 3. Skip SWR (Stale-While-Revalidate) or React Query by Default

Next.js's cache system already does a good job and is integrated with the native revalidation system. Don't install these libraries reflexively — evaluate if you actually need them.

## 4. Write Server Components by Default

The more you delegate to the server, the less JavaScript goes to the client. This impacts bundle size, TTI (Time to Interactive), and real performance. This is where Next.js truly shines:

```javascript
// ✅ Server Component - runs on server, no JS to client
async function ProductList() {
    const products = await getProducts()

    return (
        <div>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

// ❌ Client Component - unnecessary for static rendering
;('use client')
function ProductList() {
    const [products, setProducts] = useState([])
    // ... client-side logic
}
```

## 5. Forget Loading Spinners with State

Use "loading.tsx" in routes with Suspense instead. It's clean, performant, and already integrated with the framework's flow:

```typescript
// app/products/loading.tsx
export default function Loading() {
    return <div className="animate-pulse">Loading products...</div>
}

// app/products/page.tsx
export default async function ProductsPage() {
    const products = await getProducts() // This will show 
    // loading.tsx while fetching
    return <ProductList products={products} />
}
```

## 6. Avoid styled-components

Besides being outdated in the ecosystem, it requires extra solutions for SSR. Tailwind CSS solves this elegantly and comes ready to use:

```javascript
// ✅ Tailwind - SSR ready, no runtime overhead
function Button({ children }) {
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold 
        py-2 px-4 rounded">
            {children}
        </button>
    )
}

// ❌ styled-components - runtime overhead, SSR complexity
const StyledButton = styled.button`
    background-color: #3b82f6;
    &:hover {
        background-color: #1d4ed8;
    }
    // ...
`
```

## 7. Middleware is Hidden Gold

Authentication? Redirects? Geolocation? "middleware.ts" files run before rendering — fast, on the edge, and with no client-side JavaScript cost:

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check authentication
    const token = request.cookies.get('auth-token')

    if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Geolocation-based redirects
    const country = request.geo?.country
    if (country === 'BR' && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/pt-br', request.url))
    }
}
```

## 8. When to Choose Vite Instead

If you just want routing and your app is entirely client-side, there's no reason to use Next.js. React + Vite (with libs like React Router or Tanstack Router) = faster builds, smaller bundles, zero SSR overhead.

**Use Vite when:**

-   Building a client-side only application
-   You don't need SSR or SSG (Static Site Generation)
-   You want faster development builds
-   Your app is primarily an admin dashboard or internal tool

**Use Next.js when:**

-   SEO (Search Engine Optimization) is important
-   You need server-side rendering
-   You want to leverage server components
-   You're building a content-heavy site
-   Performance and initial load time are critical

## Additional Best Practices

### Image Optimization

Always use Next.js Image component for automatic optimization:

```javascript
import Image from 'next/image'

// ✅ Optimized images with lazy loading
;<Image
    src="/hero-image.jpg"
    alt="Hero"
    width={800}
    height={600}
    priority // for above-the-fold images
/>
```

### Route Handlers for APIs

Use the new App Router API (Application Programming Interface) structure:

```javascript
// app/api/users/route.ts
export async function GET() {
    const users = await getUsers()
    return Response.json(users)
}

export async function POST(request: Request) {
    const body = await request.json()
    const user = await createUser(body)
    return Response.json(user, { status: 201 })
}
```

### Static Generation When Possible

Leverage static generation for better performance:

```javascript
// Static generation with ISR
export const revalidate = 3600 // Revalidate every hour

export default async function BlogPost({ params }) {
    const post = await getPost(params.slug)
    return <ArticleContent post={post} />
}
```

## Summary

1. **Next.js isn't just about routing** — it's about server-first architecture
2. **Understand the fundamentals**: render cycles, RSC, and streaming
3. **Study the basics, use with intention**
4. **Don't accept "use client" as the default answer**

When used correctly, Next.js provides exceptional performance, SEO benefits, and developer experience. When misused, it becomes an overengineered React SPA with unnecessary complexity.

The key is to embrace the server-first philosophy and only reach for client-side features when truly necessary.

---

_This post was inspired by insights shared by Gusttavo Castro on LinkedIn about proper Next.js usage patterns._
