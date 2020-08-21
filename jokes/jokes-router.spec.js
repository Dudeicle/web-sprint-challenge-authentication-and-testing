const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

describe("jokes router", () => {
	// truncate!
	beforeEach(async () => {
		// empty table and reset primary key back to 1
		await db("users").truncate();
	}); // PASSING

	// testing the GET endpoint!
	// "https://icanhazdadjoke.com/search"
	describe("GET /", () => {
		it("should return an array of dad jokes", async () => {
			//step 1 check that users has been truncated
			const getTest1 = await db("users");
			expect(getTest1).toHaveLength(0);

			//step 2 add a user and check if they exist
			await request(server).post("/api/auth/register").send({
				username: "getUsername",
				password: "getpass",
			});
			const getTest2 = await db("users");
			expect(getTest2).toHaveLength(1);

			//step 3 login a user
			let res = await request(server).post("/api/auth/login").send({
				username: "getUsername",
				password: "getpass",
			});

			// step 4 check res.body for token confirmation and isolate
			console.log(res.body.token);

			let token = res.body.token;
			console.log("WHAT'S INSIDE THE TOKEN", token);
			// step 5 use token to access restricted GET request endpoint
			let result = await request(server)
				.get("/api/jokes")
				.set({ Authorization: token });

			// step 6 test the result of the get request
			console.log("DAD JOKES", result.body);
		});
	});
	// outer most describe
});
