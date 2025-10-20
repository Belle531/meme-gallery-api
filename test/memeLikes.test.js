import request from "supertest";
import app from "../src/controllers/index.js";

// You need to set a valid JWT token for testing
const token = process.env.TEST_TOKEN || "<your_test_jwt_token>";

describe("Meme Likes", () => {
  it("should like a meme", async () => {
    const res = await request(app)
      .post("/memes/1/like")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Meme liked");
  });

  it("should unlike a meme if already liked", async () => {
    await request(app)
      .post("/memes/1/like")
      .set("Authorization", `Bearer ${token}`);
    const res = await request(app)
      .post("/memes/1/like")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Meme unliked");
  });
});
