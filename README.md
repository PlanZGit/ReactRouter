# ReactRouter

Learning to use React Router

https://www.youtube.com/watch?v=UWYOC8g5N_0&list=PLC3y8-rFHvwjkxt8TOteFdT_YmzwpBlrG&ab_channel=Codevolution

# Notes

1.  What and Why

    It's a fully feature client side and server-side routing library for React
    Helps create and navigate between different URLs that make up your web application
    Provides unique URLs for different components in the app and makes th UI easily shareable with others

    Pre-requisites

         -React Fundamentals
         -React Hooks

2.  Installation and setup

        npx create-react-app react-router-demo
        npm install react-router-dom@6

3.  Configuring Routes

    Wrap the root component of the app with BrowserRouter from react-router-dom
    Create componenets that need to be rendered at different url Home About
    Config the Routes using routes and route components from react-router-dom
    Routes contain multiply route components, each route accept a path prop
    which corresponds to the path in the browser url and the react element render
    when the path is matched

    index.js

        <BrowserRouter>
          <App />
        </BrowserRouter>

    App.js

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
        </Routes>

        http://localhost:3000
        http://localhost:3000/about

4.  Links

    Create a Navbar component
    Add Navbar component to App.js
    Use the links will navigave to the urls

        import { Link } from "react-router-dom"
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

5.  Active Links

    - Use Navlink, by default it receives an active class when the link is the current route

    - Inspect the element, with this active class , we can use it to add some styles

    - We can style the active class either in index.css or the active boolean flag injected into the style function

    Link vs Navlink

    - Navlink is use for navbar / breadcrumbs / set of tabs
      where you would like to highlight the current selected item
      useful context with screen readers

    Link

    - Navigate other parts of the app
      we would not want active link to be applied
      when it is not needed

    Navbar.js

          import { Navlink } from "react-router-dom"
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>

    index.css

          nav a.active {
          text-decoration: none;
          font-weight: bold;
          }

    Using active link as the style props

    Navbar.js

        const navLinkStyles = ({ isActive }) => {
          return {
            fontWeight: isActive ? "bold" : "normal",
            textDecoration: isActive ? "none" : "underline",
          };
        };

