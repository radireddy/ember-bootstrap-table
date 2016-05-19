import Ember from 'ember';

export default Ember.Route.extend({

    model: function() {
        return Ember.A();
    },

    getUsers: function() {
        var controller = this.controllerFor(this.routeName);
        var users = Ember.A();
        var self = this;
        var sortOrder = this.get('sortAsc') ? 'asc' : 'desc';

        var promise = new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                type: 'GET',
                url: '/api/remote-table?pageNum=' + self.get('pageNum') + '&pageSize=' + self.get('pageSize') + '&sortBy=' + self.get('sortBy') + '&sortOrder=' + sortOrder,
                headers: {
                    'Accept': 'application/json; charset=utf-8'
                }
            }).done(function(resp) {
                var urs = resp.users;
                controller.set('totalUsers', resp.count);
                for (var i = 0; i < urs.length; i++) {
                    users.pushObject(urs[i]);
                }
                //console.log(users);
                resolve(users);
            }).fail(function() {
                reject(users);
            });
        });
        return promise;
        //return users;
    },

    actions: {
        fetchData: function(pageNum, pageSize, sortBy, sortAsc) {
            console.log('fetch data');
            var controller = this.controllerFor(this.routeName);
            this.set('pageNum', pageNum);
            this.set('pageSize', pageSize);
            this.set('sortBy', sortBy);
            this.set('sortAsc', sortAsc);
            //var users = this.getUsers();
            controller.set('model', Ember.A());
            controller.set('model', this.getUsers());
            //controller.set('users', [{firstName: 'ravi', lastName: 'reddy', age: '30'}]);
        }
    }
});
