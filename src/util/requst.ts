class Http {
  static #instace: any;
  static creat() {
    if (this.#instace) {
      this.#instace = new Http();
    }
  }

  async post(url = "", data = {}) {
    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    }).then((res) => res.json());
    return res;
  }
  async get(url = "") {
    const res = await fetch(url).then((response) => response.json());
    return res;
  }
}

export default new Http();
