export default function ({ store, redirect, route }) {
    store.state.user == null && isAdminRoute(route) ? redirect('/login') : ''
    
  
}



function isAdmin({ store }) {
  if (store.state.role == '') {
    return true
  } else {
    return false
  }
}

function isAdminRoute (route) {
  var a = (route.matched[0].path)
  console.log(a)
  const arrayadminroute = a.split('/')
  if (arrayadminroute[1] == 'admin') {
    return true
  } else {
    return false
  }
}

function isUserRoute(route) {
  var a = (route.matched[0].path)
  // console.log(a)
  const arrayadminroute = a.split('/')
  if (arrayadminroute[1] == 'user') {
    return true
  } else {
    return false
  }
}

function isunVerified (state) {
  
  if (state != null) {
    if (state.emailVerified = false) {
      return true
    }else{
      return false
    }

  } else {
    return false
  }
  
}
