import db from '$lib/db.js';
import { ObjectId } from 'mongodb';

export async function load() {
    const entries = await db.collection('bucket_list').aggregate([
        { $sort: { addedAt: -1 } },
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

    return {
        stadien: entries.map(e => ({
            _id: e._id.toString(),
            stadiumId: e.stadiumId.toString(),
            name: e.stadium.Name, // ← Grossbuchstabe
            city: e.stadium.Town, // ← Grossbuchstabe
            country: e.stadium.Nation, // ← Grossbuchstabe
            capacity: e.stadium.Capacity && e.stadium.Capacity !== '???' ?
                parseInt(e.stadium.Capacity.replace(/\./g, '')) || null : null
        }))
    };
}

export const actions = {
    add: async({ request }) => {
        const data = await request.formData();
        const stadiumId = data.get('stadiumId');

        if (stadiumId) {
            // Aus JSON-Datensatz gewählt
            try {
                await db.collection('bucket_list').insertOne({
                    stadiumId: new ObjectId(stadiumId),
                    addedAt: new Date()
                });
            } catch (e) {
                return { success: false, error: 'Stadion bereits auf der Bucket List.' };
            }
        } else {
            // Manuell erfasst
            const stadium = await db.collection('stadiums').insertOne({
                name: data.get('name'),
                city: data.get('city'),
                country: data.get('country'),
                capacity: Number(data.get('capacity')) || null,
                lat: null,
                lng: null
            });
            try {
                await db.collection('bucket_list').insertOne({
                    stadiumId: stadium.insertedId,
                    addedAt: new Date()
                });
            } catch (e) {
                return { success: false, error: 'Fehler beim Hinzufügen.' };
            }
        }
        return { added: true };
    },

    markVisited: async({ request }) => {
        const data = await request.formData();
        await db.collection('bucket_list').deleteOne({ _id: new ObjectId(data.get('id')) });
        return { visited: true };
    },

    remove: async({ request }) => {
        const data = await request.formData();
        await db.collection('bucket_list').deleteOne({ _id: new ObjectId(data.get('id')) });
        return { removed: true };
    }
};