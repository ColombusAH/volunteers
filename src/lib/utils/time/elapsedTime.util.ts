export default (from: Date | number, to: Date | number) => {
	console.log({ from });
	console.log({ to });

	from = new Date(from);
	to = new Date(to);
	let diff = (to.getTime() - from.getTime()) / 1000;
	console.log({ diff });
	const seconds = Math.floor(diff % 60);
	diff = Math.floor(diff / 60);
	console.log({ seconds });
	const minutes = diff % 60;
	console.log({ minutes });
	diff = Math.floor(diff / 60);
	const hours = diff % 24;
	console.log({ hours });
	diff = Math.floor(diff / 24);
	const days = diff % 7;

	diff = Math.floor(diff / 7);
	console.log({ days });

	return {
		days,
		hours,
		minutes,
		seconds
	};
};
