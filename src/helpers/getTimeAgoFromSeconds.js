export function getTimeAgoFromSeconds(postDate) {
	const currentDate = new Date();
	const postDateObj = new Date(postDate);
	const timeDifference = currentDate - postDateObj;

	const secondsInMinutes = 1000 * 60;
	const secondsInHour = 1000 * 60 * 60;
	const secondsInDay = 1000 * 60 * 60 * 24;
	const secondsInWeek = secondsInDay * 7;
	const secondsInMonth = secondsInDay * 30;

	if (timeDifference >= secondsInMonth) {
		const months = Math.floor(timeDifference / secondsInMonth);
		return `${months} month${months > 1 ? 's' : ''} ago`;
	} else if (timeDifference >= secondsInWeek) {
		const weeks = Math.floor(timeDifference / secondsInWeek);
		return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
	} else if (timeDifference >= secondsInDay) {
		const days = Math.floor(timeDifference / secondsInDay);
		return `${days} day${days > 1 ? 's' : ''} ago`;
	} else if (timeDifference >= secondsInHour) {
		const hours = Math.floor(timeDifference / secondsInHour);
		return `${hours} hour${hours > 1 ? 's' : ''} ago`;
	} else if (timeDifference >= secondsInMinutes) {
		const minutes = Math.floor(timeDifference / secondsInMinutes);
		return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
	}
}
