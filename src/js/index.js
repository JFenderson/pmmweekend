import $ from 'jquery';


$(document).ready(function () {
  // START NAVBAR
  // grab the initial top offset of the navigation 
  // var stickyNavTop = $('.nav').offset().top;

  var stickyNav = function () {
    var scrollTop = $(window).scrollTop();
    if (scrollTop >= 40) {
      $('.hero-nav').addClass('sticky');
    } else {
      $('.hero-nav').removeClass('sticky');
    }
  };



  $('.hero-nav .link-1').click(function (e) {
    e.preventDefault();

    var targetHref = $(this).attr('href');

    $('html, body').animate({
      scrollTop: $(targetHref).offset().top
    }, 700);

    $(window).scroll(function () {
      stickyNav();
    });
  });

  $('.footer-links li a').click(function (e) {
    e.preventDefault();

    var targetHref = $(this).attr('href');

    $('html, body').animate({
      scrollTop: $(targetHref).offset().top
    }, 700);

    $(window).scroll(function () {
      stickyNav();
    });
  });


  //END NAVBAR
  //NODEMAILER FOR CONTACT FORM
  function phoneFormatter() {
    $('#number').on('input', function () {
      var number = $(this).val().replace(/[^\d]/g, '')
      if (number.length == 7) {
        number = number.replace(/(\d{3})(\d{4})/, "$1-$2");
      } else if (number.length == 10) {
        number = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      }
      $(this).val(number)
    });
  }

  $(phoneFormatter);

  $('#contactSubmit').click(() => {
    let name = $('#name').val();
    let email = $('#email').val();
    let message = $('#message').val();

    fetch(`http://127.0.0.1:3000/api/contact`, {
      method: 'POST',
      body: JSON.stringify({
        name: name, email: email, message: message
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        res.send(200)
        setTimeout(() => {
          window.location.reload();
        }, 10)
      })
      .catch(error => console.error('Error:', error))
  });
  //END NODEMAILER

  //MEMBER SIGNUP TO ADD TO BE ADDED TO DATABASE
  $('#memberSubmit').click((e) => {
    e.preventDefault();

    let name = $('#memberName').val();
    let email = $('#memberEmail').val();
    let number = $('#memberNumber').val();
    let location = $('#memberLocation').val();
    let crabYear = $('#memberCrabYear').val();

    fetch(`http://127.0.0.1:3000/api/user/signup`, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        name: name, email: email, phoneNumber: number, location: location, crabYear: crabYear
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        res.json()
        setTimeout(() => {
          window.location.reload();
        }, 10)
      })
      .catch(error => console.log('Error:', error))
  });
  //END MEMBER SIGNUP

  //START STRIPE PAYMENT
  var toValidate = $('#numberOfTickets, #purchase'),
  valid = false;

  toValidate.keyup(function () {
  if ($(this).val().length > 0) {
      $(this).data('valid', true);
      console.log($(this).data)
  } else {
      $(this).data('valid', false);
  }
  toValidate.each(function () {
      if ($(this).data('valid') == true) {
          valid = true;
      } else {
          valid = false;
      }
  });
  if (valid === true) {
      $('input[type=submit]').prop('disabled', false);
  }else{
      $('input[type=submit]').prop('disabled', true);        
  }
  });

  const stripePK = 'pk_test_obzu76S8L0GFvqkXbKn204a2';
  let ticketHandler = (token, args) => {
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.
    var tixQuantity = $('#numberOfTickets').val();
    var tixType = $('#purchase').val();

    // switch(tixQuantity){
    //   case "1":
    //     numTix = 1;
    //     break;
    //   case "2":
    //     numTix = 2;
    //     break;
    //   case "3":
    //     numTix = 3;
    //     break;
    //   case "4":
    //     numTix = 4;
    //     break;
    //   case "5":
    //     numTix = 5;
    //     break;
    // }

    console.log(token)
    
    if (tixType == 'individual') {
      if (tixQuantity == '1') {
        console.log('1 idv is hitting')
        fetch(`http://127.0.0.1:3000/api/charge/tickets/idv/1`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + stripePK
          },
          body: JSON.stringify(token, args)
        })
          .then(output => {
            if (output.status === "succeeded")
              document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
          })
          .catch((error) => {
            if (error.status === 400) {
              console.warn('Bad request, often due to missing a required parameter.', error);
            } else if (error.status === 401) {
              console.warn('No valid API key provided.', error);
            } else if (error.status === 404) {
              console.warn('The requested resource doesn\'t exist.', error);
            } else if (error.status === 500) {
              console.warn('Purchase Failed', error)
            }
          })
      } else if (tixQuantity == '2') {

        fetch(`http://127.0.0.1:3000/api/charge/tickets/idv/2`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + stripePK
          },
          body: JSON.stringify(token, args)
        })
          .then(output => {
            if (output.status === "succeeded")
              document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
          })
          .catch((error) => {
            if (error.status === 400) {
              console.warn('Bad request, often due to missing a required parameter.', error);
            } else if (error.status === 401) {
              console.warn('No valid API key provided.', error);
            } else if (error.status === 404) {
              console.warn('The requested resource doesn\'t exist.', error);
            } else if (error.status === 500) {
              console.warn('Purchase Failed', error)
            }
          })
      } else if (tixQuantity == '3') {
        fetch(`http://127.0.0.1:3000/api/charge/tickets/idv/3`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + stripePK
          },
          body: JSON.stringify(token, args)
        })
          .then(output => {
            if (output.status === "succeeded")
              document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
          })
          .catch((error) => {
            if (error.status === 400) {
              console.warn('Bad request, often due to missing a required parameter.', error);
            } else if (error.status === 401) {
              console.warn('No valid API key provided.', error);
            } else if (error.status === 404) {
              console.warn('The requested resource doesn\'t exist.', error);
            } else if (error.status === 500) {
              console.warn('Purchase Failed', error)
            }
          })
      } else if (tixQuantity == '4') {
        fetch(`http://127.0.0.1:3000/api/charge/tickets/idv/4`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + stripePK
          },
          body: JSON.stringify(token, args)
        })
          .then(output => {
            if (output.status === "succeeded")
              document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
          })
          .catch((error) => {
            if (error.status === 400) {
              console.warn('Bad request, often due to missing a required parameter.', error);
            } else if (error.status === 401) {
              console.warn('No valid API key provided.', error);
            } else if (error.status === 404) {
              console.warn('The requested resource doesn\'t exist.', error);
            } else if (error.status === 500) {
              console.warn('Purchase Failed', error)
            }
          })
      } else if (tixQuantity == '5' ) {
        fetch(`http://127.0.0.1:3000/api/charge/tickets/idv/5`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + stripePK
          },
          body: JSON.stringify(token, args)
        })
          .then(output => {
            if (output.status === "succeeded")
              document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
          })
          .catch((error) => {
            if (error.status === 400) {
              console.warn('Bad request, often due to missing a required parameter.', error);
            } else if (error.status === 401) {
              console.warn('No valid API key provided.', error);
            } else if (error.status === 404) {
              console.warn('The requested resource doesn\'t exist.', error);
            } else if (error.status === 500) {
              console.warn('Purchase Failed', error)
            }
          })
      }
    } else {
      if (tixQuantity == '1' && tixType == 'space') {
        fetch(`http://127.0.0.1:3000/api/charge/tickets/tntsp/1`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + stripePK
          },
          body: JSON.stringify(token, args)
        })
          .then(output => {
            if (output.status === "succeeded")
              document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
          })
          .catch((error) => {
            if (error.status === 400) {
              console.warn('Bad request, often due to missing a required parameter.', error);
            } else if (error.status === 401) {
              console.warn('No valid API key provided.', error);
            } else if (error.status === 404) {
              console.warn('The requested resource doesn\'t exist.', error);
            } else if (error.status === 500) {
              console.warn('Purchase Failed', error)
            }
          })
      } else if (tixQuantity == '2' && tixType == 'space') {
        fetch(`http://127.0.0.1:3000/api/charge/tickets/tntsp/2`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + stripePK
          },
          body: JSON.stringify(token, args)
        })
          .then(output => {
            if (output.status === "succeeded")
              document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
          })
          .catch((error) => {
            if (error.status === 400) {
              console.warn('Bad request, often due to missing a required parameter.', error);
            } else if (error.status === 401) {
              console.warn('No valid API key provided.', error);
            } else if (error.status === 404) {
              console.warn('The requested resource doesn\'t exist.', error);
            } else if (error.status === 500) {
              console.warn('Purchase Failed', error)
            }
          })
      } else if (tixQuantity == '3' && tixType == 'space') {
        fetch(`http://127.0.0.1:3000/api/charge/tickets/tntsp/3`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + stripePK
          },
          body: JSON.stringify(token, args)
        })
          .then(output => {
            if (output.status === "succeeded")
              document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
          })
          .catch((error) => {
            if (error.status === 400) {
              console.warn('Bad request, often due to missing a required parameter.', error);
            } else if (error.status === 401) {
              console.warn('No valid API key provided.', error);
            } else if (error.status === 404) {
              console.warn('The requested resource doesn\'t exist.', error);
            } else if (error.status === 500) {
              console.warn('Purchase Failed', error)
            }
          })
      }
    }
  }

    // let ticketHandler = (token, args) => {
 
    // // let tixQuantity;
    // // let tixType;

    // console.log(token)
    
    //     fetch(`http://127.0.0.1:3000/api/charge/tickets/idv/1`, {
    //       method: "POST",
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer' + stripePK
    //       },
    //       body: JSON.stringify(token, args)
    //     })
    //       .then(output => {
    //         console.log("Purchase succeeded:", output);
    //       })
    //       .catch((error) => {
    //         if (error.status === 400) {
    //           console.warn('Bad request, often due to missing a required parameter.', error);
    //         } else if (error.status === 401) {
    //           console.warn('No valid API key provided.', error);
    //         } else if (error.status === 404) {
    //           console.warn('The requested resource doesn\'t exist.', error);
    //         } else if (error.status === 500) {
    //           console.warn('Purchase Failed', error)
    //         }
    //       })
    //     }


  var handler = StripeCheckout.configure({ // eslint-disable-line no-undef
    key: stripePK,
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    zipCode: true,
    billingAddress: true,
    token: ticketHandler,
    opened: () => {
      console.log('opened')
    },
    closed: function (error) {
      if (error) {
        console.log(error)
      } else {
        console.log('Payment Sent!')
      }
    }
  });



  $('#ticketBtn').click((e) => {
    e.preventDefault();
    let numTix;
    var tixQuantity = $('#numberOfTickets').val();
    var tixType = $('#purchase').val();

    switch(tixQuantity){
      case "1":
        numTix = 1;
        break;
      case "2":
        numTix = 2;
        break;
      case "3":
        numTix = 3;
        break;
      case "4":
        numTix = 4;
        break;
      case "5":
        numTix = 5;
        break;
    }
    
    // var custInfo = {
    //   name: $('#ticketName').val(),
    //   phoneNumber: $('#ticketPhoneNumber').val(),
    //   email: $('#ticketEmail').val(),
    //   zipcode: $('#ticketZip').val()
    // };
    console.log({'tixquant': tixQuantity, 'tixtype': tixType })
    console.log(tixType == 'individual')
    console.log(tixQuantity == '1')
    console.log(`number of tickets is ${numTix}`)

    if (tixType == "individual") {
      // Open Checkout with further options:
      handler.open({
        name: 'PMM Picnic',
        description: 'Individual Tickets',
        amount: 1000 * numTix
      });
    }
    else if (tixType == "space") {
      if (numTix == 1 || numTix == 2 || numTix == 3) {
        // Open Checkout with further options:
        handler.open({
          name: 'PMM Picnic',
          description: 'Tent Space',
          amount: 12000 * numTix,
        });
      } else {
        alert('You can only purchase 3 tent spaces per transaction, please contact the committee if more is needed.');
      }
    }
  });


  // Close Checkout on page navigation:
  $(window).on('popstate', function () {
    handler.close();
  });
  //END STRIPE

  //START IMAGE GALLERY
  $("#slideshow > div:gt(0)").hide();

  setInterval(function () {
    $('#slideshow > div:first')
      .fadeOut(1000)
      .next()
      .fadeIn(1000)
      .end()
      .appendTo('#slideshow');
  }, 3000);

  //END PHOTO GALLERY
  // COUNTDOWN 

  // The date you want to count down to
  // var dateStr = "4/13/2019 12:00";
  // var date = dateStr.split(/\s|\/|:/);
  // var targetDate = new Date(date[2], date[1], date[0], date[3], date[4]);
  var targetDate = new Date("2019/4/13");

  // Other date related variables
  var days;
  var hrs;
  var min;
  var sec;

  /* --------------------------
   * ON DOCUMENT LOAD
   * -------------------------- */
  $(function () {
    // Calculate time until launch date
    timeToLaunch();
    // Transition the current countdown from 0 
    numberTransition('#days .number', days, 1000, 'easeOutQuad');
    numberTransition('#hours .number', hrs, 1000, 'easeOutQuad');
    numberTransition('#minutes .number', min, 1000, 'easeOutQuad');
    numberTransition('#seconds .number', sec, 1000, 'easeOutQuad');
    // Begin Countdown
    setTimeout(countDownTimer, 1001);
  });

  /* --------------------------
   * FIGURE OUT THE AMOUNT OF 
     TIME LEFT BEFORE LAUNCH
   * -------------------------- */
  function timeToLaunch() {
    // Get the current date
    var currentDate = new Date();

    // Find the difference between dates
    var diffInDate = (currentDate - targetDate) / 1000;
    var diff = Math.abs(Math.floor(diffInDate));

    // Check number of days until target
    days = Math.floor(diff / (24 * 60 * 60));
    sec = diff - days * 24 * 60 * 60;

    // Check number of hours until target
    hrs = Math.floor(sec / (60 * 60));
    sec = sec - hrs * 60 * 60;

    // Check number of minutes until target
    min = Math.floor(sec / (60));
    sec = sec - min * 60;
  }

  /* --------------------------
   * DISPLAY THE CURRENT 
     COUNT TO LAUNCH
   * -------------------------- */
  function countDownTimer() {

    // Figure out the time to launch
    timeToLaunch();

    // Write to countdown component
    $("#days .number").text(days);
    $("#hours .number").text(hrs);
    $("#minutes .number").text(min);
    $("#seconds .number").text(sec);

    // Repeat the check every second
    setTimeout(countDownTimer, 1000);
  }

  /* --------------------------
   * TRANSITION NUMBERS FROM 0
     TO CURRENT TIME UNTIL LAUNCH
   * -------------------------- */
  function numberTransition(id) {
    // Transition numbers from 0 to the final number
    $({ numberCount: $(id).text() })
  }

  // END COUNTDOWN
});









