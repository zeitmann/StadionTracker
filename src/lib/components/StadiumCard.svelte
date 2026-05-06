<script>
  import { enhance } from '$app/forms';

  let { stadion } = $props();
</script>

<div class="card">
  <div class="card-top">
    <div>
      <h2 class="name">{stadion.name}</h2>
      <p class="location">{stadion.city}, {stadion.country}</p>
      {#if stadion.capacity}
        <p class="capacity">Kapazität: {stadion.capacity.toLocaleString('de-CH')}</p>
      {/if}
    </div>
    <span class="badge">⭐ Bucket List</span>
  </div>

  <form method="POST" action="?/markVisited" use:enhance>
    <input type="hidden" name="id" value={stadion._id} />
    <button type="submit" class="btn-visited">✓ Als besucht markieren</button>
  </form>
</div>

<style>
  .card {
    background: #fff;
    border: 1px solid #EDEDEB;
    border-radius: 14px;
    padding: 14px;
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
    gap: 10px;
  }

  .name {
    font-size: 16px;
    font-weight: 700;
    color: #1A1A18;
    margin: 0 0 4px 0;
  }

  .location {
    font-size: 13px;
    color: #6B6B63;
    margin: 0 0 4px 0;
  }

  .capacity {
    font-size: 12px;
    color: #A3A39B;
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

  .btn-visited {
    width: 100%;
    background: rgba(29, 158, 117, 0.08);
    color: #1D9E75;
    border: 1.5px solid #1D9E75;
    border-radius: 10px;
    padding: 10px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-visited:hover {
    background: rgba(29, 158, 117, 0.15);
  }
</style>