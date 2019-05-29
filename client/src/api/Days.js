const BL_URL = '/api/';

export default {
   edit: function (data) {
      const requestUrl = BL_URL + 'days/' + data.date;

      const requestOptions = {
         method: 'POST',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
             'date': data.date,
             'total_calories': data.total_calories,
             'comment': data.comment
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

    findOne: function (date) {
        const requestUrl = BL_URL + 'days/' + date;

        let requestOptions = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'cache-control': 'no-cache'
            }
        };


        return new Promise((resolve, reject) => {
            fetch(requestUrl, requestOptions)
                .then(res => {
                    if (res.ok) {
                        res = res.json();
                        resolve(res);
                    } else {
                        reject(res);
                    }
                })
                .catch(err => {
                    reject(err);
                    console.log(err);
                });
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
             'date': data.date,
             'total_calories': data.total_calories,
             'comment': data.comment
         })
      };

      return new Promise((resolve, reject) => {
         fetch(BL_URL + 'days', options)
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