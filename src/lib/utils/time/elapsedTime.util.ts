export default (from: Date | number, to: Date | number) => {
	from = new Date(from);
	to = new Date(to);
	let diff = (to.getTime() - from.getTime()) / 1000;
	const seconds = Math.floor(diff % 60);
	diff = Math.floor(diff / 60);
	const minutes = diff % 60;
	diff = Math.floor(diff / 60);
	const hours = diff % 24;
	diff = Math.floor(diff / 24);
	const days = diff % 7;

	diff = Math.floor(diff / 7);

	return {
		days,
		hours,
		minutes,
		seconds
	};
};
