<script>
	import { page } from '$app/stores';

	const tabs = [
		{ label: 'Dashboard', href: '/', icon: '⊞' },
		{ label: 'Besuche', href: '/besuche', icon: '📅' },
		{ label: 'Bucketlist', href: '/bucket-list', icon: '📋' },
		{ label: 'Karte', href: '/karte', icon: '🗺' }
	];

	function isActive(href) {
		return $page.url.pathname === href || ($page.url.pathname === '/' && href === '/');
	}
</script>

<nav class="tab-navigation">
	<div class="tabs-container">
		{#each tabs as tab}
			<a
				href={tab.href}
				class="tab {isActive(tab.href) ? 'active' : ''}"
				aria-current={isActive(tab.href) ? 'page' : undefined}
			>
				<span class="tab-icon">{tab.icon}</span>
				<span class="tab-label">{tab.label}</span>
			</a>
		{/each}
	</div>
</nav>

<style>
	.tab-navigation {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #ffffff;
		border-top: 1px solid #ededeb;
		padding: 8px 0 max(8px, env(safe-area-inset-bottom));
		z-index: 1000;
	}

	.tabs-container {
		display: flex;
		justify-content: space-around;
		align-items: center;
		max-width: 720px;
		margin: 0 auto;
		padding: 0 16px;
	}

	.tab {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: 8px 12px;
		border-radius: 12px;
		text-decoration: none;
		color: #a3a39b;
		font-family: 'DM Sans', sans-serif;
		font-size: 12px;
		font-weight: 500;
		transition: color 0.2s ease, background 0.2s ease;
	}

	.tab:hover {
		background: rgba(29, 158, 117, 0.06);
		color: #1d9e75;
	}

	.tab.active {
		color: #1d9e75;
		background: rgba(29, 158, 117, 0.08);
	}

	.tab-icon {
		font-size: 20px;
		display: block;
	}

	.tab-label {
		display: block;
	}

	/* Responsive: Labels nur auf größeren Bildschirmen */
	@media (max-width: 320px) {
		.tab-label {
			display: none;
		}

		.tab {
			gap: 0;
			padding: 8px;
		}
	}
</style>
