<script>
	import { timerStore } from '$lib/stores/timerStore';

	function formatTime(seconds) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;

		const parts = [];
		if (hours > 0) parts.push(`${hours}h`);
		if (minutes > 0) parts.push(`${minutes}m`);
		if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);

		return parts.join(' ');
	}
</script>

<div class="timer-display">
	<span class="timer-text">{formatTime($timerStore.currentTime)}</span>
</div>

<style>
	.timer-display {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: black;
		color: white;
	}

	.timer-text {
		font-size: 20vw;
		font-weight: bold;
	}
</style>
