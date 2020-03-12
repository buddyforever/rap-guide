class auth {
  static login(profile) {
    localStorage.setItem("authenticated", true);
    localStorage.setItem("profile", JSON.stringify(profile));
  }
  static logout() {
    localStorage.removeItem("authenticated");
  }
  static isAuthenticated() {
    return localStorage.getItem("authenticated") || false
  }
}

export default auth