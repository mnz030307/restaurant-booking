# Vaigai Table – Restaurant Table Booking (Problem No. 22)

Frontend-only ReactJS app (Vite). Pages: Home, Book a Table, Booking Confirmation.

## Run
    npm install
    npm run dev      # open the URL shown (usually http://localhost:5173)
    npm run build    # production build

## React concepts used
- useState: page, tables, selected table, form data, errors, booking details
- useEffect: saves table status to localStorage; scrolls to top on page change
- Components: Navbar, Home, TableCard, BookingForm, Confirmation
- JSX, ES6, CSS3 (responsive)

## Validation
Name (letters, 2+), phone (10 digits, starts 6-9), date (today or later),
time (11:00-22:30), guests (1-8 and within table seats), table selected.
