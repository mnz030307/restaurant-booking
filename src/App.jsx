import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import TableCard from './components/TableCard.jsx'
import BookingForm from './components/BookingForm.jsx'
import Confirmation from './components/Confirmation.jsx'

const INITIAL_TABLES = [
  { id: 1, seats: 2, booked: false },
  { id: 2, seats: 4, booked: true },
  { id: 3, seats: 4, booked: false },
  { id: 4, seats: 6, booked: false },
  { id: 5, seats: 2, booked: true },
  { id: 6, seats: 8, booked: false },
]

function loadTables() {
  try {
    const saved = localStorage.getItem('vt-tables')
    return saved ? JSON.parse(saved) : INITIAL_TABLES
  } catch {
    return INITIAL_TABLES
  }
}

export default function App() {
  const [page, setPage] = useState('home') // 'home' | 'book' | 'confirm'
  const [tables, setTables] = useState(loadTables)
  const [selectedTable, setSelectedTable] = useState(null)
  const [booking, setBooking] = useState(null)

  // Keep table status saved so it survives a page refresh
  useEffect(() => {
    try {
      localStorage.setItem('vt-tables', JSON.stringify(tables))
    } catch {}
  }, [tables])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  function handleConfirm(details) {
    setTables((prev) =>
      prev.map((t) => (t.id === details.table ? { ...t, booked: true } : t))
    )
    setBooking(details)
    setSelectedTable(null)
    setPage('confirm')
  }

  function resetTables() {
    setTables(INITIAL_TABLES)
    setSelectedTable(null)
  }

  const available = tables.filter((t) => !t.booked).length

  return (
    <>
      <Navbar page={page} onNavigate={setPage} />
      <main>
        {page === 'home' && <Home onBook={() => setPage('book')} />}

        {page === 'book' && (
          <div className="page book">
            <h1>Book a table</h1>
            <section aria-labelledby="tables-h">
              <div className="section-head">
                <h2 id="tables-h">Choose a table</h2>
                <p>{available} of {tables.length} tables available</p>
              </div>
              <div className="table-grid">
                {tables.map((t) => (
                  <TableCard
                    key={t.id}
                    table={t}
                    selected={selectedTable === t.id}
                    onSelect={setSelectedTable}
                  />
                ))}
              </div>
              <button type="button" className="link" onClick={resetTables}>
                Reset all tables
              </button>
            </section>

            <BookingForm
              tables={tables}
              selectedTable={selectedTable}
              onSelectTable={setSelectedTable}
              onConfirm={handleConfirm}
            />
          </div>
        )}

        {page === 'confirm' && booking && (
          <Confirmation
            booking={booking}
            onHome={() => setPage('home')}
            onAnother={() => setPage('book')}
          />
        )}
      </main>
    </>
  )
}
