export default function TableCard({ table, selected, onSelect }) {
  const { id, seats, booked } = table
  return (
    <button
      type="button"
      className={`table-card ${booked ? 'booked' : 'available'} ${selected ? 'selected' : ''}`}
      disabled={booked}
      aria-pressed={selected}
      onClick={() => onSelect(id)}
    >
      <strong>Table {id}</strong>
      <span className="seats">Seats {seats}</span>
      <span className="status">
        {booked ? 'Booked' : selected ? 'Selected' : 'Available'}
      </span>
    </button>
  )
}
