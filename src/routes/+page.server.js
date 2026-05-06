import db from '$lib/db.js';

export async function load() {
    const visits = await db.collection('visits').aggregate([
        { $sort: { date: -1 } },
        {
            $lookup: {
                from: 'stadiums',
                localField: 'stadiumId',
                foreignField: '_id',
                as: 'stadium'
            }
        },
        { $unwind: '$stadium' }
    ]).toArray();

    const totalVisits = visits.length;
    const uniqueStadiums = new Set(visits.map(v => v.stadiumId.toString())).size;
    const uniqueCountries = new Set(visits.map(v => v.stadium.Nation)).size;

    // Länder-Breakdown
    const countryMap = {};
    visits.forEach(v => {
        const country = v.stadium.Nation;
        const stadiumName = v.stadium.Name;
        if (!countryMap[country]) {
            countryMap[country] = { stadiums: new Set(), visits: 0 };
        }
        countryMap[country].stadiums.add(stadiumName);
        countryMap[country].visits++;
    });
    const countries = Object.entries(countryMap)
        .map(([name, data]) => ({
            name,
            stadiums: data.stadiums.size,
            visits: data.visits
        }))
        .sort((a, b) => b.visits - a.visits);

    // Letzte 5 Besuche
    const recentVisits = visits.slice(0, 5).map(v => ({
        _id: v._id.toString(),
        stadiumId: v.stadiumId.toString(),
        stadiumName: v.stadium.Name,
        city: v.stadium.Town,
        country: v.stadium.Nation,
        homeTeam: v.homeTeam,
        awayTeam: v.awayTeam,
        scoreHome: v.scoreHome,
        scoreAway: v.scoreAway,
        result: v.result,
        date: v.date,
        notes: v.notes
    }));

    return {
        stats: { totalVisits, uniqueStadiums, uniqueCountries },
        countries,
        recentVisits
    };
}