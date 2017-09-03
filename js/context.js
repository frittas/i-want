const Context = (() => {

  let items = [];

  function init() {
    const currentStorage = JSON.parse(localStorage.getItem('context'));

    if (currentStorage) {
      this.items = currentStorage;
    }
  }

  function save() {
    localStorage.setItem('context', JSON.stringify(this.items));
  }

  function clear() {
    localStorage.removeItem('context');
  }

  return {
    items: items,
    save: save,
    clear: clear,
    init: init
  };

})();