<script>
    import VisitCard from '$lib/components/VisitCard.svelte';
    import ResultBadge from '$lib/components/ResultBadge.svelte';
    import FavoriteClubCard from '$lib/components/FavoriteClubCard.svelte';
    import { Building2, CalendarDays, Globe, Clock, Heart, Plus } from 'lucide-svelte';
    import { enhance } from '$app/forms';

    let { data, form } = $props();

    let showForm = $state(false);
    let toast = $state(null);
    let toastTimeout = $state(null);

    function showToast(message, type = 'success') {
        if (toastTimeout) clearTimeout(toastTimeout);
        toast = { message, type };
        toastTimeout = setTimeout(() => { toast = null; }, 3000);
    }

    async function deleteClub(name) {
        const formData = new FormData();
        formData.append('name', name);
        await fetch('?/deleteFavoriteClub', { method: 'POST', body: formData });
        showToast('Lieblingsclub entfernt.');
        window.location.reload();
    }

    $effect(() => {
        if (form?.success) {
            showForm = false;
            showToast('Lieblingsclub hinzugefügt!');
        }
        if (form?.error) {
            showToast(form.error, 'error');
        }
    });
</script>

<svelte:head>
    <title>Dashboard — Stadium Tracker</title>
</svelte:head>

<div class="page">
    {#if toast}
        <div class="toast toast-{toast.type}">
            {toast.message}
        </div>
    {/if}

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

    <!-- Lieblingsclubs -->
    <div class="card">
        <div class="card-title">
            <Heart size={16} strokeWidth={1.75} color="#1D9E75" /> Lieblingsclubs
            <button class="btn-add-club" onclick={() => showForm = !showForm}>
                {#if showForm}
                    × Schliessen
                {:else}
                    <Plus size={13} strokeWidth={2} /> Lieblingsclub
                {/if}
            </button>
        </div>

        {#if showForm}
            <div class="form-card">
                {#if form?.error}
                    <div class="alert-error">{form.error}</div>
                {/if}
                <form method="POST" action="?/addFavoriteClub" use:enhance>
                    <div class="form-group">
                        <label for="club-name">Clubname *</label>
                        <input
                            type="text"
                            id="club-name"
                            name="name"
                            placeholder="z.B. Borussia Dortmund"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="club-shortName">Kürzel *</label>
                        <input
                            type="text"
                            id="club-shortName"
                            name="shortName"
                            placeholder="z.B. BVB"
                            maxlength="5"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="club-stadiumId">Heimstadion *</label>
                        <select id="club-stadiumId" name="stadiumId" required>
                            <option value="" disabled selected>Stadion auswählen…</option>
                            {#each data.stadiums as stadium}
                                <option value={stadium._id}>{stadium.Name}, {stadium.Town}</option>
                            {/each}
                        </select>
                    </div>
                    <button type="submit" class="btn-submit">Club hinzufügen</button>
                </form>
            </div>
        {/if}

        {#if data.favoriteClubs.length > 0}
            <div class="club-grid">
                {#each data.favoriteClubs as club}
                    <FavoriteClubCard {club} onDelete={deleteClub} />
                {/each}
            </div>
        {:else}
            <p class="empty-state">Noch keine Lieblingsclubs hinzugefügt.</p>
        {/if}
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

    .btn-add-club {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-left: auto;
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        font-weight: 600;
        color: #1d9e75;
        background: none;
        border: 1px solid #1d9e75;
        border-radius: 8px;
        padding: 4px 10px;
        cursor: pointer;
        transition: background 0.15s;
    }

    .btn-add-club:hover {
        background: rgba(29, 158, 117, 0.06);
    }

    /* Inline add-club form */
    .form-card {
        background: #ffffff;
        border: 1px solid #ededeb;
        border-radius: 14px;
        padding: 16px;
        margin-bottom: 12px;
    }

    .form-group {
        margin-bottom: 12px;
    }

    .form-group label {
        display: block;
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        font-weight: 600;
        color: #6b6b63;
        margin-bottom: 4px;
    }

    .form-group input,
    .form-group select {
        width: 100%;
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        padding: 8px 10px;
        border: 1px solid #ededeb;
        border-radius: 8px;
        background: #fafaf8;
        color: #1a1a18;
        outline: none;
        transition: border-color 0.2s;
        box-sizing: border-box;
    }

    .form-group input:focus,
    .form-group select:focus {
        border-color: #1d9e75;
    }

    .btn-submit {
        width: 100%;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 700;
        background: #1d9e75;
        color: #ffffff;
        border: none;
        border-radius: 10px;
        padding: 12px;
        cursor: pointer;
        transition: background 0.2s;
    }

    .btn-submit:hover {
        background: #178a65;
    }

    .alert-error {
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        color: #791f1f;
        background: #fcebeb;
        border-radius: 8px;
        padding: 10px 12px;
        margin-bottom: 12px;
    }

    /* Club Grid */
    .club-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }

    .empty-state {
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        color: #a3a39b;
        margin: 0;
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

    /* Toast */
    .toast {
        position: fixed;
        bottom: 88px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 20px;
        border-radius: 12px;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 600;
        z-index: 200;
        white-space: nowrap;
        box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        animation: slideUp 0.2s ease;
    }

    .toast-success { background: #1D9E75; color: white; }
    .toast-error { background: #E24B4A; color: white; }

    @keyframes slideUp {
        from { opacity: 0; transform: translateX(-50%) translateY(8px); }
        to   { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
</style>