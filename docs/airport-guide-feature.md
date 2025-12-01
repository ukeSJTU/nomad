# Airport Guide Feature Documentation

## Overview
The Airport Guide feature provides users with information about popular airports, including domestic and international listings, detailed airport introductions, traffic guides, phone numbers, and boarding processes.

## Architecture

### Frontend
- **Entry Point**: `/flights/more` -> Airport Guide Card -> `/flights/guide`
- **Pages**:
    - `app/(frontend)/(without-sidebar)/flights/guide/page.tsx`: Homepage listing popular airports.
    - `app/(frontend)/(without-sidebar)/flights/guide/[slug]/page.tsx`: Detail page for specific airports (e.g., `/flights/guide/airport-BJS`).
    - `app/(frontend)/(without-sidebar)/flights/guide/process/page.tsx`: Static boarding process page.

### Backend / Data Access
- **Database**: Uses `cities` table in Postgres.
- **Server Actions**: Data is fetched via server actions in `app/_actions/airport-guide.ts` to maintain architectural boundaries.
    - `getPopularAirportsAction`: Fetches cities with `isPopular=true`.
    - `getCityByIataCodeAction`: Fetches city details by IATA code.
- **Domain Service**: Core logic resides in `src/domains/flights/city.repository.ts`.

## Features
1.  **Airport List**: Categorized into Domestic and International/HK/Macau/Taiwan.
2.  **Airport Details**:
    - **Home Tab**: Brief intro, Airlines Discount Tickets (Mock), Hot Timetable (Mock).
    - **Intro Tab**: Detailed airport introduction.
    - **Traffic Tab**: Bus/Subway/Taxi information.
    - **Phone Tab**: Important contact numbers.
3.  **Sidebar Widgets**:
    - **Boarding Process**: Link to visual guide.
    - **Weather**: Mock weather widget for Beijing.

## Testing
- **Unit/Integration**: Tests cover the `city.repository` methods.
- **E2E**: Navigation flow from Flights Home -> More Services -> Airport Guide -> Detail Page.

## Future Improvements
- Integrate real-time weather API.
- Expand content for more airports (currently Beijing has rich data, others are generic).
- Implement dynamic "Airlines Discount Tickets" and "Hot Timetable" based on real flight data.
