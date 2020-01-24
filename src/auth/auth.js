class auth {
  static login(name) {
    localStorage.setItem("authenticated", true);
    localStorage.setItem("name", name);
  }
  static logout() {
    localStorage.removeItem("authenticated");
  }
  static isAuthenticated() {
    return localStorage.getItem("authenticated") || false
  }
}

export default auth