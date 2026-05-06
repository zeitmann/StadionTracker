<script>
    import VisitCard from '$lib/components/VisitCard.svelte';
    import ResultBadge from '$lib/components/ResultBadge.svelte';
    import { Building2, CalendarDays, Globe, Clock } from 'lucide-svelte';

    let { data } = $props();
</script>

<svelte:head>
    <title>Dashboard — Stadium Tracker</title>
</svelte:head>

<div class="page">
    <!-- Header -->
    <div class="dashboard-header">
        <h1>Stadium Tracker</h1>
        <p class="subtitle">Deine Stadion-Erlebnisse auf einen Blick</p>
    </div>

    <!-- Statistik-Karten -->
    <div class="stats-grid">
        <div class="stat-card">
            <span class="stat-label"><Building2 size={18} strokeWidth={1.75} /> Stadien</span>
            <span class="stat-value accent-green">{data.stats.uniqueStadiums}</span>
        </div>
        <div class="stat-card">
            <span class="stat-label"><CalendarDays size={18} strokeWidth={1.75} /> Besuche</span>
            <span class="stat-value">{data.stats.totalVisits}</span>
        </div>
        <div class="stat-card">
            <span class="stat-label"><Globe size={18} strokeWidth={1.75} /> Länder</span>
            <span class="stat-value">{data.stats.uniqueCountries}</span>
        </div>
    </div>

    <!-- Länder-Breakdown -->
    {#if data.countries.length > 0}
        <div class="card">
            <div class="card-title"><Globe size={18} strokeWidth={1.75} /> Länder-Breakdown</div>
            <div class="country-list">
                {#each data.countries as country}
                    <div class="country-row">
                        <span class="country-name">{country.name}</span>
                        <span class="country-stadiums">{country.stadiums} {country.stadiums === 1 ? 'Stadion' : 'Stadien'}</span>
                        <span class="country-badge">{country.visits} {country.visits === 1 ? 'Besuch' : 'Besuche'}</span>
                    </div>
                {/each}
            </div>
        </div>
    {/if}

    <!-- Letzte Besuche -->
    {#if data.recentVisits.length > 0}
        <div class="card">
            <div class="card-title"><Clock size={18} strokeWidth={1.75} /> Letzte Besuche</div>
            <div class="recent-list">
                {#each data.recentVisits as visit}
                    <VisitCard {visit} compact={true} />
                {/each}
            </div>
            <a href="/besuche" class="link-all">Alle Besuche anzeigen →</a>
        </div>
    {/if}
</div>

<style>
    .page {
        padding: 16px 16px 80px 16px;
        max-width: 720px;
        margin: 0 auto;
        background: #FAFAF8;
        min-height: 100vh;
    }

    /* Header */
    .dashboard-header {
        margin-bottom: 20px;
    }

    h1 {
        font-family: 'DM Sans', sans-serif;
        font-size: 26px;
        font-weight: 800;
        color: #1A1A18;
        letter-spacing: -0.03em;
        margin: 0;
    }

    .subtitle {
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        color: #6B6B63;
        margin: 4px 0 0 0;
    }

    /* Stats Grid */
    .stats-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-bottom: 12px;
    }

    .stat-card {
        background: #FFFFFF;
        border: 1px solid #EDEDEB;
        border-radius: 14px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .stat-label {
        display: flex;
        align-items: center;
        gap: 6px;
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        color: #6B6B63;
    }

    .stat-value {
        font-family: 'DM Sans', sans-serif;
        font-size: 26px;
        font-weight: 700;
        color: #1A1A18;
        letter-spacing: -0.02em;
    }

    /* Card */
    .card {
        background: #FFFFFF;
        border: 1px solid #EDEDEB;
        border-radius: 14px;
        padding: 16px;
        margin-bottom: 12px;
    }

    .card-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: 'DM Sans', sans-serif;
        font-size: 15px;
        font-weight: 700;
        color: #1A1A18;
        margin-bottom: 14px;
    }

    /* Country List */
    .country-list {
        display: flex;
        flex-direction: column;
    }

    .country-row {
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #F5F5F3;
        gap: 8px;
    }

    .country-row:last-child {
        border-bottom: none;
    }

    .country-name {
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: #1A1A18;
        flex: 1;
    }

    .country-stadiums {
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        color: #6B6B63;
    }

    .country-badge {
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        font-weight: 600;
        color: #1D9E75;
        background: rgba(29, 158, 117, 0.08);
        padding: 3px 8px;
        border-radius: 6px;
    }

    /* Recent Visits */
    .recent-list {
        display: flex;
        flex-direction: column;
    }

    /* Link */
    .link-all {
        display: block;
        text-align: center;
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        font-weight: 600;
        color: #1D9E75;
        text-decoration: none;
        margin-top: 12px;
        padding: 8px;
        border-radius: 8px;
        transition: background 0.2s;
    }

    .link-all:hover {
        background: rgba(29, 158, 117, 0.06);
    }

    /* Responsive */
    @media (min-width: 480px) {
        .stats-grid {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
</style>