'use strict';

(() => {
  initialize();
})();


function addTask() {
  const newTask = {
    title: ''
  };
  ListHandler.add(newTask);
  DetailsHandler.show((Context.items.length - 1));
};

function closeDetails() {
  DetailsHandler.save();
  DetailsHandler.hide();
}

function saveOnEnter() {
  if (event.code === 'Enter') {
    DetailsHandler.save();
  }
}

function saveOnBlur() {
  DetailsHandler.save();
}

function initialize() {
  console.log('app initializing...');
  Context.init();
  ListHandler.init();
}