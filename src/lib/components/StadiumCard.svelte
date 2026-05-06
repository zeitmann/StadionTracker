<script>
    import { enhance } from '$app/forms';
    let { stadion } = $props();
</script>

<div class="visit-card">
    <div class="visit-top">
        <div class="visit-info">
            <h3>{stadion.name}</h3>
            <p class="visit-location">{stadion.city}, {stadion.country}</p>
        </div>
        <span class="badge">⭐ Bucket List</span>
    </div>

    {#if stadion.capacity}
        <div class="visit-details">
            <p class="visit-capacity">Kapazität: {stadion.capacity.toLocaleString('de-CH')}</p>
        </div>
    {/if}

    <div class="action-buttons">
        <form method="POST" action="?/markVisited" use:enhance class="action-form">
            <input type="hidden" name="id" value={stadion._id} />
            <button type="submit" class="btn-visited">✓ Als besucht markieren</button>
        </form>
        <form method="POST" action="?/remove" use:enhance class="action-form">
            <input type="hidden" name="id" value={stadion._id} />
            <button
                type="submit"
                class="btn-remove"
                onclick={(e) => {
                    e.preventDefault();
                    if (confirm('Stadion von der Bucket List entfernen?')) {
                        e.target.closest('form').submit();
                    }
                }}
            >🗑️ Entfernen</button>
        </form>
    </div>
</div>

<style>
    .visit-card {
        background: #ffffff;
        border: 1px solid #ededeb;
        border-radius: 14px;
        padding: 14px 16px;
        margin-bottom: 10px;
    }

    .visit-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 10px;
        margin-bottom: 8px;
    }

    .visit-info h3 {
        font-family: 'DM Sans', sans-serif;
        font-size: 15px;
        font-weight: 700;
        color: #1a1a18;
        margin: 0;
    }

    .visit-location {
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        color: #6b6b63;
        margin: 2px 0 0 0;
    }

    .visit-details {
        padding-top: 8px;
        border-top: 1px solid #f5f5f3;
        margin-bottom: 8px;
    }

    .visit-capacity {
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        color: #a3a39b;
        margin: 0;
    }

    .badge {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        color: #D85A30;
        background: rgba(216, 90, 48, 0.08);
        border-radius: 6px;
        padding: 4px 8px;
        white-space: nowrap;
        flex-shrink: 0;
    }

    .action-buttons {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
    }

    .action-form {
        margin: 0;
    }

    .btn-visited {
        font-family: 'DM Sans', sans-serif;
        background: none;
        border: none;
        color: #1d9e75;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        padding: 4px 0;
    }

    .btn-remove {
        font-family: 'DM Sans', sans-serif;
        background: none;
        border: none;
        color: #e24b4a;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        padding: 4px 0;
    }
</style>
