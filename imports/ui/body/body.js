import { Template } from 'meteor/templating';
import { Events } from '../../api/events/eventoAPI.js';

import '../event/evento.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
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
});
