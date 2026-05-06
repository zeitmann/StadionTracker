import db from '$lib/db.js';
import { ObjectId } from 'mongodb';

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

    const favoriteClubs = await db.collection('favorite_clubs').aggregate([{
            $lookup: {
                from: 'visits',
                let: { clubName: '$name' },
                pipeline: [{
                    $match: {
                        $expr: {
                            $or: [
                                { $eq: [{ $toLower: '$homeTeam' }, { $toLower: '$$clubName' }] },
                                { $eq: [{ $toLower: '$awayTeam' }, { $toLower: '$$clubName' }] }
                            ]
                        }
                    }
                }],
                as: 'clubVisits'
            }
        },
        {
            $lookup: {
                from: 'stadiums',
                localField: 'stadiumId',
                foreignField: '_id',
                as: 'stadium'
            }
        },
        { $unwind: '$stadium' },
        {
            $addFields: {
                totalGames: { $size: '$clubVisits' },
                wins: {
                    $size: { $filter: { input: '$clubVisits', as: 'v', cond: { $eq: ['$$v.result', 'W'] } } }
                },
                draws: {
                    $size: { $filter: { input: '$clubVisits', as: 'v', cond: { $eq: ['$$v.result', 'D'] } } }
                },
                losses: {
                    $size: { $filter: { input: '$clubVisits', as: 'v', cond: { $eq: ['$$v.result', 'L'] } } }
                }
            }
        },
        {
            $addFields: {
                winRate: {
                    $cond: {
                        if: { $eq: ['$totalGames', 0] },
                        then: 0,
                        else: {
                            $round: [{ $multiply: [{ $divide: ['$wins', '$totalGames'] }, 100] }, 1]
                        }
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                name: 1,
                shortName: 1,
                stadiumName: '$stadium.Name',
                totalGames: 1,
                wins: 1,
                draws: 1,
                losses: 1,
                winRate: 1
            }
        }
    ]).toArray();

    const stadiumDocs = await db.collection('stadiums')
        .find({}, { projection: { Name: 1, Town: 1, Nation: 1 } })
        .sort({ Name: 1 })
        .toArray();

    const stadiums = stadiumDocs.map(s => ({
        _id: s._id.toString(),
        Name: s.Name,
        Town: s.Town,
        Nation: s.Nation
    }));

    return {
        stats: { totalVisits, uniqueStadiums, uniqueCountries },
        countries,
        recentVisits,
        favoriteClubs,
        stadiums
    };
}

export const actions = {
    addFavoriteClub: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name')?.trim();
        const shortName = data.get('shortName')?.trim();
        const stadiumId = data.get('stadiumId');

        if (!name || !shortName || !stadiumId) {
            return { success: false, error: 'Bitte fülle alle Pflichtfelder aus.' };
        }

        await db.collection('favorite_clubs').insertOne({
            name,
            shortName,
            stadiumId: new ObjectId(stadiumId),
            addedAt: new Date()
        });

        return { success: true };
    }
};