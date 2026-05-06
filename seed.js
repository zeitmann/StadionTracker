import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

async function findStadium(db, name, town) {
    let stadium = await db.collection('stadiums').findOne({ Name: name });
    if (!stadium && town) {
        stadium = await db.collection('stadiums').findOne({ Town: town });
    }
    if (!stadium) throw new Error(`Stadion nicht gefunden: ${name} / ${town}`);
    return stadium._id;
}

async function seed() {
    await client.connect();
    const db = client.db('stadiontracker');

    // visits + bucket_list leeren
    await db.collection('visits').deleteMany({});
    await db.collection('bucket_list').deleteMany({});
    console.log('✓ visits + bucket_list geleert');

    // Stadion-IDs aus der importierten Collection holen
    const sidSignalIduna = await findStadium(db, 'Signal Iduna Park', 'Dortmund');
    const sidAllianz = await findStadium(db, 'Allianz Arena', 'München');
    const sidLetzigrund = await findStadium(db, 'Letzigrund', 'Zürich');
    const sidStJakob = await findStadium(db, 'St. Jakob-Park', 'Basel');
    const sidBern = await findStadium(db, 'Stade de Suisse', 'Bern');
    const sidVelodrome = await findStadium(db, 'Vélodrome', 'Marseille');
    const sidCampNou = await findStadium(db, 'Camp Nou', 'Barcelona');
    const sidWembley = await findStadium(db, 'Wembley Stadium', 'London');
    const sidSanSiro = await findStadium(db, 'Giuseppe Meazza', 'Milano');
    const sidBernabeu = await findStadium(db, 'Santiago Bernabéu', 'Madrid');
    console.log('✓ Stadion-IDs gefunden');

    // Visits einfügen
    await db.collection('visits').insertMany([
        { stadiumId: sidSignalIduna, homeTeam: 'Borussia Dortmund', awayTeam: 'Bayern München', scoreHome: 2, scoreAway: 1, result: 'W', isHome: true, date: '2025-11-23', notes: 'Unglaubliche Atmosphäre auf der Südtribüne! 🟡⚫', createdAt: new Date() },
        { stadiumId: sidAllianz, homeTeam: 'Bayern München', awayTeam: 'Borussia Dortmund', scoreHome: 3, scoreAway: 0, result: 'L', isHome: false, date: '2025-09-14', notes: 'Stadion beeindruckend, aber leider verloren.', createdAt: new Date() },
        { stadiumId: sidLetzigrund, homeTeam: 'FC Zürich', awayTeam: 'FC Basel', scoreHome: 1, scoreAway: 1, result: 'D', isHome: true, date: '2025-08-03', notes: 'Derby mit Freunden', createdAt: new Date() },
        { stadiumId: sidStJakob, homeTeam: 'FC Basel', awayTeam: 'FC Zürich', scoreHome: 0, scoreAway: 2, result: 'W', isHome: false, date: '2025-05-18', notes: 'Auswärtssieg! 🎉', createdAt: new Date() },
        { stadiumId: sidBern, homeTeam: 'BSC Young Boys', awayTeam: 'FC Zürich', scoreHome: 2, scoreAway: 2, result: 'D', isHome: false, date: '2025-04-12', notes: 'Spannendes Unentschieden in Bern', createdAt: new Date() },
        { stadiumId: sidSignalIduna, homeTeam: 'Borussia Dortmund', awayTeam: 'Eintracht Frankfurt', scoreHome: 4, scoreAway: 0, result: 'W', isHome: true, date: '2024-12-07', notes: 'Kantersieg zum Jahresende!', createdAt: new Date() },
        { stadiumId: sidVelodrome, homeTeam: 'Olympique Marseille', awayTeam: 'PSG', scoreHome: 0, scoreAway: 1, result: 'L', isHome: false, date: '2024-10-22', notes: 'Le Classique im Vélodrome — unglaublich laut!', createdAt: new Date() },
        { stadiumId: sidLetzigrund, homeTeam: 'FC Zürich', awayTeam: 'Servette', scoreHome: 3, scoreAway: 1, result: 'W', isHome: true, date: '2024-07-20', notes: 'Saisonstart, gute Stimmung', createdAt: new Date() },
    ]);
    console.log('✓ Visits eingefügt');

    // Bucket List einfügen
    await db.collection('bucket_list').insertMany([
        { stadiumId: sidCampNou, addedAt: new Date() },
        { stadiumId: sidWembley, addedAt: new Date() },
        { stadiumId: sidSanSiro, addedAt: new Date() },
        { stadiumId: sidBernabeu, addedAt: new Date() },
    ]);
    console.log('✓ Bucket List eingefügt');

    // Unique Index auf bucket_list.stadiumId
    await db.collection('bucket_list').createIndex({ stadiumId: 1 }, { unique: true });
    console.log('✓ Unique Index erstellt');

    await client.close();
    console.log('✅ Seed abgeschlossen!');
}

seed().catch(console.error);