function formatDate(iso) {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

function formatTime(t) {
  const [h, m] = t.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${suffix}`
}

export default function Confirmation({ booking, onHome, onAnother }) {
  const rows = [
    ['Customer', booking.name],
    ['Phone', booking.phone],
    ['Table', `Table ${booking.table}`],
    ['Date', formatDate(booking.date)],
    ['Time', formatTime(booking.time)],
    ['Guests', booking.guests],
  ]
  return (
    <div className="page confirm">
      <h1>Table booked successfully!</h1>
      <p>Booking confirmed. Show this summary when you arrive.</p>
      <dl className="summary" aria-label="Booking summary">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <div className="actions">
        <button className="btn" onClick={onAnother}>Book another table</button>
        <button className="btn ghost" onClick={onHome}>Back to home</button>
      </div>
    </div>
  )
}
