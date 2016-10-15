import { Template } from 'meteor/templating';
import { Events } from '../../api/events/eventoAPI.js';
import './evento.html';

Template.evento.events({
    'click .toggle-checked'() {
        Events.update(this._id, {
         $set: { checked: ! this.checked },
        });
    },
    'click .delete' () {
        Events.remove(this._id);
    }
});