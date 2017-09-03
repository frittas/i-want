const DetailsHandler = (function () {

  const details = document.getElementsByClassName('details')[0];
  const tasks = document.getElementsByClassName('tasks')[0];
  let currentIndex;

  function show(index) {
    details.classList.remove('hidden');
    details.classList.add('show');
    tasks.classList.remove('details-hidden');
    tasks.classList.add('details-show');

    details.querySelector('#title-input').value = Context.items[index].title || '';
    details.querySelector('#description-textarea').value = Context.items[index].description || '';
    details.querySelector('#comments-textarea').value = Context.items[index].comments || '';

    this.currentIndex = index;
    details.querySelector('#title-input').focus();
    console.log(Context.items[index]);
  }

  function hide() {
    details.classList.remove('show');
    details.classList.add('hidden');
    tasks.classList.remove('details-show');
    tasks.classList.add('details-hidden');
  }

  function save() {
    Context.items[this.currentIndex].title = details.querySelector('#title-input').value;
    Context.items[this.currentIndex].description = details.querySelector('#description-textarea').value;
    Context.items[this.currentIndex].comments = details.querySelector('#comments-textarea').value;
    ListHandler.updateTitle(this.currentIndex);
    Context.save();
  }

  return {
    show: show,
    hide: hide,
    save: save
  };

})();