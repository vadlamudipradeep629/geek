document.getElementById('showLoginForm').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('form-wrapper').style.transform = 'translateX(-50%)';
  });
  
  document.getElementById('showRegisterForm').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('form-wrapper').style.transform = 'translateX(0)';

  });


  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const profession = document.getElementById('profession').value;
  

    if (name.length < 4) {
      alert('Name should be at least 4 characters long.');
      return;
    }
  
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    if (!validatePassword(password, email, phone)) {
      alert('Password must be at least 8 characters long and should not be the same as email or phone number.');
      return;
    }
  
    if (!validatePhone(phone)) {
      alert('Phone number should contain numbers only.');
      return;
    }
  
    const userData = {
      name,
      email,
      password,
      phone,
      profession
    };
  

    localStorage.setItem('userData', JSON.stringify(userData));
  
  
    axios.post("http://localhost:3000/userRegistration/registration", userData)
      .then((response) => {
        console.log(response.data);
        alert(response.data.msg); 
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Registration failed. Please try again.'); 
      });
  });
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('loginemail').value;
    const password = document.getElementById('loginpassword').value;
  
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    if (!validatePassword(password)) {
      alert('Password must be at least 8 characters long.');
      return;
    }
  
    const userLogin = { email, password };
  
  
    localStorage.setItem("userLogin", JSON.stringify(userLogin));
  
   
    axios.post('http://localhost:3000/userLogin/login', userLogin)
      .then((response) => {
        console.log("Login response:", response.data);
        alert(response.data.msg); 
        window.location.href = "./index.html"; 
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("An error occurred during login.");
      });
  });
  

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  

  function validatePassword(password) {
    return password.length >= 8;
  }
  function validatePhone(phone) {
    const re = /^[0-9]+$/;
    return re.test(phone);
  }
  
  
  /*
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const profession = document.getElementById('profession').value;
  
  
    const userData = {
      name,
      email,
      password,
      phone,
      profession
    };
  
  
    localStorage.setItem('userData', JSON.stringify(userData));
  
    axios.post("http://localhost:3000/userRegistration/registration", userData)
      .then((response) => {
        console.log(response.data);
        alert(response.data.msg); 
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Registration failed. Please try again.'); 
      });
  });
  
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginemail').value;
    const password = document.getElementById('loginpassword').value;
    
  
    const userLogin = { email, password };
    localStorage.setItem("userLogin", JSON.stringify(userLogin));
    
 
    axios.post('http://localhost:3000/userLogin/login', userLogin)
      .then((response) => {
        console.log("Login response:", response.data);
        alert(response.data.msg); 
        window.location.href="./index.html"
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("An error occurred during login.");
      });
      
  });*/