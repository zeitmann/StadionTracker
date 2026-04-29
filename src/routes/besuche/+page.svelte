<script>
    let { data, form } = $props();

    let showForm = $state(false);

    $effect(() => {
        if (form?.success && !form?.deleted) {
            showForm = false;
        }
    });

    function getResultBadge(scoreHome, scoreAway) {
        if (scoreHome > scoreAway) return { label: 'W', class: 'badge-win' };
        if (scoreHome < scoreAway) return { label: 'L', class: 'badge-loss' };
        return { label: 'D', class: 'badge-draw' };
    }

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('de-CH', { day: 'numeric', month: 'short', year: 'numeric' });
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
                <div class="form-group">
                    <label for="stadium">Stadion *</label>
                    <input type="text" id="stadium" name="stadium" placeholder="z.B. Signal Iduna Park" required
                        value={form?.values?.stadium || ''} />
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="city">Stadt *</label>
                        <input type="text" id="city" name="city" placeholder="z.B. Dortmund" required
                            value={form?.values?.city || ''} />
                    </div>
                    <div class="form-group">
                        <label for="country">Land *</label>
                        <input type="text" id="country" name="country" placeholder="z.B. Deutschland" required
                            value={form?.values?.country || ''} />
                    </div>
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
                {@const result = getResultBadge(visit.scoreHome, visit.scoreAway)}
                <div class="visit-card">
                    <div class="visit-top">
                        <div class="visit-info">
                            <h3>{visit.stadium}</h3>
                            <p class="visit-location">{visit.city}, {visit.country}</p>
                        </div>
                        <span class="badge {result.class}">{result.label}</span>
                    </div>
                    <div class="visit-details">
                        <span class="visit-match">
                            {visit.homeTeam} {visit.scoreHome} : {visit.scoreAway} {visit.awayTeam}
                        </span>
                        <span class="visit-date">{formatDate(visit.date)}</span>
                    </div>
                    {#if visit.notes}
                        <p class="visit-notes">"{visit.notes}"</p>
                    {/if}
                    <form method="POST" action="?/delete" class="delete-form">
                        <input type="hidden" name="id" value={visit._id} />
                        <button type="submit" class="btn-delete"
                            onclick={(e) => {
                                e.preventDefault();
                                if (confirm('Besuch wirklich löschen?')) {
                                    e.target.closest('form').submit();
                                }
                            }}>
                            🗑️ Löschen
                        </button>
                    </form>
                </div>
            {/each}
        {/if}
    </div>
</div>

<style>
    .page {
        padding: 16px;
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
        transition: background 0.2s ease;
    }

    .btn-primary:hover {
        background: #178a65;
    }

    .btn-full {
        width: 100%;
        padding: 14px;
        font-size: 15px;
        margin-top: 8px;
    }

    .btn-delete {
        font-family: 'DM Sans', sans-serif;
        background: none;
        border: none;
        color: #E24B4A;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        padding: 4px 0;
        transition: opacity 0.2s;
    }

    .btn-delete:hover {
        opacity: 0.7;
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

    .visit-card {
        background: #FFFFFF;
        border: 1px solid #EDEDEB;
        border-radius: 14px;
        padding: 14px 16px;
        margin-bottom: 10px;
    }

    .visit-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;
    }

    .visit-info h3 {
        font-family: 'DM Sans', sans-serif;
        font-size: 15px;
        font-weight: 700;
        color: #1A1A18;
        margin: 0;
    }

    .visit-location {
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        color: #6B6B63;
        margin: 2px 0 0 0;
    }

    .visit-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 8px;
        border-top: 1px solid #F5F5F3;
    }

    .visit-match {
        font-family: 'JetBrains Mono', monospace;
        font-size: 13px;
        font-weight: 600;
        color: #1A1A18;
    }

    .visit-date {
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        color: #A3A39B;
    }

    .visit-notes {
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        color: #6B6B63;
        font-style: italic;
        margin: 8px 0 0 0;
    }

    .delete-form {
        margin-top: 8px;
        text-align: right;
    }

    /* Badge */
    .badge {
        font-family: 'JetBrains Mono', monospace;
        font-size: 13px;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: 8px;
        letter-spacing: 0.02em;
    }

    .badge-win {
        background: rgba(29, 158, 117, 0.08);
        color: #1D9E75;
    }

    .badge-loss {
        background: rgba(226, 75, 74, 0.12);
        color: #E24B4A;
    }

    .badge-draw {
        background: rgba(136, 135, 128, 0.12);
        color: #888780;
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

    /* Responsive */
    @media (max-width: 480px) {
        .form-row {
            flex-direction: column;
            gap: 0;
        }
    }
</style>