import "./App.css";
import { useState, useEffect } from "react";
import { wordsObj2 } from "./obj2";
function App() {
	const [arr, setArr] = useState();
	const [randomIndex, setRandomIndex] = useState(
		Math.floor(Math.random() * 10)
	);
	const [knownArr, setKnownArr] = useState();
	const [unknownArr, setunknownArr] = useState();
	useEffect(() => {
		setArr(
			localStorage.getItem("arr")
				? JSON.parse(localStorage.getItem("arr"))
				: wordsObj2
		);
		setKnownArr(
			localStorage.getItem("knownArr")
				? JSON.parse(localStorage.getItem("knownArr"))
				: []
		);
		setunknownArr(
			localStorage.getItem("unknownArr")
				? JSON.parse(localStorage.getItem("unknownArr"))
				: []
		);
	}, []);

	useEffect(() => {
		setArr((prev) => {
			let arr = [...prev];
			arr.splice(randomIndex, 1);
			return arr;
		});
		localStorage.setItem("arr", JSON.stringify(arr));
	}, [knownArr]);

	const answerClick = (e) => {
		let answer = e.target.parentElement.firstChild.value;
		if (answer == arr[randomIndex].english) {
			setKnownArr((prev) => [...prev, arr[randomIndex]]);
			localStorage.setItem("knownArr", JSON.stringify(knownArr));
			document.querySelector(".english").style.visibility = "hidden";
			e.target.parentElement.firstChild.value = "";
			e.target.parentElement.firstChild.focus();
		} else {
			setunknownArr((prev) => [...prev, arr[randomIndex]]);
			localStorage.setItem("unknownArr", JSON.stringify(unknownArr));
			document.querySelector(".english").style.visibility = "visible";
			e.target.parentElement.firstChild.value = "";
			e.target.parentElement.firstChild.focus();
		}
	};
	const deleteKnowns = () => {
		setKnownArr([]);
	};
	const nextQ = () => {
		document.querySelector(".english").style.visibility = "hidden";
		let randomNumber = Math.floor(Math.random() * arr.length);
		setRandomIndex(randomNumber);
	};
	const handleEnter = (e) => {
		if (e.keyCode == 13) document.querySelector(".answer-click").click();
		if (e.keyCode == 39) document.querySelector(".next-q").click();
	};
	return (
		<div className="App">
			<div className="knowns">
				<ul className="known-list">
					<li>{knownArr && knownArr.length}</li>

					{knownArr &&
						knownArr.map((knownItem, index) => (
							<li key={index}>
								<b>{knownItem.turkish}:</b>
								{knownItem.english}
							</li>
						))}
				</ul>
			</div>
			<div className="body">
				<div className="turkish">{arr && arr[randomIndex].turkish}</div>
				<div className="english">{arr && arr[randomIndex].english}</div>
				<div className="form">
					<input onKeyDown={handleEnter} type="text" />
					<button className="answer-click btn" onClick={answerClick}>
						Cevapla
					</button>
				</div>
				<div className="know-buttons">
					<button onClick={deleteKnowns} className="delete">
						Bildiklerimi Sil
					</button>
					<button onClick={nextQ} className="next-q">
						Sonraki Kelime
					</button>
				</div>
			</div>
			<div className="unknowns">
				<ul className="unknown-list">
					{unknownArr &&
						unknownArr.map((unknownItem, index) => (
							<li key={index}>
								<b>{unknownItem.turkish}:</b>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}

export default App;
