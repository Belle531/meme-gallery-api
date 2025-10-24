import request from "supertest";
import app from "../index";

describe("Meme Likes", () => {
  let token;

  beforeAll(async () => {
    // Register and login a user to get a token (adjust as needed for your app)
    await request(app).post("/auth/register").send({ username: "testuser", password: "testpass" });
    const res = await request(app).post("/auth/login").send({ username: "testuser", password: "testpass" });
    token = res.body.token;
  });

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
