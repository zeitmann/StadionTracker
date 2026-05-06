<script>
    import { MapPin } from 'lucide-svelte';

    let { club } = $props();
</script>

<div class="club-card">
    <div class="card-top">
        <div class="name-row">
            <h3>{club.name}</h3>
            <span class="short-badge">{club.shortName}</span>
        </div>
        <p class="stadium-name">
            <MapPin size={13} strokeWidth={1.75} />
            {club.stadiumName}
        </p>
    </div>

    <div class="stats-row">
        <span class="chip">{club.totalGames} Spiele</span>
        <div class="wdl-row">
            <span class="badge badge-w">{club.wins}W</span>
            <span class="badge badge-d">{club.draws}U</span>
            <span class="badge badge-l">{club.losses}N</span>
        </div>
    </div>

    <div class="winrate-row">
        <div class="bar-track">
            <div class="bar-fill" style="width: {club.winRate}%"></div>
        </div>
        <span class="winrate-pct" class:red={club.winRate < 50}>{club.winRate}%</span>
    </div>
</div>

<style>
    .club-card {
        background: #ffffff;
        border: 1px solid #ededeb;
        border-radius: 14px;
        padding: 14px 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    .club-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(26, 26, 24, 0.10);
    }

    .card-top {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .name-row {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .name-row h3 {
        font-family: 'DM Sans', sans-serif;
        font-size: 15px;
        font-weight: 700;
        color: #1a1a18;
        margin: 0;
    }

    .short-badge {
        font-family: 'DM Sans', sans-serif;
        font-size: 11px;
        font-weight: 600;
        color: #6b6b63;
        background: #f5f5f3;
        border-radius: 6px;
        padding: 2px 7px;
    }

    .stadium-name {
        display: flex;
        align-items: center;
        gap: 4px;
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        color: #6b6b63;
        margin: 0;
    }

    .stats-row {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
    }

    .chip {
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        font-weight: 500;
        color: #6b6b63;
        background: #f5f5f3;
        border-radius: 6px;
        padding: 3px 8px;
    }

    .wdl-row {
        display: flex;
        gap: 5px;
    }

    .badge {
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        font-weight: 600;
        border-radius: 6px;
        padding: 3px 8px;
    }

    .badge-w {
        background: #E1F5EE;
        color: #085041;
    }

    .badge-d {
        background: #F1EFE8;
        color: #444441;
    }

    .badge-l {
        background: #FCEBEB;
        color: #791F1F;
    }

    .winrate-row {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .bar-track {
        flex: 1;
        height: 6px;
        background: #ededeb;
        border-radius: 3px;
        overflow: hidden;
    }

    .bar-fill {
        height: 100%;
        background: #1d9e75;
        border-radius: 3px;
        transition: width 0.3s ease;
    }

    .winrate-pct {
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        font-weight: 600;
        color: #0f6e56;
        white-space: nowrap;
    }

    .winrate-pct.red {
        color: #e24b4a;
    }
</style>
