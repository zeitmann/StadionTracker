<script>
	let { result } = $props();

	const styleMap = {
		W: { background: 'rgba(29,158,117,0.12)', color: '#1D9E75' },
		D: { background: 'rgba(136,135,128,0.12)', color: '#888780' },
		L: { background: 'rgba(226,75,74,0.12)', color: '#E24B4A' }
	};

	const labelMap = { W: 'Win', D: 'Draw', L: 'Loss' };

	let badgeStyle = $derived(styleMap[result] ?? styleMap.D);
	let ariaLabel = $derived(labelMap[result] ?? result);
</script>

<span
	class="result-badge"
	style="background: {badgeStyle.background}; color: {badgeStyle.color};"
	aria-label={ariaLabel}
>
	{result}
</span>

<style>
	.result-badge {
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
	}
</style>
