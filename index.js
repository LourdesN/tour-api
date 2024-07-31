const express = require('express');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors()); // This will enable CORS for all routes

// Sample data for the search bar to use
const tours = [
    {
        id: 1,
        name: 'Tour A',
        location: 'Masaai Mara',
        start_date: '2024-08-01',
        end_date: '2030-12-31',
        visit: 'Game park ride, the big 5, the migration',
        description: 'Corperate travel and all other groups'
    },
    {
        id: 2,
        name: 'Tour B',
        location: 'Wild Waters',
        start_date: '2024-08-01',
        end_date: '2030-12-31',
        visit: 'Water slides and swimming pool',
        description: 'For friends and even family'
    },
    {
        id: 3,
        name: 'Tour C',
        location: 'Diani',
        start_date: '2024-08-01',
        end_date: '2030-12-31',
        visit: 'Ukunda Diani Beach, Swim with the Dolphins, ferry Ride',
        description: 'Affordable and best for Honeymoon and even friends'
    },
    {
        id: 4,
        name: 'Tour D',
        location: 'RiftValley',
        start_date: '2024-08-01',
        end_date: '2030-12-31',
        visit: 'View Point, Lake Naivasha, Bogoria Hot springs, Flamingos and Hippos at Lake Nakuru, Lord Egerton Castle',
        description: 'Affordable and best for Family and group travel'
    },
    {
        id: 5,
        name: 'Tour D',
        location: 'Mt Kenya',
        start_date: '2024-08-01',
        end_date: '2030-12-31',
        visit: 'Hiking, Camping, the peaks of Mt Kenya and the snow.',
        description: 'Affordable and best for cooperate travel and can act as team building project'
    },
    {
        id: 6,
        name: 'Tour E',
        location: 'Mombasa',
        start_date: '2024-08-01',
        end_date: '2030-12-31',
        visit: 'Pirates beach, Ferry Ride, Mamba village, Fort Jesus, Haller park',
        description: 'Affordable and best for family holiday, Friends Vacation and even group travel.'
    },
    {
        id: 7,
        name: 'Tour F',
        location: 'Nairobi',
        start_date: '2024-08-01',
        end_date: '2030-12-31',
        visit: 'Giraffe center, Mamba village, Natonal Meuseum, Nairobi national Park, Ngong Hills, Ololua Nature Trail, Nairobi Railway Meuseum',
        description: 'Affordable and suitable for individual and even friends travel on a budget.'
    }
];

// Endpoint to search tours
app.get('/api/tours', (req, res) => {
    const { location, start_date, end_date } = req.query;
  

    // Check if all required query parameters are provided and if not kuna hiyo error message
    if (!location || !start_date || !end_date) {
        return res.status(400).json({ error: 'Location, start_date, and end_date are required parameters' });
    }

    const filteredTours = tours.filter(tour => {
        // Check if the entered date range overlaps with the tour date range
        const enteredStartDate = new Date(start_date);
        const enteredEndDate = new Date(end_date);
        const tourStartDate = new Date(tour.start_date);
        const tourEndDate = new Date(tour.end_date);

        const isLocationMatch = tour.location.includes(location);
        const isDateOverlap = (enteredStartDate <= tourEndDate) && (enteredEndDate >= tourStartDate);

        return isLocationMatch && isDateOverlap;
    });
    

    res.json(filteredTours);
});
// in production we can't always rely on port 3000 so hence the code below
//port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});