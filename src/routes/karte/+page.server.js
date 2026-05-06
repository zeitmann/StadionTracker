import db from '$lib/db.js';

export async function load() {
    const [visitedRaw, bucketRaw] = await Promise.all([
        db.collection('visits').aggregate([
            {
                $group: {
                    _id: '$stadiumId',
                    visitCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'stadiums',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'stadium'
                }
            },
            { $unwind: '$stadium' }
        ]).toArray(),

        db.collection('bucket_list').aggregate([
            {
                $lookup: {
                    from: 'stadiums',
                    localField: 'stadiumId',
                    foreignField: '_id',
                    as: 'stadium'
                }
            },
            { $unwind: '$stadium' }
        ]).toArray()
    ]);

    return {
        visitedStadiums: visitedRaw.map(v => ({
            _id: v._id.toString(),
            stadiumName: v.stadium.Name,
            city: v.stadium.Town,
            country: v.stadium.Nation,
            lat: v.stadium.Latitude ? parseFloat(v.stadium.Latitude) : null,
            lng: v.stadium.Longitude ? parseFloat(v.stadium.Longitude) : null,
            visitCount: v.visitCount
        })),
        bucketListStadiums: bucketRaw.map(b => ({
            _id: b._id.toString(),
            stadiumName: b.stadium.Name,
            city: b.stadium.Town,
            country: b.stadium.Nation,
            lat: b.stadium.Latitude ? parseFloat(b.stadium.Latitude) : null,
            lng: b.stadium.Longitude ? parseFloat(b.stadium.Longitude) : null
        }))
    };
}
