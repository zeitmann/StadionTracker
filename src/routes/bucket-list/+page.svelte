<script>
    import { enhance } from '$app/forms';
    import StadiumCard from '$lib/components/StadiumCard.svelte';

    let { data, form } = $props();
    let showForm = $state(false);
    let stadiumQuery = $state('');
    let stadiumSuggestions = $state([]);
    let selectedStadium = $state(null);
    let showSuggestions = $state(false);
    let toast = $state(null);
    let toastTimeout = $state(null);

    function showToast(message, type = 'success') {
        if (toastTimeout) clearTimeout(toastTimeout);
        toast = { message, type };
        toastTimeout = setTimeout(() => { toast = null; }, 3000);
    }

    async function searchStadiums() {
        if (stadiumQuery.length < 2) {
            stadiumSuggestions = [];
            showSuggestions = false;
            return;
        }
        const res = await fetch(`/api/stadiums?q=${encodeURIComponent(stadiumQuery)}`);
        stadiumSuggestions = await res.json();
        showSuggestions = true;
    }

    function selectStadium(stadium) {
        selectedStadium = stadium;
        stadiumQuery = stadium.name;
        showSuggestions = false;
        stadiumSuggestions = [];
    }

    $effect(() => {
        if (form?.added) {
            showForm = false;
            stadiumQuery = '';
            selectedStadium = null;
            showToast('Stadion zur Bucket List hinzugefügt!');
        }
        if (form?.visited) {
            showToast('Stadion als besucht markiert!');
        }
        if (form?.removed) {
            showToast('Stadion wurde entfernt.');
        }
        if (form?.error) {
            showToast(form.error, 'error');
        }
    });
</script>

<svelte:head>
    <title>Bucket List — Stadium Tracker</title>
</svelte:head>

