<script>
	let { visit, showDelete = false, compact = false, onSave } = $props();

	let isEditing = $state(false);
	let formData = $state({
		stadium: visit.stadium,
		city: visit.city,
		country: visit.country,
		homeTeam: visit.homeTeam,
		awayTeam: visit.awayTeam,
		scoreHome: visit.scoreHome,
		scoreAway: visit.scoreAway,
		date: visit.date,
		notes: visit.notes
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

	function openEdit() {
		isEditing = true;
	}

	function closeEdit() {
		isEditing = false;
		formData = {
			stadium: visit.stadium,
			city: visit.city,
			country: visit.country,
			homeTeam: visit.homeTeam,
			awayTeam: visit.awayTeam,
			scoreHome: visit.scoreHome,
			scoreAway: visit.scoreAway,
			date: visit.date,
			notes: visit.notes
		};
	}

	async function handleSave() {
		if (!onSave) return;
		
		const success = await onSave({
			id: visit._id,
			...formData
		});
		
		if (success) {
			isEditing = false;
		}
	}

	const result = getResultBadge(visit.scoreHome, visit.scoreAway);
	const formattedDate = formatDate(visit.date);
</script>

<div class="visit-card {compact ? 'compact' : ''} {isEditing ? 'editing' : ''}">
	{#if compact}
		<!-- Kompakte Version für Dashboard -->
		<div class="compact-content">
			<span class="badge {result.class}">{result.label}</span>
			<div class="compact-info">
				<span class="match">{visit.homeTeam} {visit.scoreHome}:{visit.scoreAway} {visit.awayTeam}</span>
				<span class="meta">{visit.stadium} · {formattedDate}</span>
			</div>
		</div>
	{:else if isEditing}
		<!-- Edit Modus -->
		<div class="edit-mode">
			<h3 class="edit-title">Besuch bearbeiten</h3>
			
			<div class="form-group">
				<label for="stadium-{visit._id}">Stadion *</label>
				<input 
					type="text" 
					id="stadium-{visit._id}"
					bind:value={formData.stadium} 
					placeholder="z.B. Signal Iduna Park" 
					required
				/>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label for="city-{visit._id}">Stadt *</label>
					<input 
						type="text" 
						id="city-{visit._id}"
						bind:value={formData.city} 
						placeholder="z.B. Dortmund" 
						required
					/>
				</div>
				<div class="form-group">
					<label for="country-{visit._id}">Land *</label>
					<input 
						type="text" 
						id="country-{visit._id}"
						bind:value={formData.country} 
						placeholder="z.B. Deutschland" 
						required
					/>
				</div>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label for="homeTeam-{visit._id}">Heimteam *</label>
					<input 
						type="text" 
						id="homeTeam-{visit._id}"
						bind:value={formData.homeTeam} 
						placeholder="z.B. BVB" 
						required
					/>
				</div>
				<div class="form-group">
					<label for="awayTeam-{visit._id}">Auswärtsteam *</label>
					<input 
						type="text" 
						id="awayTeam-{visit._id}"
						bind:value={formData.awayTeam} 
						placeholder="z.B. Bayern" 
						required
					/>
				</div>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label for="scoreHome-{visit._id}">Tore Heim *</label>
					<input 
						type="number" 
						id="scoreHome-{visit._id}"
						bind:value={formData.scoreHome} 
						min="0" 
						placeholder="0" 
						required
					/>
				</div>
				<div class="form-group">
					<label for="scoreAway-{visit._id}">Tore Auswärts *</label>
					<input 
						type="number" 
						id="scoreAway-{visit._id}"
						bind:value={formData.scoreAway} 
						min="0" 
						placeholder="0" 
						required
					/>
				</div>
				<div class="form-group">
					<label for="date-{visit._id}">Datum *</label>
					<input 
						type="date" 
						id="date-{visit._id}"
						bind:value={formData.date} 
						required
					/>
				</div>
			</div>

			<div class="form-group">
				<label for="notes-{visit._id}">Notizen (optional)</label>
				<textarea 
					id="notes-{visit._id}"
					bind:value={formData.notes} 
					placeholder="z.B. Tolle Atmosphäre!"
					rows="3"
				></textarea>
			</div>

			<div class="edit-buttons">
				<button type="button" class="btn-save" onclick={handleSave}>
					💾 Speichern
				</button>
				<button type="button" class="btn-cancel" onclick={closeEdit}>
					Abbrechen
				</button>
			</div>
		</div>
	{:else}
		<!-- View Modus -->
		<div class="view-mode">
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
			<div class="action-buttons">
				<button type="button" class="btn-edit" onclick={openEdit}>
					✏️ Bearbeiten
				</button>
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
			</div>
		</div>
	{/if}
</div>

<style>
	.visit-card {
		background: #ffffff;
		border: 1px solid #ededeb;
		border-radius: 14px;
		padding: 14px 16px;
		margin-bottom: 10px;
		transition: all 0.3s ease;
	}

	.visit-card.editing {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

	/* Edit Modus */
	.edit-mode {
		animation: expandHeight 0.3s ease;
	}

	@keyframes expandHeight {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.edit-title {
		font-family: 'DM Sans', sans-serif;
		font-size: 15px;
		font-weight: 700;
		color: #1a1a18;
		margin: 0 0 12px 0;
	}

	.form-group {
		margin-bottom: 12px;
		flex: 1;
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
	.form-group textarea {
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
	.form-group textarea:focus {
		border-color: #1d9e75;
	}

	.form-group input::placeholder,
	.form-group textarea::placeholder {
		color: #a3a39b;
	}

	.form-row {
		display: flex;
		gap: 10px;
	}

	.edit-buttons {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 12px;
	}

	.btn-save {
		font-family: 'DM Sans', sans-serif;
		background: #1d9e75;
		color: white;
		border: none;
		padding: 10px;
		border-radius: 8px;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
	}

	.btn-save:hover {
		background: #178a65;
	}

	.btn-cancel {
		font-family: 'DM Sans', sans-serif;
		background: none;
		border: 1px solid #ededeb;
		color: #6b6b63;
		padding: 10px;
		border-radius: 8px;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
	}

	.btn-cancel:hover {
		background: #f5f5f3;
	}

	/* View Modus */
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
		margin: 0;
	}

	.action-buttons {
		display: flex;
		gap: 8px;
		margin-top: 8px;
		justify-content: flex-end;
	}

	.btn-edit {
		font-family: 'DM Sans', sans-serif;
		background: none;
		border: none;
		color: #1d9e75;
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		padding: 4px 0;
		transition: opacity 0.2s;
	}

	.btn-edit:hover {
		opacity: 0.7;
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

	@media (max-width: 480px) {
		.form-row {
			flex-direction: column;
			gap: 0;
		}
	}
</style>
