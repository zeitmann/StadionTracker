import db from '$lib/db.js';

export async function GET({ url }) {
    const q = url.searchParams.get('q') || '';
    if (q.length < 2) return Response.json([]);

    const stadiums = await db.collection('stadiums').aggregate([
        { $match: { Name: { $regex: q, $options: 'i' } } },
        { $group: {
            _id: { name: '$Name', city: '$Town' },
            id: { $first: { $toString: '$_id' } },
            country: { $first: '$Nation' }
        }},
        { $limit: 8 }
    ]).toArray();

    return Response.json(stadiums.map(s => ({
        id: s.id,
        name: s._id.name,
        city: s._id.city,
        country: s.country
    })));
}
