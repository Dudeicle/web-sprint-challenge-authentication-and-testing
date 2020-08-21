const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

describe("auth router", () => {
	// truncate!
	beforeEach(async () => {
		// empty table and reset primary key back to 1
		await db("users").truncate();
	}); // PASSING

	// testing the registration of a user!
	describe("POST /register", () => {
		it("should add a new user", async () => {
			//step 1 check that users has been truncated
			const authTest1 = await db("users");
			expect(authTest1).toHaveLength(0);

			//step 2 add a user and check if they exist
			await request(server).post("/api/auth/register").send({
				username: "postUsername",
				password: "postpass",
			});
			const authTest2 = await db("users");
			expect(authTest2).toHaveLength(1);
		});
	}); // PASSING

	// testing the login of a user!
	describe("POST /login", () => {
		it("should login a user", async () => {
			//step 1 check that users has been truncated
			const loginTest1 = await db("users");
			expect(loginTest1).toHaveLength(0);

			//step 2 add a user and check if they exist
			await request(server).post("/api/auth/register").send({
				username: "loginUsername",
				password: "loginpass",
			});
			const loginTest2 = await db("users");
			expect(loginTest2).toHaveLength(1);

			//step 2 login a user
			let res = await request(server).post("/api/auth/login").send({
				username: "loginUsername",
				password: "loginpass",
			});

			// step 3 check the user login was successful in returning a token
			console.log(res.body);
			// result of console log
			// message: 'Welcome to our API!'
			// token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImxvZ2luVXNlcm5hbWUiLCJpYXQiOjE1OTgwMzExNzcsImV4cCI6MTU5ODExNzU3N30.ILq3z6h9QGauUgeZEJq7hkADVATQHtw3ngeMEPY0Uhc'

			// testing getting only the token
			console.log(res.body.token);

			// a second truncate seems to be required
			await db("users").truncate();
		});
	});
});
