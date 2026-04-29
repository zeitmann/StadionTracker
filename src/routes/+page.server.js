import db from '$lib/db.js';

export async function load() {
    const visits = await db.collection('visits')
        .find()
        .sort({ date: -1 })
        .toArray();

    const totalVisits = visits.length;
    const uniqueStadiums = new Set(visits.map(v => v.stadium)).size;
    const uniqueCountries = new Set(visits.map(v => v.country)).size;

    // Win/Draw/Loss Statistik
    let wins = 0, draws = 0, losses = 0;
    visits.forEach(v => {
        if (v.scoreHome > v.scoreAway) wins++;
        else if (v.scoreHome < v.scoreAway) losses++;
        else draws++;
    });
    const winRate = totalVisits > 0 ? Math.round((wins / totalVisits) * 100) : 0;

    // Länder-Breakdown
    const countryMap = {};
    visits.forEach(v => {
        if (!countryMap[v.country]) {
            countryMap[v.country] = { stadiums: new Set(), visits: 0 };
        }
        countryMap[v.country].stadiums.add(v.stadium);
        countryMap[v.country].visits++;
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
        ...v,
        _id: v._id.toString()
    }));

    return {
        stats: {
            totalVisits,
            uniqueStadiums,
            uniqueCountries,
            wins,
            draws,
            losses,
            winRate
        },
        countries,
        recentVisits
    };
}