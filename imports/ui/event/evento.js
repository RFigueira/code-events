import { Template } from 'meteor/templating';
import { Events } from '../../api/events/eventoAPI.js';
import './evento.html';

Template.evento.onCreated(function eventoOnCreated() {
    this.state = new ReactiveDict();
});

Template.evento.events({
    'click .toggle-checked'() {
        Events.update(this._id, {
         $set: { checked: ! this.checked },
        });
    },
    'click .delete' () {
        Events.remove(this._id);
    },
    'change .hide-completed input' (event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    },
});


Template.evento.helpers({
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