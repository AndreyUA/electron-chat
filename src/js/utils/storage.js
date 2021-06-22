class Storage {
  setItem(key, value) {
    if (!value) return null;

    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);

    return this;
  }

  getItem(key) {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : {};
  }
}

export default new Storage();
