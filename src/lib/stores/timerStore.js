import { writable } from 'svelte/store';

export const timerStore = writable({
	currentTime: 0,
	isRunning: false,
	timerList: [],
	totalTime: 0
});

export function addTimer(time) {
	timerStore.update((store) => {
		store.timerList.push(time);
		store.totalTime += time;
		return store;
	});
}

export function startTimer() {
	timerStore.update((store) => ({ ...store, isRunning: true }));
}

export function pauseTimer() {
	timerStore.update((store) => ({ ...store, isRunning: false }));
}

export function resetTimer() {
	timerStore.set({
		currentTime: 0,
		isRunning: false,
		timerList: [],
		totalTime: 0
	});
}

export function updateCurrentTime(time) {
	timerStore.update((store) => ({ ...store, currentTime: time }));
}
