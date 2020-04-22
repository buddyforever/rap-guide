class auth {
  static login(profile) {
    return new Promise((resolve, reject) => {
      localStorage.setItem("authenticated", true);
      localStorage.setItem("profile", JSON.stringify(profile));
      resolve();
    });
  }
  static logout() {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("profile");
  }
  static isAuthenticated() {
    return localStorage.getItem("authenticated") || false
  }
}

export default auth