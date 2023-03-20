# Aircraft Scheduling

## Tech Stack

- Vite
- Vitest
- Testing Library
- React
- Typescript
- Tailwind
- Ant design

---

## Assumptions

- The rotation page is initially loaded with the first aircraft already selected (simplification).
  The flights are sorted by departure time.
- The user can try to add a flight at the beginning or end of the rotation (departure time ordered) by clicking on it.
- The user can click on any flight, and it will be removed, along with all connected flights, from the rotation.

---

## Next Steps

- Filter available flights based on already-existing flights in the rotation (based on time and location).
- Improve error message with details of why the flight was not added to the rotation
- Create an auto-fill button that can get all possible flights based on the first pick (utilizing the canGroup function over sorted time flights).
- Create more end-to-end tests
- Responsiveness

- Add and run Axe-Core for accessibility feedback.

---

## Scripts

Install the dependencies

```bash
  npm install
```

Run in dev (localhost)

```bash
  npm run dev
```

Run tests

```bash
  npm run test
```

Run tests coverage

```bash
  npm run coverage
```
