const db = require("../database/dbConfig.js");
const Jokes = require("./jokes-model.js");

describe("jokes Model", () => {
	//truncate users
	beforeEach(async () => {
		// empty table and reset primary key back to 1
		await db("users").truncate();
	}); // PASSING

	//tesing the add() model
	describe("add()", () => {
		it("should add a user", async () => {
			// make request, send data
			await Jokes.add({
				username: "Heyhey",
				password: "addpass",
			});

			//check that the new user is in the database(without using GET or route)
			const userListTest1 = await db("users");

			expect(userListTest1).toHaveLength(1);
		});
	}); // PASSING

	//tesing the findBy() model
	describe("findBy()", () => {
		it("should find a user by id", async () => {
			// step 1 show that the db is empty
			const userListTest2 = await db("users");
			expect(userListTest2).toHaveLength(0);

			// step 2 add an item to the database and prove it exists
			await Jokes.add({
				username: "findByTestPerson",
				password: "findBypass",
			});
			const userListTest3 = await db("users");
			expect(userListTest3).toHaveLength(1);

			// step 3 find the item by ID
			expect(userListTest3[0].id).toBe(1);
		});
	}); // PASSING
});
