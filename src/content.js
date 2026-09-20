export const profile = {
  name: "Thangatamil A",
  first: "Thangatamil",
  role: "Software Development Engineer",
  location: "Bengaluru, Karnataka, India",
  email: "thangatamil1177@gmail.com",
  phone: "+91 90255 65212",
  phoneHref: "tel:+919025565212",
  linkedin: "https://www.linkedin.com/in/thangatamil-a-794a632a3",
  github: "https://github.com/Thanga-tamil",
  resume: "/thangatamil_cv.pdf",
  education: "B.E. CSE, Hindusthan Institute of Technology · CGPA 7.8",
  focus: "Orchestration · Client comms · Production",
  certified: "Spring Boot · Core Java · MERN",
}

export const stats = [
  { value: "2.5 yrs", label: "Full-time in production" },
  { value: "1–2ms", label: "Auth after live rewrite" },
  { value: "Deadlocks", label: "Fixed under concurrent load" },
  { value: "Clients", label: "Mobile, product, chat SDK" },
]

export const nav = [
  { href: "#about", label: "About" },
  { href: "#career", label: "Career" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#systems", label: "Practice" },
  { href: "#products", label: "Products" },
  { href: "#certs", label: "Certs" },
  { href: "#contact", label: "Contact" },
]

export const roles = [
  {
    company: "Contus Tech",
    dates: "Sep 2024 — Jun 2026 · Chennai",
    title: "Junior Software Development Engineer",
    points: [
      "Orchestrated the auth path in production: replaced Go/Python auth hops with JWT + Redis, cut latency from 200ms–3s to 1–2ms, and cleared session deadlocks while users were already online.",
      "Owned client-facing realtime contracts for MirrorFly and Hike — presence, mute, roster, reactions, push — and kept mobile, product, and backend on one story when delivery failed.",
      "Eliminated a Java XMPP hop by shipping a native RabbitMQ module in ejabberd with async worker pools, then watched throughput instead of hoping the extra process held.",
      "Took a Cloud API Gateway single-point-of-failure out of the live path with HA Nginx and Apache routing so clients stopped paying an extra proxy on every request.",
      "When contact sync blew the JVM heap in production, rewrote it in Go with batched parallel sync and Redis so large graphs finished without taking the database with them.",
      "Instrumented ejabberd and microservices with tracing, structured logs, and metrics so a missed stanza under pressure had a diagnosis, not a war-room guess.",
    ],
  },
  {
    company: "Innov Source — Tech Mahindra client",
    dates: "Apr 2024 — Sep 2024",
    title: "FTTX Engineer",
    points: [
      "Built a working model of how binary data rides electromagnetic and fiber paths in cellular and Ethernet networks.",
      "Walked the team through router fundamentals and port forwarding — client communication as teaching, so traffic routing stopped being folklore in the field.",
      "Mapped public/private IPs, NAT, and port mapping onto how packets actually reach a process.",
    ],
  },
  {
    company: "Next opportunity",
    dates: "Open to roles · Bengaluru · Remote",
    title: "Golang · Java · Erlang",
    points: [
      "Looking for full-time backend work where orchestration, client communication, and live production issues are the job — not a side channel.",
      "Strongest on realtime and messaging platforms under load. Go first; Java and Erlang when the path already lives there.",
    ],
  },
]

export const projectFilters = [
  "All",
  "Production",
  "Orchestration",
  "Clients",
  "Go",
  "Realtime",
]

export const projects = [
  {
    id: "auth-pipeline",
    tags: ["Auth", "Architecture"],
    title: "JWT authentication pipeline",
    org: "Contus Tech · MirrorFly",
    summary:
      "External Go/Python auth services became JWT with Redis session validation. Multi-session login, deadlock removal, and scheduled token cleanup came with the schema redesign.",
    metrics: [
      { value: "1–2ms", label: "Auth latency" },
      { value: "200ms–3s", label: "Previous range" },
    ],
    body: "The old path paid a network hop and language boundary on every authentication. Replacing it with JWT plus Redis-backed session checks collapsed that to in-process validation. Schema work unlocked multi-session login; scheduled cleanup stopped expired tokens from accumulating. Database deadlocks that showed up under concurrent session writes were resolved as part of the same cutover.",
  },
  {
    id: "ejabberd-rabbitmq",
    tags: ["Messaging", "Architecture"],
    title: "Native RabbitMQ in ejabberd",
    org: "Contus Tech",
    summary:
      "A Java XMPP microservice went away. Publish/subscribe now runs inside ejabberd with asynchronous worker pools — no extra hop, less infra.",
    metrics: [
      { value: "0", label: "Java XMPP hops" },
      { value: "In-node", label: "Pub/sub path" },
    ],
    body: "The Java service existed only to bridge XMPP traffic onto RabbitMQ. A native Erlang module with async worker pools did the same job next to the XMPP session, which removed inter-service REST and the JVM process that existed to own it.",
  },
  {
    id: "reactive-rpc",
    tags: ["Architecture"],
    title: "Reactive services and gRPC",
    org: "Contus Tech",
    summary:
      "Spring MVC + Tomcat became WebFlux + Netty. Internal REST gave way to gRPC with Protocol Buffers. R2DBC was the database story that matched the I/O model.",
    metrics: [
      { value: "Netty", label: "Non-blocking I/O" },
      { value: "gRPC", label: "Internal RPC" },
    ],
    body: "Blocking Tomcat threads and JSON REST were the default internal contract. WebFlux on Netty made request handling non-blocking; Protobuf cut serialization cost between services. R2DBC was advocated so the database client did not reintroduce blocking JDBC/JPA on the new path.",
  },
  {
    id: "redis-k8s",
    tags: ["Messaging", "Architecture"],
    title: "Redis presence fabric on Kubernetes",
    org: "Contus Tech",
    summary:
      "User presence, block/mute state, roster, and group participants moved to a horizontally scalable Redis layer so realtime paths stopped leaning on SQL.",
    metrics: [
      { value: "K8s", label: "Horizontal scale" },
      { value: "SQL offload", label: "Hot path data" },
    ],
    body: "Realtime messaging asked the same questions of MySQL on every stanza: is this user online, muted, blocked, in the group? Caching those answers in Redis, persisted and scaled on Kubernetes, took that read load off SQL without giving up a fallback when cache missed.",
  },
  {
    id: "contact-sync-go",
    tags: ["Go", "Architecture"],
    title: "Contact sync rewritten in Go",
    org: "Contus Tech",
    summary:
      "The Java sync service hit JVM heap limits on large datasets. Go, Redis, and batched parallel sync made the job finish without turning the database into the bottleneck.",
    metrics: [
      { value: "Go", label: "Heap-safe rewrite" },
      { value: "Batched", label: "Parallel sync" },
    ],
    body: "Large contact graphs made the JVM service a memory problem before it was a CPU problem. The Go rewrite streamed work in batches, cached aggressively in Redis, and parallelised sync so MySQL saw fewer, tighter transactions.",
  },
  {
    id: "reactions-media",
    tags: ["Messaging", "Realtime"],
    title: "Reactions, push, and media stack",
    org: "Contus Tech · MirrorFly / Hike",
    summary:
      "One-to-one and group reactions with async DB writes, FCM/APNs offline sync, Firebase token checks at signup, IAP for anonymous chat, plus LiveKit, Janus, SIP, and Centrifugo.",
    metrics: [
      { value: "FCM + APNs", label: "Offline sync" },
      { value: "WebRTC", label: "LiveKit · Janus" },
    ],
    body: "Reactions had to land for online and offline users without blocking the stanza path — async persistence, push as the wakeup, SQL as the source of truth. Firebase Admin validated ID tokens before account creation. Google Play and App Store IAP unlocked anonymous communication. The same platform sat on ejabberd, RabbitMQ, Redis, WebFlux, Go, gRPC, Janus, SIP, LiveKit, and Centrifugo.",
  },
]

export const skills = [
  {
    name: "Backend & messaging",
    items: ["Java Spring Boot", "Erlang", "Golang", "Microservices", "Ejabberd", "XMPP"],
  },
  {
    name: "Frontend & web",
    items: ["HTML", "JavaScript", "React.js", "Vite"],
  },
  {
    name: "Streaming",
    items: ["gRPC", "Protobuf", "RabbitMQ", "Kafka"],
  },
  {
    name: "Data & cache",
    items: ["MySQL", "SQLite", "Redis", "MongoDB", "Cassandra"],
  },
  {
    name: "DevOps & cloud",
    items: ["Docker", "Kubernetes", "CI/CD", "Jenkins", "AWS", "Oracle", "MinIO", "GCP"],
  },
  {
    name: "Tools & LLM",
    items: ["Jira", "Grafana", "Postman", "Git", "Bitbucket", "GitHub", "Psi", "OpenCode", "Claude"],
  },
]

export const systems = [
  {
    title: "Cut the hop",
    body: "If a JVM service exists only to talk to a node that already has an Erlang VM, the hop is the product. Native modules and in-process validation beat another REST client.",
  },
  {
    title: "Measure the hot path",
    body: "Auth going from seconds to milliseconds was not a framework win. It was removing process boundaries and validating sessions where the request already was.",
  },
  {
    title: "Cache what chat asks twice",
    body: "Presence, mute, block, roster, and group membership are not analytics queries. They belong next to the session, with SQL as durability — not as the first read.",
  },
  {
    title: "Match I/O models",
    body: "WebFlux on Netty without a reactive database client is a costume. gRPC and R2DBC were the contracts that made non-blocking I/O honest end to end.",
  },
  {
    title: "Observe delivery, not just uptime",
    body: "Tracing, structured logs, and metrics across ejabberd and microservices exist so a missed stanza has a story, not a guess.",
  },
  {
    title: "Change language when the heap says so",
    body: "Contact sync did not need a bigger JVM. It needed Go, batching, and Redis so large datasets stopped being a memory incident.",
  },
]

export const products = [
  {
    title: "MirrorFly",
    kind: "Core product",
    body: "Chat and realtime platform work — auth, messaging, reactions, sync, purchases, and the services around them.",
  },
  {
    title: "Hike Messenger",
    kind: "Core product",
    body: "Messenger surface sitting on the same realtime stack: XMPP, push, presence, and media.",
  },
  {
    title: "Ejabberd / XMPP",
    kind: "Forked",
    body: "Native RabbitMQ module, reactions, and observability inside the XMPP server instead of around it.",
  },
  {
    title: "LiveKit · Centrifugo",
    kind: "Forked",
    body: "WebRTC and TCP/WebSocket fanout used as part of the realtime media and event path, alongside Janus and SIP.",
  },
]

export const certs = [
  {
    title: "Spring Boot — AmigosCode",
    dates: "Aug 2023 — Mar 2024",
    body: "Hands-on course on building RESTful APIs in a microservices shape.",
  },
  {
    title: "Java: Spring — QSpiders",
    dates: "Training",
    body: "Core Java, OOP, collections, multithreading, exception handling — the floor the Spring work stands on.",
  },
  {
    title: "MERN Stack — EMC",
    dates: "Certification",
    body: "Modern web apps and REST integration with React, Node.js, and MongoDB.",
  },
]
