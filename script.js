document.getElementById('searchBtn').addEventListener('click', function() {
  var searchInput = document.getElementById('searchInput');
  var searchContainer = document.querySelector('.search-container');
  searchContainer.style.flexBasis = '600px'; // Expand to the designated space
  searchInput.style.borderColor = "#000000";
  searchInput.style.opacity = '1';
  searchInput.style.visibility = 'visible';
  searchInput.focus();
});

document.getElementById('searchInput').addEventListener('blur', function(event) {
  var searchContainer = document.querySelector('.search-container');
  if (!event.target.value) {
      searchContainer.style.flexBasis = '250px'; // Shrink back to the default size
      event.target.style.opacity = '0';
      event.target.style.visibility = 'hidden';
  }
});

// Handle login button selection
$(document).ready(function() {
    // Event listener for login button to open the modal
    $('loginButton').click(function() {
      $('#loginModal').modal('show');
    });
  
    // Event listener for form submission
    $('#loginForm').submit(function(event) {
      event.preventDefault();
      // Logic to handle the login, potentially making an AJAX call to your server
    });
  
    // Additional event listeners for social login buttons
  });

  document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Implement your sign up logic here
    // Typically involves an AJAX call to the server
  });

  $(document).ready(function() {
    // Event listener for login button to open the modal
    $('forgotUsernameAnchor').click(function() {
      $('#forgotUsernameModal').modal('show');
    });
  
    // Event listener for form submission
    $('#forgotUsernameModal').submit(function(event) {
      event.preventDefault();
      // Logic to handle the login, potentially making an AJAX call to your server
    });
  
    // Additional event listeners for social login buttons
  });

  $(document).ready(function() {
    // Event listener for login button to open the modal
    $('forgotPasswordAnchor').click(function() {
      $('#forgotPasswordModal').modal('show');
    });
  
    // Event listener for form submission
    $('#forgotPasswordModal').submit(function(event) {
      event.preventDefault();
      // Logic to handle the login, potentially making an AJAX call to your server
    });
  
    // Additional event listeners for social login buttons
  });

  $(document).ready(function() {
    // Event listener for login button to open the modal
    $('loginSignupButton').click(function() {
      $('#signupModal').modal('show');
    });
  
    // Event listener for form submission
    $('#signupModal').submit(function(event) {
      event.preventDefault();
      // Logic to handle the login, potentially making an AJAX call to your server
    });
  
    // Additional event listeners for social login buttons
  });

  // Handle the back button functionality
  $(document).ready(function() {
    $('.btn-back').click(function() {
        var targetModal = $(this).data('target');
        // Close the current modal
        $(this).closest('.modal').modal('hide');
        // Open the target modal
        $(targetModal).modal('show');
    });
  });

  // Handle when user opens forgot username modal
  $('#forgotUsernameAnchor').click(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $('#loginModal').modal('hide'); // Hide login modal so there is no overlay
    setTimeout(function() {
        $('#forgotUsernameModal').modal('show');
    }, 100);
});

// Same here, but for forgot password modal
$('#forgotPasswordAnchor').click(function(event) {
  event.preventDefault();
  event.stopPropagation();
  $('#loginModal').modal('hide');
  setTimeout(function() {
      $('#forgotPasswordModal').modal('show');
  }, 100);
});
