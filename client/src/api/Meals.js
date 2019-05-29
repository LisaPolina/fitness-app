const BL_URL = '/api/';

export default {

   delete: function (id) {
      const requestUrl = BL_URL + 'meals/' + id;

      const requestOptions = {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json'
         }
      };

      return new Promise((resolve, reject) => {
         fetch(requestUrl, requestOptions)
            .then(res => {
               if (res.ok) {
                  console.log('Meal deleted successfully');
                  resolve();
               } else {
                  console.log('Couldn\'t delete meal');
                  reject();
               }
            })
            .catch(err => {
               console.log(err);
            });
      });
   },

   edit: function (id, data) {
      const requestUrl = BL_URL + 'meals/' + id;

      const requestOptions = {
         method: 'POST',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
             'name': data.name,
             'calories': data.calories,
             'description': data.description
         })
      };

      return new Promise((resolve, reject) => {
         fetch(requestUrl, requestOptions)
            .then(res => res.json())
            .then(res => {
               resolve(res);
            })
            .catch(err => {
               reject(err);
               console.log(err);
            });
      });
   },

   getAll: function () {
      let options = {
         method: 'GET',
         credentials: 'include',
         headers: {
            'cache-control': 'no-cache'
         }
      };

      return new Promise((resolve, reject) => {
         fetch(BL_URL + 'meals', options)
            .then(res => res.json())
            .then(meals => {
               resolve(meals);
            })
            .catch(err => {
               console.log('Couldn\'t load meals');
               console.log(err);
               reject();
            })
      });
   },

   add: function (data) {
      let options = {
         method: 'POST',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
             'name': data.name,
             'calories': data.calories,
             'description': data.description
         })
      };

      return new Promise((resolve, reject) => {
         fetch(BL_URL + 'meals', options)
            .then(res => res.json())
            .then(res => {
               resolve(res);
            })
            .catch(err => {
               console.log(err);
               reject(err);
            })
      });
   }
}