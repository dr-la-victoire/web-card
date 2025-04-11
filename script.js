window.addEventListener("DOMContentLoaded", () => {
	const img = document.getElementById("user-img");
	const userName = document.getElementById("text");
	const leftBtn = document.getElementById("left");
	const rightBtn = document.getElementById("right");

	console.log("elements loaded: ", { img, userName, leftBtn, rightBtn });

	// array to store the random users (images and names) and noting the position of currentUser
	let users = [];
	let currentUser = 0;

	const defaultImages = [
		"https://www.essence.com/wp-content/uploads/2017/11/1511198958/Unknown-1.jpeg",
		"https://i.pinimg.com/736x/fc/76/fe/fc76fed75582adbc7128797b45cd2899--most-beautiful-black-women-beautiful-images.jpg",
		"https://i.pinimg.com/originals/3b/00/ea/3b00ea5d6fb056e33f8524330ea8e3bb.jpg",
		"https://i.pinimg.com/originals/42/3e/76/423e76fbbd57d874c9be40790fe7b357.jpg",
		"https://2.bp.blogspot.com/-NkxLMw6Ubac/VXyTFvHD3YI/AAAAAAAAFuk/d-xGt5PKiPs/s1600/47.jpg",
	];

	// fetching user images and text from an api
	fetch("https://corsproxy.io/?https://randomuser.me/api/?results=5")
		.then((res) => res.json())
		.then((data) => {
			users = data.results;
			showCurrentUser(currentUser);
			console.log("fetching successful", users);
		})
		.catch((err) => console.error("Failed to fetch stuff", err));

	// function to show the current user
	function showCurrentUser(index) {
		const user = users[index];
		img.src = user.picture.large;
		img.alt = `${user.name.first} ${user.name.last}`;
		img.onerror = () => {
			const randomDefaultImage =
				defaultImages[Math.floor(Math.random() * defaultImages.length)];
			img.src = randomDefaultImage;
			img.alt = "Default Image";
		};
		userName.textContent = `${user.name.first} ${user.name.last}`;
	}

	// adding event listeners for the buttons
	leftBtn.addEventListener("click", () => {
		if (users.length === 0) {
			return;
		} else {
			currentUser = (currentUser - 1 + users.length) % users.length;
			showCurrentUser(currentUser);
		}
	});

	rightBtn.addEventListener("click", () => {
		if (users.length === 0) {
			return;
		} else {
			currentUser = (currentUser + 1) % users.length;
			showCurrentUser(currentUser);
		}
	});
});
