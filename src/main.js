var SunCalc = require("suncalc");
class Color {
	constructor() {}
	#solarTime(longitude) {
		const MILLIS_IN_MINUTE = 60 * 1000;
		const MILLIS_IN_HOUR = 60 * MILLIS_IN_MINUTE;
		let now = new Date();
		let solar_offset = (12 * MILLIS_IN_HOUR * longitude) / 180;
		let tz_offset = now.getTimezoneOffset() * MILLIS_IN_MINUTE;
		return new Date(now.getTime() + solar_offset + tz_offset);
	}
	#time_str(d) {
		let h = d.getHours().toString().padStart(2, "0");
		let m = d.getMinutes().toString().padStart(2, "0");
		return `${h}${m}`;
	}
	#getSolarTime(longitude) {
		return this.#time_str(this.#solarTime(longitude));
	}
	#hexToRgb(hex) {
		const r = parseInt(hex.slice(1, 3), 16),
			g = parseInt(hex.slice(3, 5), 16),
			b = parseInt(hex.slice(5, 7), 16);
		return { r, g, b };
	}

	#rgbToHex(rgb) {
		const { r, g, b } = rgb;
		return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).padStart(6, "0");
	}

	#createGradient(darkColor, lightColor) {
		const rgb1 = this.#hexToRgb(darkColor);
		const rgb2 = this.#hexToRgb(lightColor);
		const gradient = [];

		for (let i = 0; i < 720; i++) {
			const t = i / (720 - 1);
			const r = Math.round(rgb1.r + t * (rgb2.r - rgb1.r));
			const g = Math.round(rgb1.g + t * (rgb2.g - rgb1.g));
			const b = Math.round(rgb1.b + t * (rgb2.b - rgb1.b));
			gradient.push(this.#rgbToHex({ r, g, b }));
		}

		return gradient;
	}
	getColor(darkColor, lightColor, longitude, offset = 1) {
		const gradient = [
			...this.#createGradient(darkColor, lightColor),
			...this.#createGradient(darkColor, lightColor).reverse(),
		];
		console.log(gradient);

		let time = this.#getSolarTime(longitude);
		if (time <= 0) {
			time++;
		}

		return gradient[time - offset];
	}
}
let color = new Color();
console.log(color.getColor("#000000", "#ffffff", -95.42936720991355));
