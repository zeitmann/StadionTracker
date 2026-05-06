<script>
    import { onMount } from 'svelte';

    let { data } = $props();

    let selectedId = $state(null);
    let mapContainer = $state(null);

    let map = null;
    let markers = {};

    onMount(async () => {
        const L = (await import('leaflet')).default;
        await import('leaflet/dist/leaflet.css');

        map = L.map(mapContainer).setView([48, 10], 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        for (const stadium of data.visitedStadiums) {
            if (stadium.lat == null || stadium.lng == null) continue;

            const marker = L.circleMarker([stadium.lat, stadium.lng], {
                radius: 7,
                fillColor: '#1D9E75',
                color: '#ffffff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.9
            }).addTo(map);

            marker.bindTooltip(
                `<strong>${stadium.stadiumName}</strong><br>${stadium.city}, ${stadium.country}`
            );

            marker.on('click', () => {
                if (selectedId === stadium._id) {
                    selectedId = null;
                    marker.closeTooltip();
                } else {
                    selectedId = stadium._id;
                    marker.openTooltip();
                }
            });

            markers[stadium._id] = { marker, lat: stadium.lat, lng: stadium.lng };
        }

        for (const stadium of data.bucketListStadiums) {
            if (stadium.lat == null || stadium.lng == null) continue;

            const marker = L.circleMarker([stadium.lat, stadium.lng], {
                radius: 7,
                fillColor: '#D85A30',
                color: '#ffffff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.9
            }).addTo(map);

            marker.bindTooltip(
                `<strong>${stadium.stadiumName}</strong><br>${stadium.city}, ${stadium.country}`
            );

            marker.on('click', () => {
                if (selectedId === stadium._id) {
                    selectedId = null;
                    marker.closeTooltip();
                } else {
                    selectedId = stadium._id;
                    marker.openTooltip();
                }
            });

            markers[stadium._id] = { marker, lat: stadium.lat, lng: stadium.lng };
        }
    });

    function handleListClick(stadium) {
        selectedId = stadium._id;
        if (map && markers[stadium._id]) {
            const { lat, lng, marker } = markers[stadium._id];
            map.flyTo([lat, lng], 10);
            marker.openTooltip();
        }
    }
</script>

<svelte:head>
    <title>Karte — Stadium Tracker</title>
</svelte:head>

<div class="karte-page">
    <h1>Stadion-Karte</h1>

    <div bind:this={mapContainer} class="map-container"></div>

    <div class="legend">
        <span class="dot green"></span>
        <span>Besucht ({data.visitedStadiums.length})</span>
        <span class="dot orange"></span>
        <span>Bucket List ({data.bucketListStadiums.length})</span>
    </div>

    <div class="stadium-list-card">
        <h2>Alle Stadien</h2>

        {#if data.visitedStadiums.length === 0 && data.bucketListStadiums.length === 0}
            <p class="empty-hint">Noch keine Stadien erfasst.</p>
        {:else}
            {#each data.visitedStadiums as stadium}
                <button
                    class="stadium-row {selectedId === stadium._id ? 'selected-visited' : ''}"
                    onclick={() => handleListClick(stadium)}
                >
                    <span class="dot green"></span>
                    <span class="stadium-name">{stadium.stadiumName}</span>
                    {#if stadium.visitCount > 1}
                        <span class="visit-badge">{stadium.visitCount}×</span>
                    {/if}
                    <span class="stadium-city">{stadium.city}</span>
                </button>
            {/each}

            {#each data.bucketListStadiums as stadium}
                <button
                    class="stadium-row {selectedId === stadium._id ? 'selected-bucket' : ''}"
                    onclick={() => handleListClick(stadium)}
                >
                    <span class="dot orange"></span>
                    <span class="stadium-name">{stadium.stadiumName}</span>
                    <span class="stadium-city">{stadium.city}</span>
                </button>
            {/each}
        {/if}
    </div>
</div>

<style>
    .karte-page {
        padding: 16px 16px 80px 16px;
        max-width: 720px;
        margin: 0 auto;
    }

    h1 {
        font-family: 'DM Sans', sans-serif;
        font-size: 26px;
        font-weight: 800;
        color: #1A1A18;
        letter-spacing: -0.03em;
        margin: 0 0 16px 0;
    }

    h2 {
        font-family: 'DM Sans', sans-serif;
        font-size: 18px;
        font-weight: 700;
        color: #1A1A18;
        margin: 0 0 12px 0;
    }

    .map-container {
        width: 100%;
        height: 300px;
        border-radius: 14px;
        overflow: hidden;
        z-index: 0;
        margin-bottom: 12px;
        border: 1px solid #EDEDEB;
    }

    .legend {
        display: flex;
        align-items: center;
        gap: 16px;
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        color: #6B6B63;
        margin-bottom: 16px;
    }

    .dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .dot.green { background: #1D9E75; }
    .dot.orange { background: #D85A30; }

    .stadium-list-card {
        background: #FFFFFF;
        border: 1px solid #EDEDEB;
        border-radius: 14px;
        padding: 16px;
    }

    .stadium-row {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 10px 8px;
        border: none;
        background: transparent;
        cursor: pointer;
        border-radius: 8px;
        text-align: left;
        transition: background 0.15s ease;
        font-family: 'DM Sans', sans-serif;
    }

    .stadium-row:hover {
        background: rgba(29, 158, 117, 0.05);
    }

    .stadium-row.selected-visited {
        background: rgba(29, 158, 117, 0.08);
    }

    .stadium-row.selected-bucket {
        background: rgba(216, 90, 48, 0.08);
    }

    .stadium-name {
        font-size: 14px;
        font-weight: 600;
        color: #1A1A18;
        flex: 1;
        text-align: left;
    }

    .visit-badge {
        font-size: 11px;
        font-weight: 700;
        color: #1D9E75;
        background: rgba(29, 158, 117, 0.1);
        padding: 2px 6px;
        border-radius: 99px;
        flex-shrink: 0;
    }

    .stadium-city {
        font-size: 13px;
        color: #6B6B63;
        white-space: nowrap;
    }

    .empty-hint {
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        color: #6B6B63;
        text-align: center;
        padding: 24px 0;
        margin: 0;
    }

    @media (min-width: 640px) {
        .map-container {
            height: 420px;
        }
    }
</style>
