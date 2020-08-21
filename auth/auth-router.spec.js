const request = require("supertest");
const server = require("./auth-router.js");
const db = require("../database/dbConfig.js");
const { intersect } = require("../database/dbConfig.js");

describe("auth router", () => {
	// truncate!
	beforeEach(async () => {
		// empty table and reset primary key back to 1
		await db("users").truncate();
	});

	// testing the registration of a user!
	describe("POST /register", () => {
		it("should add a new user", async () => {
			//step 1 check that users has been truncated
			const authTest1 = await db("users");
			expect(authTest1).toHaveLength(0);

			//step 2 add a user
		});
	});
});
