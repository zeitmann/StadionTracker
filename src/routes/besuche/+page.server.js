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

    return {
        visits: visits.map(v => ({
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
            isHome: v.isHome,
            date: v.date,
            notes: v.notes
        }))
    };
}

export const actions = {
    create: async({ request }) => {
        const formData = await request.formData();
        const stadiumId = formData.get('stadiumId');

        if (!stadiumId || !formData.get('homeTeam') || !formData.get('awayTeam') || !formData.get('date')) {
            return { success: false, error: 'Bitte fülle alle Pflichtfelder aus.' };
        }

        await db.collection('visits').insertOne({
            stadiumId: new ObjectId(stadiumId),
            homeTeam: formData.get('homeTeam'),
            awayTeam: formData.get('awayTeam'),
            scoreHome: parseInt(formData.get('scoreHome')) || 0,
            scoreAway: parseInt(formData.get('scoreAway')) || 0,
            result: formData.get('result'),
            isHome: formData.get('isHome') === 'true',
            date: formData.get('date'),
            notes: formData.get('notes') || '',
            createdAt: new Date()
        });

        return { success: true };
    },

    update: async({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const stadiumId = formData.get('stadiumId');

        if (!stadiumId || !formData.get('homeTeam') || !formData.get('awayTeam') || !formData.get('date')) {
            return { success: false, error: 'Bitte fülle alle Pflichtfelder aus.' };
        }

        try {
            await db.collection('visits').updateOne({ _id: new ObjectId(id) }, {
                $set: {
                    stadiumId: new ObjectId(stadiumId),
                    homeTeam: formData.get('homeTeam'),
                    awayTeam: formData.get('awayTeam'),
                    scoreHome: parseInt(formData.get('scoreHome')) || 0,
                    scoreAway: parseInt(formData.get('scoreAway')) || 0,
                    result: formData.get('result'),
                    isHome: formData.get('isHome') === 'true',
                    date: formData.get('date'),
                    notes: formData.get('notes') || ''
                }
            });
            return { success: true };
        } catch (e) {
            return { success: false, error: 'Fehler beim Speichern' };
        }
    },

    delete: async({ request }) => {
        const formData = await request.formData();
        await db.collection('visits').deleteOne({ _id: new ObjectId(formData.get('id')) });
        return { success: true, deleted: true };
    }
};