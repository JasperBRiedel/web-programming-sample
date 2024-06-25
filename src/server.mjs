import path from "path"
import express from "express"
import session from "express-session";
import authenticationRoutes from "./routes/auth.mjs";
import menuRoutes from "./routes/menu.mjs";

//// Setup an new express application ////

// Create a new express application and bind 
// it to the app variable.
const app = express()

//// Setup express middleware ////

// Express session middleware automatically manages a session cookie
// that is used to give persistent state between requests, making
// the application stateful and overcoming the stateless nature of HTTP.
app.use(
    session({
        secret: "acb123",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
)

// Set Express to use the ejs view engine to render views.
app.set("view engine", "ejs");
// Tell express where to find the views
app.set('views', path.join(import.meta.dirname, '/views'))

// Enable support for URL-encoded request bodies. This allows
// us to access the fields of HTML forms that have been submitted
// to the server.
app.use(
    express.urlencoded({
        extended: true,
    })
)

//// Setup the routes to be used by express ////
app.use("/auth", authenticationRoutes)
app.use("/menu", menuRoutes)

// Redirect request for root to the login page
app.get("/", (_, res) => {
    res.redirect("/auth/login")
})

//// Setup serving of public files
app.use(express.static("src/public"))

//// Start the application listening for requests ////
const port = 8080
app.listen(port, function() {
    console.log(`Express application listening on http://localhost:${port}`)
})