6.  Navigating Programmatically

    - create OrderSummary componenet, import useNavigate

    - create a button Place Order , onClick={() => navigate("order-summary")}
    - create a button Go back , set onClick={(() => navigate(-1)
    - create a const set to useNavigate()
    - passing a path or number that indicate a change in history stack
      else we can replace by setting it to true

    OrderSummary.js

        import { useNavigate } from "react-router-dom";
        const navigate = useNavigate();
        <div>Order comfirmed!</div>
        <button onClick={(() => navigate(-1))}>Go back</button>

7.  No Match Route

    Create a NoMatch component

        http://localhost:3000/help
        has no route, set route path to \* for no match route

    App.js

        <Route path="*" element={<NoMatch />}></Route>

    NoMatch.js

        export const NoMatch = () => {
          return <div>Page not found</div>;
        };

8.  Nested Route

    - create Products component
      add Product to Navbar
      create nested route component FeatureProducts NewProducts
      import Outlet to render nested route

    http://localhost:3000/products/feature
    http://localhost:3000/products/new

    App.js

        <Route path="products" element={<Products />}>
          <Route path="feature" element={<FeaturedProducts />}></Route>
          <Route path="new" element={<NewProducts />}></Route>
        </Route>

    Products.js

        import { Link, Outlet } from "react-router-dom";
        <div>
          <input type="search" placeholder="Search Products" />
        </div>
        <nav>
         <Link to="feature">Featured</Link>
         <Link to="new">New</Link>
        </nav>
        <Outlet />

9.  Index Route

    When you want a route to be render at the parent url
    make use of an index route
    The index route will contain the index prop instead of
    the path prop

    App.js

        <Route path="products" element={<Products />}>
          <Route index element={<FeaturedProducts />} />
          <Route path="feature" element={<FeaturedProducts />}></Route>
          <Route path="new" element={<NewProducts />}></Route>
        </Route>

10. Dynamic Routes

    - When dealing with a list detail pattern
      or if the route parameter can vary in value
      make use of dynamic routes
      Specify the url param denoted by a colon : prefix in the path
    - react router will always match specific before a dynamic route
    - it is possible to have nested dynamic routes

    Admin.js
    Users.js
    UserDetail.js

        <Route path="users" element={<Users />}>
          <Route path=":userId" element={<UserDetails />} />
          <Route path="admin" element={<Admin />} />
        </Route>

        http://localhost:3000/users/num
        http://localhost:3000/users/string
        http://localhost:3000/users/admin

11. URL Params

    We can render the userId in JSX
    userId corresponds to the dynamic segment
    we have specified in the route config in App.js

    App.js

        <Route path=":userId" element={<UserDetails />} />

    UerDetails.js

        import { useParams } from "react-router-dom";
        export const UserDetails = () => {
          const { userId } = useParams();
          return <div>UserDetails {userId}</div>;
        };

    or

        import { useParams } from "react-router-dom";
        export const UserDetails = () => {
        const params = useParams()
        const userId = params.userId
          return <div>UserDetails {userId}</div>;
        };

12. Search Params

    - Apply filters in a listing page for example like amazon or ecommerce site
    - Selecting a filter will update the url with a search param, this lets you share the link or bookmark
    - useSearchParams is simliar to the useState hook in react
      instead of storing in memory it is stored in the url
      http://localhost:3000/users?filter=active
    - showActiveUsers is a boolean

    Users.js

        import { Outlet, NavLink, useSearchParams } from "react-router-dom";
        const [searchParams, setSearchParams] = useSearchParams();
        const showActiveUsers = searchParams.get("filter") === "active";

        <div>
        <button onClick={() => setSearchParams({ filter: "active" })}>Active Users</button>
        <button onClick={() => setSearchParams({})}>Reset Filter</button>
        </div>

        {showActiveUsers ? ( <h2>Showing all active users</h2> ) : ( <h2>Showing all users</h2>)}

13. Relative Links

    - Relatives paths or relative links don't start with a forward slash / and will inherit the closest route in which the are rendered
    - Absolute links make more sense for components like primary navigation Navbar.js

    Products.js

        not vaild
        http://localhost:3000/feature
        <Link to="/feature">Featured</Link>

        vaild
        http://localhost:3000/products/feature
        <Link to="feature">Featured</Link>
        <Link to="/products/feature">Featured</Link>

14. Lazy Loading

    - lazy loading is a technique where components not require on the home page can be split into separate code bundles and downloaded only when the user navigate to the page

    - Reduce the amount of code needed during the initial load

    App.js

        const LazyAbout = React.lazy(() => import("./components/About"));

        <Route path="about" element={
        <React.Suspense fallback="Loading...">
          <LazyAbout />
        </React.Suspense>
        }/>

    About.js

        export default About;

15. Authentication and Protected Routes

    -F irst we created the Profile route which should be protected

    - Next we implemented the functionality to Login and logout a user
      -For that we relied on react useContext and provided the context vaule to the entire componenetry.
    - After that we implemented the login page, useAuth from auth to sign in and useNavigate from react to redirectPath

    - Finaly we created the RequiredAuth to see if user is login or not
      If the user is not log in, redirect to the login route
    - Now we wrap any component route with RequiredAuth if it needs protect
    - Last we prevent the user from the login route after they login , by using the replace

    App.js

          <AuthProvider>
            <Navbar />
            ...
            <Routes>
            ...
            <Routes>
            <RequireAuth>
              <Profile>
            </RequireAuth>

          </AuthProvider>

    auth.js
    RequireAuth.js
    Login.js
    Profile.js
