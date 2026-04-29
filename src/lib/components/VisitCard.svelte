<script>
	let { visit, showDelete = false, compact = false } = $props();

	function getResultBadge(scoreHome, scoreAway) {
		if (scoreHome > scoreAway) return { label: 'W', class: 'badge-win' };
		if (scoreHome < scoreAway) return { label: 'L', class: 'badge-loss' };
		return { label: 'D', class: 'badge-draw' };
	}

	function formatDate(dateStr) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('de-CH', { day: 'numeric', month: 'short', year: 'numeric' });
	}

	const result = getResultBadge(visit.scoreHome, visit.scoreAway);
	const formattedDate = formatDate(visit.date);
</script>

<div class="visit-card {compact ? 'compact' : ''}">
	{#if compact}
		<!-- Kompakte Version für Dashboard -->
		<div class="compact-content">
			<span class="badge {result.class}">{result.label}</span>
			<div class="compact-info">
				<span class="match">{visit.homeTeam} {visit.scoreHome}:{visit.scoreAway} {visit.awayTeam}</span>
				<span class="meta">{visit.stadium} · {formattedDate}</span>
			</div>
		</div>
	{:else}
		<!-- Vollständige Version für Besuche-Liste -->
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
			<span class="visit-date">{formattedDate}</span>
		</div>
		{#if visit.notes}
			<p class="visit-notes">"{visit.notes}"</p>
		{/if}
		{#if showDelete}
			<form method="POST" action="?/delete" class="delete-form">
				<input type="hidden" name="id" value={visit._id} />
				<button
					type="submit"
					class="btn-delete"
					onclick={(e) => {
						e.preventDefault();
						if (confirm('Besuch wirklich löschen?')) {
							e.target.closest('form').submit();
						}
					}}
				>
					🗑️ Löschen
				</button>
			</form>
		{/if}
	{/if}
</div>

<style>
	.visit-card {
		background: #ffffff;
		border: 1px solid #ededeb;
		border-radius: 14px;
		padding: 14px 16px;
		margin-bottom: 10px;
	}

	.visit-card.compact {
		padding: 0;
		border: none;
		background: transparent;
		margin-bottom: 0;
	}

	/* Compact Version */
	.compact-content {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 0;
		border-bottom: 1px solid #f5f5f3;
	}

	.compact-content:last-child {
		border-bottom: none;
	}

	.compact-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
		flex: 1;
	}

	.compact-info .match {
		font-family: 'DM Sans', sans-serif;
		font-size: 14px;
		font-weight: 600;
		color: #1a1a18;
	}

	.compact-info .meta {
		font-family: 'DM Sans', sans-serif;
		font-size: 12px;
		color: #6b6b63;
	}

	/* Vollständige Version */
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
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 8px;
		border-top: 1px solid #f5f5f3;
	}

	.visit-match {
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
		font-weight: 600;
		color: #1a1a18;
	}

	.visit-date {
		font-family: 'DM Sans', sans-serif;
		font-size: 12px;
		color: #a3a39b;
	}

	.visit-notes {
		font-family: 'DM Sans', sans-serif;
		font-size: 13px;
		color: #6b6b63;
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
		width: 28px;
		height: 28px;
		min-width: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		letter-spacing: 0.02em;
	}

	.badge-win {
		background: rgba(29, 158, 117, 0.08);
		color: #1d9e75;
	}

	.badge-loss {
		background: rgba(226, 75, 74, 0.12);
		color: #e24b4a;
	}

	.badge-draw {
		background: rgba(136, 135, 128, 0.12);
		color: #888780;
	}

	/* Delete Button */
	.btn-delete {
		font-family: 'DM Sans', sans-serif;
		background: none;
		border: none;
		color: #e24b4a;
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		padding: 4px 0;
		transition: opacity 0.2s;
	}

	.btn-delete:hover {
		opacity: 0.7;
	}
</style>
