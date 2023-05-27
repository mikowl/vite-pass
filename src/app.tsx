import { useState } from "preact/hooks";

const PASSWORD = "12345";
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export function App() {
	const [currentPass, setCurrentPass] = useState<number[]>([]);
	const [guessed, setGuessed] = useState<boolean>(false);
	const [matched, setMatched] = useState<boolean>(false);

	const handleClick = (e: Event) => {
		// Create an updated password array with the clicked number
		const { target } = e;
		const tValue = (target as HTMLButtonElement).value;
		const updatedPass = [...currentPass, parseInt(tValue)];

		// Check if the length of the updated password array is equal to the length of the password
		if (updatedPass.length === PASSWORD.length) {
			// Compare the updated pass with the password
			const passMatch = updatedPass.join("") === PASSWORD;
			setGuessed(true);
			setMatched(passMatch);

			// Clear the currentPass array after checking
			setCurrentPass([]);
		} else {
			// Update the currentPass array with the updated password array
			setCurrentPass(updatedPass);
		}
	};

	const Dots = ({ filled }: { filled?: boolean }) => {
		return <i className={`dot ${filled ? "filled" : ""}`}></i>;
	};

	return (
		<>
			{!guessed ? (
				<>
					<h2>Enter Passcode</h2>
					{[...Array(PASSWORD.length)].map((_, i) => (
						<Dots key={i} filled={currentPass.length > i} />
					))}
					<div class="card numbers">
						{nums.map((num) => (
							<button onClick={handleClick} value={num} key={num}>
								{num}
							</button>
						))}
					</div>
				</>
			) : matched ? (
				<div class="correct box scale-up-top">
					<h3>Correct 🔑</h3>
					<img
						class="very-good"
						src="https://media3.giphy.com/media/lvOnlEYunAwOkHjgmU/giphy.webp?cid=dda24d50vkb4e29h14jlmp1t8eba4fe3zyqmhneqxg1e92gf&ep=v1_gifs_related&rid=giphy.webp&ct=g"
					/>
					<button onClick={() => setGuessed(false)}>Back</button>
				</div>
			) : (
				<div class="incorrect box scale-up-top">
					<h3>🔒 Incorrect</h3>
					<img
						class="no-entry"
						src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTI1YmQzMTk3NTA5NmJiZWY5NTM4OWMzZjAwYzA2ODZjOGI4MzA0OSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/RgnJSrHHGLCtGr3VcA/giphy.gif"
						alt="Incorrect"
					/>
					<button onClick={() => setGuessed(false)}>Try again</button>
				</div>
			)}
			<a
				href="https://github.com/mikowl/vite-pass"
				target="_blank"
				style={{ position: "absolute", bottom: "1rem", right: "1rem" }}
			>
				Github
			</a>
		</>
	);
}
