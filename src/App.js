import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import { AuthContext } from './shared/context/auth-context'

//import Users from './user/pages/Users'
//import NewPlace from './places/pages/NewPlace'
//import UserPlaces from './places/pages/UserPlaces'
//import UpdatePlace from './places/pages/UpdatePlace'
//import Auth from './user/pages/Auth'

import MainNavigation from './shared/components/Navigation/MainNavigation'
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner'

import { useAuth } from './shared/hooks/auth-hook'

const Users = React.lazy(() => import('./user/pages/Users'))
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'))
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'))
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'))
const Auth = React.lazy(() => import('./user/pages/Auth'))

const App = () => {

  const { userId, token, login, logout } = useAuth()

  let routes

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch >
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main >
          <Suspense
            fallback={
              <div className='center'>
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App