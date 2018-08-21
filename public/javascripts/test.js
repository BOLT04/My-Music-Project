$(() => {
   $('#submitBtn').on('click', () => {
       $.ajax({
           method: 'post',
           url: '/users/signup',
           success: function(resp) {
              console.log(1);
              console.log(resp);
              $('#signupForm').prepend('<h1> OIIII</h1>');
           }
       });
   });
});