<div class="page">
    {#if toast}
        <div class="toast toast-{toast.type}">
            {toast.message}
        </div>
    {/if}

    <div class="header">
        <h1>Bucket List</h1>
        <button class="btn-primary" onclick={() => showForm = !showForm}>
            {showForm ? '✕ Schliessen' : '+ Stadion hinzufügen'}
        </button>
    </div>

    {#if showForm}
        <div class="card form-card">
            <h2>Stadion hinzufügen</h2>

            <form method="POST" action="?/add" use:enhance={() => {
                return ({ update }) => { update(); };
            }}>
                <div class="form-group autocomplete-wrapper">
                    <label for="stadiumQuery">Stadion *</label>
                    <input
                        type="text"
                        id="stadiumQuery"
                        placeholder="z.B. Wembley Stadium, Allianz Arena..."
                        autocomplete="off"
                        value={stadiumQuery}
                        oninput={(e) => { stadiumQuery = e.target.value; searchStadiums(); }}
                        onfocus={() => { if (stadiumSuggestions.length > 0) showSuggestions = true; }}
                    />
                    {#if showSuggestions && stadiumSuggestions.length > 0}
                        <ul class="suggestions-list">
                            {#each stadiumSuggestions as s}
                                <li onclick={() => selectStadium(s)}>
                                    <span class="suggestion-name">{s.name}</span>
                                    <span class="suggestion-meta">{s.city}, {s.country}</span>
                                </li>
                            {/each}
                        </ul>
                    {/if}
                    {#if showSuggestions && stadiumSuggestions.length === 0 && stadiumQuery.length >= 2}
                        <div class="no-results">Kein Stadion gefunden – bitte Schreibweise prüfen</div>
                    {/if}
                    {#if selectedStadium}
                        <input type="hidden" name="stadiumId" value={selectedStadium.id} />
                    {/if}
                </div>

                {#if selectedStadium}
                    <div class="selected-info">
                        {selectedStadium.city}, {selectedStadium.country}
                    </div>
                {/if}

                <button
                    type="submit"
                    class="btn-primary btn-full"
                    disabled={!selectedStadium}
                >
                    Zur Bucket List hinzufügen
                </button>
            </form>
        </div>
    {/if}

    <div class="stadium-list">
        {#if data.stadien.length === 0}
            <div class="empty-state">
                <span class="empty-icon">⭐</span>
                <p>Noch keine Stadien auf der Bucket List.</p>
                <p class="empty-hint">Klicke auf «+ Stadion hinzufügen» um dein erstes Wunsch-Stadion festzuhalten!</p>
            </div>
        {:else}
            <p class="visit-count">{data.stadien.length} {data.stadien.length === 1 ? 'Stadion' : 'Stadien'} auf deiner Liste</p>
            {#each data.stadien as stadion}
                <StadiumCard {stadion} />
            {/each}
        {/if}
    </div>
</div>

<style>
    .page {
        padding: 16px 16px 80px 16px;
        max-width: 720px;
        margin: 0 auto;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    h1 {
        font-family: 'DM Sans', sans-serif;
        font-size: 26px;
        font-weight: 800;
        color: #1A1A18;
        letter-spacing: -0.03em;
        margin: 0;
    }

    h2 {
        font-family: 'DM Sans', sans-serif;
        font-size: 18px;
        font-weight: 700;
        color: #1A1A18;
        margin: 0 0 16px 0;
    }

    /* Button */
    .btn-primary {
        font-family: 'DM Sans', sans-serif;
        background: #D85A30;
        color: white;
        border: none;
        padding: 10px 18px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s ease, transform 0.15s ease;
    }

    .btn-primary:hover {
        background: #c04e28;
        transform: translateY(-1px);
    }

    .btn-danger {
        font-family: 'DM Sans', sans-serif;
        background: #e24b4a;
        color: white;
        border: none;
        padding: 10px 18px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s ease, transform 0.15s ease;
    }

    .btn-danger:hover {
        background: #c94040;
    }

    .btn-full {
        width: 100%;
        padding: 14px;
        font-size: 15px;
        margin-top: 8px;
    }

    /* Alerts */
    .alert {
        padding: 12px 16px;
        border-radius: 10px;
        font-size: 14px;
        margin-bottom: 16px;
        font-family: 'DM Sans', sans-serif;
    }

    .alert-success {
        background: rgba(29, 158, 117, 0.08);
        color: #1D9E75;
        border: 1px solid rgba(29, 158, 117, 0.2);
    }

    .alert-error {
        background: rgba(226, 75, 74, 0.08);
        color: #E24B4A;
        border: 1px solid rgba(226, 75, 74, 0.2);
    }

    /* Card & Form */
    .card {
        background: #FFFFFF;
        border: 1px solid #EDEDEB;
        border-radius: 14px;
        padding: 16px;
        margin-bottom: 16px;
    }

    .form-group {
        margin-bottom: 14px;
        flex: 1;
    }

    .form-group label {
        display: block;
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        font-weight: 600;
        color: #6B6B63;
        margin-bottom: 6px;
    }

    .form-group input {
        width: 100%;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        padding: 10px 12px;
        border: 1px solid #EDEDEB;
        border-radius: 10px;
        background: #FAFAF8;
        color: #1A1A18;
        outline: none;
        transition: border-color 0.2s;
        box-sizing: border-box;
    }

    .form-group input:focus {
        border-color: #D85A30;
    }

    .form-group input::placeholder {
        color: #A3A39B;
    }

    .form-row {
        display: flex;
        gap: 12px;
    }

    /* List */
    .visit-count {
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        color: #6B6B63;
        margin-bottom: 12px;
    }

    /* Empty State */
    .empty-state {
        text-align: center;
        padding: 48px 16px;
    }

    .empty-icon {
        font-size: 48px;
    }

    .empty-state p {
        font-family: 'DM Sans', sans-serif;
        font-size: 16px;
        font-weight: 600;
        color: #1A1A18;
        margin: 12px 0 4px;
    }

    .empty-hint {
        font-size: 14px !important;
        font-weight: 400 !important;
        color: #6B6B63 !important;
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

    /* Autocomplete */
    .autocomplete-wrapper {
        position: relative;
    }

    .suggestions-list {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #FFFFFF;
        border: 1px solid #EDEDEB;
        border-radius: 10px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        list-style: none;
        margin: 4px 0 0 0;
        padding: 4px 0;
        z-index: 100;
        max-height: 240px;
        overflow-y: auto;
    }

    .suggestions-list li {
        display: flex;
        flex-direction: column;
        padding: 10px 14px;
        cursor: pointer;
        transition: background 0.15s;
    }

    .suggestions-list li:hover {
        background: #F5F5F3;
    }

    .suggestion-name {
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: #1A1A18;
    }

    .suggestion-meta {
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        color: #888780;
        margin-top: 2px;
    }

    .no-results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #FFFFFF;
        border: 1px solid #EDEDEB;
        border-radius: 10px;
        padding: 12px 14px;
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        color: #E24B4A;
        margin-top: 4px;
        z-index: 100;
    }

    .selected-info {
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        color: #6B6B63;
        margin: -8px 0 14px 0;
    }

    button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        transform: none !important;
    }

    /* Responsive */
    @media (max-width: 480px) {
        .form-row {
            flex-direction: column;
            gap: 0;
        }
    }
</style>
