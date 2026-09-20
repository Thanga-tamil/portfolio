import { useEffect, useMemo, useState } from 'react'
import {
  certs,
  nav,
  products,
  profile,
  projectFilters,
  projects,
  roles,
  skills,
  stats,
  systems,
} from './content'
import './App.css'

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [ids])

  return active
}

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(null)
  const active = useActiveSection([
    'about',
    'career',
    'work',
    'skills',
    'systems',
    'products',
    'certs',
    'contact',
  ])

  const visible = useMemo(
    () =>
      filter === 'All'
        ? projects
        : projects.filter((p) => p.tags.includes(filter)),
    [filter],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="glow" aria-hidden="true" />
      <div className="page">
        <header className="nav">
          <a className="brand" href="#top">
            Thangatamil<span className="dot">.</span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={active === item.href.slice(1) ? 'active' : ''}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              className="icon-btn"
              type="button"
              aria-label="Toggle colour theme"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>
            <button
              className="menu-btn"
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              ☰
            </button>
          </div>
          {menuOpen && (
            <nav className="mobile-menu">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </header>

        <main>
          <section className="wrap hero" id="top">
            <div>
              <div className="eyebrow">
                <span />
                Software Orchestrator & Development Engineer
              </div>
              <h1>
                Hi, I&apos;m
                <br />
                {profile.name}
                <span className="dot">.</span>
              </h1>
              <p>
                Building scalable microservices and realtime communication
                platforms. from JWT auth that dropped to 1–2ms, to native
                ejabberd modules, gRPC internals, and Go rewrites when the JVM
                heap said stop.
              </p>
              <div className="ctas">
                <a className="btn btn-primary" href="#work">
                  View work
                </a>
                <a className="btn btn-ghost" href={profile.resume} download>
                  Download resume
                </a>
                <a className="btn btn-ghost" href="#contact">
                  Let&apos;s connect
                </a>
              </div>
            </div>
            <div className="portrait-wrap">
              <div className="portrait">
                <img
                  src="/photos/portrait.jpg?v=4"
                  alt={`${profile.name}, Software Development Engineer`}
                />
              </div>
              {/* <div className="also">
                <small>Based in</small>
                Bengaluru
              </div> */}
            </div>
          </section>

          <section className="wrap">
            <div className="stats">
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="wrap section" id="about">
            <p className="kicker">About</p>
            <h2>Systems thinking, shipped under load.</h2>
            <div className="about-grid">
              <div className="about-copy">
                <p>
                  I&apos;m a Software Development Engineer with 2.5 years
                  orchestrating, designing, and building software in Agile
                  teams. The work is backend-heavy: scalable microservices and
                  realtime communication platforms, with performance,
                  reliability, and high availability as the actual constraints.
                </p>
                <p>
                  At Contus Tech I lived inside MirrorFly and Hike Messenger —
                  ejabberd, RabbitMQ, Redis, Spring WebFlux, Go, gRPC, LiveKit,
                  Janus, SIP, Centrifugo. The interesting problems were the ones
                  where a hop, a heap, or a blocking I/O model was the product
                  bug.
                </p>
                <p>
                  I resigned in 2026 and I&apos;m based in Bengaluru, looking
                  for Golang work first. Java and Erlang are still tools I will
                  pick up without drama.
                </p>
              </div>
              <div className="facts">
                <figure className="inset-photo">
                  <img
                    src="/photos/desk.jpg"
                    alt="Thangatamil with teammates at the office"
                  />
                  <figcaption>Building with the team.</figcaption>
                </figure>
                <div className="fact">
                  <span>Based in</span>
                  {profile.location}
                </div>
                <div className="fact">
                  <span>Focus</span>
                  {profile.focus}
                </div>
                <div className="fact">
                  <span>Education</span>
                  {profile.education}
                </div>
                <div className="fact">
                  <span>Certified in</span>
                  {profile.certified}
                </div>
              </div>
            </div>
          </section>

          <section className="wrap section" id="career">
            <p className="kicker">Career</p>
            <h2>A timeline of impact, not job descriptions.</h2>
            <p className="lede">
              Every role below is described by what changed because of the work.
            </p>
            <div className="timeline">
              {roles.map((role) => (
                <article className="role" key={role.company}>
                  <div>
                    <h3>{role.company}</h3>
                    <span className="dates">{role.dates}</span>
                  </div>
                  <div>
                    <strong>{role.title}</strong>
                    <ul>
                      {role.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="wrap section" id="work">
            <p className="kicker">Work</p>
            <h2>Case studies, not screenshots.</h2>
            <p className="lede">
              Problem, approach, the parts that went sideways, and what actually
              shipped.
            </p>
            <div className="filters">
              {projectFilters.map((f) => (
                <button
                  key={f}
                  className={`chip ${filter === f ? 'on' : ''}`}
                  type="button"
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="cards">
              {visible.map((project) => (
                <button
                  key={project.id}
                  className="card"
                  type="button"
                  onClick={() => setOpen(project)}
                >
                  <div className="tags">
                    {project.tags.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3>{project.title}</h3>
                  <div className="org">{project.org}</div>
                  <p>{project.summary}</p>
                  <div className="metrics">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <strong>{m.value}</strong>
                        <span>{m.label}</span>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="wrap section" id="skills">
            <p className="kicker">Skills</p>
            <h2>The toolkit.</h2>
            <div className="skill-grid">
              {skills.map((group) => (
                <div className="panel" key={group.name}>
                  <h3>{group.name}</h3>
                  <div className="pills">
                    {group.items.map((item) => (
                      <span className="pill" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="wrap section" id="systems">
            <p className="kicker">Systems</p>
            <h2>How I cut latency and hops.</h2>
            <p className="lede">
              Delivery is a distributed-systems problem with a product surface.
            </p>
            <div className="systems-grid">
              {systems.map((item) => (
                <div className="panel" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="wrap section" id="products">
            <p className="kicker">Products</p>
            <h2>Core platforms and the forks under them.</h2>
            <p className="lede">
              Products I have dealt with — the ones users see, and the servers
              they actually run on.
            </p>
            <div className="product-grid">
              {products.map((item) => (
                <div className="panel" key={item.title}>
                  <span className="kind">{item.kind}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="wrap desk-slot" aria-label="At the desk">
            <figure className="inset-photo end">
              <img
                src="/photos/team.jpg"
                alt="At the laptop with the team"
              />
              <figcaption>Realtime stack, live desk.</figcaption>
            </figure>
          </section>

          <section className="wrap section" id="certs">
            <p className="kicker">Certifications</p>
            <h2>The floor the work stands on.</h2>
            <div className="cert-grid">
              {certs.map((item) => (
                <div className="panel" key={item.title}>
                  <div className="meta">{item.dates}</div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="wrap section" id="contact">
            <p className="kicker">Contact</p>
            <h2>Hiring for Go, Java, or Erlang backend? Let&apos;s talk.</h2>
            <div className="contact-grid">
              <div className="contact-card">
                <span>Location</span>
                {profile.location}
              </div>
              <a className="contact-card" href={`mailto:${profile.email}`}>
                <span>Email</span>
                {profile.email}
              </a>
              <a className="contact-card" href={profile.phoneHref}>
                <span>Phone</span>
                {profile.phone}
              </a>
              <a
                className="contact-card"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <span>LinkedIn</span>
                Connect with me
              </a>
              <a
                className="contact-card"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                <span>GitHub</span>
                See the side work
              </a>
              <a className="contact-card" href={profile.resume} download>
                <span>Resume</span>
                Download PDF
              </a>
            </div>
          </section>
        </main>

        <footer className="wrap">
          <div>
            © {new Date().getFullYear()} {profile.name} · {profile.role}
          </div>
          <div>{profile.location}</div>
        </footer>
      </div>

      {open && (
        <div
          className="overlay"
          role="presentation"
          onClick={() => setOpen(null)}
        >
          <article
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            onClick={(e) => e.stopPropagation()}
          >
            <header>
              <div>
                <div className="tags">
                  {open.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <h3 id="project-title" style={{ marginTop: 12 }}>
                  {open.title}
                </h3>
                <div className="org">{open.org}</div>
              </div>
              <button
                className="icon-btn"
                type="button"
                aria-label="Close"
                onClick={() => setOpen(null)}
              >
                ×
              </button>
            </header>
            <p>{open.body}</p>
            <div className="metrics" style={{ marginTop: 20 }}>
              {open.metrics.map((m) => (
                <div key={m.label}>
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      )}
    </>
  )
}
