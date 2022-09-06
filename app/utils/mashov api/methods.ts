import { endpoints } from './endpoints';

const payload = (semel: string, year: string, username: string, password: string) => ({
	IsBiometric: false,
	apiVersion: '3.20210425',
	appBuild: 3.20210425,
	appName: 'info.mashov.students',
	appVersion: 3.20210425,
	deviceManufacturer: 'win',
	deviceModel: 'desktop',
	devicePlatform: 'chrome',
	deviceUuid: 'chrome',
	deviceVersion: '104.0.0.0',
	password,
	semel,
	username,
	year,
});

export type loginInfo = {
	cookie: string;
	csrf: string;
	data: any;
};

export const loginToMashov = async (semel: string, year: string, username: string, password: string): Promise<loginInfo> => {
	const res = await fetch(endpoints.login, {
		headers: {
			accept: 'application/json, text/plain, */*',
			'accept-language': 'he',
			'content-type': 'application/problem+json; charset=utf-8',
			'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
			'sec-ch-ua-mobile': '?0',
			'sec-ch-ua-platform': '"Windows"',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'no-cors',
			'sec-fetch-site': 'same-origin',
		},
		referrer: 'https://web.mashov.info/students/login',
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: `{\"semel\":${semel},\"year\":${year},\"username\":\"${username}\",\"password\":\"${password}\",\"appName\":\"info.mashov.students\",\"apiVersion\":\"3.20200528\",\"appVersion\":\"3.20200528\",\"appBuild\":\"3.20200528\",\"deviceUuid\":\"chrome\",\"devicePlatform\":\"chrome\",\"deviceManufacturer\":\"win\",\"deviceModel\":\"desktop\",\"deviceVersion\":\"87.0.4280.88\"}`,
		// JSON.stringify(payload(semel, year, username, password)),
		method: 'POST',
		mode: 'cors',
	});
	if (!res.ok) {
		const jres = await res.json();
		console.log(jres);
		throw new Error('res is bad, code: ' + res.status);
	} else if (res.headers.get('set-cookie') === null || res.headers.get('x-csrf-token') === null) {
		console.log(res);
		throw new Error('res cookie and/or csrf token is bad');
	}
  const jres = await res.json();

	return { cookie: res.headers.get('set-cookie') ?? 'error', csrf: res.headers.get('x-csrf-token') ?? 'error', data: jres };
};

export const getSchools = async (loginInfo: loginInfo) => {
	return await (
		await fetch('https://web.mashov.info/api/schools', {
			headers: {
				accept: 'application/json, text/plain, */*',
				'accept-language': 'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
				'sec-ch-ua': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
				'sec-ch-ua-mobile': '?0',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-origin',
				'x-csrf-token': loginInfo.csrf,
				cookie: loginInfo.cookie,
			},
			referrer: 'https://web.mashov.info/students/main/covidSplash',
			referrerPolicy: 'strict-origin-when-cross-origin',
			body: null,
			method: 'GET',
			mode: 'cors',
		})
	).json(); // expecting a json response
};

export const get = async (loginInfo: loginInfo, get: string) => {
  // trying to access user Id
	const userId = loginInfo.data.credential.userId;
	console.log(`fetching ${get} userId: ${userId}`);
	const res = await fetch(`https://web.mashov.info/api/students/${userId}/${get}`, {
		headers: {
			accept: 'application/json, text/plain, */*',
			'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
			'sec-ch-ua-mobile': '?0',
			'sec-ch-ua-platform': '"Windows"',
			'x-csrf-token': loginInfo.csrf,
			cookie: loginInfo.cookie,
		},
		referrer: `https://web.mashov.info/students/main/students/${userId}/regularGrades`,
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: null,
		method: 'GET',
		mode: 'cors',
		credentials: 'omit',
	});
	if (!res.ok) {
		const jres = await res.json();
		console.log(jres);
		throw new Error('res is bad, code: ' + res.status);
	}
	console.log(`fetched ${get} successfully`);
	const jres = await res.json();
	return jres;
};

fetch('https://web.mashov.info/api/students/15e79a01-99a4-4918-b87b-39d8ce6926cd/grades', {
	headers: {
		accept: 'application/json, text/plain, */*',
		'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"Windows"',
		'x-csrf-token': '36c73aa2-cc68-35ad-c84d-7269b56e707b',
	},
	referrer: 'https://web.mashov.info/students/main/students/15e79a01-99a4-4918-b87b-39d8ce6926cd/regularGrades',
	referrerPolicy: 'strict-origin-when-cross-origin',
	body: null,
	method: 'GET',
	mode: 'cors',
	credentials: 'omit',
});

export const getRaw = async (loginInfo: loginInfo, get: string) => {
	const userId = (await loginInfo.data.json()).credential.userId;
	return await fetch(`https://web.mashov.info/api/students/${userId}/${get}`, {
		headers: {
			accept: 'application/json, text/plain, */*',
			'accept-language': 'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
			'sec-ch-ua': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
			'sec-ch-ua-mobile': '?0',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-origin',
			'x-csrf-token': loginInfo.csrf,
			cookie: loginInfo.cookie,
		},
		referrer: `https://web.mashov.info/students/main/students/${userId}/regularGrades`,
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: null,
		method: 'GET',
		mode: 'cors',
	});
};

export const getMail = (loginInfo: loginInfo, take: string) => {
	return fetch(`https://web.mashov.info/api/mail/inbox/conversations?skip=0&take=${take}`, {
		headers: {
			accept: 'application/json, text/plain, */*',
			'accept-language': 'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
			'cache-control': 'no-cache',
			pragma: 'no-cache',
			'sec-ch-ua': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
			'sec-ch-ua-mobile': '?0',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-origin',
			'x-csrf-token': loginInfo.csrf,
			cookie: loginInfo.cookie,
		},
		referrer: 'https://web.mashov.info/students/main/mailbox/folder/inbox',
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: null,
		method: 'GET',
		mode: 'cors',
	})
		.then(res => res.json()) // expecting a json response
		.then(json => {
			return json;
		});
};
export const getNotifications = (loginInfo: loginInfo, take: string) => {
	return fetch(`https://web.mashov.info/api/user/notifications?skip=0&take=${take}`, {
		headers: {
			accept: 'application/json, text/plain, */*',
			'accept-language': 'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
			'cache-control': 'no-cache',
			pragma: 'no-cache',
			'sec-ch-ua': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
			'sec-ch-ua-mobile': '?0',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-origin',
			'x-csrf-token': loginInfo.csrf,
			cookie: loginInfo.cookie,
		},
		referrer: 'https://web.mashov.info/students/main/mailbox/folder/inbox',
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: null,
		method: 'GET',
		mode: 'cors',
	})
		.then(res => res.json()) // expecting a json response
		.then(json => {
			return json;
		});
};
export const getPicture = (loginInfo: loginInfo) => {
	return fetch(`https://web.mashov.info/api/user/${loginInfo.data}/picture`, {
		headers: {
			accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
			'accept-language': 'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
			'sec-ch-ua': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
			'sec-ch-ua-mobile': '?0',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'no-cors',
			'sec-fetch-site': 'same-origin',
			cookie: loginInfo.cookie,
		},
		referrer: 'https://web.mashov.info/students/main/covidSplash',
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: null,
		method: 'GET',
		mode: 'cors',
	})
		.then(res => res.arrayBuffer()) // expecting a json response
		.then(json => {
			return json;
		});
};

// ================================================================================
