const ListHandler = (function () {

  const list = document.getElementsByClassName('task-list')[0];
  let lastDragIndex;

  function add(task, init) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const iCheck = document.createElement('i');
    const iCircle = document.createElement('i');

    iCheck.classList.add('icon-check', 'check');
    iCircle.classList.add('icon-circle', 'circle');

    span.appendChild(document.createTextNode(`${task.title}`));

    setEvents(li);

    li.appendChild(iCheck);
    li.appendChild(span);
    li.appendChild(iCircle);

    list.appendChild(li);

    if (!init) {
      Context.items.push(task);
      Context.save();
    }
  }

  function init() {
    list.innerHTML = '';
    Context.items.forEach((item) => {
      add(item, true)
    });
  }

  function getIndex(element) {
    return listChildren().indexOf(element);
  }

  function listChildren() {
    return Array.prototype.slice.call(list.children);
  }

  function updateTitle(index) {
    listChildren()[index].querySelector('span').innerHTML = Context.items[index].title;
  }

  function setEvents(li) {
    li.setAttribute('draggable', true);

    li.addEventListener('click', (ev) => {
      DetailsHandler.show(getIndex(ev.target));
    }, false);

    li.addEventListener('dragstart', function () {
      this.style.opacity = '0.4';

      lastDragIndex = getIndex(this);

    }, false);

    li.addEventListener('dragenter', function () {
      this.classList.add('over');
    }, false);

    li.addEventListener('dragover', function (e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';
      return false;
    }, false);

    li.addEventListener('dragleave', function () {
      this.classList.remove('over');
    }, false);

    li.addEventListener('drop', function (e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      if (listChildren()[lastDragIndex] != this) {
        const {
          title,
          description,
          comments
        } = Context.items[getIndex(this)];

        const oldContext = JSON.parse(JSON.stringify(Context.items[lastDragIndex]));

        Context.items[lastDragIndex].title = title;
        Context.items[lastDragIndex].description = description;
        Context.items[lastDragIndex].comments = comments;

        Context.items[getIndex(this)].title = oldContext.title;
        Context.items[getIndex(this)].description = oldContext.description;
        Context.items[getIndex(this)].comments = oldContext.comments;

        Context.save();
        ListHandler.init();
      }

      return false;
    }, false);
    li.addEventListener('dragend', function (e) {
      this.style.opacity = '1';
      listChildren().forEach(function (li) {
        li.classList.remove('over');
      });
    }, false);
  }

  return {
    list: list,
    add: add,
    init: init,
    updateTitle: updateTitle
  };

})();