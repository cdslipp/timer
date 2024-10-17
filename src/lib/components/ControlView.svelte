<script>
	import {
		timerStore,
		addTimer,
		startTimer,
		pauseTimer,
		resetTimer,
		updateCurrentTime
	} from '$lib/stores/timerStore';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let inputTime = '';
	let interval;

	function handleInput(event) {
		if (event.key === 'Enter' && inputTime.trim() !== '') {
			const time = parseInt(inputTime);
			if (!isNaN(time)) {
				addTimer(time * 60); // Convert minutes to seconds
				inputTime = '';
			}
		}
	}

	function formatTime(seconds) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;

		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
	}

	function handleStartPause() {
		if ($timerStore.isRunning) {
			pauseTimer();
			clearInterval(interval);
		} else {
			startTimer();
			interval = setInterval(() => {
				updateCurrentTime($timerStore.currentTime + 1);
			}, 1000);
		}
	}

	function handleReset() {
		resetTimer();
		clearInterval(interval);
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', handleInput);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleInput);
			clearInterval(interval);
		}
	});
</script>

<div class="control-view">
	<div class="controls">
		<button on:click={handleStartPause}>
			{$timerStore.isRunning ? 'Pause' : 'Start'}
		</button>
		<button on:click={handleReset}>Reset</button>
	</div>

	<div class="current-time">
		Current Time: {formatTime($timerStore.currentTime)}
	</div>

	<div class="timer-list">
		<h2>Timer List</h2>
		<ul>
			{#each $timerStore.timerList as time, index}
				<li>{index + 1}. {formatTime(time)}</li>
			{/each}
		</ul>
		<div class="total-time">
			Total Time: {formatTime($timerStore.totalTime)}
		</div>
	</div>

	<input
		type="text"
		bind:value={inputTime}
		placeholder="Enter time in minutes"
		on:keydown={handleInput}
	/>
</div>

<style>
	.control-view {
		padding: 20px;
	}

	.controls {
		margin-bottom: 20px;
	}

	button {
		margin-right: 10px;
	}

	.current-time {
		font-size: 24px;
		margin-bottom: 20px;
	}

	.timer-list {
		margin-bottom: 20px;
	}

	.total-time {
		font-weight: bold;
	}

	input {
		width: 100%;
		padding: 5px;
	}
</style>
