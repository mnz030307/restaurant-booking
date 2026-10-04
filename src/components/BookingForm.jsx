import { useState } from 'react'

const EMPTY = { name: '', phone: '', date: '', time: '', guests: '' }

function today() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

function validate(f, selectedTable, tables) {
  const e = {}
  const name = f.name.trim()
  if (!name) e.name = 'Enter the customer name.'
  else if (!/^[A-Za-z][A-Za-z .'-]{1,}$/.test(name))
    e.name = 'Use letters only, at least 2 characters.'

  const phone = f.phone.replace(/[\s-]/g, '')
  if (!phone) e.phone = 'Enter a phone number.'
  else if (!/^[6-9]\d{9}$/.test(phone))
    e.phone = 'Enter a 10-digit mobile number starting with 6, 7, 8 or 9.'

  if (!f.date) e.date = 'Select a date.'
  else if (f.date < today()) e.date = 'Choose today or a later date.'

  if (!f.time) e.time = 'Select a time.'
  else if (f.time < '11:00' || f.time > '22:30')
    e.time = 'We are open from 11:00 AM to 10:30 PM.'

  const table = tables.find((t) => t.id === selectedTable)
  const guests = Number(f.guests)
  if (!f.guests) e.guests = 'Enter the number of guests.'
  else if (!Number.isInteger(guests) || guests < 1)
    e.guests = 'Guests must be a whole number, 1 or more.'
  else if (table && guests > table.seats)
    e.guests = `Table ${table.id} seats ${table.seats}. Choose a bigger table or fewer guests.`
  else if (guests > 8) e.guests = 'For more than 8 guests, please call us.'

  if (!selectedTable) e.table = 'Select an available table.'
  return e
}

export default function BookingForm({ tables, selectedTable, onSelectTable, onConfirm }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  function submit(e) {
    e.preventDefault()
    const found = validate(form, selectedTable, tables)
    setErrors(found)
    if (Object.keys(found).length) return
    onConfirm({
      name: form.name.trim(),
      phone: form.phone.replace(/[\s-]/g, ''),
      date: form.date,
      time: form.time,
      guests: Number(form.guests),
      table: selectedTable,
    })
  }

  const open = tables.filter((t) => !t.booked)

  return (
    <form className="form" onSubmit={submit} noValidate>
      <h2>Your details</h2>

      <label>
        Customer name
        <input name="name" value={form.name} onChange={change} placeholder="e.g. Karthik R" />
        {errors.name && <small className="err">{errors.name}</small>}
      </label>

      <label>
        Phone number
        <input name="phone" inputMode="numeric" value={form.phone} onChange={change} placeholder="10-digit mobile number" />
        {errors.phone && <small className="err">{errors.phone}</small>}
      </label>

      <div className="row">
        <label>
          Date
          <input type="date" name="date" min={today()} value={form.date} onChange={change} />
          {errors.date && <small className="err">{errors.date}</small>}
        </label>
        <label>
          Time
          <input type="time" name="time" min="11:00" max="22:30" value={form.time} onChange={change} />
          {errors.time && <small className="err">{errors.time}</small>}
        </label>
      </div>

      <div className="row">
        <label>
          Number of guests
          <input type="number" name="guests" min="1" max="8" value={form.guests} onChange={change} />
          {errors.guests && <small className="err">{errors.guests}</small>}
        </label>
        <label>
          Table
          <select
            value={selectedTable ?? ''}
            onChange={(e) => onSelectTable(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">Select a table</option>
            {open.map((t) => (
              <option key={t.id} value={t.id}>
                Table {t.id} (seats {t.seats})
              </option>
            ))}
          </select>
          {errors.table && <small className="err">{errors.table}</small>}
        </label>
      </div>

      <button type="submit" className="btn">Confirm Booking</button>
    </form>
  )
}
