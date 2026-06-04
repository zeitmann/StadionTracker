<script>
    import VisitCard from '$lib/components/VisitCard.svelte';

    let { data, form } = $props();

    let showForm = $state(false);
    let stadiumQuery = $state('');
    let stadiumSuggestions = $state([]);
    let selectedStadium = $state(null);
    let showSuggestions = $state(false);

    $effect(() => {
        if (form?.success && !form?.deleted) {
            showForm = false;
        }
    });

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

    async function handleSaveVisit(visitData) {
        const formData = new FormData();
        formData.append('id', visitData.id);
        formData.append('stadium', visitData.stadium);
        formData.append('city', visitData.city);
        formData.append('country', visitData.country);
        formData.append('homeTeam', visitData.homeTeam);
        formData.append('awayTeam', visitData.awayTeam);
        formData.append('scoreHome', visitData.scoreHome);
        formData.append('scoreAway', visitData.scoreAway);
        formData.append('date', visitData.date);
        formData.append('notes', visitData.notes);

        const response = await fetch('?/update', {
            method: 'POST',
            body: formData
        });

        return response.ok;
    }
</script>

<svelte:head>
    <title>Besuche — Stadium Tracker</title>
</svelte:head>

<div class="page">
    <div class="header">
        <h1>Besuche</h1>
        <button class="btn-primary" onclick={() => showForm = !showForm}>
            {showForm ? '✕ Schliessen' : '+ Neuer Besuch'}
        </button>
    </div>

    <!-- Erfolgsmeldung -->
    {#if form?.success && !form?.deleted}
        <div class="alert alert-success">
            ✅ Besuch erfolgreich gespeichert!
        </div>
    {/if}

    {#if form?.deleted}
        <div class="alert alert-success">
            🗑️ Besuch wurde gelöscht.
        </div>
    {/if}

    <!-- Formular -->
    {#if showForm}
        <div class="card form-card">
            <h2>Neuen Besuch erfassen</h2>

            {#if form?.error}
                <div class="alert alert-error">
                    ⚠️ {form.error}
                </div>
            {/if}

            <form method="POST" action="?/create">
                <div class="form-group autocomplete-wrapper">
                    <label for="stadiumQuery">Stadion *</label>
                    <input
                        type="text"
                        id="stadiumQuery"
                        placeholder="z.B. Letzigrund, Allianz Arena..."
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

                <div class="form-row">
                    <div class="form-group">
                        <label for="homeTeam">Heimteam *</label>
                        <input type="text" id="homeTeam" name="homeTeam" placeholder="z.B. BVB" required
                            value={form?.values?.homeTeam || ''} />
                    </div>
                    <div class="form-group">
                        <label for="awayTeam">Auswärtsteam *</label>
                        <input type="text" id="awayTeam" name="awayTeam" placeholder="z.B. Bayern" required
                            value={form?.values?.awayTeam || ''} />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="scoreHome">Tore Heim *</label>
                        <input type="number" id="scoreHome" name="scoreHome" min="0" placeholder="0" required
                            value={form?.values?.scoreHome || ''} />
                    </div>
                    <div class="form-group">
                        <label for="scoreAway">Tore Auswärts *</label>
                        <input type="number" id="scoreAway" name="scoreAway" min="0" placeholder="0" required
                            value={form?.values?.scoreAway || ''} />
                    </div>
                    <div class="form-group">
                        <label for="date">Datum *</label>
                        <input type="date" id="date" name="date" required
                            value={form?.values?.date || ''} />
                    </div>
                </div>

                <div class="form-group">
                    <label for="notes">Notizen (optional)</label>
                    <textarea id="notes" name="notes" placeholder="z.B. Tolle Atmosphäre!"
                        rows="3">{form?.values?.notes || ''}</textarea>
                </div>

                <button type="submit" class="btn-primary btn-full">Besuch speichern</button>
            </form>
        </div>
    {/if}

    <!-- Besuchsliste -->
    <div class="visits-list">
        {#if data.visits.length === 0}
            <div class="empty-state">
                <span class="empty-icon">🏟️</span>
                <p>Noch keine Besuche erfasst.</p>
                <p class="empty-hint">Klicke auf «+ Neuer Besuch» um deinen ersten Stadionbesuch festzuhalten!</p>
            </div>
        {:else}
            <p class="visit-count">{data.visits.length} {data.visits.length === 1 ? 'Besuch' : 'Besuche'}</p>
            {#each data.visits as visit}
                <VisitCard {visit} showDelete={true} onSave={handleSaveVisit} />
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

    /* Buttons */
    .btn-primary {
        font-family: 'DM Sans', sans-serif;
        background: #1D9E75;
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
        background: #18896a;
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

    .form-group input,
    .form-group textarea {
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

    .form-group input:focus,
    .form-group textarea:focus {
        border-color: #1D9E75;
    }

    .form-group input::placeholder,
    .form-group textarea::placeholder {
        color: #A3A39B;
    }

    .form-row {
        display: flex;
        gap: 12px;
    }

    /* Visit List */
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

    /* Responsive */
    @media (max-width: 480px) {
        .form-row {
            flex-direction: column;
            gap: 0;
        }
    }
</style>