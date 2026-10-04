// Decorative "floor plan" built with CSS: round tables, one of them booked
const PLAN = [
  { n: 1, s: 'free' }, { n: 2, s: 'taken' }, { n: 3, s: 'free' },
  { n: 4, s: 'free' }, { n: 5, s: 'taken' }, { n: 6, s: 'free' },
]

export default function Home({ onBook }) {
  return (
    <div className="page home">
      <div className="hero-text">
        <h1>Dinner on banana leaf, by the Vaigai.</h1>
        <p>
          Vaigai Table serves Madurai-style meals: crisp dosas, kari dosai,
          jigarthanda and a full sappadu on weekends. Pick a table, tell us
          when you're coming, and we'll keep it ready.
        </p>
        <button className="btn" onClick={onBook}>Book a Table</button>
        <p className="hours">Open every day, 11:00 AM to 10:30 PM</p>
      </div>
      <div className="floor" aria-hidden="true">
        {PLAN.map((t) => (
          <div key={t.n} className={`plate ${t.s}`}>
            <span>{t.n}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
