import { Template } from 'meteor/templating';
import { Events } from '../../api/events/eventoAPI.js';

import '../event/evento.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.body.helpers({
    eventos() {
      const instance = Template.instance();
      if (instance.state.get('hideCompleted')) {
          return Events.find({ checked: {$ne: true } }, { sort: { createdAt: -1 } });
      }
      return Events.find({}, {sort : { createdAt: -1 } });
    },
    gosteiCount() {
      return Events.find({ checked: { $ne : true } }).count();
    },
});

Template.body.events({
    'submit .new-event' (event) {
        event.preventDefault();

        const target = event.target;
        const nome = target.nome.value;

        Events.insert({
           nome,
           createdAt : new Date(),
        });

        target.nome.value = '';
    },
    'change .hide-completed input' (event, instance) {
      instance.state.set('hideCompleted', event.target.checked);
    },

});
