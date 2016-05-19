import Ember from 'ember';

export default Ember.Route.extend({

    model: function() {
        return Ember.A();
    },

    setupController: function(controller, model) {
        controller.set('model', model);
        var users = Ember.A();
        var promise = new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                type: 'GET',
                url: '/api/table',
                headers: {
                    'Accept': 'application/json; charset=utf-8'
                }
            }).done(function(resp) {
                var urs = resp.users;
                for (var i = 0; i < urs.length; i++) {
                    users.pushObject(urs[i]);
                }
                resolve(users);
            }).fail(function() {
                reject(users);
            });
        });
        controller.set('users', promise);
    }
});
