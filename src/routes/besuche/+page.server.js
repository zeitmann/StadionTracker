import db from '$lib/db.js';
import { ObjectId } from 'mongodb';

export async function load() {
    const visits = await db.collection('visits')
        .find()
        .sort({ date: -1 })
        .toArray();

    return {
        visits: visits.map(visit => ({
            ...visit,
            _id: visit._id.toString()
        }))
    };
}

export const actions = {
    create: async ({ request }) => {
        const formData = await request.formData();

        const visit = {
            stadium: formData.get('stadium'),
            city: formData.get('city'),
            country: formData.get('country'),
            homeTeam: formData.get('homeTeam'),
            awayTeam: formData.get('awayTeam'),
            scoreHome: parseInt(formData.get('scoreHome')) || 0,
            scoreAway: parseInt(formData.get('scoreAway')) || 0,
            date: formData.get('date'),
            notes: formData.get('notes') || '',
            createdAt: new Date()
        };

        // Einfache Validierung
        if (!visit.stadium || !visit.city || !visit.country || !visit.homeTeam || !visit.awayTeam || !visit.date) {
            return {
                success: false,
                error: 'Bitte fülle alle Pflichtfelder aus.',
                values: visit
            };
        }

        await db.collection('visits').insertOne(visit);

        return { success: true };
    },

    update: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');

        const visit = {
            stadium: formData.get('stadium'),
            city: formData.get('city'),
            country: formData.get('country'),
            homeTeam: formData.get('homeTeam'),
            awayTeam: formData.get('awayTeam'),
            scoreHome: parseInt(formData.get('scoreHome')) || 0,
            scoreAway: parseInt(formData.get('scoreAway')) || 0,
            date: formData.get('date'),
            notes: formData.get('notes') || ''
        };

        // Einfache Validierung
        if (!visit.stadium || !visit.city || !visit.country || !visit.homeTeam || !visit.awayTeam || !visit.date) {
            return {
                success: false,
                error: 'Bitte fülle alle Pflichtfelder aus.'
            };
        }

        try {
            await db.collection('visits').updateOne(
                { _id: new ObjectId(id) },
                { $set: visit }
            );
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Fehler beim Speichern' };
        }
    },

    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');

        await db.collection('visits').deleteOne({ _id: new ObjectId(id) });

        return { success: true, deleted: true };
    }
};