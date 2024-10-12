<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let timerInput = $state('');
	let timerValue = $state(0);
	let isRunning = $state(false);
	let interval;

	// Derived state for formatted timer value
	let formattedTimerValue = $derived(formatTimerValue(timerValue));

	// Handle keyboard events
	const handleKeyDown = (event) => {
		if (event.key === ' ') {
			event.preventDefault(); // Prevent page scrolling
			toggleTimer();
		} else if (event.key === 'Escape') {
			resetTimer();
		} else if (/^\d$/.test(event.key)) {
			// Append digit to timer input
			timerInput += event.key;
			parseTimerInput();
		}
	};

	// Parse the timer input into minutes and seconds
	const parseTimerInput = () => {
		let minutes = 0;
		let seconds = 0;

		if (timerInput.length <= 2) {
			// If input length is 2 or less, it's seconds only
			minutes = 0;
			seconds = parseInt(timerInput, 10) || 0;
		} else {
			// Split input into minutes and seconds
			let minStr = timerInput.slice(0, -2);
			let secStr = timerInput.slice(-2);
			minutes = parseInt(minStr, 10) || 0;
			seconds = parseInt(secStr, 10) || 0;
		}

		// Adjust for seconds >= 60
		if (seconds >= 60) {
			minutes += Math.floor(seconds / 60);
			seconds = seconds % 60;
		}

		timerValue = minutes * 60 + seconds;
		// `formattedTimerValue` updates automatically due to `$derived`
	};

	// Format the timer value for display
	function formatTimerValue(value) {
		let minutes = Math.floor(value / 60);
		let seconds = value % 60;

		if (minutes > 0) {
			return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
		} else {
			return `${seconds}`;
		}
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', handleKeyDown);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleKeyDown);
		}
		clearInterval(interval);
	});

	const toggleTimer = () => {
		if (isRunning) {
			clearInterval(interval);
			isRunning = false;
		} else {
			if (timerValue > 0) {
				isRunning = true;
				interval = setInterval(() => {
					if (timerValue > 0) {
						timerValue--;
					} else {
						clearInterval(interval);
						isRunning = false;
					}
				}, 1000);
			}
		}
	};

	const resetTimer = () => {
		clearInterval(interval);
		timerInput = '';
		timerValue = 0;
		isRunning = false;
	};
</script>

<div class="timer-display">
	<span class="timer-text">{formattedTimerValue}</span>
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
