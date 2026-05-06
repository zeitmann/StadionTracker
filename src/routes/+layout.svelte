<script>
	import favicon from '$lib/assets/favicon.svg';
	import logo from '$lib/assets/stadium_tracker_logo.png';
	import TabNavigation from '$lib/components/TabNavigation.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<img src={logo} alt="Stadium Tracker" class="logo" />
	<span class="tagline">Track your ground</span>
</header>

{@render children()}
<TabNavigation />

<style>
	header {
		display: flex;
		align-items: center;
		gap: 10px;
		background: #ffffff;
		border-bottom: 1px solid #ededeb;
		padding: 12px 16px;
	}

	.logo {
		height: clamp(32px, 5vw, 52px);
		width: auto;
	}

	.tagline {
		font-family: 'DM Sans', sans-serif;
		font-size: clamp(11px, 1.5vw, 14px);
		font-weight: 500;
		color: #6b6b63;
		letter-spacing: 0.05em;
	}
</style>
