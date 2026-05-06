<script>
  import { enhance } from '$app/forms';
  import StadiumCard from '$lib/components/StadiumCard.svelte';

  let { data } = $props();
  let showForm = $state(false);
</script>

<div class="page">
  <div class="header">
    <h1>Bucket List</h1>
    <button class="btn-orange" onclick={() => showForm = !showForm}>
      {showForm ? '✕ Schliessen' : '+ Stadion hinzufügen'}
    </button>
  </div>

  {#if showForm}
    <div class="form-card">
      <form method="POST" action="?/add" use:enhance={() => {
        return ({ update }) => { update(); showForm = false; };
      }}>
        <div class="form-group">
          <label for="name">Stadionname</label>
          <input id="name" name="name" type="text" placeholder="z.B. Wembley Stadium" required />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="city">Stadt</label>
            <input id="city" name="city" type="text" placeholder="London" required />
          </div>
          <div class="form-group">
            <label for="country">Land</label>
            <input id="country" name="country" type="text" placeholder="England" required />
          </div>
        </div>
        <div class="form-group">
          <label for="capacity">Kapazität (optional)</label>
          <input id="capacity" name="capacity" type="number" placeholder="90'000" />
        </div>
        <button type="submit" class="btn-orange btn-full">Zur Bucket List hinzufügen</button>
      </form>
    </div>
  {/if}

  <p class="counter">{data.stadien.length} {data.stadien.length === 1 ? 'Stadion' : 'Stadien'} auf deiner Liste</p>

  {#if data.stadien.length === 0}
    <div class="empty-state">
      <p>Noch keine Stadien auf der Bucket List.<br />Füge dein erstes Wunsch-Stadion hinzu!</p>
    </div>
  {:else}
    <div class="stadium-list">
      {#each data.stadien as stadion}
        <StadiumCard {stadion} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .page {
    padding: 16px;
    max-width: 720px;
    margin: 0 auto;
    padding-bottom: 80px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  h1 {
    font-size: 22px;
    font-weight: 800;
    color: #1A1A18;
    letter-spacing: -0.02em;
    margin: 0;
  }

  .counter {
    font-size: 13px;
    color: #6B6B63;
    margin: 0 0 12px 0;
  }

  .form-card {
    background: #fff;
    border: 1px solid #EDEDEB;
    border-radius: 14px;
    padding: 16px;
    margin-bottom: 16px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  label {
    font-size: 13px;
    font-weight: 600;
    color: #1A1A18;
  }

  input {
    padding: 10px 12px;
    border: 1px solid #EDEDEB;
    border-radius: 10px;
    font-size: 14px;
    color: #1A1A18;
    background: #FAFAF8;
    outline: none;
    transition: border-color 0.2s;
  }

  input:focus {
    border-color: #1D9E75;
  }

  .stadium-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .btn-orange {
    background: #D85A30;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-full {
    width: 100%;
    margin-top: 4px;
  }

  .empty-state {
    text-align: center;
    padding: 40px 16px;
    color: #A3A39B;
    font-size: 14px;
    line-height: 1.6;
  }
</style>