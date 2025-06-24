export default function usePaths() {
  const path = {
    home: "/",
    aboutUs:"/about-us",
    insurance: "/insurance",
    loans: "/loans",
    mortgages: "/mortgages",
    utilities: "/utilities",
    estatePlanning: "/estate-planning",
    auth : {
    login: "/login",
    register: "/register",
  },
  dashboard:{
    root:'/dashboard',
    admin:{
        users:"/dashboard/admin/users"
    }
  }
  };


  return path
}
