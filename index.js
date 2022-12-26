const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const usersRepo = require("./repositories/users");
const users = require("./repositories/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["75834bjbfjgh9dygd8fjbjb789yf8gjb5j87g8"],
  })
);

app.get("/signup", (req, res) => {
  res.send(`
    <div>
   Your id is : ${req.session.userId}
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <input name="passwordConfirmation" placeholder="password confirmation" />
            <button>Sign Up</button>
        </form>
    </div>
    `);
});

app.post("/signup", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send("Email already in use");
  }

  if (password !== passwordConfirmation) {
    return res.send("Passwords must match");
  }

  const user = await usersRepo.create({ email, password });

  req.session.userId = user.id;

  res.send("Account Created");
});

app.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are Logged Out");
});

app.get("/signin", (req, res) => {
  res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <button>Sign In</button>
        </form>
    </div>
  `);
});

app.post('/signin', async(req, res) => {
  
})

app.listen(3000, () => {
  console.log(`Listening on port ${3000}`);
});
