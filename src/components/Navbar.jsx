export default function Navbar({ page, onNavigate }) {
  return (
    <header className="navbar">
      <button className="brand" onClick={() => onNavigate('home')}>
        Vaigai Table
      </button>
      <nav>
        <button
          className={page === 'home' ? 'active' : ''}
          onClick={() => onNavigate('home')}
        >
          Home
        </button>
        <button
          className={page === 'book' ? 'active' : ''}
          onClick={() => onNavigate('book')}
        >
          Book a Table
        </button>
      </nav>
    </header>
  )
}
